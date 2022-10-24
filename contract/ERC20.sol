// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
contract EDUCTOKEN{
    string public constant name="EDUCTOKEN";
    string public constant symbol = "EDUC";
    uint8 public constant decimals = 18;
    // indexed-> allows to search smart contract logs using the from address
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    uint256 totalSupply_;
    mapping(address =>uint256) balances;
    mapping(address=>mapping(address=>uint256)) allowed;
    constructor(){
        totalSupply_ = 1000000 * 10 **decimals;
        balances[msg.sender] = totalSupply_;
    }
    function totalSupply() public view returns(uint256){
        return totalSupply_;
    }
    function balanceOf(address tokenOwner) public view returns(uint){
        return balances[tokenOwner];
    }
    function transfer(address receiver, uint numTokens) public returns(bool){
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }
    function approve(address delegate, uint numTokens) public returns(bool){
        //the msg.sender now authorizes the delegate address to send tokens or 
        //maximum no. of tokens that spender Address can withdraw
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }
    function allowance(address owner, address delegate) public view returns(uint){
        //owner -> address of person who calls the approve function
        //delegate-> address that wants to know how much it can transfer from the owner address

        //returns number of tokens the delegate can transfer from the owner address
        return allowed[owner][delegate];
    }
    function transferFrom(address owner, address buyer, uint numTokens) public returns(bool){
        require(numTokens <=balances[owner]);
        require(numTokens <=allowed[owner][msg.sender]);
        balances[owner] = balances[owner] - numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        emit Transfer(msg.sender, buyer, numTokens);
        return true;
    }
}