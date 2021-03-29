import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render(){
    // This is given to the <MovieCard/> component by the outer world,
    // which in this case is 'MainView', as 'MainView' is what's
    // connected to your database via the movies endpoint of your API
    const { movie, onClick } = this.props;
    
    return( 
      <Card>
      <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() => onClick(movie)} variant="link">Show More Detail</Button>
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
  onClick: PropTypes.func.isRequired
};