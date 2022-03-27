const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
const sushiToken = require(`../deployments/dev/${network.name}-SushiToken.json`);

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const MasterChef = await ethers.getContractFactory("MasterChef");
     
     const masterChef = await MasterChef.deploy(sushiToken.address,"0x6D305b56376c3418Ea3bc0c5BF9CFC95bDec9183",ethers.utils.parseEther('40'),0,6568146);
    
    await masterChef.deployed();
    console.log("The Address of MasterChef：", masterChef.address);
    
        let artifact = await artifacts.readArtifact("MasterChef");
    await writeAbiAddr(artifact, masterChef.address, "MasterChef", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

