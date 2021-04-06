import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import './genre-view.scss';

export class GenreView extends React.Component{

    constructor(){
        super();
            this.state={};
    }

    render(){
        const {genre} = this.props;

        if(!genre) return null;

        return (
            <div className="genre-view">
                <div className="genre-name">
                  <span className="value">{genre.Name} Movies</span>
                </div>       
                <div className="genre-description">
                  <span className="label">Description: </span>    
                  <span className="value">{genre.Description}</span>
                </div>        
                <Link to={`/`}>
                  <Button variant="primary" type="button">Back to Movies</Button> 
                </Link>
            </div>
        )
    }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }),
};