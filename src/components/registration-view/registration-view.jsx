import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import './registration-view.scss'
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('https://flix-for-fun.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }).then(response => {
      const data = response.data;
      console.log(data)
      window.open('/', '_self'); // second argument '_self' is necessary so the page opens in current tab
    }).catch(error => {
        console.log('error registering the user');
    })
  }
  
  return (
    <Form className="registration-form justify-content-md-center">
      <h1>Registration Page</h1>
      <Form.Label>
        Username:
        <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)}/>
      </Form.Label>
      <br></br>
      <Form.Label>
        Password:
        <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Label>
      <br></br>
      <Form.Label>
        Email:
        <input type="email"  placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
      </Form.Label>
      <br></br>
      <Form.Label>
        Birthday:
        <input type="date" value={birthday} onChange={e=> setBirthday(e.target.value)}/>
      </Form.Label>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
      <br></br>
      <span className="registration-span">Existing User?</span>
      <Link to={`/`}>
        <Button variant="secondary" type="button">Go to Login Page</Button>
      </Link>
    </Form>
  );
}

