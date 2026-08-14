import React from "react";
import "./FoodDisplay.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItems/FoodItem";
function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext);
    return (
        <div className="display" id="display">
            <h2>Top Dishes Near You</h2>
            <div className="food-container">
                {food_list.map((item, index) => {
                    if(category === "All" || item.category === category){
                    return  <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                    }
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;
