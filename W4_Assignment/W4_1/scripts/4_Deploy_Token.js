const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const MyToken = await ethers.getContractFactory("MyToken");
     const myToken = await MyToken.deploy();
    
    await myToken.deployed();
    console.log("Token合约地址：", myToken.address);
    
    let artifact = await artifacts.readArtifact("MyToken");
    await writeAbiAddr(artifact, myToken.address, "MyToken", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

