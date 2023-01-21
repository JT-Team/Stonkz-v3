import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <div className='login'>
      <div className='loginLeft'>
        <h4>IMAGE HERE</h4>
      </div>
      <div className='loginRight'>
        <div>
        </div>
        <Button variant='contained'>Hello World</Button>
      </div>
    </div>
  );
};

export default Login;
