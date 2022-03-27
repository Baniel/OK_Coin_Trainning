const { ethers, network } = require('hardhat');
const myToken = require(`../deployments/dev/${network.name}-MyToken.json`);
const myTokenMarket = require(`../deployments/dev/${network.name}-MyTokenMarket.json`);

async function main() {
  const [deployer] = await ethers.getSigners();
  let token = await ethers.getContractAt(myToken.contractName, myToken.address, deployer);
  
  await token.mint(deployer.address, ethers.utils.parseEther('200'));
  
  await token.approve(myTokenMarket.address, ethers.utils.parseEther('200'));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

