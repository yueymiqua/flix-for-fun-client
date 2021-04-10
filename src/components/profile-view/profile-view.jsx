import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UpdateProfileView } from '../update-profile-view/update-profile-view';

import './profile-view.scss';

class ProfileView extends React.Component {

  constructor(){
    super();
    this.state={
      showUpdateButton: false,
      showConfirmDeleteButton: false,
    };
  }

  changeVisibleButtons(){
    let {showUpdateButton} = this.state;
    if(!showUpdateButton){
      this.setState({
        showUpdateButton: true
      });
    } else if(showUpdateButton){
      this.setState({
        showUpdateButton: false
      });
    alert("Information Updated!");
    };
  }

  changeDeleteButtonVisibility(){
    this.setState({
      showConfirmDeleteButton: true
    });
  }

  cancelDelete(){
    this.setState({
      showConfirmDeleteButton: false
    });
  }

  onHandleDelete(e){
    e.preventDefault();
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    axios.delete(`https://flix-for-fun.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('User Deleted!')
      window.location.href="/";
    }).catch(error => {
      console.log(error);
    });
  }

  notUpdateInfo(){
    this.setState({
      showUpdateButton: false
    });
  }

  onHandleRemoveFavoriteMovie(e, movieId){
    e.preventDefault();
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios.delete(`https://flix-for-fun.herokuapp.com/users/${username}/Movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(() => {
      alert('Movie removed from favorites list!')
      window.location.reload()
    }).catch(error => {
      console.log(error);
    })
  }
  
  matchMovieWithFavoritedMovieId(mId){
    if(!mId) return;
    let { movies } = this.props;
    let array =[];
    mId.map(movieId => {
      movies.map(movie => {
        if(movie._id == movieId) {
          array.push(movie);
        }
      })
    });
    return array;
  }

  render(){
    
    let { user } = this.props;
    let { showUpdateButton } = this.state;  
    let { showConfirmDeleteButton } = this.state;
    
    if(!user) return null;
    let favoriteMoviesObject = this.matchMovieWithFavoritedMovieId(user.FavoriteMovies);

    // Removing T00:00:00.000Z from the Birth and death date strings
    let birthdayFields = user.Birthday.split('T');
    let newBirth = birthdayFields[0];

    return(
      <div className="profile">
        { !showUpdateButton
        ? (
          <div>
            <div className="profile-details">
              <div className="profile-username">
                <span className="label" >Username: </span>
                <span className="value">{user.Username}</span>
              </div>
              <div className="profile-email">
                <span className="label">Email: </span>
                <span className="value">{user.Email}</span>
              </div>
              <div className="profile-birthday">
                <span className="label">Birthday: </span>
                <span className="value">{newBirth}</span>
              </div>
              <span className="label">Favorite Movies: </span>
            </div>
            <div className="favorite">
              {!favoriteMoviesObject
              ? null
              : favoriteMoviesObject.map((movieObject, i) => 
                <Card key={i} className="favorite-movies">
                  <Card.Img className="favorite-movie-thumbnail" src={`${movieObject.ImagePath}`}/>
                  <Card.Title className="favorite-movie-title">{movieObject.Title}</Card.Title>
                  <Button className="remove-movie" variant="danger" type="button" onClick={(e) => this.onHandleRemoveFavoriteMovie(e, movieObject._id)}>Remove from Favorites</Button>
                </Card>)
              }
            </div>
            <Button variant="default" className="custom-button" onClick={() => this.changeVisibleButtons()}>Update Information</Button>
            { !showConfirmDeleteButton
            ? <Button variant="danger" type="button" onClick={() => this.changeDeleteButtonVisibility()}>Delete Profile</Button>
            : <div>
                <br></br>
                <Button variant="danger" type="button" onClick={(e) => this.onHandleDelete(e)}>CONFIRM DELETE</Button>
                <Button variant="primary" type="button" onClick={() => this.cancelDelete()}>CANCEL</Button>
              </div>
            }
          </div>
        )
          
        : <div className="update-profile">
            <UpdateProfileView/>
            <Button className="cancel-update" variant="danger" type="button" onClick={() => this.notUpdateInfo()}>Cancel</Button>            
          </div>
        }
        <div className="discover-movies">
          <Link to={`/`}>
            <Button className="custom-button" variant="default" type="button">Discover More Movies!</Button>
          </Link>
        </div>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  };
}

export default connect(mapStateToProps)(ProfileView);

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
    })),
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.array,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string
  }),
  showUpdateButton: PropTypes.bool,
  showConfirmDeleteButton: PropTypes.bool,
  favoriteMoviesObject: PropTypes.array,
  birthdayFields: PropTypes.array
};