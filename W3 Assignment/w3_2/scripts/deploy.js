const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     
    const W32NFT = await ethers.getContractFactory("W32NFT");
    const w32NFT = await W32NFT.deploy();
    
    await w32NFT.deployed();
    console.log("NFT deployed to", w32NFT.address);
    
    let artifact = await artifacts.readArtifact("W32NFT");
    await writeAbiAddr(artifact, w32NFT.address, "W32NFT", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});

