import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import './login-view.scss'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = () => {
    // e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Form className="login-form justify-content-md-center">
      <h1>User Login Page</h1>
      <Form.Label>
        Username:
        <input type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Label>
      <br></br>
      <Form.Label>
        Password:
        <input type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Label>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <br></br>
      <span className="login-span">New User?</span>
      <Button variant="secondary" type="button" onClick={() => props.onClick()}>Go to Registration Page</Button>
    </Form>
  );
}