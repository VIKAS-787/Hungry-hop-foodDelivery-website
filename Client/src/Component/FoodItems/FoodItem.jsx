import React, { useContext } from "react";
import "./FoodItem.css";
import { Add_icon, Green_icon, rating_starts, Remove_icon } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

function FoodItem({ id, name, price, description,image }) {
  const { cartItem, addToCart, removeFromCart, Url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-list">
        <img 
        src={`${Url}/images/${image}`}
          className="food-item-img" 
          alt={name} 
        />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={rating_starts} alt="rating" />
        </div>

        <p className="food-item-dec">{description}</p>

        <div className="food-item-container">
          <p className="food-item-price">₹{price}</p>

          {!cartItem?.[id] ? (
            <img
              className="food-item-add"
              onClick={() => addToCart(id)}
              src={Add_icon}
              alt="Add"
            />
          ) : (
            <div className="food-item-count">
              <img
                className="remove-icon"
                onClick={() => removeFromCart(id)}
                src={Remove_icon}
                alt="remove"
              />

              <p>{cartItem[id]}</p>

              <img
                className="add-green-icon"
                onClick={() => addToCart(id)}  // ✅ FIXED HERE
                src={Green_icon}
                alt="add"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItem;