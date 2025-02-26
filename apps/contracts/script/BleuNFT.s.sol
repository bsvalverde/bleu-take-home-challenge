// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {BleuAttestationContract} from "../src/BleuAttestationContract.sol";
import {BleuNFT} from "../src/BleuNFT.sol";
import {BleuStakingContract} from "../src/BleuStakingContract.sol";

contract BleuNFTScript is Script {
    BleuAttestationContract public attestationContract;
    BleuNFT public nft;
    BleuStakingContract public staking;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        attestationContract = new BleuAttestationContract();

        nft = new BleuNFT();
        nft.mint(msg.sender, 1);

        staking = new BleuStakingContract(address(nft), address(attestationContract));

        vm.stopBroadcast();
    }
}
