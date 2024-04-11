import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/Dappazon.json'

// Config
import config from './config.json'

function App() {
  //adding the ability to save account status 
  const [provider, setProvider] = useState(null)
  const [neighbourhoodClothShop, setNeighbourhoodClothShop] = useState(null)

  const [account, setAccount] = useState(null)

  const [busnsCasual, setBusnsCasual] = useState(null)
  const [fomalOccsns, setFomalOccsns] = useState(null)
  const [highBeast, setHighBeast] = useState(null)

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
    const neighbourhoodClothShop = new ethers.Contract(config[network.chainId].homestead.address, Dappazon, provider)

    setNeighbourhoodClothShop(neighbourhoodClothShop)
    // Load products 

    const items = []

    for (var i = 0; i < 9; i++){
      const item = await neighbourhoodClothShop.items(i +1)
      items.push(item)
    }

    
    console.log(items)

    // const busnsCasual = item.filter((item) => item.category === '')
    // const busnsCasual = item.filter((item) => item.category === '')
    // const busnsCasual = item.filter((item) => item.category === '')
  
    // setBusnsCasual()
    // setFomalOccsns()
    // setHighBeast()


  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <h2>Welcome to Neighbourhood ClothShop</h2>


    </div>
  );
}

export default App