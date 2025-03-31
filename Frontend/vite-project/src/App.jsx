import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const userId = "user123"; // Simulated user ID
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
    axios.get(`http://localhost:5000/recommendations/${userId}`).then((res) => setRecommendations(res.data));
  }, []);

  const handleInteraction = async (product, type) => {
    await axios.post("http://localhost:5000/interaction", { userId, product, interactionType: type });
    axios.get(`http://localhost:5000/recommendations/${userId}`).then((res) => setRecommendations(res.data));
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product} <button onClick={() => handleInteraction(product, "view")}>View</button>
          </li>
        ))}
      </ul>

      <h2>Recommended for You</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;