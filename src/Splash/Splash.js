import { useState, useEffect } from 'react'
import "../StyleAndImg/style.css";
import logo from "../StyleAndImg/logo2.png"
import sideText from "../StyleAndImg/homeSideText.png"
import NavBar from "../components/NavBar"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Splash = (props) => {

    return (
        <div className="page default-bg">
            <link rel="stylesheet" href="style.css" type="text/css" />

            <NavBar></NavBar>
            <div className='container'>
                <div className='row justify-content-md-center'>
                    <div className='col align-self-start'>
                        <div className="homePageSideText" style={{ animation: "fadeIn 0.5s" }}>
                            Discover, Share, and Explore Games from Various Studios
                        </div>
                    </div>
                    <div className='col'>
                    <div className='splash-logo'>
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            width: 300,
                            borderRadius: "50%",
                            animation: "glowIn 0.5s",
                            boxShadow: "0 0 20px rgba(81, 203, 238, 1)"
                        }}
                    />
                    </div>
                    <Link to="/games">
                        <div className="animated-button1">
                            <span />
                            <span />
                            <span />
                            <span />
                            Explore Games
                        </div>
                    </Link>

                    <Link to="/companies">
                        <div className="animated-button1">
                            <span />
                            <span />
                            <span />
                            <span />
                            Explore Game Companies
                        </div>
                    </Link>
                    <Link to="/genres">
                        <div className="animated-button1">
                            <span />
                            <span />
                            <span />
                            <span />
                            Explore Game Genres
                        </div>
                    </Link>
                    <br />
                    <br />
                    <Link to="/about">
                        <div className="animated-button">
                            <span />
                            <span />
                            <span />
                            <span />
                            About Us
                        </div>
                    </Link>
                    </div>
                    <div className='col align-self-end justify-items-center'>
                        <div className='homePageSideBox align-items-center'>
                        <Link to="/games">
                            <img src={sideText}
                            alt="side text"
                            style={{
                            width: 300,
                            height: 300,
                            margin: '20px',
                            }}></img>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash
