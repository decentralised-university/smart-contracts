// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DUPoints is ERC20 {
    uint256 public s_maxSupply = 22000000 * 10 ** decimals(); // 22 million
    mapping (address => uint) public claimedWallets;
    uint256 public _totalSupply;
    uint256 public maxSupply;
    address accessPass = 1;
    bool public isClaimEnabled;

    constructor() ERC20("DU Points", "DUP") {
        // _mint(msg.sender, s_maxSupply);
    }

    function toggleClaimPoints() external onlyOwner {
        isClaimEnabled = !isClaimEnabled;
    }

    function claim() external payable {
        require (IERC20(accessPass).balanceOf(msg.sender) > 0, 'You must own the DU Access Pass to claim your free tokens!');
        require(claimedWallets[msg.sender] < 1, 'You already own 1 Access Pass! You cannot buy more than 1.');

        claimedWallets[msg.sender]++;
        _totalSupply = _totalSupply + 100;
        _mint(msg.sender, 100);
    }

    function award() external payable {

    }


}
