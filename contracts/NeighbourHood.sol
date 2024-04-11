// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NeighbourHood {
    //state variable: written onto the blockchain
    string public name;
    address public owner;

    constructor(){
        name = "NeighbourHood";
        owner = msg.sender;
    }


}
