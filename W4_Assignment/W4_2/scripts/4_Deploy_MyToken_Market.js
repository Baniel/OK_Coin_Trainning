const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
const masterChef = require(`../deployments/dev/${network.name}-MasterChef.json`);

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const MyTokenMarket = await ethers.getContractFactory("MyTokenMarket");
     const myTokenMarket = await MyTokenMarket.deploy("0x4BAC71a58E19539B18d37A62D16223C25aA9D3D0", "0xdD93f7a5867178Bdc8E2c19F6CaAcaa9d449f238", "0xE362993f9f31403EE9f1fb51484e52d4837C35f3",masterChef.address);
  
    await myTokenMarket.deployed();
    console.log("The Address MyToken Market：", myTokenMarket.address);
    
    let artifact = await artifacts.readArtifact("MyTokenMarket");
    await writeAbiAddr(artifact, myTokenMarket.address, "MyTokenMarket", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

