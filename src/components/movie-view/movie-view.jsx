import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './movie-view.scss';
import axios from 'axios';

class MovieView extends React.Component{
  constructor(){
    super();
    this.state={
      favorited: false
    };
  }

  checkIfMovieIsFavorited(movie, user) {
    if(!user || !movie) return;
    console.log('im here');
    user.FavoriteMovies.forEach(m => {
      if(m === movie._id){
        return this.setState({
          favorited: true
        });
      };
    })
  }

  addToFavoriteListAndshowAlreadyAddedButton(e, movie){
    e.preventDefault();
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    let movieId = movie._id;
    let { user } = this.props;
    axios.post(`https://flix-for-fun.herokuapp.com/users/${username}/Movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      console.log(user.FavoriteMovies)
      this.setState({
        favorited: true
      });
    }).catch(error => {
      console.log(error);
    });
  }

  removeFromFavoriteListandShowAddToFavoriteButton(e, movie){
    e.preventDefault();
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    let movieId = movie._id
    axios.delete(`https://flix-for-fun.herokuapp.com/users/${username}/Movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      this.setState({
        favorited: false
      });
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps) {
    if(this.props.movie && this.props.movie !== prevProps.movie || 
      this.props.user && this.props.user !== prevProps.user) {
        this.checkIfMovieIsFavorited(this.props.movie, this.props.user);
      }
  }

  render(){
    
    let { movie, user } = this.props;
    let {favorited} = this.state;

    console.log(movie);
    console.log(user);

    if(!movie) return null

      return (
        <div className="movie-view">
          <img className="movie-poster" src={movie.ImagePath}/>
          <div className="image-poster">
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          {!favorited
          ? <Button variant="success" type="button" onClick={(e) => this.addToFavoriteListAndshowAlreadyAddedButton(e, movie)}>Add to Favorite</Button>
          : <Button variant="secondary" type="button" onClick={(e) => this.removeFromFavoriteListandShowAddToFavoriteButton(e, movie)}>Added!</Button>
          }
          <Link to={`/movies/directors/${movie.Director.Name}`}>
            <Button variant="primary">Director Info</Button>
          </Link>
          <Link to={`/movies/genres/${movie.Genre.Name}`}>
            <Button variant="primary">Genre Info</Button>
          </Link>
          <Link to={`/`}>
            <Button variant="primary" type="button">Back</Button>
          </Link>
        </div>
  );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    })
  }),
};

let mapStateToProps = (state, ownProps) => {
  return { 
    movie:state.movies.find(m => m._id === ownProps.match.params.movieId), 
    user:state.user };
}

export default connect(mapStateToProps)(MovieView);

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
      }),
    }),
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.array,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string
  }),
  favorited: PropTypes.bool
};