const { expect } = require("chai");
const { ethers } = require("hardhat");

let erc20;
let owner;
let addr1;
let addr2;


beforeEach(async function(){
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy ERC20 Contract
    const ERC20 = await ethers.getContractFactory("Token20");
    erc20 = await ERC20.deploy();

});


// ERC20 
describe("ERC20", function(){
    it("Adding Token & Transfering by ethers.js", async function () {
        // Dynamic Adding the token
        await erc20.mint(addr1.address, ethers.utils.parseEther('10'));
        expect(ethers.utils.formatEther(await erc20.balanceOf(addr1.address))).to.equal("10.0");
        // Transfer By  
        await erc20.connect(addr1).transfer(addr2.address,ethers.utils.parseEther('6'));
        expect(ethers.utils.formatEther(await erc20.balanceOf(addr2.address))).to.equal("6.0");

    });
})



