import React from 'react';
import "./Team.css";
import gin from '../images/gin.png';
import beer from '../images/beer.png'
import apollo21 from '../images/Apollo21.png'
import squeebo from '../images/squeebo.png'
import goldenx from '../images/goldenx.png'
import bruno from '../images/bruno.png'
import manu from '../images/manu.png'

export default function Team () {
    return (
        <div className="team" id="team">
            <div className="team__container">
                <h1>About The Team</h1> 
                <p>The founders of this project are two Australians who contemplated opening a real-life bar. However, as constant lockdowns ruined traditional social life, they realised the potential of the metaverse and saw the chance to create a community within the NFT space.</p>
                <p>Giraffes At The Bar was born and is now a passionate venture, with a vision to create value for all giraffe owners and one day open the Giraffe Bar in the metaverse.</p>
            </div>
            <div className="team__imgContainer">
                <div className="team__imgIndividual">
                    <img src={manu} alt="Developer Chaz" />
                    <figcaption className="caption">Manu: Artist</figcaption>
                </div>
                <div className="team__imgIndividual">
                    <img src={bruno} alt="Developer Chaz" />
                    <figcaption className="caption">Bruno: Artist</figcaption>
                </div>
                <div className="team__imgIndividual">
                    <img src={gin} alt="Developer Chaz" />
                    <figcaption className="caption">Chaz (Gin Giraffe): Founder and Avid Gardener</figcaption>
                </div>
                <div className="team__imgIndividual">
                    <img src={beer} alt="Developer Tom"/>
                    <figcaption className="caption">Tom (Beer Giraffe): Founder and Fruit Enthusiast</figcaption>
                </div>
                <div className="team__imgIndividual">
                    <img src={goldenx} alt="Developer GoldenX"/>
                    <figcaption className="caption">GoldenX: Developer</figcaption>
                </div>
                <div className="team__imgIndividual">
                    <img src={squeebo} alt="Developer Squeebo"/>
                    <figcaption className="caption">Squeebo: Developer and Geek</figcaption>
                </div>
                <div className="team__imgIndividual">
                    <img src={apollo21} alt="Developer Apollo 21"/>
                    <figcaption className="caption">Apollo 21: Web Developer and Astronaut</figcaption>
                </div>
            </div>
        </div>
    
    );
}
