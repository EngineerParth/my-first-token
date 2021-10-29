//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
contract Calc {
	int256 public res = 0;

	constructor(int256 _initialVal) {
		res = _initialVal;
	}

	function add(int256 _a) public {
		res += _a;
	}

	function subtract(int256 _a) public {
		res -= _a;
	}

	function multiply(int256 _a) public {
		res *= _a;
	}

	function div(int256 _a) public {
		require(_a > 0, "DIVIDE BY ZERO");
		res/=_a;
	}
}
