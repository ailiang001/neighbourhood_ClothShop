import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {

  // 1. Display item info specific to the clicked one
  // 2. Add Buy Now Button 
  // 3. On click, talks to blockchain that enable transaction

  return (
    <div className="product">

    </div >
  );
}

export default Product;