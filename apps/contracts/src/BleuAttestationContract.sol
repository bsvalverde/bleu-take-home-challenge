// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BleuAttestationContract {
  struct Attestation {
    address issuer;
    address subject;
    uint256 timestamp;
    string schema;
    string data;
  }

  mapping(address => Attestation[]) public attestations;
  mapping(address => mapping(string => bool)) public userHasAttested;

  event Attested(address indexed user, address indexed issuer, uint256 timestamp, string schema, string data);

  function attest(address _user, string calldata _schema, string calldata _data) external {
    require(_user != address(0), "Invalid user address");
    require(bytes(_schema).length > 0, "Schema cannot be empty");
    require(!userHasAttested[_user][_schema], "User has already been attested for this schema");

    uint256 currentTimestamp = block.timestamp;
    Attestation memory newAttestation = Attestation({
      issuer: msg.sender,
      subject: _user,
      timestamp: currentTimestamp,
      schema: _schema,
      data: _data
    });

    attestations[_user].push(newAttestation);
    userHasAttested[_user][_schema] = true;

    emit Attested(_user, msg.sender, currentTimestamp, _schema, _data);
  }

  function getAttestations(address user) external view returns (Attestation[] memory) {
    return attestations[user];
  }
}
