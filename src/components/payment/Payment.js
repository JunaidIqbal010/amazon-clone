import React, {useState, useEffect} from 'react'
import { confirmAlert } from 'react-confirm-alert';
import './Payment.css'
import { useStateValue } from '../../StateProvider'
import CurrencyFormat from 'react-currency-format';
import {getCartTotal} from '../../reducer'
import { Link, useNavigate} from 'react-router-dom';
import CheckoutProduct from '../checkout/CheckoutProduct'
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

function Payment() {
  const [{cart, current_user}, dispatch] = useStateValue();
  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);

  const orderCompletion = () => {
    navigate("/orders")
    dispatch({
      type: 'EMPTY_CART'
    })
  }

  const placeOrderAPI = () => {
    axios.post("api/v1/order",{
      address: "Mianwali"
    },{
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': current_user.token}
    }).then(function(response) {
      setSucceeded(true);
      setError(null)
      setProcessing(false)
      orderPlaced();
    })
  }

  const orderPlaced = () => {
    confirmAlert({
      title: "Order Status",
      message: "Your order has been processed successfully.",
      buttons: [
        {
          label: "OK",
          onClick: () => orderCompletion()
        }
      ]
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setProcessing(true);
    setSucceeded(true);
    const card = element.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token.id);
      const order_amount = getCartTotal(cart);
      const params = JSON.stringify({ "stripeToken" : result.token.id, "orderAmount":  order_amount });
      axios.post("/api/v1/checkout", params, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': current_user.token}
      }).then(function(response){
        placeOrderAPI();
      }).catch(function(err){
      })
    }
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout(<Link to = "/checkout">{cart?.length} items</Link>)</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{current_user?.email}</p>
            <p>Dillewali</p>
            <p>Mianwali, Pakistan</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {cart.map(item => (
              <CheckoutProduct
              key={item.id}
              id={item.id}
              description={item.description}
              price={item.price}
              image_url={item.image_url}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                    renderText={(value) => (
                        <h3>Order Total: {value}</h3>
                    )}
                    decimalScale={2}
                    value={getCartTotal(cart)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"PKR "}
                />
                <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Payment