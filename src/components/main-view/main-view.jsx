import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies, setUser, setFavoriteMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import  MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import  ProfileView from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {

  constructor(){
    super();
      this.state = {};
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if(accessToken) {
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function is invoked and updates the state of the 'user' property to that particular user
  onLoggedIn(authData) {
    const { user, token } = authData;
    const { FavoriteMovies, ...userDetails } = user;
    this.props.setUser(userDetails);
    this.props.setFavoriteMovies(FavoriteMovies);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userDetails));
    this.getMovies(authData.token);
    // window.location.reload();
  }

  // Below method is called when user logs in successfully, AND when the page is refreshed(called from componentDidMount)
  getMovies(token) {
    axios.get('https://flix-for-fun.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
      this.props.setMovies(response.data);
    }).catch(function(error) {
      console.log(error);
    });
  }

  getUser(token) {
    const userString = localStorage.getItem('user');
      
    if(userString) {
      const user = JSON.parse(userString);
      let username = user.Username;

      axios.get(`https://flix-for-fun.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}`}
      }).then(response => {
        const { FavoriteMovies, ...userDetails } = response.data;
        this.props.setUser(userDetails);
        this.props.setFavoriteMovies(FavoriteMovies);
      }).catch(function(error) {
        console.log(error);
      });
    }
  }

  onLogOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.setState({
      user: null
    })
    console.log('Logout Successful')
    alert('Logged out successfully - Have a great day!')
    this.props.history.push('/')
  }
  
  render() {
    console.log('re-rendering')
    let { movies } = this.props;
    let { user } = this.props;
    if (!movies.length) return <div className="main-view"/>;

    return (
      <div className="main-view">
        { user
        && <div>
            <Link to={`/`}>
              <Button variant="default" className="inverse-custom-button" type="button">Homepage</Button>
            </Link>
            <Link to={`/users/${user.Username}`}>
              <Button variant="default" className="custom-button" type="button">View Profile</Button>
            </Link>
              <Button variant="default"  className="custom-button" type="button" href="https://yueymiqua.github.io/website-portfolio-master/" target="_blank">About App Creator</Button>
            <Link to={`/`}>
              <Button variant="danger" type="button" onClick={() => this.onLogOut()}>Logout</Button>
            </Link>
          </div>
        }
        <Switch>
          <Route exact path="/" render={() => {
          // If no user, the login view is rendered. If there is a user logged in, the user details are passed as a prop to LoginView
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
            return <MoviesList movies={movies}/>
          }}/>
          <Route path="/register" render={() => <RegistrationView/>}/>
          <Route path='/users/:username' component={() => <ProfileView />}/>
          <Route path="/movies/:movieId" component={() => <MovieView />} />
          <Route path="/directors/:name" component={({match}) => {
            if(!movies) return <div className="main-view"/>;
            const matchingMovie = movies.find(m => m.Director.Name === match.params.name);
            if(matchingMovie) {
              return <DirectorView director={matchingMovie.Director}/>
            } else {
              return <div className="main-view"/>
            }
          }}/>
          <Route path="/genres/:Name" render={({match}) => {
            if(!movies) return <div className="main-view"/>;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre}/>}
          }/>
        </Switch>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps, { setMovies, setUser, setFavoriteMovies } )(MainView));

MainView.propTypes = {
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
};