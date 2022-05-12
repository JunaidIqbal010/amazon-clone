import Header from './components/homepage/Header'
import Home from './components/homepage/Home'
import Checkout from './components/checkout/Checkout'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'
import Payment from './components/payment/Payment'
import Orders from './components/orders/Orders'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './App.css';

const promise = loadStripe(
  "pk_test_51IaYxYFtn8yiFmL8sTaxWAY4ndaPylUlvCq77XHIH5NkVOyxdpc4EqMx8GgtL2HdN2bKTBJ8lR41GNIIMHo9dq1S00HAu6t6hN"
  );

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path="/orders" element={<> <Header /> <Orders /> </>} />
            <Route path="/payment" element={<><Header /><Elements stripe={promise}><Payment /></Elements></>}/>
            <Route path="/checkout" element={<> <Header /> <Checkout /> </>} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<> <Header /> <Home /> </>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
