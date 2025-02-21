// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BleuStaking is Ownable {
  mapping (address => mapping (uint256 => uint256)) public stakedNFTs;

  IERC721 public nftContract;

  event Staked(address indexed user, uint256 indexed tokenId, uint256 timestamp);
  event Unstaked(address indexed user, uint256 indexed tokenId, uint256 timestamp);

  constructor(address _nftContract) Ownable(msg.sender) {
    nftContract = IERC721(_nftContract);
  }

  function stake(uint256 _tokenId) external {
    address user = msg.sender;

    require(nftContract.ownerOf(_tokenId) == user, "You don't own this NFT");

    uint256 currentTimestamp = block.timestamp;
    nftContract.transferFrom(user, address(this), _tokenId);
    stakedNFTs[user][_tokenId] = currentTimestamp;
    emit Staked(user, _tokenId, currentTimestamp);
  }

  function unstake(uint256 _tokenId) external {
    address user = msg.sender;

    require(stakedNFTs[user][_tokenId] != 0, "NFT not staked");

    delete stakedNFTs[user][_tokenId];
    nftContract.transferFrom(address(this), user, _tokenId);
    emit Unstaked(user, _tokenId, block.timestamp);
  }
}
