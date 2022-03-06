// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/**
*    Bank 合约
**/
contract Bank{

    address payable public owner;

    uint public token;

    event Logdata(address indexed _from, uint _amount);
    
    // 02 通过Metamask 向Bank合约转账ETH
    receive() external payable {
      //03 在Bank合约记录每个地址转账金额  
      emit Logdata(msg.sender,msg.value);
    }

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

   
    //04 编写Bank合约 withdraw() 实现提取出所有的ETH
      function withdraw() external {
        uint amount = address(this).balance;
        token = amount;
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(amount);
    }

    function getMsgSender() public view returns (address){
        return msg.sender;
    }
}