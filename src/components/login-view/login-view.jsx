import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import './login-view.scss'
import axios from 'axios';

export function LoginView(props) {
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});

  const setField = (field, value) => {
    setForm({
      username: form.username,
      password: form.password,
      [field]: value
    })
    if (!!errors[field]) setErrors ({
      username: errors.username,
      password: errors.password,
      [field]: null
    })
  };

  const findFormErrors = () => {
    const {username, password} = form;
    const newErrors = {};

    // Validating username
    if (!username || username==='') newErrors.username = 'Username must not be empty'
    else if ( username.length < 5) newErrors.username = 'Username must be more than 5 characters'
    else if ( username.length > 30) newErrors.username = 'Username must be less than 30 characters'

    // Validating password
    if (!password || password==='') newErrors.password = 'Password must not be empty'
    else if ( password.length < 5) newErrors.password = 'Password must be more than 5 characters'
    else if ( password.length > 30) newErrors.password = 'Password must be less than 30 characters'


    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      // Send a request to server for authentication
      axios.post('https://flix-for-fun.herokuapp.com/login', {
        Username: form.username,
        Password: form.password
      }).then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      }).catch(error => {
        console.log('User not found.')
        alert('Incorrect username/password - Please try again!')
      })
    }
  };

  return (
    <Form className="login-form justify-content-md-center">
      <h1 className="login-title">Login to Flix-For-Fun!</h1>
      <Form.Group>
        <Form.Label className="login-label">Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" onChange={e => setField('username', e.target.value)} isInvalid={!!errors.username}/>
        <Form.Control.Feedback type='invalid'>
          { errors.username }
        </Form.Control.Feedback>
      </Form.Group>
      <br></br>
      <Form.Group>
        <Form.Label className="login-label">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={e => setField('password', e.target.value)} isInvalid={!!errors.password} />
        <Form.Control.Feedback type='invalid'>
          { errors.password }
        </Form.Control.Feedback>
      </Form.Group>
      <br></br>
      <Button className="custom-button" variant="default" type="submit" onClick={handleSubmit}>Submit</Button>
      <br></br>
      <Link to="/register">
        <Button className="inverse-custom-button" variant="default" type="button">New User? Go to Registration Page!</Button>
      </Link>
    </Form>
  );
}