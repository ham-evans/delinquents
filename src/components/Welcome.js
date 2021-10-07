import React from 'react';
import "./Welcome.css";
import welcomeGif from '../images/GATB-website-gif.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

export default function Welcome () {
    return (
        <div className="welcome" id="Welcome">
            <div className="welcome__container">
                <h1>Welcome to Giraffes At The Bar</h1> 
                <p>A vibrant NFT community set in the ever-expanding metaverse. Purchase a Giraffe NFT to gain access to exclusive perks! Drop coming soon!</p>
                <button className="welcome__button"><a href="https://opensea.io/collection/giraffes-at-the-bar" target="_blank" rel="noreferrer" className="welcome__link">See the Giraffes on Opensea Here!</a></button>
                <div className="welcome-linksWrapper">
                    <Link className="welcome-links" to={{ pathname: "https://twitter.com/nftgiraffes" }} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                    <Link className="welcome-links" to={{ pathname: "https://discord.gg/32mr9hy6ZV" }} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faDiscord} />
                    </Link>
                </div>
            </div>
            <div className="welcome__imgContainer">
                <img src={welcomeGif} alt="Giraffe Gif"/>
            </div>
        </div>
    
    );
}
