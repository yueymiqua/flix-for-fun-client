import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import './registration-view.scss'
import axios from 'axios';

export function RegistrationView(props) {
  const [ form, setForm ] = useState({});
  const [ errors, setErrors ] = useState({});

  const setField = (field, value) => {
    setForm({
      username: form.username,
      password: form.password,
      email: form.email,
      birthday: form.birthday,
      [field]: value
    })
    if(!!errors[field]) setErrors ({
      username: errors.username,
      password: errors.password,
      email: errors.email,
      birthday: errors.birthday,
      [field]: null
    })
  }

  const findFormErrors = () => {
    const { username, password, email } = form;
    const newErrors = [];

    // Validating username
    if (!username || username==='') newErrors.username = 'Username not be empty'
    else if ( username.length < 5) newErrors.username = 'Username must be more than 5 characters'
    else if ( username.length > 30) newErrors.username = 'Username be less than 30 characters'

    // Validating password
    if (!password || password==='') newErrors.password = 'Password must not be empty'
    else if ( password.length < 5) newErrors.password = 'Password must be more than 5 characters'
    else if ( password.length > 30) newErrors.password = 'Password must be less than 30 characters'

    // Validating email
    if (!email || email==='') newErrors.email = 'Email must not be empty'
    else if ( !email.includes('@')) newErrors.email = 'Please enter a valid email'
    else if ( !email.includes('.')) newErrors.email = 'Please enter a valid email'

    return newErrors;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      axios.post('https://flix-for-fun.herokuapp.com/users', {
        Username: form.username,
        Password: form.password,
        Email: form.email,
        Birthday: form.birthday
      }).then(response => {
        const data = response.data;
        console.log(data)
        window.open('/', '_self'); // second argument '_self' is necessary so the page opens in current tab
      }).catch(error => {
          console.log('error registering the user');
      })
    }
  }
  
  return (
    <Form className="registration-form justify-content-md-center">
      <h1>Sign-up For An Account</h1>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter new username" onChange={e => setField('username', e.target.value)} isInvalid={!!errors.username}/>
        <Form.Control.Feedback type='invalid'>
          { errors.username }
        </Form.Control.Feedback>
      </Form.Group>
      <br></br>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter new password" onChange={e => setField('password', e.target.value)} isInvalid={!!errors.password}/>
        <Form.Control.Feedback type='invalid'>
          { errors.password }
        </Form.Control.Feedback>
      </Form.Group>
      <br></br>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email"  placeholder="Enter new email" onChange={e => setField('email', e.target.value)} isInvalid={!!errors.email}/>
        <Form.Control.Feedback type='invalid'>
          { errors.email }
        </Form.Control.Feedback>
      </Form.Group>
      <br></br>
      <Form.Group>
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" onChange={e=> setField('birthday',e.target.value)}/>
      </Form.Group>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
      <br></br>
      <Link to={`/`}>
        <Button className="go-to-login-button" variant="secondary" type="button">Existing User? Go to Login Page!</Button>
      </Link>
    </Form>
  );
}