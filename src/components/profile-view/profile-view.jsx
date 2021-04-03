import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(){
    super();
    this.state={
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      showUpdateButton: false,
      showConfirmDeleteButton: false
    };
      this.setUsername = this.setUsername.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setEmail = this.setEmail.bind(this);
      this.setBirthday = this.setBirthday.bind(this);
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.getUser(accessToken);
    };
  }

  getUser(token) {
    let username = localStorage.getItem('user');
    axios.get(`https://flix-for-fun.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      });
    }).catch(error => {
      console.log(error);
    });
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
    const {showUpdateButton} = this.state;
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
    const {showConfirmDeleteButton} = this.state;
    this.setState({
      showConfirmDeleteButton: true
    });
  }

  cancelDelete(){
    const {showConfirmDeleteButton} = this.state;
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
    const {showUpdateButton} = this.state;
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

  render(){

    const {Username, Password, Email, Birthday, FavoriteMovies, showUpdateButton, showConfirmDeleteButton} = this.state;
    const {movies} = this.props;

    return(
      <div className="profile">
        { !showUpdateButton
        ? (
          <div>
            <div className="profile-username">
              <span className="label" >Username: </span>
              <span className="value">{Username}</span>
            </div>
            <div className="profile-email">
              <span className="label">Email: </span>
              <span className="value">{Email}</span>
            </div>
            <div className="profile-birthday">
              <span className="label">Birthday: </span>
              <span className="value">{Birthday}</span>
              
            </div>
            <div className="favorite-movies">
              <span className="label">Favorite Movies: </span>
              {FavoriteMovies.map(mId => 
                <div key={`${mId}`}>
                  <span className="value">{mId}</span>
                  <Button className="remove-movie" variant="danger" type="button" onClick={(e) => this.onHandleRemoveFavoriteMovie(e, mId)}>X</Button>
                </div>)}
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
          
        : <div>
            <input type="username" className="new-username" placeholder="Enter new username" value={this.state.Username} onChange={this.setUsername}></input>
            <input type="password" className="new-password" placeholder="Enter new password" onChange={this.setPassword}></input>
            <input type="email" className="new-email" placeholder="Enter new email" value={this.state.Email} onChange={this.setEmail}></input>
            <input type="date" className="new-birthday" onChange={this.setBirthday}></input>
            <Button variant="success" type="button" onClick={(e) => this.onHandleChange(e)}>Update</Button>
            <Button variant="secondary" type="button" onClick={() => this.notUpdateInfo()}>Cancel</Button>
          </div>
        }
        <Link to={`/`}>
          <Button variant="primary" type="button">Discover More Movies!</Button>
        </Link>
      </div>
    )
  }
}

