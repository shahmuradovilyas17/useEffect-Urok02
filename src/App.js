import { useEffect, useState } from "react";
import { Loader } from "./Loader/Loader";

import "./App.scss";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let url = "https://fakestoreapi.com/products";

    if (selectedCategory !== "all") {
      url += `/category/${selectedCategory}`;
    }

    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setTimeout(() => {
          setProducts(json);
          setLoading(false);
        }, 500);
      });
  }, [selectedCategory]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategory(json));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <select
        onChange={(e) => {
          setSelectedCategory(e.target.value);
        }}
      >
        <option key={"all"} value={"all"}>
          all
        </option>
        {category.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>

      <div className="product-list">
        {products.map((item) => {
          return (
            <div className="product-item" key={item.id}>
              <div>{item.category}</div>
              <div>{item.description}</div>
              <img
                style={{ width: "200px", height: "200px" }}
                src={item.image}
                alt=""
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
