import React, { Component, useState, useEffect, useReducer } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';
//import stonksImg from '../assets/stonkz.jpeg'
const Login = (props) => {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');

  const nav = useNavigate(); 

  return (
    <div className='login'>
      <div className='loginLeft'>
      {/* <img src={stonksImg} alt="Logo" /> */}
      </div>
      <div className='loginRight'>
        <div className='formControl'>
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
            const url = 'http://localhost:3000/register'
            const loginData = {username: username, password: password};
            const loginStatus = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(loginData),
            });
            const parsedLoginStatus = await loginStatus.text()
            console.log(parsedLoginStatus); 
            if (parsedLoginStatus === 'success') {
              props.updateUserInfo({username: username, password: password, authenticated: true});
              nav('/')
            } else {
              alert(`submitting username ${username} and password ${password} - user not found`);
            }

           

            // props.updateUserInfo((prevState) => {
            //   return { ...prevState, username: username, password: password };
            // });
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

export default Login;
