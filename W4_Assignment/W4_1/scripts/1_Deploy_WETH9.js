const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     
     const WETH9 = await ethers.getContractFactory("WETH9");
     const wETH9 = await WETH9.deploy();
    
    await wETH9.deployed();
    console.log("The addresso f WETH9：", wETH9.address);

    let artifact = await artifacts.readArtifact("WETH9");
    await writeAbiAddr(artifact, wETH9.address, "WETH9", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

