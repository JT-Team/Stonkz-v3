import React, { Component, useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';
import Logo from './subComponents/Logo.jsx';

const Signup = (props) => {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');

  const nav = useNavigate();

  return (
    <div className='login'>
      <div className='loginLeft'>
        <img src='https://media.makeameme.org/created/stonkz.jpg' alt="Logo" />
      </div>
      <div className='loginRight'>
        <div className='formControl'>
          <Logo />
          <FormControl>
            <InputLabel htmlFor='my-email'>Email</InputLabel>
            <Input
              onChange={(e) => {
                updateUsername(`${e.target.value}`);
              }}
              id='my-email'
              aria-describedby='my-helper-text'
              value={username}
            />
            <FormHelperText id='my-helper-text'>
              This won't be shared with anyone!
            </FormHelperText>
          </FormControl>
        </div>
        <div className='formControl'>
          <FormControl>
            <InputLabel htmlFor='my-pass'>Password</InputLabel>
            <Input
              type="password"
              onChange={(e) => {
                updatePassword(`${e.target.value}`);
              }}
              id='my-pass'
              aria-describedby='my-helper-text'
              value={password}
            />
            <FormHelperText id='my-helper-text'>
              You password also won't be shared!
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          variant='contained'
          color = 'success'
          onClick={async () => {

            const url = 'http://localhost:3000/register'
            const loginData = {username: username, password: password};
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(loginData),
            });
            const responseText = await response.text();
            if (responseText === 'success') {
              nav('/login');
            }

            alert(`submitting username ${username} and password ${password}`);
            props.updateUserInfo((prevState) => {
              return { ...prevState, username: username, password: password };
            });
            updateUsername('');
            updatePassword('');
            console.log(props.userInfo);
          }}
        >
          Sign Up
        </Button>
        
      </div>
      
    </div>
  );
};


export default Signup;