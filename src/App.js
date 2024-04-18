import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import NeighbourHood from './abis/NeighbourHood.json'

// Config
import config from './config.json'

function App() {
  //adding the ability to save account status 
  const [provider, setProvider] = useState(null)
  const [neighbourhood, setNeighbourhoodClothShop] = useState(null)

  const [account, setAccount] = useState(null)

  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const [busnsCasual, setBusnsCasual] = useState(null)
  const [fomalOccsns, setFomalOccsns] = useState(null)
  const [highBeast, setHighBeast] = useState(null)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    // Use Ethers to connect to blockchain 
    // Better wallet connection especially when there's multiple wallet: refer to this link: https://docs.metamask.io/wallet/how-to/connect/
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    console.log(provider)
    // Connect to network  
    const network = await provider.getNetwork()
    console.log(network)

    // Connect to smart contracts (Create JS version)
    // VAR address: the address of the ethereum contract i want to interact with, which should come from 
    // deployed smart contract?
    const neighbourhood = new ethers.Contract(config[network.chainId].unknown.address, NeighbourHood, provider)

    setNeighbourhoodClothShop(neighbourhood)
    // Load products 

    const items = []

    for (var i = 0; i < 9; i++){
      const item = await neighbourhood.items(i +1) // "items" in abi
      items.push(item)
    }

    
    console.log(items)

    // const busnsCasual = item.filter((item) => item.category === '')
    // const busnsCasual = item.filter((item) => item.category === '')
    // const busnsCasual = item.filter((item) => item.category === '')
  
    // setBusnsCasual()
    // setFomalOccsns()
    // setHighBeast()

    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)


  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Welcome to Neighbourhood ClothShop</h2>

      {electronics && clothing && toys && (
        <>
          <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop} />
          <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
          <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />
      )}

    </div>
  );
}

export default App