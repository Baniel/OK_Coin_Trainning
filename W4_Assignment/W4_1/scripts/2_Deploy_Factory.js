const { artifacts,network } = require('hardhat');
const { writeAbiAddr } = require('./artifact_saver.js')
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());

     const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
     const uniswapV2Factory = await UniswapV2Factory.deploy("0x0000000000000000000000000000000000000000");
    
    await uniswapV2Factory.deployed();
    console.log("The Address of Factory：", uniswapV2Factory.address);
    console.log("Uniswap Pair hash ：", await uniswapV2Factory.INIT_CODE_PAIR_HASH());
    
    
    let artifact = await artifacts.readArtifact("UniswapV2Factory");
    await writeAbiAddr(artifact, uniswapV2Factory.address, "UniswapV2Factory", network.name);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});
