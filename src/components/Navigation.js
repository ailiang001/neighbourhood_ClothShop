import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {

    const connectHandler = async () => {
        console.log("connecting...")
    }

    return (
        <nav>
            <div className='nav__brand'>
                <h1>Neighbourhood ClothShop</h1>
            </div>
            <input type = "text" className='nav__search'>
            
            </input>

            <button type="button" className='nav__connect'>
                {account.slice(0,6) + '...' + account.slice(37,42)}
            </button>

            {/* <ul className='nav__links'>
                <li><a href="#Business Casual">Business Casual</a></li>
                <li><a href="#Formal Occasions">Formal Occasions</a></li>
                <li><a href="#HighBeast">HighBeast</a></li>
            </ul> */}
            {/* <ul className='nav__links'>
                <li><a href="#Business Casual">Business Casual</a></li>
                <li><a href="#Formal Occasions">Formal Occasions</a></li>
                <li><a href="#HighBeast">HighBeast</a></li>
            </ul> */}

        </nav>
    );
}

export default Navigation;