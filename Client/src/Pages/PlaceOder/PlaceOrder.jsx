import React, { useContext, useEffect, useState } from 'react';
import "./placeorder.css";
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const { getCartTotalPrice, food_list, token, cartItem, Url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    state: "",
    city: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrderSubmit = async (event) => {
    event.preventDefault();

    const orderItems = food_list
      .filter(item => cartItem[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItem[item._id],
      }));

    const orderData = {
      userId: token,
      address: data,
      items: orderItems,
      amount: getCartTotalPrice() + 3,
    };

    try {
      const response = await axios.post(
        `${Url}/api/order/place`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );


      const result = response.data;

      if (result.success) {

        const options = {
          key: result.key,
          amount: result.amount,
          currency: "INR",
          name: "Food Delivery",
          description: "Order Payment",
          order_id: result.order_id,

          handler: async function (response) {
            try {
              const verifyRes = await axios.post(
                `${Url}/api/order/verify`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }
              );

              if (verifyRes.data.success) {
                window.location.href = "/myorders";
              } else {
                window.location.href = "/";
              }
            } catch (error) {
              console.log("Verify Error:", error);
              window.location.href = "/";
            }
          },

          theme: {
            color: "#ff4d4d",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        alert("Order failed");
      }

    } catch (error) {
      console.error("Order Error:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  const navigate = useNavigate();
  useEffect(()=>{
   if(!token){
    navigate("/cart")
   }else if(getCartTotalPrice() === 0){
    navigate("/cart")
   }
  },[token])

  return (
    <form onSubmit={placeOrderSubmit} className='order-place'>
      <div className="order-place-left">
        <p className='title'>Delivery Information</p>
        <input name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
        <input name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
        <input name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' />
        <input name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <input name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
        <input name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        <input name='zipCode' onChange={onChangeHandler} value={data.zipCode} placeholder='Zip Code' />
        <input name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
        <input name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>

      <div className="order-place-right">
        <h2>Total: ₹{getCartTotalPrice() + 3}</h2>
        <button type="submit">PROCEED TO PAYMENT</button>
      </div>
    </form>
  );
}

export default PlaceOrder;