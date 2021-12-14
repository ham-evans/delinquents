import React, {useState} from 'react';
import "./Roadmap.css"

export default function Roadmap () { 
    const [showResults1, setShowResults1] = useState(false)
    const [showResults2, setShowResults2] = useState(false)
    const [showResults3, setShowResults3] = useState(false)
    const [showResults4, setShowResults4] = useState(false)
    const onClick1 = () => setShowResults1(!showResults1)
    const onClick2 = () => setShowResults2(!showResults2)
    const onClick3 = () => setShowResults3(!showResults3)
    const onClick4 = () => setShowResults4(!showResults4)
    return (
        <div className="roadmap" id="roadmap">
            <div className="titleWrapper">
                <h1>Roadmap</h1>
            </div>
            <div className="roadmap__initial">
                <p>10% Sold, we give away 2 Gold Founders coins to random holders.</p>
                <p>25% Sold, we give away 5 Delinkuents to random holders.</p>
                <p>50% Sold, we give away 1 ETH to 4 random holders.</p>
                <p>75% Sold, 5 random holders will get a canvas made of their owned Delinkuent of choice.</p>
                <p>90% Sold, Members gain access to all of our tattoo art to have their own work done.</p>
                <p>100% Sold, our member only merch store becomes active. Start planning Delinkuent Con/ Vegas party meet up.</p>
            </div>
            <div className="roadmap__postTitle">
                <h2>Post Launch Roadmap Q1 & Q2 2022</h2>
            </div>
            <div className="roadmap__wrapper">
                <div className="roadmap__group">
                    <div className="roadmap__individual" onClick={onClick1}>
                        <h4 className={showResults1 ? "roadmap__titleText  active" : "roadmap__titleText"}>Season Pass</h4>
                        <div className={showResults1 ? "roadmap__individualText  active" : "roadmap__individualText"}>
                            <p>The season pass will be an extension of the Crypto Delinkuents project which will launch on a quarterly basis. The season pass will feature a new character and a set of limited edition tattoos only available in that season.</p>
                            <p>Each season pass will guarantee 2 or more of the seasonal tattoos populate on your character along with existing tattoos from our launch.</p>
                        </div>
                        
                    </div>
                    <div className="roadmap__individual" onClick={onClick2}>
                        <h4 className={showResults2 ? "roadmap__titleText  active" : "roadmap__titleText"}>Season One of Season Pass</h4>
                        <div className={showResults2 ? "roadmap__individualText  active" : "roadmap__individualText"}>
                            <p>We will run a competition calling on the community to design tattoos to be featured in the season pass.</p>
                            <p>Winners will get an NFT of the new characters with all of the tattoos they designed.</p>
                            <p>Winners will get a canvas of their NFT.</p>
                        </div>
                    </div>
                </div>
                <div className="roadmap__group">
                    <div className="roadmap__individual" onClick={onClick3}>
                        <h4 className={showResults3 ? "roadmap__titleText  active" : "roadmap__titleText"}>Heists</h4>
                        <div className={showResults3 ? "roadmap__individualText  active" : "roadmap__individualText"}>
                            <p>The Crypto Delinkquents team wants to build a continuous relationship with our community through fun giveaway events called Heists.</p>
                            <p>Heists will be on a predetermined time frame TBD.</p>
                            <p>Each Heist will have unique parameters for eligibility. Examples of such parameters could be, but are not limited to: holding a specific character, number of characters, or trait.</p>
                            <p>At the end of each Heist, a snapshot of eligible participants will be used to award the prize pool.  Each Heist prize pool will consist of 38% of the commission earned from secondary market sales in the set time frame and will be given out in ETH to the eligible winners of the Heist.</p>
                            <p>Heists are not intended to be investment payouts and do not guarantee rewards for involvement in the Crypto Delinkuents project.</p>
                        </div>
                    </div>
                    <div className="roadmap__individual" onClick={onClick4}>
                        <h4 className={showResults4 ? "roadmap__titleText  active" : "roadmap__titleText"}>Tattoo Shop</h4>
                        <div className={showResults4 ? "roadmap__individualText  active" : "roadmap__individualText"}>
                            <p>Using coins you will be able to reroll your tattoos up to 5x.</p>
                            <p>Using coins you'll be able to send in your own tattoo designs for approval and we will put them on your character.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}