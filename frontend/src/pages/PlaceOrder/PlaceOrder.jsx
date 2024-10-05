import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, discount } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const totalAmount = getTotalCartAmount();
    const deliveryFee = totalAmount === 0 ? 0 : 70;
    const discountAmount = (totalAmount * discount) / 100;
    const finalAmount =
      totalAmount === 0 ? 0 : totalAmount - discountAmount + deliveryFee;

    let orderData = {
      address: data,
      items: orderItems,
      amount: finalAmount,
      discount: discount
    };

    console.log(orderData);

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token }
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error placing the order");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangHandler}
            value={data.firstName}
            type="text"
            placeholder="Frist name"
            required
          />
          <input
            name="lastName"
            onChange={onChangHandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onChangHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={onChangHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
            required
          />
          <input
            name="country"
            onChange={onChangHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={onChangHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-deails">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            {discount > 0 && (
              <>
                <hr />
                <div className="cart-total-deails">
                  <p>Discount ({discount}%)</p>
                  <p>-₹{(getTotalCartAmount() * discount) / 100}</p>
                </div>
              </>
            )}

            <hr />
            <div className="cart-total-deails">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 70}</p>
            </div>
            <hr />
            <div className="cart-total-deails">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() -
                    (getTotalCartAmount() * discount) / 100 +
                    70}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};
export default PlaceOrder;
