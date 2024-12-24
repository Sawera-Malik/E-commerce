
import './App.css';
import Home from './Home/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Middleware from './middleware/Middleware';
import Categories from './categories/Categories';
import Navbar from './navbar/Navbar';
import ProductClick from './categories/ProductClick';
import Cart from './navbar/Cart';
function App() {

  return (
    <div className="App">
      <Router>
       
         <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:category" element={<Categories />} />
          <Route path="/product" element={<ProductClick />} />
          <Route path="/cart" element={<Cart />} />
         
          <Route path="*" element={<Middleware />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
