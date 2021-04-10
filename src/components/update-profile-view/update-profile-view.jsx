import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import './update-profile-view.scss';

export function UpdateProfileView(props) {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    let email = props.user.Email;
    let birthday = (props.user.Birthday.split('T'))[0];

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

    const onHandleChange = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        let username = localStorage.getItem('user');
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        } else { 
          axios({
          method: 'put',
          url: `https://flix-for-fun.herokuapp.com/users/${username}`,
          headers: { Authorization: `Bearer ${token}`},
          data: {
            Username: form.username,
            Password: form.password,
            Email: form.email,
            Birthday: form.birthday
          },
        }).then((res) => {
          this.setState({
            Username: res.data.Username,
            Password: res.data.Password,
            Email: res.data.Email,
            Birthday: res.data.Birthday,
          });
          this.changeVisibleButtons();
          localStorage.setItem('user', this.state.Username);
          window.location.reload()
        });
        }
    }

    return (
    <Form className="update-profile">
        <h1 className="new-info-span">Enter New Profile Information</h1>
        <Form.Group>
            <Form.Label className="update-label">Username</Form.Label>
            <Form.Control type="username" className="new-username" placeholder={localStorage.getItem('user')} disabled onChange={e => setField('username', e.target.value)} isInvalid={!!errors.username}/>
            <Form.Control.Feedback type='invalid'>
            { errors.username }
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <Form.Label className="update-label">Password</Form.Label>
            <Form.Control type="password" className="new-password" placeholder="Enter new password" onChange={e => setField('password', e.target.value)} isInvalid={!!errors.password}/>
            <Form.Control.Feedback type='invalid'>
            { errors.password }
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <Form.Label className="update-label">Email</Form.Label>
            <Form.Control type="email" className="new-email" value={email} onChange={e => setField('email', e.target.value)} isInvalid={!!errors.email}/>
            <Form.Control.Feedback type='invalid'>
            { errors.email }
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
            <Form.Label className="update-label">Birthday</Form.Label>
            <Form.Control type="date" className="new-birthday" value={birthday} onChange={e => setField('birthday', e.target.value)}/>
        </Form.Group>
        <Button variant="success" type="button" onClick={onHandleChange}>Update</Button>
    </Form>
    )
} 