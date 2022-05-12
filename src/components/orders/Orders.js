import axios from 'axios';
import { useState, useEffect} from 'react'
import { useStateValue } from '../../StateProvider'
import Order from './Order'
import './Orders.css'

function Orders() {
  const [{cart, current_user}, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  useEffect(() =>{
    axios.get("api/v1/orders", {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': current_user.token
    }
    }).then(function(response){
      setOrders(response.data.data)
    })
    
  }, [])
  return (
    <div className="orders">
      <h1>Your orders</h1>
      <div className="orders__order">
        {orders?.map(order =>(
          <Order order={order}/>
        ))}
      </div>
    </div>
  )
}

export default Orders