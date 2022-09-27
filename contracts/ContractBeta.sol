// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract ContractBeta is Initializable {

    uint private value;

    function initialize(uint _initValue) external initializer {
        value = _initValue;
    }

    function add(uint _value) external {
        value += _value;
    }

    function sub(uint _value) external {
        require(value >= _value);
        value -= _value;
    }

    function increase() external {
        value += 1;
    }

    function minus() external {
        require(value >= 1);
        value -= 1;
    }

    function getValue() external view returns (uint) {
        return value;
    }
}