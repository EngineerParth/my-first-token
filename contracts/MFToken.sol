//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MFToken is ERC20 {
	constructor(string memory name, string memory symbol)
		ERC20(name, symbol)
	{
		// Internal function of ERC20 contract
		_mint(msg.sender, 10000 * (10**18));
	}
}
