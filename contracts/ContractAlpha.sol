// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract ContractAlpha is Initializable {

    uint private value;

    function initialize(uint _initValue) external initializer {
        value = _initValue;
    }

    function add(uint _value) external {
        value += _value;
    }

    function getValue() external view returns (uint) {
        return value;
    }
}