import React, { Component, useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';

const Signup = (props) => {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');


  return (
    <div className='login'>
      <div className='loginLeft'>
        <h4>IMAGE HERE</h4>
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
          color = 'success'
          onClick={() => {
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