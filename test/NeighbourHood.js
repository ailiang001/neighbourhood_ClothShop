const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

//Global constants 
    //declare propertities for items
    const ID = 1
    const NAME = "Shoes"
    const CATEGORY = "Business Casual"
    const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
    const COST = tokens(1)
    const RATING = 4
    const STOCK = 5

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

    beforeEach(async ( ) => {

      transaction = await neighbourhood.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )

      await transaction.wait() //waiting for transaction to finish deploy before runs "Returns item attributes"
    })


    it('Returns item attributes', async() => {
      const item = await neighbourhood.items(ID)
      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    
    })

    //Emit: 1. Get notifications when someone subscribe to this event. 2. Fetch event stream to see the sales of a product
    it('Emit List event', async() => {
      expect(transaction).to.emit(neighbourhood, "List")
    })

    // TODO: Write a test that checks msg.sender == owner

  })

  describe("Buying", ()=>{
    let transaction 

    beforeEach(async ( ) => {
      //List an item
      transaction = await neighbourhood.connect(deployer).list(ID,NAME,CATEGORY,IMAGE,COST,RATING,STOCK )
      await transaction.wait() //waiting for transaction to finish deploy before runs "Returns item attributes"

      // Buy an item 
      transaction = await neighbourhood.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()
    })

  

    it("Updates buyer's order count", async() =>{
      const orderCountResult = await neighbourhood.orderCount(buyer.address)
      expect(orderCountResult).to.equal(1)

    })

    it("Adds the order", async ()=> {
      const order = await neighbourhood.allOrders(buyer.address, 1)
      expect(order.time).to.be.greaterThan(0)
      expect(order.item.name).to.equal(NAME)
      
    })

    it("Updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(neighbourhood.address)
      console.log(result)
      expect(result).to.equal(COST)
    })


    //Emit: 1. Get notifications when someone subscribe to this event. 2. Fetch event stream to see the sales of a product
    it('Emit Buy event', async() => {
      expect(transaction).to.emit(neighbourhood, "Buy")
    })

  })

  describe("Withdrawing", () => {
    let balanceBefore

    beforeEach(async () => {
      // List a item
      let transaction = await neighbourhood.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait()

      // Buy a item
      transaction = await neighbourhood.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()

      // Get Deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      // Withdraw
      transaction = await neighbourhood.connect(deployer).withdraw()
      await transaction.wait()
    })

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address)
      expect(balanceAfter).to.be.greaterThan(balanceBefore)
    })

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(neighbourhood.address)
      expect(result).to.equal(0)
    })
  })


})