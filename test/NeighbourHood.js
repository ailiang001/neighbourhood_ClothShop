const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

// describe: gives the name of this function
describe("NeighbourHood", () => {

  it('has a name', async() => {
    const NeighbourHood = await ethers.getContractFactory("NeighbourHood")
    neighbourhood = await NeighbourHood.deploy()
    const name = await neighbourhood.name()
    expect (name).to.equal("NeighbourHood")
  })


  // getSigners : get those fake accounts ethers created for you


})
