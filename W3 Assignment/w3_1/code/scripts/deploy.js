const { artifacts, network, ethers} = require('hardhat');
const { writeAbiAddr } = require('./artifacts_saver');

async function main(){
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());
   //ERC20
   const ERC20 = await ethers.getContractFactory("ERC20");
   const erc20 = await ERC20.deploy();
   //Vault
   const Vault = await ethers.getContractFactory("Vault");
   const vault = await Vault.deploy(erc20.address);
   

  // Display The Result
  await erc20.deployed();
  await vault.deployed();
  console.log("ERC Address：", erc20.address);
  console.log("Vault Address：", vault.address);


  //Saving the abi & dev
  let artifactERC20 = await artifacts.readArtifact("ERC20Token");
  await writeAbiAddr(artifactERC20, erc20.address, "ERC20Token", network.name);
  let artifactVault = await artifacts.readArtifact("Vault");
  await writeAbiAddr(artifactVault, vault.address, "Vault", network.name);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
