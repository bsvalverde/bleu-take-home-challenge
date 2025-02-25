// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import {Test, console} from "forge-std/Test.sol";
import {BleuNFT} from "../src/BleuNFT.sol";
import {BleuStakingContract} from "../src/BleuStakingContract.sol";

contract BleuStakingContractTest is Test {
  BleuNFT public nft;
  BleuStakingContract public stakingContract;
  
  address public user1 = address(0x123);
  address public user2 = address(0x456);

  uint256 tokenId = 1;

  function setUp() public {
    nft = new BleuNFT();
    stakingContract = new BleuStakingContract(address(nft));

    nft.mint(user1, tokenId);
  }

  function testStaking() public {
    vm.startPrank(user1);
    nft.approve(address(stakingContract), tokenId);
    stakingContract.stake(tokenId);
    vm.stopPrank();

    uint256 stakingTimestamp = stakingContract.stakedNFTs(user1, tokenId);
    assertTrue(stakingTimestamp > 0, "NFT should be staked");
  }

  function testStakingWithoutOwnership() public {
    vm.startPrank(user2);
    vm.expectRevert("You don't own this NFT");
    stakingContract.stake(tokenId);
    vm.stopPrank();
  }

  function testUnstaking() public {
    vm.startPrank(user1);
    nft.approve(address(stakingContract), tokenId);
    stakingContract.stake(tokenId);
    stakingContract.unstake(tokenId);
    vm.stopPrank();

    uint256 stakingTimestamp = stakingContract.stakedNFTs(user1, tokenId);
    assertEq(stakingTimestamp, 0, "NFT should be unstaked");
  }

  function testUnstakingWithoutStaking() public {
    vm.startPrank(user1);
    vm.expectRevert("NFT not staked");
    stakingContract.unstake(tokenId);
    vm.stopPrank();
  }

  function testUnstakingWithoutOwnership() public {
    vm.startPrank(user1);
    nft.approve(address(stakingContract), tokenId);
    stakingContract.stake(tokenId);
    vm.stopPrank();

    vm.startPrank(user2);
    vm.expectRevert("NFT not staked");
    stakingContract.unstake(tokenId);
    vm.stopPrank();
  }
}