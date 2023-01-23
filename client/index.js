import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Settings from './components/Settings.jsx'
import Signup from './components/Signup.jsx'
import { Navigate, Outlet } from 'react-router-dom'



//creating a private routes wrapper that will aid in redirecting to the correct page (home or login page)
const PrivateRoutes = (props) => {
    let authentication = props.userInfo.authenticated;
    return (
        authentication ? <Outlet/> : <Navigate to = '/login'/>
    )
}

//Creating a wrapper component for all routes and strict mode to hold state from top level
const App = () => {

  const [userInfo, updateUserInfo] = React.useState({username: undefined, password: undefined, authenticated: false}); 
  console.log('generating component from app');


    return (
        <React.StrictMode>
             <BrowserRouter>
                <Routes>
                    <Route element = {<PrivateRoutes userInfo = {userInfo}/>}>
                        <Route index element={<Home />} />
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                    <Route path="/login" element={<Login userInfo = {userInfo} updateUserInfo = {updateUserInfo} ><div>This Is a test for Login Page</div></Login>} />
                    <Route path="/signup" element={<Signup userInfo = {userInfo} updateUserInfo = {updateUserInfo}/>} />
                 </Routes>
            </BrowserRouter>
    </React.StrictMode>
    )
}


//create root for react
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//render componenets to root
//renders different components based on route
root.render(<App/>)