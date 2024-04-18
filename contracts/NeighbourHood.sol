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

     struct Order{
        uint256 time;
        Item item;
    }

    // Save the Item to the blockchain after mapping unique id to each item
    //"items" can be accessed from frontend 
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount; //(address of buyer, orderCount received)
    mapping(address => mapping(uint256 => Order)) public allOrders; //(address of buyer, orderCount)

    // Call events
    event Buy(address buyer, uint256 orderId, uint256 itemId);
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
    function list(
        uint256 _id, 
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

    // ----------------------------------------2. Buy Products START ----------------------------------------------------------------
    function buy(uint256 _id) public payable { //"payable" allows people send ethers to the smart contract which owner can access
        //Fetch an item
        Item memory item = items[_id];

        //@TOADD
        // Require enough ether to buy item
        require(msg.value >= item.cost);

        // Require item is in stock
        require(item.stock > 0);

        // Create an order 
        Order memory order = Order(block.timestamp, item);

     
        // Add order for user
        orderCount[msg.sender]++;
        // Save order to chain 
        allOrders[msg.sender][orderCount[msg.sender]] = order;
        

        // Receive Notifcation 

        // Deduct Crypto 
        items[_id].stock = item.stock - 1;
        // Emit Event 
        emit Buy(msg.sender, orderCount[msg.sender], item.id);

    }

    // ----------------------------------------3. Withdraw funds START------------------------------------------------
    
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
    

    
}
