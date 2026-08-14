import axios from "axios";
import { createContext, useEffect, useState } from "react";

const StoreContext = createContext(null);

const ContextProvider = ({ children }) => {
const Url = "http://localhost:5001";

  const [cartItem, setCartItem] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");

  // ✅ Fetch food
  const fetchFoodList = async () => {
    const res = await axios.get(`${Url}/api/food/list`);
    setFoodList(res.data.data);
  };

  // ✅ Load cart
  const loadCartData = async (tokenValue) => {
    try {
      const res = await axios.get(`${Url}/api/cart`, {
        headers: { token: tokenValue },
      });

      setCartItem(res.data.cartData || {});
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Add
  const addToCart = async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${Url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ✅ Remove
  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      const updated = { ...prev };
      if (updated[itemId]) {
        updated[itemId] -= 1;
        if (updated[itemId] <= 0) delete updated[itemId];
      }
      return updated;
    });

    if (token) {
      await axios.post(
        `${Url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  // ✅ Total price
  const getCartTotalPrice = () => {
    let total = 0;

    for (let item in cartItem) {
      const product = food_list.find(
        (p) => p._id.toString() === item
      );
      if (product) {
        total += product.price * cartItem[item];
      }
    }

    return total;
  };

  // ✅ Load on start
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      const savedToken = localStorage.getItem("token");

      if (savedToken && savedToken !== "undefined") {
        setToken(savedToken);
        await loadCartData(savedToken);
      } else {
        localStorage.removeItem("token");
      }
    };

    loadData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        food_list,
        cartItem,
        addToCart,
        removeFromCart,
        getCartTotalPrice,
        token,
        setToken,
         Url 
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, ContextProvider };