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
  const [account, setAccount] = useState(null)


  const loadBlockchainData = async () => {
    // Connect to blockchain 

    // Connect to smart contracts 

    // Load products 

    // console.log(account)
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

export default App;
