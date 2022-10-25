// ~~~~~~ imports ~~~~~~

const { ethers, run, network } = require("hardhat");


// ~~~~~~ async main ~~~~~~

async function main() {
  const Dao = await ethers.getContractFactory("Dao");
  console.log("Deploying contract...")
  const dao = await Dao.deploy();
  await dao.deployed();
  console.log("Dao deployed to:", dao.address);

  // only call verify function when working with test network (that can be verified)
  console.log(network.config)
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block txes...")
    await dao.deployTransaction.wait(6)
    await verify(dao.address, [])
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
    console.error(error);
    process.exit(1);
});
