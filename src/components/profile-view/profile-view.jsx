import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './profile-view.scss';

class ProfileView extends React.Component {

  constructor(){
    super();
    this.state={
      showUpdateButton: false,
      showConfirmDeleteButton: false,
    };
      this.setUsername = this.setUsername.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setEmail = this.setEmail.bind(this);
      this.setBirthday = this.setBirthday.bind(this);
  }

  setUsername(event){
    this.setState({
      Username: event.target.value
    });
  }

  setPassword(event){
    this.setState({
      Password: event.target.value
    });
  }

  setEmail(event){
    this.setState({
      Email: event.target.value
    });
  }

  setBirthday(event){
    this.setState({
      Birthday: event.target.value
    });
  }

  onHandleChange(e){
    e.preventDefault();
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    let {Username, Password, Email, Birthday} = this.state;
    axios({
      method: 'put',
      url: `https://flix-for-fun.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}`},
      data: {
        Username: Username,
        Password: Password,
        Email: Email,
        Birthday: Birthday,
      },
    }).then((res) => {
      this.setState({
        Username: res.data.Username,
        Password: res.data.Password,
        Email: res.data.Email,
        Birthday: res.data.Birthday,
      });
      this.changeVisibleButtons();
      localStorage.setItem('user', this.state.Username);
      window.location.reload()
    });
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
              : favoriteMoviesObject.map(movieObject => 
                <Card className="favorite-movies">
                  <Card.Img className="favorite-movie-thumbnail" src={`${movieObject.ImagePath}`}/>
                  <Card.Title className="favorite-movie-title">{movieObject.Title}</Card.Title>
                  <Button className="remove-movie" variant="danger" type="button" onClick={(e) => this.onHandleRemoveFavoriteMovie(e, movieObject._id)}>Remove from Favorites</Button>
                </Card>)
              }
            </div>
            <Button variant="primary" type="button" onClick={() => this.changeVisibleButtons()}>Update Information</Button>
            { !showConfirmDeleteButton
            ? <Button variant="warning" type="button" onClick={() => this.changeDeleteButtonVisibility()}>Delete Profile</Button>
            : <div>
                <br></br>
                <Button variant="danger" type="button" onClick={(e) => this.onHandleDelete(e)}>CONFIRM DELETE</Button>
                <Button variant="primary" type="button" onClick={() => this.cancelDelete()}>CANCEL</Button>
              </div>
            }
          </div>
        )
          
        : <div className="update-profile">
            <span className="new-info-span">Enter New Profile Information</span>
            <input type="username" className="new-username" placeholder="Enter new username" onChange={this.setUsername}></input>
            <input type="password" className="new-password" placeholder="Enter new password" onChange={this.setPassword}></input>
            <input type="email" className="new-email" placeholder="Enter new email" onChange={this.setEmail}></input>
            <input type="date" className="new-birthday" onChange={this.setBirthday}></input>
            <Button variant="success" type="button" onClick={(e) => this.onHandleChange(e)}>Update</Button>
            <Button variant="secondary" type="button" onClick={() => this.notUpdateInfo()}>Cancel</Button>            
          </div>
        }
        <div className="discover-movies">
          <Link to={`/`}>
            <Button className="discover-movies-button" variant="primary" type="button">Discover More Movies!</Button>
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