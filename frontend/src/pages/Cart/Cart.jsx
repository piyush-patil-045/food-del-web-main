import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems = {},
    food_list,
    removeFromCart,
    getTotalCartAmount,
    applyPromoCode,
    url,
    discount
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const handlePromoSubmit = () => {
    const result = applyPromoCode(promoCode);
    if (result.success) {
      setPromoMessage(`Promo code applied! ${result.discount}% off`);
    } else {
      setPromoMessage(result.message);
    }
  };

  const totalAmount = getTotalCartAmount();
  const deliveryFee = totalAmount === 0 ? 0 : 70;
  const discountAmount = (totalAmount * discount) / 100;
  const finalAmount =
    totalAmount === 0 ? 0 : totalAmount - discountAmount + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-deails">
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>

            {discount > 0 && (
              <>
                <hr />
                <div className="cart-total-deails">
                  <p>Discount ({discount}%)</p>
                  <p>-₹{discountAmount}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-deails">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-deails">
              <b>Total</b>
              <b>₹{finalAmount}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
            {promoMessage && (
              <p
                className={`promo-message ${
                  promoMessage === "Invalid promo code" ? "error" : ""
                }`}
              >
                {promoMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
