import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'; // Row from React-Bootstrap
import Col from 'react-bootstrap/Col'; // Column from React-Bootstrap
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount() {
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
          this.setState({
              user: localStorage.getItem('user')
          })
      }
      this.getMovies(accessToken);
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
    }

    // Below method is called when user logs in successfully, AND when the page is refreshed(called from componentDidMount)
    getMovies(token) {
        axios.get('https://flix-for-fun.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        }).then(response => {
          this.props.setMovies(response.data);
          // this.setState({
          //   movies: response.data
          // });
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
    }
  
  render() {

    let { movies } = this.props;
    let { user } = this.state;
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded
    // const { movies, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
    <Router>
      <div className="main-view">
        { user
        ? <div>
            <Link to={`/`}>
              <Button variant="danger" type="button" onClick={() => this.onLogOut()}>Logout</Button>
            </Link>
            <Link to={`/users/${user}`}>
              <Button variant="primary" type="button">View Profile</Button>
            </Link>
          </div>
        : null
        }
        <Route exact path="/" render={() => {
        // If no user, the login view is rendered. If there is a user logged in, the user details are passed as a prop to LoginView
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
        return <MoviesList movies={movies}/>
        // movies.map(m => 
        //   <Col md={3}>
        //     <MovieCard key={m._id} movie={m}/>
        //   </Col>)
        }}/>
        <Row className="register justify-content-md-center">
          <Col>
            <Route path="/register" render={() => <RegistrationView/>}/>
          </Col>
        </Row>
        <Row className="movie-detail justify-content-md-center">
          <Col md={8}>
            <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/> }/>
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
        <Route path="/users/:Username" render={({history}) => { return (
          <Row className="profile justify-content-md-center">
            <Col md={4}>
              <ProfileView history={history} user={user} movies={movies} />
            </Col>
          </Row>) }}/>
      </div>
    </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);