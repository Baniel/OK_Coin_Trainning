const { ethers, network } = require('hardhat');
const masterChef = require(`../deployments/dev/${network.name}-MasterChef.json`);

async function main() {
  const [deployer] = await ethers.getSigners();
  let mc = await ethers.getContractAt(masterChef.contractName, masterChef.address, deployer);
  
  await mc.add(50,'0xdD93f7a5867178Bdc8E2c19F6CaAcaa9d449f238',true);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
