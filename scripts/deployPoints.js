// ~~~~~~ imports ~~~~~~

const hre = require("hardhat");


// ~~~~~~ async main ~~~~~~

async function main() {
    // Start deployment, returning a promise that resolves to a contract object
    const Points = await hre.ethers.getContractFactory("DUPoints")
    console.log("Deploying contract...")
    const points = await Points.deploy()
    await points.deployed()
    console.log("ERC20 Points contract deployed to:", points.address);

  // only call verify function when working with test network (that can be verified)
  console.log(network.config)
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block txes...")
    await points.deployTransaction.wait(6)
    await verify(points.address, [])
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
