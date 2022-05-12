import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link, useNavigate } from 'react-router-dom';
import {useStateValue} from '../../StateProvider'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import './Header.css'
function Header() {
  const [{cart, current_user}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const authentication = () => {
    confirmAlert({
      title: "Authorization",
      message: "You should be logged in to perform this action.",
      buttons: [
        {
          label: "OK",
          onClick: () => navigate("/login")
        }
      ]
    })
  }

  const ordersPage = () => {
    if(current_user){
      navigate("/orders")
    }else{
      authentication();
    }
  }

  const logoutConfirm = () => {
    document.getElementsByClassName("header__optionLineTwo").innerHTML = "Sign in";
    localStorage.removeItem("current_user");
    localStorage.removeItem("cart");
    dispatch({
    type: 'SIGN_OUT'
    })
    navigate("/");
  }

  const onLogout = () => {
    confirmAlert({
      title: "Sign out Confirmation",
      message: "Are you sure you want to log out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => logoutConfirm()
        },
        {
          label: "No",
          onClick: () => navigate("/")
        }
      ]
    })
  }

  const authorization = () => {
    if (current_user) {
      onLogout();
    }else {
      navigate("/login");
    }
  }
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
          <div className="header__option" onClick={authorization}>
            <span className="header__optionLineOne">Hello {current_user ? current_user.username : 'Guest'}</span>
            <span className="header__optionLineTwo">{current_user ? 'Sign out' : 'Sign in'}</span>
          </div>
            <div className="header__option" onClick={ordersPage}>
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