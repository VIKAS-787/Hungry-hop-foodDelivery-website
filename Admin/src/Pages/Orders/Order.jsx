import React, { useEffect, useState } from 'react'
import "./Order.css"
import axios from 'axios';
import { toast } from "react-toastify"
import { assets } from "../../assets/assets"

function Order({ Url }) {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const response = await axios.get(`${Url}/api/order/list`);

      if (response.data.success) {

        setOrders(response.data.data);
        console.log(response.data.data);

      } else {

        toast.error("Error");

      }

    } catch (error) {

      console.log(error);
      toast.error("Server Error");

    }

  }

  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(`${Url}/api/order/status`, {
        orderId,
        status: event.target.value
      });

      if (response.data.success) {

        await fetchOrders();

      }

    } catch (error) {

      console.log(error);
      toast.error("Status Update Failed");

    }

  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (

    <div className="list-add">

      <h3>Order Page</h3>

      <div className="order-list">

        {
          orders.map((order, index) => (

            <div key={index} className="order-item">

              <img src={assets.percel_icon} alt="" />

              <div>

                <p className="order-item-food">

                  {
                    order.items.map((item, index) => {

                      if (index === order.items.length - 1) {
                        return item.name + " X " + item.quantity
                      } else {
                        return item.name + " X " + item.quantity + ", "
                      }

                    })
                  }

                </p>

                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>

                <div className="order-item-address">

                  <p>{order.address.street + ", "}</p>

                  <p>
                    {order.address.city + ", " +
                      order.address.state + ", " +
                      order.address.country + ", " +
                      order.address.zipCode}
                  </p>

                </div>

                <p className="order-item-phone">
                  {order.address.phone}
                </p>

              </div>

              <p>Items : {order.items.length}</p>

              <p>₹{order.amount}</p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >

                <option value="Food Processing">
                  Food Processing
                </option>

                <option value="Out for Delivery">
                  Out for Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </div>

          ))
        }

      </div>

    </div>

  )

}

export default Order