import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {

    const connectHandler = async () => {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account)
    }

    return (
        <nav>
            <div className='nav__brand'>
                <h1>Neighbourhood ClothShop</h1>
            </div>
            <input type = "text" className='nav__search'>
            
            </input>

            {account ? (
                 <button type="button" className='nav__connect'>
                    {account.slice(0,6) + '...' + account.slice(37,42)}
                 </button>
                    
            ): (
                <button type="button" className='nav__connect' 
                onClick={connectHandler}>
                 Connect
                </button>
            )}

            <ul className='nav__links'>
                <li><a href="#Business Casual">Business Casual</a></li>
                <li><a href="#Formal Occasions">Formal Occasions</a></li>
                <li><a href="#HighBeast">HighBeast</a></li>
            </ul>
           

        </nav>
    );
}

export default Navigation;