const { expect } = require("chai");
const { ethers } = require("hardhat");

let vault;
let owner;
let addr1;
let addr2;
let erc20;


beforeEach(async function(){
    [owner, addr1, addr2] = await ethers.getSigners();

    // Get ERC20 Token Address
    const ERC20 = await ethers.getContractFactory("Token20");
    erc20 = await ERC20.deploy();

    // Deploy Vault Contract
    const Vault = await ethers.getContractFactory("Vault");
    vault = await Vault.deploy(erc20.address);

});


// Vault
describe("Vault", function () {
    it("deposit", async function () {
        // Deposit
        await erc20.mint(addr1.address, ethers.utils.parseEther('10'));
        await erc20.connect(addr1).approve(vault.address, ethers.utils.parseEther('10'));
        await vault.connect(addr1).deposit(ethers.utils.parseEther('10'));
        expect(ethers.utils.formatEther(await vault.userAccount(addr1.address))).to.equal("10.0");
    });
    it("withdraw", async function () {
        // Withdraw 
        await erc20.mint(addr1.address, ethers.utils.parseEther('10'));
        await erc20.connect(addr1).approve(vault.address, ethers.utils.parseEther('10'));
        await vault.connect(addr1).deposit(ethers.utils.parseEther('10'));
        await vault.connect(addr1).withdraw(ethers.utils.parseEther('1'));
        expect(ethers.utils.formatEther(await vault.userAccount(addr1.address))).to.equal("9.0");
    });
});