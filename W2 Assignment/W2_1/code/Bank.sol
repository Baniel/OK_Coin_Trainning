// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


/**
*    Bank ��Լ
**/
contract Bank{

    address payable public owner;

    uint public token;

    event Logdata(address indexed _from, uint _amount);
    
    // 02 ͨ��Metamask ��Bank��Լת��ETH
    receive() external payable {
      //03 ��Bank��Լ��¼ÿ����ַת�˽��  
      emit Logdata(msg.sender,msg.value);
    }

    constructor() payable {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

   
    //04 ��дBank��Լ withdraw() ʵ����ȡ�����е�ETH
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