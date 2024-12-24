import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './cart.css'
import { setCart, updatedCart } from '../Reducer/cartSlice';
function Cart() {
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cart.item) || [];
  const [totalPrice, setTotalPrice] = useState(0);
  const [list, setList] = useState(cartItem);
  const dispatch = useDispatch();

  const CombineProducts = (products) => {
    const combine = {};
    products.forEach((product) => {
      if (combine[product.title]) {
        combine[product.title].count += product.count || 1;

      } else {
        combine[product.title] = { ...product, count: product.count || 1 };
      }

    });
    return Object.values(combine);
  }
  useEffect(() => {
    const fetchData = () => {
      const res = localStorage.getItem('products');
      if (res) {
        const parsedData = JSON.parse(res);
        if (Array.isArray(parsedData)) {
          const conbineData = CombineProducts(parsedData)
          setList(conbineData);
          calculateTotal(conbineData);
          dispatch(setCart(conbineData));

          console.log("Stored Cart", conbineData);
        } else {
          console.warn('Invalid cart data in cookies', parsedData);
        }
      } else {
        console.log("No cart data in localStorage");
      }
    };

    fetchData();
  }, []);

  const calculateTotal = (products) => {
    const total = products.reduce((sum, product) => sum + product.price * product.count, 0);
    const roundOff = total.toFixed(2);
    setTotalPrice(roundOff);
  }

  const increaseCount = (index) => {
    const updateCount = list[index].count + 1;
    dispatch(updatedCart({ index, count: updateCount }))
    const updateList = list.map((item, i) =>
      i === index ? { ...item, count: updateCount } : item
    );

    setList(updateList);
    calculateTotal(updateList);

    dispatch(setCart(updateList));
  }
  const decreseCount = (index) => {
    const updatedCount = list[index].count - 1;
    dispatch(updatedCart({ index, count: updatedCount }));
    const updateList = list.map((item, i) =>
      i === index ? { ...item, count: updatedCount } : item
    )

    setList(updateList);
    calculateTotal(updateList)
    dispatch(setCart(updateList));

  }

  return (
    <div style={{ margin: "100px" }} >
      {list.length === 0 ? (
        <div>
          <h1>Your cart is empty</h1>
          <p>Ready to find your new favorate products?</p>
          <button onClick={() => navigate('/')}>CONTINUE SHOPPING</button>
        </div>
      ) : (
        <div>
          <h1>Shopping Carts</h1>
          <div className='productList' >
            {list.map((li, index) => (
              <div key={li.id || index}>
                <img src={li.thumbnail} alt={li.title} className="list-img" />
                <h4>{li.title}</h4>
                <p>Price: ${li.price}</p>
                <button onClick={() => increaseCount(index)} >+</button>
                <input
                  style={{ width: "10%", textAlign: "center" }}
                  type="number"
                  value={li.count}
                  min='1'
                  readOnly
                />

                <button onClick={() => decreseCount(index)} >-</button>
                <p>Total for this item: ${li.price * li.count}  </p>

              </div>
            ))}
          </div>
        </div>
      )}
      <h3  >Total Price: ${totalPrice}</h3>
      <button onClick={() => navigate('/')}>CONTINUE SHOPPING</button>
    </div>
  )
}

export default Cart
