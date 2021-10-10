import React from 'react';
import "./About.css";
import shark from '../images/sharkTransparent.png'


export default function About () {
    return (
        <div className="about" id="project">
            <div className="about__imgContainer">
                <img className="about__imgIndividual" src={shark} alt="Shark Example"/>
            </div>
            <div className="about__container"  >
                <h1>ABOUT CRYPTO DELinkUENTs</h1> 
                <p>Welcome to the Crypto DELinkUENTs, a collection of 6,666 unique tattooed degens living on the Etherium blockchain looking for their next score.</p>
                <p>The DELinkUENTs have been cast out of society and oppressed by the powers that be. The four DELinkUENTs (Kongvict, Mewpac, Swim Shady and Lilly-P) have formed a squad that devotes their existence to getting inked up and planning heists on the central banks. Squad up, ink up, score big!</p>
            </div>
        </div>
    );
}
