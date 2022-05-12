import React from 'react'
import Product from './Product'
import { useState, useEffect} from 'react'
import axios from "axios"
import './Home.css'

function Home() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get("/api/v1/products")
      .then((response) => {
        setProducts(response.data.data)
      })
      .catch((error) => {
        console.error(error)
    })
  }, [])
  return (
      <div className="home">
        <div className="home__container">
          <img className="home__image" src="https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg" alt="" />
          <div className="home__row">
            {products.map(
              ({ image_url, id, title, price }) => (
                <Product 
                  key={id}
                  description={title}
                  price={price}
                  id={id}
                  image_url={image_url}
                />
              )
            )}
          </div>
        </div>
      </div>
  )
}

export default Home