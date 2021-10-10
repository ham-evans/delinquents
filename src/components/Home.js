import React, { useState } from 'react'; 
import './Home.css'
import './Mint.css'
import logo from '../images/logo.png'
import animationGif from '../images/Animation_GIF_Silver.gif'

export default function Home () { 
    const [mintPage, setMintPage] = useState(false)
    const [howMany, setHowMany] = useState(1)
    const signedIn = useState(false)
    const numMinted = useState(0)
    const onClick = () => setMintPage(!mintPage)

    function checkHowMany (newNumber) { 
        if (newNumber > 20) {
            setHowMany(20)
        } else if (newNumber < 1) { 
            setHowMany("")
        } else { 
            setHowMany(newNumber) 
        }
    }

    const returnInitial = <div className="home" id="#home">
                            <div className="homeBg">
                                <div className="home__imgWrapper">
                                    <img className="home__logo" src={logo} alt="Logo"/>
                                </div>
                                <div className="home__buttonWrapper" onClick={onClick}> 
                                    <button className="home__button">MINT A DELinkUENT</button>
                                </div>
                            </div>
                        </div>;

    const returnMint = <div className="mint" id="#home">
        <div className="mintBg">
            <div className="mint__imgWrapper">
                <img className="mint__logo" src={animationGif} alt="Logo"/>
            </div>
            <div className="mint__textWrapper"> 
                <div className="mint__buttonWrapper">
                    {signedIn ? <button className="mint__button">Connect Wallet</button> : <button className="mint__button">Wallet Connected<br /> Click to Sign Out</button>}
                </div>
                <p className="mint__text">Number of Founders Tokens Minted: {numMinted} / 2000<br />Input Number of Founder Tokens to Mint:</p>
                <div className={signedIn ? "mint__signIn-input" : "mint__signIn-input-false"}>
                    <input 
                        type="number" 
                        min="1"
                        max={10}
                        value={howMany}
                        onChange={ e => checkHowMany(e.target.value) }
                        name="" 
                    />
                </div>
                <div className="mint__buttonWrapper">
                    <button className="mint__button">MINT A FOUNDERS TOKEN</button>
                </div>
            </div>
        </div>
    </div>
    
    return (
        <div>
            {mintPage ? returnMint : returnInitial}
        </div>
        
    );
}