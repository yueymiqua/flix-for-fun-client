import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

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
    if (accessToken !== null) {
      this.setState({
          user: localStorage.getItem('user')
      })
    }
    this.getMovies(accessToken);
    this.getUser(accessToken);
  }

  // When a user successfully logs in, this function is invoked and updates the state of the 'user' property to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
        user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    window.location.reload();
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
    let username = localStorage.getItem('user');
    axios.get(`https://flix-for-fun.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    }).then(response => {
      this.props.setUser(response.data);
    }).catch(function(error) {
      console.log(error);
    });
  }

  onLogOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.setState({
      user: null
    })
    console.log('Logout Successful')
    alert('Logged out successfully - Have a great day!')
    window.location.href="/";
  }

  onProfileView(user){
    let username = localStorage.getItem('user');
    window.location.href = `/users/${username}`;
  }
  
  render() {

    let { movies } = this.props;
    let { user } = this.props;
    let username = localStorage.getItem('user');
    if (!movies) return <div className="main-view"/>;

    return (
    <Router>
      <div className="main-view">
        { user
        ? <div>
            <Link to={`/`}>
              <Button variant="danger" type="button" onClick={() => this.onLogOut()}>Logout</Button>
            </Link>
            <Link to={`/users/${user.Username}`}>
              <Button variant="primary" type="button" className="view-profile-button" onClick={(user) => this.onProfileView(user)}>View Profile</Button>
            </Link>
              <Button variant="primary" type="button" className="nav-link about-creator" href="https://yueymiqua.github.io/website-portfolio/" target="_blank">About App Creator</Button>
          </div>
        : null
        }
        <Route exact path="/" render={() => {
        // If no user, the login view is rendered. If there is a user logged in, the user details are passed as a prop to LoginView
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
          return <MoviesList movies={movies}/>
        }}/>
        <Row className="register justify-content-md-center">
          <Col>
            <Route path="/register" render={() => <RegistrationView/>}/>
          </Col>
        </Row>
        <Row className="movie-detail justify-content-md-center">
          <Col md={8}>
            <Route path="/movies/:movieId" component={MovieView} />
          </Col>
        </Row>
        <Row className="director justify-content-md-center">
          <Col md={8}>
            <Route path="/movies/directors/:Name" render={({match}) => {
              if(!movies) return <div className="main-view"/>;
              return <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director}/>}
            }/>
          </Col>
        </Row>
        <Row className="genres justify-content-md-center">
          <Col md={8}>
            <Route path="/movies/genres/:Name" render={({match}) => {
              if(!movies) return <div className="main-view"/>;
              return <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre}/>}
            }/>
          </Col>
        </Row>
        <Row className="profile justify-content-md-center">
          <Col md={4}>
            <Route path={`/users/${username}`} component={ProfileView}/>
          </Col>
        </Row>
      </div>
    </Router>
    );
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  };
}

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);

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