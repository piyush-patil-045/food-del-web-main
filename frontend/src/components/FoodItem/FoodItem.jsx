/* eslint-disable react/prop-types */
import { useContext } from "react";

import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {
    cartItems = {},
    addToCart,
    removeFromCart,
    url
  } = useContext(StoreContext);

  const maxDescriptionLength = 210;

  return (
    <div className="food-item" key={id}>
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">
          {description.length > maxDescriptionLength
            ? `${description.slice(0, maxDescriptionLength)}...`
            : description}
        </p>
        <p className="food-item-price">
          <span className="currency-symbol">₹</span>
          {price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
