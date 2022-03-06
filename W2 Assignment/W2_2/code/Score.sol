// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


// 01 编写合约Score, 用于记录学生（地址）分数
contract Scores{

    mapping(address => uint) public records;

    address public origin;

    
    constructor(){
        origin = tx.origin;
    }


    modifier onlyTeacher(address _teacher){
        require(tx.origin == _teacher, "Not Teacher!!!");
        _;
    }

    //03 分数不可以大于100
    modifier validScore(uint _score){
        require( _score >= 0 && _score <= 100, "Not valid score!!!");
        _;
    }

    
    function getScore(address _student) public view returns (uint) {
        return records[_student];
    }

    // 02 仅有老师（用modifer 权限空值）可以添加和修改学生分数
    function setScore(address _teacher, address _student, uint _score) public onlyTeacher(_teacher) validScore(_score) {
        records[_student] = _score;
    }
}

// 04 编写合约 Teacher 作为老师，通过IScore 接口调用修改学生分数
interface IScore {
    function setScore(address _teacher, address _student, uint _score) external; 
}




// 04 编写合约 Teacher 作为老师，通过IScore 接口调用修改学生分数
contract Teacher{

    function setScoreByTeacher(address _scores,address _teacher, address _student, uint _score) external{
        IScore(_scores).setScore(_teacher,_student,_score);
    }
}






