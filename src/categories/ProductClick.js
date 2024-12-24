import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../Reducer/cartSlice';

function ProductClick() {
  const location = useLocation();
  const { product } = location.state || {};
  const dispatch = useDispatch();


  const [message, setMessage] = useState("");

  const handleAddToCart = (pro) => {
    if (!pro) {
      setMessage("Error: Product data is missing!");
      return;
    }

    dispatch(addToCart(pro));
    setMessage("Product added to cart successfully!");


    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  if (!product) {
    return <div>No product data available.</div>;
  }

  return (
    <div className="App">
      {/* Message display */}
      {message && <p className="message">{message}</p>}

      <div className="prod">
        <img src={product.thumbnail} alt={product.title} className="product-img" />
        <div className="product-det">
          <h2>{product.title}</h2>
          <p className="des">{product.description}</p>
          <p><strong>Price:</strong> ${product.price} <span className="discount">({product.discountPercentage}% off)</span></p>
          <p><strong>Brand:</strong> {product.brand || 'N/A'}</p>
          <p><strong>Availability:</strong> {product.availabilityStatus || 'N/A'}</p>
          <p><strong>Stock:</strong> {product.stock || 'N/A'} items left</p>
          <p><strong>SKU:</strong> {product.sku || 'N/A'}</p>
          <p><strong>Dimensions:</strong> {product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` : 'N/A'}</p>
          <p><strong>Weight:</strong> {product.weight || 'N/A'} kg</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy || 'N/A'}</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation || 'N/A'}</p>
          <p><strong>Tags:</strong> {product.tags ? product.tags.join(', ') : 'N/A'}</p>
          <h3>Customer Reviews:</h3>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.reviewerName}</strong>: {review.comment}</p>
                <p>Rating: {review.rating} / 5</p>
                <p>Date: {new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
          <button type='button' className="cartBtn" onClick={() => handleAddToCart(product)}>Add to cart</button>
        </div>

      </div>


    </div>
  );
}

export default ProductClick;
