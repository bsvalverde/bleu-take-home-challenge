// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BleuStakingContract is Ownable {
  mapping (address => mapping (uint256 => uint256)) public stakedNFTs;

  IERC721 public nft;

  event Staked(address indexed user, uint256 indexed tokenId, uint256 timestamp);
  event Unstaked(address indexed user, uint256 indexed tokenId, uint256 timestamp);

  constructor(address _nft) Ownable(msg.sender) {
    nft = IERC721(_nft);
  }

  function stake(uint256 _tokenId) external {
    address user = msg.sender;

    require(nft.ownerOf(_tokenId) == user, "You don't own this NFT");

    uint256 currentTimestamp = block.timestamp;
    nft.safeTransferFrom(user, address(this), _tokenId);
    stakedNFTs[user][_tokenId] = currentTimestamp;
    emit Staked(user, _tokenId, currentTimestamp);
  }

  function unstake(uint256 _tokenId) external {
    address user = msg.sender;

    require(stakedNFTs[user][_tokenId] != 0, "NFT not staked");

    delete stakedNFTs[user][_tokenId];
    nft.safeTransferFrom(address(this), user, _tokenId);
    emit Unstaked(user, _tokenId, block.timestamp);
  }
}
