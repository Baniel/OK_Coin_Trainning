require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

const ROPSTEN = "";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/b91dcdb8a5c64b84a69e639f8f13cdc1`,
      accounts: [`0x${ROPSTEN}`],
      chainId: 5
    }
  },
  etherscan: {
    apiKey: ""
  },
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.4.26",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};