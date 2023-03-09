import React, { Component, useState, useEffect, useReducer } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';
import Logo from './subComponents/Logo.jsx';
// Would you take a look at these imports! 


const Login = (props) => {
  //State for the username and password fields! 
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  // Hello, the cookies for this project aren't really working, so good you'll need to work through to implement this! We are sorry we couln't get this to work :/
  const [cookie, setCookie] = useState('')

  //check react router documentation for the useNavigate functionality! 
  const nav = useNavigate(); 


  return (
    <div className='login'>
      <div className='loginLeft'>
      <img src='https://i1.sndcdn.com/artworks-Ah8muzacEagyyJ7a-66nauA-t500x500.jpg' alt="Logo" />
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
          color ='success'
          onClick={async () => {
            const url = 'http://localhost:3000/login'
            const loginData = {username: username, password: password};
            const loginStatus = await fetch(url, {
              method: 'POST',
              mode: 'cors',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(loginData),
            });
            const parsedLoginStatus = await loginStatus.text()
            console.log(parsedLoginStatus); 
            if (parsedLoginStatus === 'success') {
              props.updateUserInfo({username: username, password: password, authenticated: true});
              nav('/')
            } else {
              alert(`Invalid username ${username} and password ${password} - user not found`);
              
            }

            updateUsername('');
            updatePassword('');
            console.log(props.userInfo);
          }}
        >
          Login
        </Button>
        <div>
      <Button
      onClick = {() => nav('/signup')}
      >Don't have an account? Sign Up!</Button>
      </div>
      </div>
      
    </div>
  );
};

// if you're confused about anything here ask team tassled wobbegong for help :) 

export default Login;