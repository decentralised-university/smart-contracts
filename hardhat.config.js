require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");
require("./tasks/block-number")
require("./tasks/accounts")
require("./tasks/balance")
require("@unlock-protocol/hardhat-plugin");

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig 
 */


 const GOERLI_RPC_URL = process.env.ETH_GOERLI;
 const MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI;
 const PRIVATE_KEY = process.env.PRIVATE_KEY;
 const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
 
 module.exports = {
   solidity: "0.8.6",
   defaultNetwork: "hardhat",
   networks: {
     localhost: {
       url: "http://127.0.0.1:8545/",
       // accounts: Provided by Hardhat
       chainId: 31337
     },
     // hardhat: {
     //   forking: {
     //     url: GOERLI_RPC_URL
     //   }
     // },
     goerli: {
       url: GOERLI_RPC_URL,
       accounts: [PRIVATE_KEY],
       chainId: 5
     },
     mumbai: {
       url: MUMBAI_RPC_URL,
       accounts: [PRIVATE_KEY],
       chainId: 80001
     },
   },
   etherscan: {
     apiKey: ETHERSCAN_API_KEY,
  //  },
  //  gasReporter: {
  //   enabled: true,
  //   currency: "USD",
  //   outputFile: "gas-report.txt",
  //   noColors: true,
  //   coinmarketcap: COINMARKETCAP_API_KEY,
  }
 };