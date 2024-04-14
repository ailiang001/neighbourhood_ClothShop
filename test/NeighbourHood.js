const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

// describe: gives the name of this function
describe("NeighbourHood", () => {
  let neighbourhood
  let deployer, buyer 

  beforeEach(async () => {
    //set up accounts 
    [deployer, buyer] = await ethers.getSigners() //? wat does [deployer, buyer] changed?
    // ^ Wallet inherits Signer; get fake accounts in ethers

    // use the object returned from getContractfactory to deploy new instances of this smart contract "NeighbourHood"
    const NeighbourHood = await ethers.getContractFactory("NeighbourHood")
    neighbourhood = await NeighbourHood.deploy() //**accessing NeighbourHood.sol's variables

  })

  describe("Deployment", ()=>{
    it('Sets the owner', async() => {
      const owner = await neighbourhood.owner()
      console.log(owner)
      expect (owner).to.equal(deployer.address)
    })
  })

  describe("Listing", ()=>{
    let transaction 
    const ID = 1

    beforeEach(async ( ) => {

      transaction = await neighbourhood.connect(deployer).list(
        ID,
        "Shoes",
        "Clothing",
        "IMAGE",
        1,
        4,
        5
      )

      await transaction.wait() //waiting for transaction to finish deploy before runs "Returns item attributes"
    })


    it('Returns item attributes', async() => {
      const items = await neighbourhood.items(1)
      expect(item.id).to.equal(ID)
    
    })


    it('Emit List event', async() => {
      
      expect(transaction).to.emit(neighbourhood, "List")
    
    })

  })


  // getSigners : get those fake accounts ethers created for you

})                                                                                                                                          