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

  // const [electronics, setElectronics] = useState(null)
  // const [clothing, setClothing] = useState(null)
  // const [toys, setToys] = useState(null)

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
    // Reading the smart contract address where I want to access information from. E.g., items available in store. 
    // In App.js, you will access info on 'neighbourhood' Contract through the abi file
    const neighbourhood = new ethers.Contract(config[network.chainId].unknown.address, NeighbourHood, provider)

    setNeighbourhoodClothShop(neighbourhood)
    // Load products 

    const items = []

    for (var i = 0; i < 9; i++){
      const item = await neighbourhood.items(i +1) // "items" in abi
      items.push(item)
    }

    
    console.log(items)

    const busnsCasual = item.filter((item) => item.category === 'business casual')
    const fomalOccsns = item.filter((item) => item.category === 'formal ocassions')
    const highBeast = item.filter((item) => item.category === 'high street')
  
    setBusnsCasual(busnsCasual)
    setFomalOccsns(fomalOccsns)
    setHighBeast(highBeast)

    // const electronics = items.filter((item) => item.category === 'business casual')
    // const clothing = items.filter((item) => item.category === 'formal ocassions')
    // const toys = items.filter((item) => item.category === 'high street')

    // setElectronics(electronics)
    // setClothing(clothing)
    // setToys(toys)


  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Welcome to Neighbourhood Shop</h2>

      {busnsCasual && fomalOccsns && highBeast && (
        <>
          <Section title={"Business Clothing"} items={busnsCasual} togglePop={togglePop} />
          <Section title={"Formal Ocassions"} items={fomalOccsns} togglePop={togglePop} />
          <Section title={"Street Wear"} items={highBeast} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} neighbourhood={neighbourhood} togglePop={togglePop} />
      )}

    </div>
  );
}

export default App