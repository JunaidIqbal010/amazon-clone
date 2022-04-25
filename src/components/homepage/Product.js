import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import {useStateValue} from '../../StateProvider'
import './Product.css'

function Product({description, price, image_url, id}) {
  const [{cart}, dispatch] = useStateValue();
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id,
        price: price,
        description: description,
        image_url: image_url,
      }
    })
  }
  return (
    <div className="product">
      <div className="product__info">
        <p>{description}</p>
        <p className="product__price">
          <small>PKR</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          <p className="product__ratingStar"><StarIcon /></p>
        </div>
      </div>

      <img src={image_url} alt=""></img>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}

export default Product