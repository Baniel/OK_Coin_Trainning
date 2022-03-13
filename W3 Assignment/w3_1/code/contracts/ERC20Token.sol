// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token20 is ERC20 {

    // 初始化构造函数
    constructor() ERC20("ERC20Token", "Token20") {}

    // 可动态增发并且起始发行量是 0
    function mint(address _account, uint256 _amount) public returns (bool) {
        _mint(_account, _amount);
        return true;
    }
}