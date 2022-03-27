const { ethers, network } = require('hardhat');
const myTokenMarket = require(`../deployments/dev/${network.name}-MyTokenMarket.json`);

async function main() {
  const [deployer] = await ethers.getSigners();
  let tokenMarket = await ethers.getContractAt(myTokenMarket.contractName, myTokenMarket.address, deployer);
  
  await tokenMarket.withdraw(ethers.utils.parseEther('9.993466662914916806'));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

