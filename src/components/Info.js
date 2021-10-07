import React from 'react';
import "./Info.css";
import info from '../images/info.png'

import pattern from '../images/pattern.png';

export default function Info () {
    return (
        <div className="info" id="info" style={{ backgroundImage: `url(${pattern})` }}>
            <div className="info__imgContainer">
                <img className="info__imgIndividual" src={info} alt="GATB Logo"/>
            </div>
            <div className="info__container"  >
                <h1>GATB Information</h1> 
                <ul>
                    <li>
                        Presale: SOLD OUT
                    </li>
                    <li>
                        Main Drop: Saturday 18th of September 10am PT
                    </li>
                    <li>
                        Total number of Giraffe NFTs: 2500
                    </li>
                    <li>
                        Total number of Giraffe NFTs withheld: 55 (giveaways and team)
                    </li>
                    <li>
                        Price per NFT: 0.055 ETH + gas
                    </li>
                    <li>
                        Token type: ERC-721
                    </li>
                    <li>
                        Blockchain: Ethereum
                    </li>
                    <li>
                        File hosting: IPFS
                    </li>
                    <li>
                        Smart contract: <span className="contractAddy">0xccb754B5D99f41397B13bEc72e0015D7bb2aB63E</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
