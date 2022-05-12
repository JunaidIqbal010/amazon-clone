import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from '../../StateProvider'
import './CheckoutProduct.css'

function CheckoutProduct({description, price, image_url, id, hideButton}) {
  const [{cart}, dispatch] = useStateValue();
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    })
  }
  return (
    <div className="checkoutProduct" >
      <img className="checkoutProduct__image" src={image_url} alt="" />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{description}</p>
        <p className="checkoutProduct__price">
          <small>PKR </small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          <p className="product__ratingStar"><StarIcon /></p>
        </div>
        { !hideButton && (
            <button onClick={removeFromCart}>Remove from Cart</button>
        )}

      </div>
    </div>
  )
}

export default CheckoutProduct