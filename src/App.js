import Header from './components/homepage/Header'
import Home from './components/homepage/Home'
import Checkout from './components/checkout/Checkout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
