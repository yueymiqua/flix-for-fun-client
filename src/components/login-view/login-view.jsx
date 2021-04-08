import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import './login-view.scss'
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to server for authentication
    axios.post('https://flix-for-fun.herokuapp.com/login', {
      Username: username,
      Password: password
    }).then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    }).catch(error => {
      console.log('User not found.')
      alert('Incorrect username/password - Please try again!')
    })
  };

  return (
    <Form className="login-form justify-content-md-center">
      <h1 className="login-title">Login to Flix-For-Fun!</h1>
      <Form.Label>
        <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Label>
      <br></br>
      <Form.Label>
        <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Label>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <br></br>
      <Link to="/register">
        <Button className="go-to-registration-button" variant="secondary" type="button">New User? Go to Registration Page!</Button>
      </Link>
    </Form>
  );
}