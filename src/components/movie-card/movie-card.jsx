import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  
  render(){
    // This is given to the <MovieCard/> component by the outer world,
    // which in this case is 'MainView', as 'MainView' is what's
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;
    
    return( 
      <Card>
      <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body className="card-body">
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="movie-details-button" variant="link"><strong>See Movie Details</strong></Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}

MovieCard.propTypes = {
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
  }).isRequired,
};