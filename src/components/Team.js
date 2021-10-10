import React, { useState } from 'react';
import "./Team.css";
import apollo21 from '../images/sharkTransparent.png'
import squeebo from '../images/sharkTransparent.png'
import goldenx from '../images/sharkTransparent.png'
import shiltoshi from '../images/Shiltoshibio.png'
import ty from '../images/TYbio.png'
import Inkster from '../images/Inkster_66Bio.png'

export default function Team () {
    const [showResults1, setShowResults1] = useState(false)
    const [showResults2, setShowResults2] = useState(false)
    const [showResults3, setShowResults3] = useState(false)
    const onClick1 = () => setShowResults1(!showResults1)
    const onClick2 = () => setShowResults2(!showResults2)
    const onClick3 = () => setShowResults3(!showResults3)
    return (
        <div className="team" id="team">
            <div className="team__container">
                <h1>The Team</h1> 
            </div>
            <div className="team__imgContainer">
                <div className="team__group">
                    <div className="team__imgIndividual" onClick={onClick1}>
                            <img src={shiltoshi} alt="Developer" />
                            <figcaption className="caption">Shiltoshi</figcaption>
                            <div>
                                {showResults1 ? <p className="team__aboutTitle">About:</p> : <p className="team__aboutTitle active">About:</p>}
                                {showResults1 ? <p>TA wizard and diamond  hand degen. The only thing I HODL harder than crypto and NFT’s is beer. I'm here to make a community first and art second. My DMs are open tell your mom.</p> : <p></p>}
                            </div>
                        </div>
                    <div className="team__imgIndividual" onClick={onClick2}>
                        <img src={Inkster} alt="Developer" />
                        <figcaption className="caption">Inkster_66</figcaption>
                        <div >
                            {showResults2 ? <p className="team__aboutTitle">About:</p> : <p className="team__aboutTitle active">About:</p>}
                            {showResults2 ? <p>Newer to the blockchain, crypto and NFT space just trying to HODL. Aspiring digital artist trying to blend it like Beckham. WGMI.</p> : <p></p>}
                        </div>
                    </div>
                    <div className="team__imgIndividual" onClick={onClick3}>
                        <img src={ty} alt="Developer" />
                        <figcaption className="caption">Ty</figcaption>
                        <div >
                            {showResults3 ? <p className="team__aboutTitle">About:</p> : <p className="team__aboutTitle active">About:</p>}
                            {showResults3 ? <p>I’m a business builder and a success junkie at heart. I love basketball, even though I'm built like Frodo Baggins I can drain 3’s like your girl drains your bank account. NBA Top Shot got me started in NFTs and Shiltoshi got me to love jpegs of animals. I probably have more children than you have NFTs.</p> : <p></p>}
                        </div>
                    </div>
                </div>
                <div className="team__group">
                    <div className="team__imgIndividual">
                        <img src={squeebo} alt="Developer Squeebo"/>
                        <figcaption className="caption">Squeebo</figcaption>
                        <p>Contract Developer</p>
                    </div>
                    <div className="team__imgIndividual">
                        <img src={apollo21} alt="Developer Apollo 21"/>
                        <figcaption className="caption">Apollo 21</figcaption>
                        <p>Web Developer</p>
                    </div>
                    <div className="team__imgIndividual">
                        <img src={goldenx} alt="Developer GoldenX"/>
                        <figcaption className="caption">GoldenX</figcaption>
                        <p>Developer</p>
                    </div>
                </div>
            </div>
        </div>
    
    );
}
