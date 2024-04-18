// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NeighbourHood {
    //state variable: written onto the blockchain
    address public owner; // the person who owns the store (who can see the funds of purchases)
    // save the funds information to the wallet

    struct Item{
        uint256 id;
        string name;
        string  category;
        string  image;
        uint256 cost;
        uint256 rating;
        uint256 stock;

    }

    // Save the Item to the blockchain after mapping unique id to each item
    //"items" can be accessed from frontend 
    mapping(uint256 => Item) public items;

    event List (string name, uint256 cost, uint256 quantity);
    modifier onlyOwner(){
        require(msg.sender == owner); // if the address is the owner (who owns this smart contract)
        _;
    }

    constructor(){
        owner = msg.sender; // the person deploying the contract to blockchain
    }


    // Functionalities this smart contract will have:
    // ----------------------------------------1. List products ------------------------------------------------
    function list(uint256 _id, 
        string memory _name,
        string memory _category,
        string memory _image, // images are stored on ipfs, we store url of images on blockchain
        uint256 _cost,
        uint256 _rating,
        uint256 _stock // in stock | Out of Stock
    ) public onlyOwner(){
        //Set a condition before this function executes (True will continue running, False will stop)
        

        // Create Item Struct 
        Item memory item = Item(_id,_name,_category,_image,_cost,_rating,_stock);

        // Save Item Struct to blockchain 
        items[_id] = item;

        // Emit an event (for notifications, or log use)
        emit List(_name, _cost, _stock);


    }

    // ----------------------------------------2. Buy Products START ------------------------------------------------
    function buy(uint256 _id) public {
        // Create an order 

        // Receive Notifcation 

        // Deduct Crypto 

        // Emit Event 


        // Receive Crypto 

        // Create an order 


    }

    // ----------------------------------------3. Withdraw funds START------------------------------------------------
    
    
    

    
}
