import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './movie-view.scss';
import axios from 'axios';

const MovieView = ({user, movie, favoriteMovies}) => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if(!movie) return;
    if(favoriteMovies.some(m => m === movie._id)) {
      setFavorited(true)
    }

  }, [movie, favoriteMovies])

  const addToFavoriteListAndshowAlreadyAddedButton = (e, movie) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let movieId = movie._id;
    let { Username } = user;
    axios.post(`https://flix-for-fun.herokuapp.com/users/${Username}/Movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      setFavorited(true)
    }).catch(error => {
      console.log(error);
    });
  }

  const removeFromFavoriteListandShowAddToFavoriteButton = (e, movie) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let movieId = movie._id
    let {  Username } = user;
    axios.delete(`https://flix-for-fun.herokuapp.com/users/${Username}/Movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      setFavorited(false)
    }).catch(error => {
      console.log(error);
    });
  }

  if(!movie) return null
  return (
    <div className="movie-view">
      <img className="movie-poster" src={movie.ImagePath}/>
      <div className="movie-details">
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
        ? <Button className="custom-button" variant="default" type="button" onClick={(e) => addToFavoriteListAndshowAlreadyAddedButton(e, movie)}>Add to Favorite</Button>
        : <Button variant="secondary" type="button" onClick={(e) => removeFromFavoriteListandShowAddToFavoriteButton(e, movie)}>Added!</Button>
        }
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="default" className="inverse-custom-button">Director Info</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="default" className="inverse-custom-button">Genre Info</Button>
        </Link>
        <Link to={`/`}>
          <Button variant="default" className="custom-button" type="button">Back</Button>
        </Link>
      </div>
    </div>
  );
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
    user:state.user,
    favoriteMovies: state.favoriteMovies
   };
}

export default withRouter(connect(mapStateToProps)(MovieView));

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