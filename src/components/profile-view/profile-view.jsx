import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class ProfileView extends React.Component {

    constructor(){
        super();
        this.state={};
    }

    render(){

        const {history} = this.props;

        return(
        <div className="profile">
          <div className="profile-username">
            <span className="label">Username: </span>
            <span className="value">{history.Username}</span>
          </div>
          <div className="profile-email">
            <span className="label">Email: </span>
            <span className="value"></span>
          </div>
          <div className="profile-birthday">
            <span className="label">Birthday: </span>
            <span className="value"></span>
          </div>
          <div className="favorite-movies">
            <span className="label">Favorite Movies: </span>
            <span className="value"></span>
          </div>
          <Link to={`/`}>
            <Button variant="primary" type="button">Discover More Movies!</Button>
          </Link>
        </div>
        )
    }
}

