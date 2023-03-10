import React, { Component, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate, Outlet } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Settings from './components/Settings.jsx'
import Signup from './components/Signup.jsx'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

//creating a private routes wrapper that will aid in redirecting to the correct page (home or login page)
const PrivateRoutes = (props) => {
    console.log("this is windowLocalstorage in privateRoutes: " , window.localStorage.getItem('loggedIn'))
    let authentication =  window.localStorage.getItem('loggedIn')
    // let authentication = window.loocalStorage.getItem('loggedIn')
    return (
        authentication ? <Outlet/> : <Navigate to = '/login'/>
    )
}

//Creating a wrapper component for all routes and strict mode to hold state from top level
const App = () => {

  const [userInfo, updateUserInfo] = React.useState({username: undefined, password: undefined, authenticated: false}); 
  console.log('generating component from app');

  //set logged in to false initially

//   useEffect(() => {
//     console.log("in useEffect pre-cookie")
//     if (document.cookie) {
//       console.log('in useEffect and has document.cookie which is: ', document.cookie)
//       updateUserInfo({...userInfo, authenticated : true}) //
//     }
//   }, [])

    return (
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element = {<PrivateRoutes userInfo = {userInfo}/>}>
                    <Route index element={<Home />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/login" element={<Login userInfo = {userInfo} updateUserInfo = {updateUserInfo} ><div>This Is a test for Login Page</div></Login>}/>
                <Route path="/signup" element={<Signup userInfo = {userInfo} updateUserInfo = {updateUserInfo}/>} />
            </Routes>
        </BrowserRouter>
        </Provider>

    )
}


//create root for react


//render componenets to root
//renders different components based on route
root.render(<App/>)