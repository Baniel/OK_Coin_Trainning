require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-abi-exporter');

const fs = require('fs');
const mnemonic = fs.readFileSync("./.secret").toString().trim();
const infurakey='';
const scankey = '';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/38ae9b1b56db4557bdd9a11cf4d8f3aa`,
      accounts: {
        mnemonic: mnemonic,
      },
      chainId: 4,
    }
  },


  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: scankey
  }
};
