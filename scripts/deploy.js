// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {

  // Setup accounts. (Signers are Ethereum account that has the ability to sign transactions)
  const [deployer] = await ethers.getSigners()

  // Deploy NeighbourHood
  const NeighbourHood = await hre.ethers.getContractFactory("NeighbourHood")
  const neighbourhood = await NeighbourHood.deploy()
  await neighbourhood.deployed()

  console.log(`Deployed NeighbourHood Contract at: ${neighbourhood.address}\n`)

  // By deploying these items onto the blockchain, you would be able to display them onto the website


  // Listing items... items[i] is calling items.json
  for (let i = 0; i < items.length; i++) {
    const transaction = await neighbourhood.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()

    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
