import React, { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector }    from "@web3-react/walletlink-connector";

import ContractAbi from '../artifacts/contracts/Contract.sol/FoundersCoinMainnet.json';
import Modal from './Modal.js';
import './Founders.css'

import { ethers } from 'ethers';
import logo from '../images/logo.png'
import animationGif from '../images/Animation_GIF_Silver.gif'

import EthereumSession from '../lib/eth-session.js';


const mainnetConfig = {
    'CONTRACT': '0x219f7208EB298bF52db2b796fB79B73961ebF61E',
    'CHAIN_ID':  1,
    'RPC_URL':   'https://mainnet.infura.io/v3/be0168ea214b4489b69e0787ca0d13e0',
    'ABI':       ContractAbi
}

/*
const rinkebyConfig = {
    'CONTRACT': '0x8b4300209B534d69c42A02c31576b189AF61A41F',
    'CHAIN_ID':  4,
    'RPC_URL':   'https://rinkeby.infura.io/v3/be0168ea214b4489b69e0787ca0d13e0',
    'ABI':       ContractAbi.abi
}*/

const config = mainnetConfig;

const CONNECTORS = {};
CONNECTORS.Walletlink = new WalletLinkConnector({
    url: config.RPC_URL,
    appLogoUrl: null,
    appName: "Crypto Delinkuents",
});

CONNECTORS.WalletConnect = new WalletConnectConnector({
    supportedChainIds: [config.CHAIN_ID],
    rpc: config.RPC_URL,
});

export default function Founders () { 
    const context = useWeb3React();
    
    const [walletAddress, setWalletAddress] = useState(null);

    const signedIn = !!walletAddress;

    const [contractWithSigner, setContractWithSigner] = useState(null);
    const [isLocked, togglePause] = useState(true);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [howManyTokens, setHowManyTokens] = useState(6)
    const [totalSupply, setTotalSupply] = useState(0);

    const [modalShown, toggleModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const ethereumSession = useMemo(() => {
        if( window.ethereum ){
            const session = new EthereumSession({
                chain:           EthereumSession.COMMON_CHAINS[ config.CHAIN_ID ],
                contractAddress: config.CONTRACT,
                contractABI:     config.ABI
            });
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
                    if( ethereumSession.hasAccounts() )
                        setWalletAddress( ethereumSession.wallet.accounts[0] );
                })
                .catch( err => {
                    if( err.code === "CALL_EXCEPTION" ){
                        //we're on the wrong chain
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
            if( curChain !== ethereumSession.chain.hex ){
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

            if (ethereumSession.hasAccounts()) {
                setWalletAddress(ethereumSession.wallet.accounts[0])
                await loadContractData()
            }
        }
        catch( error ){
            if (error.code === 4001) {
                setErrorMessage("Sign in to mint Founders Coins!")
                toggleModal(true);
            } else { 
                setErrorMessage(error)
                toggleModal(true);
            }
        }
    }

    async function signOut() {
        setWalletAddress(null)
    }

    async function loadContractData () {
        const contract = ethereumSession.contract;
        const signer = ethereumSession.ethersProvider.getSigner();
        const contractWithSigner = contract.connect(signer)
        const salebool = await contract.isLocked();
        const tokenPrice = await contract.price();
        const totalSupplyInit = await contract.totalSupply();
        
        setContractWithSigner(contractWithSigner);
        togglePause(salebool);
        setTokenPrice(tokenPrice);
        setTotalSupply(totalSupplyInit.toNumber())
    }

    async function mint () { 
        if (!signedIn || !contractWithSigner){
            setErrorMessage("Please connect wallet or reload the page!")
            toggleModal(true);
            return
        }

        if( isLocked ){
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

        if ( ethereumSession.chain.hex !== await ethereumSession.getWalletChainID() ){
            window.location.reload();
            return;
        }

        //connected
        try{
            const price = String(tokenPrice  * howManyTokens)

            const overrides = {
                from: walletAddress, 
                value: price
            }

            const gasBN = await ethereumSession.contract.estimateGas.mint(howManyTokens, overrides);
            const finalGasBN = gasBN.mul( ethers.BigNumber.from(11) ).div( ethers.BigNumber.from(10) );
            overrides.gasLimit = finalGasBN.toString();

            const txn = await contractWithSigner.mint(howManyTokens, overrides)
            await txn.wait();
            setMintingSuccess(howManyTokens)
        } catch (error) {
            if (error.error) {
                setMintingError(error.error.message)
            } 
        }
    }

    const setMintingSuccess = (howManyTokens) => {
        setErrorMessage("Congrats on minting " + howManyTokens + " Founders Coins!!");
        toggleModal(true);
    }

    const setMintingError = (error) => {
        setErrorMessage(error);
        toggleModal(true);
    }

    const mintOne = () => { 
        setErrorMessage("Must mint atleast one Founders Coin!")
        toggleModal(true);
    }

    function checkHowMany (newNumber) { 
        if (newNumber > 6) {
            setHowManyTokens(6)
        } else if (newNumber < 1) { 
            setHowManyTokens("")
        } else { 
            setHowManyTokens(newNumber) 
        }
    }

    const returnMint = <div className="founders" >
                            <div className="foundersBg">
                                <div className="founders__imgWrapper">
                                    <img className="founders__logo" src={animationGif} alt="Logo"/>
                                </div>
                                <div className="founders__textWrapper"> 
                                    <div className="founders__buttonWrapper" >
                                        {signedIn ? <button className="founders__button" onClick={() => signOut()}>Wallet Connected To Founders Coins<br /> Click to Sign Out</button> : <button className="founders__button" onClick={() => signIn()}>Connect Wallet To Founders Coins</button>}
                                    </div>
                                    <p className="founders__text">Number of Founders Coins Minted: {totalSupply} / 2000<br />Input Number of Founder Coins to Mint (0.04 ETH):</p>
                                    <div className={signedIn ? "founders__signIn-input" : "founders__signIn-input-false"}>
                                        <input 
                                            type="number" 
                                            min="1"
                                            max={10}
                                            value={howManyTokens}
                                            onChange={ e => checkHowMany(e.target.value) }
                                            name="" 
                                        />
                                    </div>
                                    <div className="founders__buttonWrapper">
                                        {howManyTokens > 0 ? <button className="founders__button" onClick={() => mint()}>MINT {howManyTokens} FOUNDERS COIN(S)</button> : <button className="mint__button" onClick={() => mintOne()}>MINT {howManyTokens} FOUNDERS COINS(S)</button>}
                                        
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

    return (
        <div id="#founder">
            { returnMint }
        </div>
    );
}