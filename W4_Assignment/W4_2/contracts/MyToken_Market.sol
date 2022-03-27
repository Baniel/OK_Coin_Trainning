// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUniswapV2Router {
    function swapExactETHForTokens(
        uint256 amountOutMin, 
        address[] calldata path, 
        address to, 
        uint256 deadline 
    ) external payable returns (uint256[] memory amounts);
}

interface IMasterChef {
    function deposit(uint256 _pid, uint256 _amount) external;

    function withdraw(uint256 _pid, uint256 _amount) external;
}

contract MyTokenMarket {
    address public routerAddress;
    address public myToken;
    address public wethAddress;
    address public masterChefAddress;

    constructor(
        address _router,
        address _token,
        address _weth,
        address _masterChef
    ) {
        routerAddress = _router;
        myToken = _token;
        wethAddress = _weth;
        masterChefAddress = _masterChef;
        
        IERC20(myToken).approve(routerAddress, ~uint256(0));
    }

    function buyToken() public payable {
        address[] memory path = new address[](2);
        path[0] = wethAddress;
        path[1] = myToken;
        
        uint256[] memory amounts = IUniswapV2Router(routerAddress)
            .swapExactETHForTokens{value: msg.value}(
            0,
            path,
            address(this),
            9000000000
        );
        
        IERC20(myToken).approve(masterChefAddress, ~uint256(0));
        IMasterChef(masterChefAddress).deposit(0, amounts[1]);
    }

    
    function withdraw(uint256 _amounts) public {
        IMasterChef(masterChefAddress).withdraw(0, _amounts);
    }
}
