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

getUserData(movie) {
  if(!movie) return;
  let token = localStorage.getItem('token');
  let username = localStorage.getItem('user');
  axios.get(`https://flix-for-fun.herokuapp.com/users/${username}`, {
    headers: { Authorization: `Bearer ${token}`}
  }).then((response) => {
    response.data.FavoriteMovies.map(m => {
      if(m === movie._id){
        return this.setState({
          favorited: true
        });
      };
    })
  }).catch((error) => {
    console.log(error);
  });
}

addToFavoriteListAndshowAlreadyAddedButton(e, movie){
  e.preventDefault();
  let token = localStorage.getItem('token');
  let username = localStorage.getItem('user');
  let movieId = movie._id
  axios.post(`https://flix-for-fun.herokuapp.com/users/${username}/Movies/${movieId}`, {
    headers: { Authorization: `Bearer ${token}`}
  }).then(() => {
    this.setState({
      favorited: true
    });
    // window.location.reload();
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
    // window.location.reload();
  }).catch(error => {
    console.log(error);
  });
}

  render(){
    
    let { movie } = this.props;
    let { favorited } = this.state;

    this.getUserData(movie);
    
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
  return { movie:state.movies.find(m => m._id === ownProps.match.params.movieId) };
}

export default connect(mapStateToProps)(MovieView);