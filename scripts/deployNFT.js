const hre = require("hardhat");

async function main() {
  
    // Start deployment, returning a promise that resolves to a contract object
    const AccessPass = await hre.ethers.getContractFactory("AccessPass")
    const accessPass = await AccessPass.deploy()

    await accessPass.deployed()

    console.log("Contract deployed to address:", accessPass.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
});
  