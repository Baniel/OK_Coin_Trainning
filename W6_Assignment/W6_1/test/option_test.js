const { messagePrefix } = require("@ethersproject/hash");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OptionToken", function () {
  it("price up option token", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const UsdtToken = await hre.ethers.getContractFactory("UsdtToken");
    const usdtToken = await usdtToken.deploy();
    await usdtToken.deployed();
    console.log("usdtToken deployed to:", usdtToken.address);

    const OptionToken = await hre.ethers.getContractFactory("OptionToken");
    const optionToken = await optionToken.deploy(usdtToken.address);
    await optionToken.deployed();
    console.log("optionToken deployed to:", optionToken.address);


    await optionToken.mint({value:20});

    await optionToken.transfer(addr1.address,10);

    console.log(await optionToken.balanceOf(addr1.address));

    await network.provider.send("evm_increaseTime", [100*24*3600]);

    await usdtToken.approve(OptionToken.address, ethers.constants.MaxUint256); 
    await optionToken.settlement(10);

    await network.provider.send("evm_increaseTime", [24*3600]);
    await optionToken.burnAll();
    
  });
});
