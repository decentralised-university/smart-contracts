// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DAUToken is ERC20 {
    uint256 public s_maxSupply = 22000000 * 10 ** decimals(); // 22 million

    constructor() ERC20("DAU Token", "DAU") {
        _mint(msg.sender, s_maxSupply);
    }
}