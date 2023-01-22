import React, { Component, useState, useEffect, useReducer} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { TextField} from '@mui/material';





const useIsBoxChecked = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return {isChecked, turnIsCheckedOn: () => setIsChecked(true)}
}


const Login = (props) => {
    const [username, updateUserName] = useState('');
    const [password, updatePassword] = useState('');




    // const [loggedInState, updateLoggedIn] = useState(loggedInState);
    // const currentUser = useCurrentUser(); // This doesn't actually exist 

    const [loggedIn, updateLoggedIn] = useState(false);

    // const [isChecked, setIsChecked] = useState(false);
    // const turnIsCheckedOn = () => setIsChecked(true);

    const {isChecked, turnIsCheckedOn} = useIsBoxChecked(); 

    const loggedInCheckboxOnChange = (loggedIn) => {
      updateLoggedIn(loggedIn)
      //  updateLoggedIn(previousLoggedInState => ({...previousLoggedInState, loggedIn: loggedIn})); 

    }


  return (
    <div className='login'>
      <div className='loginLeft'>
        <h4>IMAGE HERE</h4>
        <FormControl>
            
          <InputLabel htmlFor='my-input'>Email address</InputLabel>
          <Input id='my-input' aria-describedby='my-helper-text' />
          <FormHelperText id='my-helper-text'>
            This won't be shared with anyone!
          </FormHelperText>
          <TextField
            id='outlined-name'
            label='Username'
            value={'Test Input'}
            onChange={console.log('test1')}
          />
        </FormControl>
      </div>
      <div className='loginRight'>
        <div>
          
        </div>
        <form action='http://localhost:3000/user/add' method='POST'>
          <div>
            <label for='say'>First Name:</label>
            <input name='first_name' id='say' value='' />
          </div>
          <div>
            <label for='to'>Last Name:</label>
            <input name='last_name' id='to' value='' />
          </div>
          <div>
            <button>Add a user</button>
          </div>
        </form>
        <Button variant='contained' onClick={()=> {
            console.log('hello!')
            props.updateUserInfo(true);
            console.log(props.userInfo)}}>Hello World</Button>
      </div>
      <div> 
        <div>{`My checkbox is ${isChecked ? 'on' : 'off'}`}</div>
        <button onClick={turnIsCheckedOn}>Turn on checkbox</button>        
      </div>
    </div>
  );
};

export default Login;
