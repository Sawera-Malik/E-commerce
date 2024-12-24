import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './categories.css'

function Categories() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');
        const filteredProducts = res.data.products.filter(
          (product) => product.category === category
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [category]);
  const handleProductClick = (product) => {
    navigate('/product', { state: { product } })
  }
  return (
    <div className="app">
      <h1 className='category' >Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className='products' >
        {products.length > 0 ? (
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
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;
