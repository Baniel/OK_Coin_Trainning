const { ethers, network } = require('hardhat');
const myTokenMarket = require(`../deployments/dev/${network.name}-MyTokenMarket.json`);

async function main() {
  const [deployer] = await ethers.getSigners();
  let tokenMarket = await ethers.getContractAt(myTokenMarket.contractName, myTokenMarket.address, deployer);
  
  await tokenMarket.buyToken({value : ethers.utils.parseEther('0.0005')});
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

