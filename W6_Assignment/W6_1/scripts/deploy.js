const hre = require("hardhat");

async function main() {
  const UsdtToken = await hre.ethers.getContractFactory("UsdtToken");
  const usdtToken = await usdtToken.deploy();
  await usdtToken.deployed();
  console.log("usdtToken deployed to:", usdtToken.address);

  const OptionToken = await hre.ethers.getContractFactory("OptionToken");
  const optionToken = await OptionToken.deploy(usdtToken.address);
  await optionToken.deployed();
  console.log("OptionToken deployed to:", optionToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
