  import { useContext } from "react";
  import "./cart.css";
  import { StoreContext } from "../../Context/StoreContext";
  import { Cross_icon } from "../../assets/assets";
  import {useNavigate} from "react-router-dom";
  function Cart() {
    const { cartItem, food_list, removeFromCart ,getCartTotalPrice,Url} = useContext(StoreContext);
    const navigate = useNavigate();
    return (
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Home</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-item-item">
                    <img src={Url+"/images/"+item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>₹{item.price.toFixed(2)}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>₹{(item.price * cartItem[item._id]).toFixed(2)}</p>
                    <img
                      src={Cross_icon}
                      alt="Remove"
                      onClick={() => removeFromCart(item._id)}
                    />
                  </div>
                  <hr />
                </div>
              );
            }
            return null; 
          })}
        </div>
        <div className="cart-button">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-detalis">
              <p>Subtotal</p>
              <p>₹{ getCartTotalPrice().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-detalis">
              <p>Delivery Fee</p>
              <p>₹{3}</p>
            </div>
            <hr />
            <div className="cart-total-detalis">
              <b>Total</b>
                    <b>₹{(getCartTotalPrice() + 3).toFixed(2)}</b>
            </div>
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here:</p>
              <div className="cart-promo-input">
                <input type="text" placeholder="Enter promo code" />
                      <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Cart;