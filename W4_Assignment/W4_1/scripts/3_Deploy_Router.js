const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
const wETH9 = require(`../deployments/dev/${network.name}-WETH9.json`);
const uniswapV2Factory = require(`../deployments/dev/${network.name}-UniswapV2Factory.json`);
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
     const UniswapV2Router02 = await ethers.getContractFactory("UniswapV2Router02");
     const uniswapV2Router02 = await UniswapV2Router02.deploy(uniswapV2Factory.address, wETH9.address);
    
    await uniswapV2Router02.deployed();
    console.log("The Address of Router：", uniswapV2Router02.address);
    
    let artifact = await artifacts.readArtifact("UniswapV2Router02");
    await writeAbiAddr(artifact, uniswapV2Router02.address, "UniswapV2Router02", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
