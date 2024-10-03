// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/YourContract.sol";

contract YourContractTest is Test {
  YourContract public yourContract;

  function setUp() public {
    yourContract = new YourContract(vm.addr(1));
  }

  function testPull() public {
    yourContract.pull(true);  // team1
    require(yourContract.team1Score() == 1);
    require(yourContract.ropePosition() == -1);
  }

  function testPull2() public {
    yourContract.pull(true);  // team1
    require(yourContract.team1Score() == 1);
    require(yourContract.ropePosition() == -1);
  }

  function testGetRopePosition() public view {
    console.log(yourContract.ropePosition());
    require(yourContract.ropePosition() == 0);
  }


}
