import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import { saveCartDetails} from '../../LocalStorage'
import {useStateValue} from '../../StateProvider'
import {getCartTotal} from '../../reducer'
import axios from "axios"
import './Subtotal.css'
function Subtotal() {
  const [{cart, current_user}, dispatch] = useStateValue();
  const navigate = useNavigate();
  const cartData = () => {
    let array = [];
    cart.map(item => {
      var obj = { item_cartable_id: item.id, item_cartable_type: "Product", quantity: item.quantity};
      array.push(obj);
    })
    return array;
  }

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



  const proceedToCheckout = () => {
    
    if(!current_user){
      authentication();
    }else{
      const params = JSON.stringify({"item_carts" : cartData()})
      axios.post("/api/v1/sync-cart", params, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': current_user.token}
      }).then(function(response){
        saveCartDetails(cart);
        navigate("/payment")
      }).catch(function(err){
        alert("You must have atleast one item in your cart to perform this action.")
      })
    }
  }
  return (
    <div className="subtotal">
      <CurrencyFormat renderText={(value) => (
        <>
          <p>
            Subtotal ({cart?.length} items): <strong> {value} </strong>
          </p>
          <small className="subtotal__gift">
            <input type="checkbox" />
            This order contains a gift.
          </small>
        </>
      )}
      decimalScale={2}
      value={getCartTotal(cart)}
      displayType={"text"}
      thousandsSeparator={true}
      prefix={"PKR "}
      />
      <button onClick={ proceedToCheckout }>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal