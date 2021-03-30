import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row'; // Row from React-Bootstrap
import Col from 'react-bootstrap/Col'; // Column from React-Bootstrap
<<<<<<< Updated upstream
=======
import Button from 'react-bootstrap/Button';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
>>>>>>> Stashed changes

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss'

export class MainView extends React.Component {
    constructor(){
        super();
        this.state={
            movies: null,
            selectedMovie: null,
            user: null,
            toLogIn: true
        };
    }
    // One of the "hooks" available in a React Component
    componentDidMount() {
      axios.get('https://flix-for-fun.herokuapp.com/movies')
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    // When a movie is clicked on, this function is invoked and updates the state of the 'selectedMovie' property to that movie
    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    // When the back button is clicked on in the movie-view, this function is invoked and updates the state of the 'selectedMovie' property to null again
    onBackButtonClick() {
        this.setState({
            selectedMovie: null
        });
    }

    onGoToRegisterButtonClick() {
        this.setState({
            toLogIn: false
        })
    }

    onGoToLoginButtonClick() {
        this.setState({
            toLogIn: true
        })
    }

    // When a user successfully logs in, this function is invoked and updates the state of the 'user' property to that particular user
    onLoggedIn(user) {
        this.setState({
            user
        });
    }
<<<<<<< Updated upstream
=======

    onLogOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({
            user: null
        })
        console.log('Logout Successful')
        alert('Logged out successfully - Have a great day!')
    }
>>>>>>> Stashed changes
  
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user, toLogIn } = this.state;

    // If no user, the login view is rendered. If there is a user logged in, the user details are passed as a prop to LoginView
    if (!user && toLogIn) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.onGoToRegisterButtonClick()}/>

    if (!user && !toLogIn) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} onClick={() => this.onGoToLoginButtonClick()}/>

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
<<<<<<< Updated upstream
      <Row className="main-view justify-content-md-center">

      {/* If the state of `selectedMovie` is not null, that selected movie will be returned which renders movie-view. Otherwise ALL movies will be returned */}
      { selectedMovie
        ? (
          <Col md={8}>
            <MovieView movie={selectedMovie} onClick={() => this.onBackButtonClick()}/>
          </Col>
        )
        : movies.map(movie => (
          <Col md={3}>
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
          </Col>
        ))
      }
      </Row>
    );
  }
}
=======
    <Router>
      <div className="main-view">
        { user
        ? <Link to={`/`}><Button variant="danger" type="button" onClick={() => this.onLogOut()}>Logout</Button></Link>
        : null
        }
        <Route exact path="/" render={() => {
          // If no user, the login view is rendered. If there is a user logged in, the user details are passed as a prop to LoginView
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)}}
        />
        <Route path="/register" render={() => <RegistrationView/>}/>
        <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/> }/>
        <Route path="/movies/directors/:Name" render={({match}) => {
          if(!movies) return <div className="main-view"/>;
          return <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director}/>}
        }/>
        <Route path="/movies/genres/:Name" render={({match}) => {
          if(!movies) return <div className="main-view"/>;
          return <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre}/>}
        }/>
        <Route path="/users/:Username" render={({history}) => { return <ProfileView history={history}/> }}/>
        
      </div>
    </Router>
    );
  }
}
>>>>>>> Stashed changes
