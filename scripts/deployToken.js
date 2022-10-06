const hre = require("hardhat");

async function main() {
  
    // Start deployment, returning a promise that resolves to a contract object
    const Token = await hre.ethers.getContractFactory("DAUToken")
    const token = await Token.deploy()

    await token.deployed()

    console.log("Contract deployed to address:", token.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
});
  
import { unlock } from "hardhat";

// deploy the Unlock contract
await unlock.deployUnlock();

// deploy the template
await unlock.deployPublicLock();

// deploy the entire protocol (localhost only)
await unlock.deployProtocol();

// create a lock
const lockArgs = {
  expirationDuration: 60 * 60 * 24 * 7, // 7 days
  currencyContractAddress: null, // null for ETH or erc20 address
  keyPrice: "100000000", // in wei
  maxNumberOfKeys: 10,
  name: "A Demo Lock",
};
await unlock.createLock(lockArgs);