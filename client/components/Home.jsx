import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


const Home = () => {
  const nav = useNavigate()
  return (
    <div>
      <div>
        <h5>home</h5>
      </div>
      <div>
        <Button variant='contained' onClick= {() => nav('/login')}>Go to login</Button>
      </div>
    </div>
  );
};

export default Home;
