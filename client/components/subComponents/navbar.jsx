import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx'

const Navbar = () => {
    return (
        <div className="navbar-container">
            <Logo />
            <div className="button-container">
                <button className="logout-btn btn">Log Out</button>
                <button className="settings-btn btn">&#9881;</button>
            </div>
        </div>
    )
}

export default Navbar;