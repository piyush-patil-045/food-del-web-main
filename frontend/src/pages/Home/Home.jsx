/* eslint-disable react/prop-types */
import { useState } from "react";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Header from "../../components/Header/Header";

import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

import "./Home.css";

const Home = ({ searchQuery, setSearchQuery }) => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header setSearchQuery={setSearchQuery} />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchQuery={searchQuery} />
      <AppDownload />
    </div>
  );
};
export default Home;
