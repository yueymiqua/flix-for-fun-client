import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

  constructor(){
    super();
    this.state={
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      showUpdateButton: false
    }
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.getUser(accessToken);
    }
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

  handleUpdate(){
    let username = localStorage.getItem(`user`);
    axios.put(`https://flix-for-fun.herokuapp.com/users/${username}`)
  }

  changeVisibleButtons(){
    const {showUpdateButton} = this.state;
    if(!showUpdateButton){
      this.setState({
        showUpdateButton: true
      })
    } else if(showUpdateButton){
      this.setState({
        showUpdateButton: false
      })
      alert("Information Updated!");
    }
  }

  notUpdateInfo(){
    const {showUpdateButton} = this.state;
    this.setState({
      showUpdateButton: false
    })
  }

  render(){

      const {Username, Email, Birthday, FavoriteMovies, showUpdateButton} = this.state;
      const {movies} = this.props;
      console.log(movies);

      return(
      <div className="profile">
        { !showUpdateButton
        ? (
          <div>
            <div className="profile-username">
              <span className="label">Username: </span>
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
              <span className="value">{FavoriteMovies}</span>
            </div>
            <Button variant="primary" type="button" onClick={() => this.changeVisibleButtons()}>Update Information</Button>
          </div>
        )
          
        : <div>
            <input type="username" className="new-username" placeholder="Enter new username"></input>
            <input type="password" className="new-password" placeholder="Enter new password"></input>
            <input type="email" className="new-email" placeholder="Enter new email"></input>
            <input type="date" className="new-birthday"></input>
            <Button variant="success" type="button" onClick={() => this.changeVisibleButtons()}>Update</Button>
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

