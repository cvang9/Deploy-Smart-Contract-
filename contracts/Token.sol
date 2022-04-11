// SPDX-License-Identifier: MIT
pragma solidity  >=0.5.0 < 0.9.0;

// Adding javascript in our Smart Contract by
// import "hardhat/console.sol";


contract Token{

string public name = "Hardhat Token";
string public symbol = "HDT";

address public owner;

uint public totalSupply = 10000;

mapping( address => uint ) balance;

constructor(){

 balance[msg.sender] = totalSupply;
 owner = msg.sender;
}

function transfer( address to , uint amount ) external {
    
    require( balance[msg.sender] >= amount , " OWNER DID'NT HAVE SUFFICIENT BALANCE");
    balance[to] += amount;
    balance[msg.sender] -= amount;

}

function checkBalance( address account ) external view returns( uint )
{
    return balance[account];
}

}