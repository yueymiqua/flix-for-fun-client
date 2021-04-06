import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import './movies-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <Row className="movies-list justify-content-md-center">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      {filteredMovies.map(m => <Col md={3}><MovieCard key={m._id} movie={m}/></Col>)}
    </Row>;
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
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
      visibilityFilter: PropTypes.string,
      filteredMovies: PropTypes.array
  };