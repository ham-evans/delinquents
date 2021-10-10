import React from 'react';
import "./Images.css";
import shark from '../images/sharkTransparent.png'
import gorilla1 from '../images/gorilla1.png'
import gorilla2 from '../images/gorilla2.png'
import shark1 from '../images/shark1.png'
import shark2 from '../images/shark2.png'
import sphynx1 from '../images/sphynx1.png'
import sphynx2 from '../images/sphynx2.png'


export default function Images () {
    return (
        <div className="images" id="images">
            <div className="images__wrapper">
                <img className="images__imgIndividual" src={gorilla1} alt="Shark Example"/>
                <img className="images__imgIndividual" src={shark2} alt="Shark Example"/>
                <img className="images__imgIndividual" src={sphynx2} alt="Shark Example"/>
                <img className="images__imgIndividual" src={shark1} alt="Shark Example"/>
            </div>
        </div>
    );
}
