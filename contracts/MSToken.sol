pragma solidity ^0.8.3;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MSToken is ERC20 {
	constructor(string memory name, string memory symbol)
		ERC20(name, symbol)
	{
		_mint(msg.sender, 50000 * (10**4));
	}
}
