// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/****************************************
 * @author: Squeebo                     *
 * @team:   The Golden X                *
 ****************************************
                ██▓                     
                ▓███▒                   
                ▓█████                  
                ███████                 
               ▓████████                
               ██████████               
              ▒██████████▓              
               ███████████              
              ▓███████████              
            ▒█████████████              
           ▒██████████████▓▒            
           ██████████████████           
          ▒███████████████████          
          ▓███████████████████▒         
          ▓███▓▓█████████▓▓███▒         
           ██    ███████▒   ▓█          
         ▓██  ██  █████▒ ██▓ ██▒        
        ███▓ ████ ▓████ ▓███ ▒███       
       ████▓ ████ █████ ▒███  ████      
       █████  ██  █████▒ ██  █████      
       ██████    ▓██████    ▒█████      
       ███████▒▒█████████▓▒██████▓      
     ▓█████████████████████████████▓    
    █████████████████████████████████   
   ▒███████████   ▒▒▒▒▒   ▓██████████▒  
   ████████████▓         ▓████████████  
   ██████████████▒     ▒██████████████  
   ███████████████████████████████████  
   ██████████ THE GOLDEN X ██████████▒  
   ▒█████████████████████████████████   
    ▓██████████████████████████████▒    
      ▓███▒      ▒▓▓███████████▓▒       
*****************************************/

import "../Blimpie/ERC721EnumerableB.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FoundersCoin is ERC721EnumerableB, Ownable, PaymentSplitter {
  using Strings for uint256;

  uint256 public TOTAL_SUPPLY    = 2100;

  bool public is_locked          = true;
  uint public price              = 0.04 ether;

  string private _baseTokenURI = 'https://www.website.com/gold.gif';
  string private _tokenURISuffix = '';

  address private _redeemer;
  mapping(uint => bool) private _redeemed;

  constructor( address[] memory payees, uint[] memory splits )
    ERC721B( "Founders Coin", "" )
    PaymentSplitter( payees, splits ){
  }

  modifier onlyRedeemer {
    require(_redeemer != address(0), "Invalid redeemer" );
    require(msg.sender == _redeemer);
    _;
  }

  //public
  function mint(uint256 quantity) public payable {
    uint256 balance = totalSupply();
    require( !is_locked,    "Sale is locked" );
    require( quantity <= 6, "Order too big"  );

    require( balanceOf( msg.sender ) + quantity <= 6, "Max per wallet is 6" );
    require( balance + quantity <= TOTAL_SUPPLY,      "Exceeds supply" );
    require( msg.value >= price * quantity,           "Ether sent is not correct" );

    for( uint256 i; i < quantity; ++i ){
      _safeMint( msg.sender, balance + i );
    }
  }

  /*
  //redeemer
  function redeem(address wallet) public onlyRedeemer{
    require(
  }
  */

  //onlyOwner
  function gift(uint256 quantity, address recipient) public onlyOwner {
    uint256 balance = totalSupply();
    require( balance + quantity <= TOTAL_SUPPLY, "Exceeds supply" );

    for(uint256 i; i < quantity; ++i ){
      _safeMint( recipient, balance + i );
    }
  }

  function setLocked(bool is_locked_) public onlyOwner {
    is_locked = is_locked_;
  }

  function setMaxSupply(uint maxSupply) public onlyOwner {
    require(maxSupply > totalSupply(), "Specified supply is lower than current balance" );
    TOTAL_SUPPLY = maxSupply;
  }

  function setPrice(uint256 newPrice) public onlyOwner {
    price = newPrice;
  }

  //metadata
  function setBaseURI(string memory baseURI, string memory suffix) public onlyOwner {
    _baseTokenURI = baseURI;
    _tokenURISuffix = suffix;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    return string(abi.encodePacked(_baseTokenURI, tokenId.toString(), _tokenURISuffix));
  }

  //external
  fallback() external payable {}
}