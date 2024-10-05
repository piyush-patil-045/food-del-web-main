/* eslint-disable react/prop-types */
import { useContext } from "react";

import { StoreContext } from "../../context/StoreContext";

import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchQuery }) => {
  const { food_list } = useContext(StoreContext);

  // Filter food items based on search query
  const filteredFoodList = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredFoodList.length > 0 ? (
          filteredFoodList.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <h2>No items found</h2>
        )}
      </div>
    </div>
  );
};
export default FoodDisplay;

// {
//   food_list.map((item, index) => {
//     if (category === "All" || category === item.category) {
//       return (
//         <FoodItem
//           key={index}
//           id={item._id}
//           name={item.name}
//           description={item.description}
//           price={item.price}
//           image={item.image}
//         />
//       );
//     }
//   });
// }
