import React from 'react';
import "./About.css";
import about1 from '../images/about1.png'
import about2 from '../images/about2.png'
import about3 from '../images/about3.png'
import about4 from '../images/about4.png'
import pattern from '../images/pattern.png';

export default function About () {
    return (
        <div className="about" id="project" style={{ backgroundImage: `url(${pattern})` }}>
            <div className="about__imgContainer">
                <div className="about__wrapper">
                    <div className="about__group" >
                        <img className="about__imgIndividual" src={about1} alt="GATB Example"/>
                        <img className="about__imgIndividual" src={about2} alt="GATB Example"/>
                    </div>
                    <div className="about__group" >
                        <img className="about__imgIndividual" src={about4} alt="GATB Example" />
                        <img className="about__imgIndividual" src={about3} alt="GATB Example" />
                    </div>
                </div>
            </div>
            <div className="about__container"  >
                <h1>About Giraffes At The Bar</h1> 
                <p>Giraffes At The Bar is a collection of 2500 Drunken Giraffe NFTs living on the Ethereum blockchain. Each Giraffe NFT is uniquely generated from a pool of 160+ different traits, listed under 8 categories, all of varying rarities! There is also a ‘Custom Giraffe’ series including 5 exclusive pieces of Giraffe art!</p>
                <p>Apart from showcasing our unique art style, the main goal of Giraffes at the Bar is to create value for all Giraffe NFT owners, who will be able to reap the rewards from the future utility provided by the team (see our roadmap). At the heart of our project is a desire to grow an inclusive and thriving community.</p>
            </div>
        </div>
    );
}
