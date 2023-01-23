import React, { Component, useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { TextField } from '@mui/material';

const useIsBoxChecked = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return { isChecked, turnIsCheckedOn: () => setIsChecked(true) };
};

const Login = (props) => {
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');

  // const [loggedInState, updateLoggedIn] = useState(loggedInState);
  // const currentUser = useCurrentUser(); // This doesn't actually exist

  const [loggedIn, updateLoggedIn] = useState(false);

  // const [isChecked, setIsChecked] = useState(false);
  // const turnIsCheckedOn = () => setIsChecked(true);

  const { isChecked, turnIsCheckedOn } = useIsBoxChecked();

  const loggedInCheckboxOnChange = (loggedIn) => {
    updateLoggedIn(loggedIn);
    //  updateLoggedIn(previousLoggedInState => ({...previousLoggedInState, loggedIn: loggedIn}));
  };

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
              onChange={(e) => {updateUsername(`${e.target.value}`)}}
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
              onChange={(e) => {updatePassword(`${e.target.value}`)}}
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
          onClick={() => {
            alert(`submitting username ${username} and password ${password}` )
            props.updateUserInfo(true);
            console.log(props.userInfo);
          }}
        >
          Login
        </Button>

        <div>
          <div>{`My checkbox is ${isChecked ? 'on' : 'off'}`}</div>
          <button onClick={turnIsCheckedOn}>Turn on checkbox</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
