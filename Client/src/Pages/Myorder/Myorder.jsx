import React, { useContext, useEffect, useState, useCallback } from 'react'
import "./Myorder.css";
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { parcel_icon } from '../../assets/assets';

function Myorder() {

  const [data, setData] = useState([]);

  const { Url, token } = useContext(StoreContext);

  const getOrders = useCallback(async () => {

    try {

      const response = await axios.post(
        `${Url}/api/order/myorders`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );

      console.log("ORDERS:", response.data.data);

      setData(response.data.data || []);

    } catch (err) {

      console.log("GET ORDERS ERROR:", err);

      setData([]);

    }

  }, [Url, token]);

  useEffect(() => {

    if (token) {
      getOrders();
    }

  }, [token, getOrders]);

  return (

    <div className='my-orders'>

      <h1>My Orders</h1>

      <div className="container">

        {data && data.length > 0 ? (

          data.map((order, index) => (

            <div key={index} className='my-orders-order'>

              <img src={parcel_icon} alt="" />

              <p>

                {
                  order.items?.map((item, i) => (

                    <span key={i}>

                      {item.name} X {item.quantity}

                      {i !== order.items.length - 1 ? ", " : ""}

                    </span>

                  ))
                }

              </p>

              <p>₹{order.amount}.00</p>

              <p>Items: {order.items?.length || 0}</p>

              <p>
                <span>● </span>
                <b>{order.status}</b>
              </p>

              <button onClick={getOrders}>
                Track Order
              </button>

            </div>

          ))

        ) : (

          <p>No orders found</p>

        )}

      </div>

    </div>

  )

}

export default Myorder;