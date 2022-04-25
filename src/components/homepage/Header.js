import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import {useStateValue} from '../../StateProvider'
import './Header.css'
function Header() {
  const [{cart}, dispatch] = useStateValue();
  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo"
          src = "http://www.userlogos.org/files/logos/ArkAngel06/Amazon.png"
          alt = ""
          />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <span className="header__optionLineTwo">Sign In</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
      </div>
      <Link to="/checkout">
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="header__optionLineOne header__basketCount">{cart?.length}</span>
        </div>
      </Link>
    </div>
  )
}

export default Header