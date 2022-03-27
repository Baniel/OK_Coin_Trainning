// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
     constructor() ERC20("MyToken", "MTK") {}

     function mint(address _account, uint256 _amount) public returns (bool){
         _mint(_account, _amount);
         return true;
     }
}