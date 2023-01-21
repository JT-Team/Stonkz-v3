import { React, StrictMode } from 'react'
import { createRoot } from 'react-dom'
import { Browser, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Settings from './components/Settings.jsx'
import Signup from './components/Signup.jsx'

//create root for react
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//render componenets to root
//renders different components based on route
root.render(
    <StrictMode>
        <BrowserRoute>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRoute>
    </StrictMode>
)