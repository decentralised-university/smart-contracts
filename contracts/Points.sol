// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Untradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

abstract contract DUPoints is ERC20Untradeable, Ownable {
    mapping(address => uint) public claimedWallets;
    uint256 public _totalSupply;
    address public accessPass = 0x6d818827046A47db24E08d0E7799E21E384901c4;
    bool public isClaimEnabled;
    uint256 nextPost; 
    mapping(address => uint256) private _balances;


    constructor() ERC20Untradeable("DU Points", "DUP") {
        nextPost = 1;
    }

    struct post {
        uint256 id;
        bool exists;
        address creator;
        string title;
        string description;         
        uint256 votesUp;
        uint256 votesDown;
        mapping(address => bool) voteStatus;
    }

    mapping(uint256 => post) public Posts;

    event postCreated(uint256 id, string description, address proposer);

    event newVote(
        uint256 votesUp,
        uint256 votesDown,
        address user,
        uint256 proposal,
        bool votedFor
    );

    function createPost(string memory _title, string memory _description)
        external
    {
        post storage newPost = Posts[nextPost];
        newPost.id = nextPost;
        newPost.exists = true;
        newPost.creator = msg.sender;
        newPost.title = _title;
        newPost.description = _description;

        emit postCreated(nextPost, _description, msg.sender);
        nextPost++;
    }

    function voteOnPost(uint256 _id, bool _vote) external {
        require(Posts[_id].exists, "This Proposal does not exist");
        require(
            !Posts[_id].voteStatus[msg.sender],
            "You have already voted on this Proposal"
        );
        require(
            Posts[_id].creator != msg.sender,
            "You cannot react to your own post!"
        );

        post storage p = Posts[_id];

        if (_vote) {
            p.votesUp++;
            _mint(Posts[_id].creator, 10 * 10**decimals());
        } else {
            p.votesDown++;
        }

        p.voteStatus[msg.sender] = true;
        emit newVote(p.votesUp, p.votesDown, msg.sender, _id, _vote);
        _totalSupply = _totalSupply + 10 * 10**decimals();
    }

    function claimPoints() external {
        require(
            IERC20(accessPass).balanceOf(msg.sender) > 0,
            "You must own the DU Access Pass to claim your free tokens!"
        );
        require(
            claimedWallets[msg.sender] < 1,
            "You have already claimed your free 100 points!"
        );

        claimedWallets[msg.sender]++;
        _totalSupply = _totalSupply + 100 * 10**decimals();
        _mint(msg.sender, 100 * 10**decimals());
    }


    function _burn(address account, uint256 amount) internal override {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
