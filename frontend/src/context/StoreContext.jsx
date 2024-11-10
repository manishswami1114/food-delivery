import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const url = "https://dinedivine.onrender.com";
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (ItemId) => {
    if (!cartItems[ItemId]) {
      setCartItems((prev) => ({ ...prev, [ItemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { ItemId },
        { headers: { token } }
      );
    }
  };
  const removeFromCart = async (ItemId) => {
    setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { ItemId },
        { headers: { token } }
      );
    }
  };
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };
  // const getTotalAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id === item);
  //       totalAmount += itemInfo.price * cartItems[item];
  //     }
  //   }
  //   return totalAmount;
  // };
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        // Safeguard to ensure itemInfo exists before accessing price
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // const fetch_food_list = async () => {
  //   const response = await axios.get(url + "/api/food/list");
  //   setFoodList(response.data.data);
  // };
  const fetch_food_list = async () => {
    const response = await axios.get(url + "/api/food/list");
    console.log('Food list response:', response.data); // Log response
    setFoodList(response.data.data);
  };
  
  useEffect(() => {
    async function loadData() {
      await fetch_food_list();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
