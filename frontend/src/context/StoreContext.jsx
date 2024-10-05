/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

const defaultContextValue = {
  food_list: [],
  cartItems: {},
  setCartItems: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  getTotalCartAmount: () => 0,
  applyPromoCode: () => {},
  url: "",
  token: "",
  discount: 0,
  setToken: () => {}
};

export const StoreContext = createContext(defaultContextValue);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [discount, setDiscount] = useState(0);

  const promoCodes = {
    SAVE10: 10,
    SAVE20: 20
  };

  const applyPromoCode = (code) => {
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      return { success: true, discount: promoCodes[code] };
    } else {
      setDiscount(0);
      return { success: false, message: "Invalid promo code" };
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchFoodList = useCallback(async () => {
    const response = await axios.get(url + "/api/food/list");

    setFoodList(response.data.data);
  }, [url]);

  const loadCartData = useCallback(async () => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  }, [url, token]);

  useEffect(() => {
    async function loadDate() {
      await fetchFoodList();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadDate();
  }, [fetchFoodList, loadCartData, setToken]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    applyPromoCode,
    discount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
