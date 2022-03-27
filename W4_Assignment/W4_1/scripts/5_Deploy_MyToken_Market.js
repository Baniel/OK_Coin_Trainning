const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')

const myToken = require(`../deployments/dev/${network.name}-MyToken.json`);
const uniswapV2Router = require(`../deployments/dev/${network.name}-UniswapV2Router02.json`);
const wETH9 = require(`../deployments/dev/${network.name}-WETH9.json`);

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const MyTokenMarket = await ethers.getContractFactory("MyTokenMarket");
     const myTokenMarket = await MyTokenMarket.deploy(uniswapV2Router.address, myToken.address, wETH9.address);
    
    await myTokenMarket.deployed();
    console.log("The Address of MyToken Market：", myTokenMarket.address);
  
    let artifact = await artifacts.readArtifact("MyTokenMarket");
    await writeAbiAddr(artifact, myTokenMarket.address, "MyTokenMarket", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
