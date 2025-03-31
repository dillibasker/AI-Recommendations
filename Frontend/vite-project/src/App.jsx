import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
    axios.get("http://localhost:5000/recommendations").then((res) => setRecommendations(res.data));
  }, []);

  const handleSearch = async () => {
    if (searchTerm) {
      await axios.post("http://localhost:5000/search", { term: searchTerm });
      setSearchTerm("");
      axios.get("http://localhost:5000/recommendations").then((res) => setRecommendations(res.data));
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product}</li>
        ))}
      </ul>

      <h2>Search</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

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