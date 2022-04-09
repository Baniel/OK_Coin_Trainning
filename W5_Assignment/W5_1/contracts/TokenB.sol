//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenB is ERC20 {
    constructor() ERC20("TokenB", "TB") {
        _mint(msg.sender, 1000 * 10**18);
    }

    function mint(address _account, uint256 _amount) public returns (bool) {
        _mint(_account, _amount);
        return true;
    }
}
