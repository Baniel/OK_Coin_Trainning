const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const MyTokenB = await ethers.getContractFactory("MyTokenB");
     const myTokenB = await MyTokenB.deploy();
    
    await myTokenB.deployed();
    console.log("The Address of TokenB：", myTokenB.address);

    let artifact = await artifacts.readArtifact("MyTokenB");
    await writeAbiAddr(artifact, myTokenB.address, "MyTokenB", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

