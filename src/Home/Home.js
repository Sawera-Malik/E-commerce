import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Home() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');

        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  const handleProductClick = (product) => {
    navigate('/product', { state: { product } })
  }
  return (
    <div className="App">
      <div className='products' >
        {
          products.map((product) => (
            <div className='pro' key={product.id}>

              <img src={product.thumbnail} alt={product.title} className="product-image" onClick={() => handleProductClick(product)} />

              <div className="product-details">
                <h2>{product.title}</h2>
                <p className="description">{product.description}</p>
                <p><strong>Price:</strong> ${product.price} <span className="discount">({product.discountPercentage}% off)</span></p>
              </div>
            </div>
          ))

        }
      </div>
    </div>
  );

}

export default Home
