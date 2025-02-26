// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


import {Test, console} from "forge-std/Test.sol";
import {BleuAttestationContract} from "../src/BleuAttestationContract.sol";
import {BleuNFT} from "../src/BleuNFT.sol";
import {BleuStakingContract} from "../src/BleuStakingContract.sol";

contract BleuStakingContractTest is Test {
  BleuAttestationContract public attestationContract;
  BleuNFT public nft;
  BleuStakingContract public stakingContract;
  
  address public user1 = address(0x123);
  address public user2 = address(0x456);

  uint256 tokenId = 1;

  function setUp() public {
    attestationContract = new BleuAttestationContract();
    nft = new BleuNFT();
    stakingContract = new BleuStakingContract(address(nft), address(attestationContract));

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

  function testGrantAttestationAfter5NFTs() public {
    for (uint256 i = 2; i < 6; i++) {
      nft.mint(user1, i);
    }
    for (uint256 i = 1; i < 6; i++) {
      vm.startPrank(user1);
      nft.approve(address(stakingContract), i);
      stakingContract.stake(i);
      vm.stopPrank();
    }

    bool hasAttested = attestationContract.userHasAttested(user1, "StakedNFTs");
    assertTrue(hasAttested, "User should be attested after staking 5 NFTs");

    BleuAttestationContract.Attestation[] memory attestations = attestationContract.getAttestations(user1);
    assertEq(attestations.length, 1, "User should have exactly one attestation");
    
    assertEq(attestations[0].schema, "StakedNFTs", "Incorrect schema in attestation");
    assertEq(attestations[0].data, "5 NFTs staked", "Incorrect data in attestation");
  }

  function testNoReattestationAfter5NFTs() public {
    for (uint256 i = 2; i < 7; i++) {
      nft.mint(user1, i);
    }
    for (uint256 i = 1; i < 7; i++) {
      vm.startPrank(user1);
      nft.approve(address(stakingContract), i);
      stakingContract.stake(i);
      vm.stopPrank();
    }

    bool hasAttested = attestationContract.userHasAttested(user1, "StakedNFTs");
    assertTrue(hasAttested, "User should have the attestation after 5 NFTs");
    
    uint256 attestationsCount = attestationContract.getAttestations(user1).length;
    assertEq(attestationsCount, 1, "There should be only one attestation for user1");
  }

    function testNoAttestationBefore5NFTs() public {
    for (uint256 i = 2; i < 5; i++) {
      nft.mint(user1, i);
    }
    for (uint256 i = 1; i < 5; i++) {
      vm.startPrank(user1);
      nft.approve(address(stakingContract), i);
      stakingContract.stake(i);
      vm.stopPrank();
    }

    bool hasAttested = attestationContract.userHasAttested(user1, "StakedNFTs");
    assertFalse(hasAttested, "User should not have the attestation before 5 NFTs");

    uint256 attestationsCount = attestationContract.getAttestations(user1).length;
    assertEq(attestationsCount, 0, "There should be no attestations for user1");
  }
}