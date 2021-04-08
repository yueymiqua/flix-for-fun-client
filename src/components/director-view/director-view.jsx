import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import './director-view.scss';

export class DirectorView extends React.Component{

  constructor(){
      super();
      this.state={};
  }

  render(){

    const {director} = this.props;

    if(!director) return null;

    return (
      <div className="director-view">
        <div className="director-name">
          <span className="label">Name: </span>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Biography: </span>
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label">Birth: </span>
          <span className="value">{(director.Birth.split('T'))[0]}</span>
        </div>
        <div className="director-death">
          <span className="label">Death: </span>
          {director.Death===null
          ?<span className="value"></span> 
          :<span className="value">{(director.Death.split('T'))[0]}</span>
          }
        </div>
        <Link to={`/`}>
          <Button variant="primary" type="button">Back to Movies</Button>
        </Link>
      </div>
    )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string
  }),
  birthFields: PropTypes.array,
  deathFields: PropTypes.array,
  newBirth: PropTypes.string,
  newDeath: PropTypes.string
};