// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AccessPass is ERC721, Ownable {
    uint256 public mintPrice = 0.05 ether;  
    uint256 public totalSupply;
    uint256 public maxSupply;
    bool public isMintEnabled;
    mapping (address => uint) public mintedWallets;

    constructor() ERC721("AccessPass", "DUP") {
        maxSupply = 20;
    }

    function toggleMintEnabled() external onlyOwner {
        isMintEnabled = !isMintEnabled;
    }

    function setMaxSupply(uint256 maxSupply_) external onlyOwner {
        maxSupply = maxSupply_;
    } 

    function mint() external payable {
        require(isMintEnabled, 'Minting is not currently enabled');
        require(mintedWallets[msg.sender] < 1, 'You already own 1 Access Pass! You cannot buy more than 1.');
        require(msg.value == mintPrice, 'Wrong value.');
        require(maxSupply > totalSupply, 'Sold out!');

        mintedWallets[msg.sender]++;
        totalSupply++;
        uint256 tokenId = totalSupply;
        _safeMint(msg.sender, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {   
        return super.supportsInterface(interfaceId);
    }
}
