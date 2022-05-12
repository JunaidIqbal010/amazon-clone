import React from 'react'
import CheckoutProduct from '../checkout/CheckoutProduct'
import CurrencyFormat from 'react-currency-format';
import './Order.css'

function Order({order}) {
  return (
    <div className="order">
      <h1>Order</h1>
      <p>{order.updated_at}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.order_items.map(order_item =>(
        <CheckoutProduct
          key={order_item.product.id}
          id={order_item.product.id}
          description={order_item.product.title}
          price={order_item.product.price}
          image_url={order_item.product.image_url}
          hideButton= {true}
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
            <h3 className="order__total">Order Total: {order.grand_total}</h3>
        )}
        decimalScale={2}
        value={order.grand_total}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"PKR "}
        />
    </div>
  )
}

export default Order