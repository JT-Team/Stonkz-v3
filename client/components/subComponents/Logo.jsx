import React, { Component, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="logo-container">
            <img className="logo-img" src="https://cdn-icons-png.flaticon.com/512/5198/5198491.png"></img>
            <p id="logo-stonk">Stonk<span id="logo-z">Z</span></p>
            <img className="logo-img2" src="https://cdn-icons-png.flaticon.com/512/6067/6067145.png"></img>
        </div>
    )
}

export default Logo;