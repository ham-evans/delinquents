
import React, { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector }    from "@web3-react/walletlink-connector";

import './MintHome.css';
import Giraffe from '../artifacts/contracts/GiraffesAtTheBar.sol/GiraffesAtTheBar.json';
import { ethers } from 'ethers';
import Modal from './Modal.js';

import EthereumSession from '../lib/eth-session.js';


const mainnetConfig = {
    'CONTRACT': '0xccb754b5d99f41397b13bec72e0015d7bb2ab63e',
    'CHAIN_ID':  1,
    'RPC_URL':   'https://mainnet.infura.io/v3/e08f25d6cba1481a8ea2cd2eb30fd267',
    'ABI':       Giraffe.abi
}

/*
const rinkebyConfig = {
    'CONTRACT': '0x3f2a3678F8b818dA8888F1dF0c4FE7d5C3AA5dc5',
    'CHAIN_ID':  4,
    'RPC_URL':   'https://rinkeby.infura.io/v3/e08f25d6cba1481a8ea2cd2eb30fd267',
    'ABI':       Giraffe.abi
}
*/

const config = mainnetConfig;

const CONNECTORS = {};
CONNECTORS.Walletlink = new WalletLinkConnector({
    url: config.RPC_URL,
    appLogoUrl: null,
    appName: "Giraffes At The Bar",
});

CONNECTORS.WalletConnect = new WalletConnectConnector({
    supportedChainIds: [config.CHAIN_ID],
    rpc: config.RPC_URL,
});

const sleep = ms => new Promise(( resolve, reject ) => setTimeout( resolve, ms ));

export default function MintHome () {
    const context = useWeb3React();
    const saleMintMax = 20;

    const [signedIn, setSignedIn] = useState(false);
    const [walletAddress, setWalletAddress] = useState(null);
    let [giraffeContract, setGiraffeContract] = useState(null);
    const [giraffeWithSigner, setGiraffeWithSigner] = useState(null);
    const [paused, togglePause] = useState(true);
    const [totalMinted, setTotalMinted] = useState(0);
    const [giraffePrice, setGiraffePrice] = useState(0);
    const [howManyGiraffes, setHowManyGiraffes] = useState(20)

    const [modalShown, toggleModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const ethereumSession = useMemo(() => {
        if( window.ethereum ){
            const session = new EthereumSession({
                chain:           EthereumSession.COMMON_CHAINS[ config.CHAIN_ID ],
                contractAddress: config.CONTRACT,
                contractABI:     config.ABI
            });
            //session.connectEthers();
            return session;
        }
        else{
            return null;
        }
    },[]);

    useEffect(() => { 
        if( window.ethereum ){
            ethereumSession.connectEthers()
                .then(() => loadContractData())
                .then(() => {
                    setSignedIn( true );
                    setWalletAddress( ethereumSession.wallet.accounts[0] );
                })
                .catch( err => {
                    if( err.code === "CALL_EXCEPTION" ){
                        //we're on the wrong chain
                        console.log("yup")
                    }
                    else{
                        debugger
                    }
                })
        }
    }, []);

    async function connectProvider( connector ){
        context.activate( connector, async (err) => {
          //other connectors
          if( err.code === 4001 ){
            //WalletLink: User denied account authorization
            console.debug( err.message );
            return;
          }
          else if( err.name === 'UserRejectedRequestError' ){
            //WalletConnect: The user rejected the request
            console.debug( err.message );
            return;
          }
          else{
            console.warn( err.message );
          }
        });
    }

    function redirect( to ){
        if( to === 'metamask' ){
            const link = 'https://metamask.app.link/dapp/'+ window.location.href.substr( 8 );
            window.location = link;
        }
        else if( to === 'trustwallet' ){
            const link = 'https://link.trustwallet.com/open_url?coin_id=60&url='+ window.location.href;
            window.location = link;
        }
    }

    async function signIn() { 
        if ( !window.ethereum ) {
            setErrorMessage(<div id="providers">
                <p>No Ethereum interface injected into browser.<br />Other providers:</p>
                <ul>
                    <li onClick={() => connectProvider( CONNECTORS.Walletlink )}>&bull; Coinbase Wallet</li>
                    <li onClick={() => redirect( 'metamask' )}>&bull; MetaMask</li>
                    <li onClick={() => redirect( 'trustwallet' )}>&bull; Trust Wallet</li>
                    <li onClick={() => connectProvider( CONNECTORS.WalletConnect )}>&bull; WalletConnect</li>
                </ul>
            </div>);
            toggleModal(true);
            return;
        }

        try{
            let curChain = await ethereumSession.getWalletChainID();
            await ethereumSession.connectEthers( true );
            if( curChain != ethereumSession.chain.hex ){
                curChain = await ethereumSession.getWalletChainID();
                if( curChain === ethereumSession.chain.hex ){
                    //force the browser to switch to the new chain
                    window.location.reload();
                    return;
                } else {
                    setErrorMessage( `Switch network to the ${ethereumSession.chain.name} before continuing.`)
                    toggleModal(true);
                    return;
                }
            }

            const accounts = ethereumSession.wallet.accounts;
            if (accounts && accounts.length > 0) {
                setWalletAddress(accounts[0])
                setSignedIn(true)
                await loadContractData()
            } else {
                setSignedIn(false)
            }
        }
        catch( error ){
            alert( error );
            if (error.code === 4001) {
                setErrorMessage("Sign in to mint Giraffes!")
                toggleModal(true);
            } else { 
                setErrorMessage(error)
                toggleModal(true);
            }
        }
    }

    async function signOut() {
        setSignedIn(false)
    }

    async function loadContractData () {
        if( !window.ethersProvider ){
            window.ethersProvider = ethereumSession.ethersProvider;
        }

        if( !giraffeContract ){
            giraffeContract = ethereumSession.contract;
            if( !giraffeContract ){
                setGiraffeContract(giraffeContract);
            }
        }

        const signer = window.ethersProvider.getSigner()
        const giraffeWithSigner = giraffeContract.connect(signer)
        const salebool = await giraffeContract.paused();
        const totalMinted = String(await giraffeContract.totalSupply());
        const giraffePrice = await giraffeContract.price();

        setGiraffeWithSigner(giraffeWithSigner);
        togglePause(salebool);
        setTotalMinted(totalMinted);
        setGiraffePrice(giraffePrice);
    }

    async function mintGiraffe () { 
        if (!signedIn || !giraffeWithSigner){
            setErrorMessage("Please connect wallet or reload the page!")
            toggleModal(true);
            return
        }

        if( paused ){
            setErrorMessage("Sale is not active yet.  Try again later!")
            toggleModal(true);
            return;
        }

        if( !(await ethereumSession.connectAccounts( true )) ){
            setErrorMessage("Please unlock your wallet and select an account.")
            toggleModal(true);
            return;
        }

        if( !(await ethereumSession.connectChain( true )) ){
            setErrorMessage(`Please open your wallet and select ${ethereumSession.chain.name}.`);
            toggleModal(true);
            return;
        }

        if ( ethereumSession.chain.hex != await ethereumSession.getWalletChainID() ){
            window.location.reload();
            return;
        }

        //connected
        try{
            const price = String(giraffePrice  * howManyGiraffes)

            const overrides = {
                from: walletAddress, 
                value: price
            }

            const gasBN = await ethereumSession.contract.estimateGas.mint(howManyGiraffes, overrides);
            const finalGasBN = gasBN.mul( ethers.BigNumber.from(11) ).div( ethers.BigNumber.from(10) );
            overrides.gasLimit = finalGasBN.toString();

            await giraffeWithSigner.mint(howManyGiraffes, overrides)
            setMintingSuccess(howManyGiraffes)
        } catch (error) {
            if (error.error) {
                setMintingError(error.error.message)
            } 
        }
    }

    const setMintingSuccess = (howManyGiraffes) => {
        setErrorMessage("Congrats on minting " + howManyGiraffes + " Giraffes!!");
        toggleModal(true);
    }

    const setMintingError = (error) => {
        setErrorMessage(error);
        toggleModal(true);
    }

    function checkHowMany (newNumber) { 
        if (newNumber > 20) {
            setHowManyGiraffes(20)
        } else if (newNumber < 1) { 
            setHowManyGiraffes("")
        } else { 
            setHowManyGiraffes(newNumber) 
        }
    }

    const mintOne = () => { 
        setErrorMessage("Must mint atleast one Giraffe!")
        toggleModal(true);
    }

    const paraText = signedIn ? "Input number of Giraffes to mint (max 20): " : "Sign in above to mint Giraffes!"

    return (
        <div id="#home">
            <div className="minthomeBg" />
            <div className="minthome__container">
                <div className="minthome__info">
                    <div className="minthome__signIn"> 
                        {!signedIn ? <button onClick={signIn}>Connect Wallet</button>
                            : <button onClick={signOut}>Wallet Connected<br /> Click to sign out</button>
                        }
                    </div>
                    
                    <p>{paraText}</p>
                    
                    <div className={signedIn ? "minthome__signIn-input" : "minthome__signIn-input-false"}>
                        <input 
                            type="number" 
                            min="1"
                            max={saleMintMax}
                            value={howManyGiraffes}
                            onChange={ e => checkHowMany(e.target.value) }
                            name="" 
                        />
                    </div>
                    
                    <br/>
                    
                    <div className={signedIn ? "minthome__mint" : "minthome__mint-false"}>
                        {howManyGiraffes > 0 ? <button onClick={() => mintGiraffe()}>MINT {howManyGiraffes} GIRAFFES!</button>
                            : <button onClick={() => mintOne()}>MINT {howManyGiraffes} GIRAFFES!</button>
                        }
                    </div>
                </div>
            </div>

            <Modal
                shown={modalShown}
                close={() => {
                    toggleModal(false);
                }}
                message={errorMessage}
            ></Modal>
        </div>
    );
}