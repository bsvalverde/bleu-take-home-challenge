// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {BleuAttestationContract} from "./BleuAttestationContract.sol";

contract BleuStakingContract is Ownable {
  mapping (address => mapping (uint256 => uint256)) public stakedNFTs;
  mapping(address => uint256) public totalStakedNFTs;

  IERC721 public nft;
  BleuAttestationContract public attestationContract;

  event Staked(address indexed user, uint256 indexed tokenId, uint256 timestamp);
  event Unstaked(address indexed user, uint256 indexed tokenId, uint256 timestamp);

  constructor(address _nft, address _attestationContract) Ownable(msg.sender) {
    nft = IERC721(_nft);
    attestationContract = BleuAttestationContract(_attestationContract);
  }

  function stake(uint256 _tokenId) external {
    address user = msg.sender;

    require(nft.ownerOf(_tokenId) == user, "You don't own this NFT");

    uint256 currentTimestamp = block.timestamp;
    nft.transferFrom(user, address(this), _tokenId);
    stakedNFTs[user][_tokenId] = currentTimestamp;
    totalStakedNFTs[user]++;
    emit Staked(user, _tokenId, currentTimestamp);

    if (totalStakedNFTs[user] == 5 && !attestationContract.userHasAttested(user, "StakedNFTs")) {
      attestationContract.attest(user, "StakedNFTs", "5 NFTs staked");
    }
  }

  function unstake(uint256 _tokenId) external {
    address user = msg.sender;

    require(stakedNFTs[user][_tokenId] != 0, "NFT not staked");

    delete stakedNFTs[user][_tokenId];
    totalStakedNFTs[user]--;
    nft.transferFrom(address(this), user, _tokenId);
    emit Unstaked(user, _tokenId, block.timestamp);
  }
}
