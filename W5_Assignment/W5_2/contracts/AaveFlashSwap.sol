pragma solidity ^0.8.0;

import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Callee.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/libraries/LowGasSafeMath.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract AaveFlashSwap is IFlashLoanSimpleReceiver{

    IUniswapV1Factory immutable factoryV1;
    address immutable factory;
    IWETH immutable WETH;
    address public poolAddressesProvider;
    address public routerV2;
    address public routerV3;
    address public Token1;//TokenB
    IPoolAddressesProvider public immutable override ADDRESSES_PROVIDER;
    IPool public immutable override POOL;

    constructor( address _routerV2,  address _routerV3,address _poolAddressesProvider,address _token1,IFlashLoanSimpleReceiver) public {
        poolAddressesProvider = _poolAddressesProvider;
        routerV2 = _routerV2;
        routerV3 = _routerV3;
        token1 = _token1;
        ADDRESSES_PROVIDER = provider;
        POOL = IPool(provider.getPool());
    }

    // needs to accept ETH from any V1 exchange and WETH. ideally this could be enforced, as in the router,
    // but it's not possible because it requires a call to the v1 factory, which takes too much gas
    // receive() external payable {}

    // gets tokens/WETH via a V2 flash swap, swaps for the ETH/tokens on V1, repays V2, and keeps the rest!
   
    function executeOperation(address asset, uint256 amount, uint256 premium, address initiator, bytes calldata params) external override returns (bool){
        (address token0,) = abi.decode(params,(address,uint256));
        uint returnMount = amount + premium;
        address[] memory path = new address[](2);
        path[0] = token0;
        path[1] = token1;

        assert(path[0] == address(WETH) || path[1] == address(WETH)); // this strategy only works with a V2 WETH pair
        IERC20 token = IERC20(path[0] == address(WETH) ? path[1] : path[0]);
      
        IERC20(token0).approve(routerV2, amount0);
        uint[] memory tokenB = IUniswapV2Router01(routerV2).swapExactTokensForTokens(amount0,uint(0),path,address(this),block.timestamp+1000);
    
        IERC20(token1).approve(routerV3, tokenB[1]);

         
        ISwapRouter(routerV3).exactInput(0)(
            ISwapRouter.ExactInputParams(abi.encodePacked(token1,uint24(1000),token1),address(this),block.timestamp + 1000,tokenB[1],0
        ));


        IERC20(token0).approve(ADDRESSES_PROVIDER.getPool(),returnMount);
        return true;
        }
}