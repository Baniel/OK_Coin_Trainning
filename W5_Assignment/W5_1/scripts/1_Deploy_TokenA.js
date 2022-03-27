const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const MyTokenA = await ethers.getContractFactory("MyTokenA");
     const myTokenA = await MyTokenA.deploy();

    await myTokenA.deployed();
    console.log("The Address of Token A：", myTokenA.address);

    let artifact = await artifacts.readArtifact("MyTokenA");
    await writeAbiAddr(artifact, myTokenA.address, "MyTokenA", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

