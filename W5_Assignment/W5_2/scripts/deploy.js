
const hre = require("hardhat");

async function main() {



  const TokenA = await hre.ethers.getContractFactory("TokenA");
  const tokenA = await Greeter.deploy();

  await tokenA.deployed();

  console.log("TokenA deployed to:", tokenA.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
