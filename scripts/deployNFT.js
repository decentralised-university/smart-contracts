// ~~~~~ imports ~~~~~
const { network } = require("hardhat");
const hre = require("hardhat");


// ~~~~~~ main async ~~~~~
async function main() {
    // Start deployment, returning a promise that resolves to a contract object
    const AccessPass = await hre.ethers.getContractFactory("AccessPass")
    console.log("Deploying NFT Access Pass contract...")
    const accessPass = await AccessPass.deploy()
    await accessPass.deployed()
    console.log("NFT Access Pass deployed to:", accessPass.address)

    // only call verify function when working with test network (that can be verified)
    console.log(network.config)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
      await accessPass.deployTransaction.wait(6)
      await verify(accessPass.address, [])
    }
  }

  async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
      })
    } catch (e) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!")
      } else {
        console.log(e)
      }
    }
  }

  // ~~~~~~ main ~~~~~~


  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
});
  