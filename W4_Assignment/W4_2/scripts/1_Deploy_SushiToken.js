const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const SushiToken = await ethers.getContractFactory("SushiToken");
     const sushiToken = await SushiToken.deploy();
    
    await sushiToken.deployed();
    console.log("The Address SushiToken：", sushiToken.address);
    
    let artifact = await artifacts.readArtifact("SushiToken");
    await writeAbiAddr(artifact, sushiToken.address, "SushiToken", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

