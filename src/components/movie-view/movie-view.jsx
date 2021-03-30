import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

import './movie-view.scss'

export class MovieView extends React.Component{
    Constructor(){
        Super();
        this.state={};
    }

    render(){
        const {movie, onClick} = this.props;
        
        if(!movie) return null

        return (
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath}/>
                <div className="image-poster">
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <Button className="back-button" type="button" onClick={() => onClick()}>Back</Button>
            </div>
        );
    }
}

MovieView.propTypes = {
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