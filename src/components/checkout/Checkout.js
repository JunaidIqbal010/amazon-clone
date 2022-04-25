import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from '../../StateProvider'

function Checkout() {
  const [{cart}, dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad"
          src="/assets/amazon__ad.jpg" alt=""
          />

        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
}

export default Checkout