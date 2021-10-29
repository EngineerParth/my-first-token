//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Token {
	string public name = "My First Token";
	string public symbol = "MFT";
	uint256 public totalSupply = 1000;
	mapping(address => uint256) public balances;

	constructor() {
		balances[msg.sender] = totalSupply;
	}

	function mint(uint256 mintSupply) public {
		totalSupply += mintSupply;
	}

	function burn(uint256 burnSupply) public {
		require(
			burnSupply < totalSupply,
			"Burn supply must be less than total supply"
		);
		totalSupply -= burnSupply;
	}

	function transfer(address to, uint256 amount) public{
		require(amount <= balances[msg.sender], "Insufficient tokens");
		balances[msg.sender] -= amount;
		balances[to] += amount;
	}

	function getBalance(address a) public view returns (uint256) {
		return balances[a];
	}
}
