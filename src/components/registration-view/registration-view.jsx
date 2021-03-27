import React, { useState } from 'react';

import './registration-view.scss'

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = () => {
        //e.preventDefault();
        console.log(username, password, email, birthday);
        props.onLoggedIn(username)
    }
    
    return (
        <form>
          <h1>Registration Page</h1>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
          </label>
          <br></br>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </label>
          <br></br>
          <label>
            Email:
            <input type="email"  value={email} onChange={e => setEmail(e.target.value)}/>
          </label>
          <br></br>
          <label>
            Birthday:
            <input type="date" value={birthday} onChange={e=> setBirthday(e.target.value)}/>
          </label>
          <br></br>
          <button type="submit" onClick={handleSubmit}>Submit</button>
          <br></br>
          <button type="button" onClick={() => props.onClick()}>Go to Login Page</button>
        </form>
    );
}

