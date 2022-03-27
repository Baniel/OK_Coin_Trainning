// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUniswapV2Router {
    function addLiquidityETH(
        address token, 
        uint256 amountTokenDesired, 
        uint256 amountTokenMin, 
        uint256 amountETHMin, 
        address to, 
        uint256 deadline 
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function swapExactETHForTokens(
        uint256 amountOutMin, 
        address[] calldata path, 
        address to, 
        uint256 deadline 
    ) external payable returns (uint256[] memory amounts);
}

contract MyTokenMarket {
    address public routerAddress;
    address public myToken;
    address public wethAddress;

    constructor(
        address _router,
        address _token,
        address _weth
    ) {
        routerAddress = _router;
        myToken = _token;
        wethAddress = _weth;
        
        // Aprrove the Uniswap router
        IERC20(myToken).approve(routerAddress, ~uint256(0));
    }

    // Add Liqudity
    function AddLiquidity(uint256 _amountTokenDesired) public payable {
        IERC20(myToken).transferFrom(
            msg.sender,
            address(this),
            _amountTokenDesired
        );
        
        IUniswapV2Router(routerAddress).addLiquidityETH{value: msg.value}(
            myToken,
            _amountTokenDesired,
            1,
            1,
            msg.sender,
            9000000000
        );
    }


    // Trader Buy Token
    function buyToken() public payable returns (uint256[] memory amounts) {
        address[] memory path = new address[](2);
        path[0] = wethAddress;
        path[1] = myToken;
        
        amounts = IUniswapV2Router(routerAddress).swapExactETHForTokens{
            value: msg.value
        }(0, path, msg.sender, 9000000000);
    }
}
