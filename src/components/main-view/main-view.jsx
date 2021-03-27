import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
       <div className="main-view">Flix-For-Fun

    {/* If the state of `selectedMovie` is not null, that selected movie will be returned which renders movie-view. Otherwise all *movies will be returned */}
       { selectedMovie
        ? <MovieView movie={selectedMovie} onClick={() => this.onBackButtonClick()}/>
        : movies.map(movie => (
         <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
       ))}
       </div>
      );
    }
  }