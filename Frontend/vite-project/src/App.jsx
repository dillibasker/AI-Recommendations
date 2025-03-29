import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [recos, setRecos] = useState([]);
  const genres = ["Sci-Fi", "Drama", "Action"];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedGenres(checked ? [...selectedGenres, value] : selectedGenres.filter((g) => g !== value));
  };
  const getRecommendations = async () => {
    try {
      const response = await axios.post("http://localhost:5000/recommendations", { userPreferences: selectedGenres });
      setRecos(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Recommendation System (Free)</h2>
      <div>
        {genres.map((genre) => (
          <div key={genre}>
            <input type="checkbox" value={genre} onChange={handleCheckboxChange} /> {genre}
          </div>
        ))}
      </div>
      <button onClick={getRecommendations}>Get Recommendations</button>
      <div>
        <h3>Recommended Movies:</h3>
        {recos.length > 0 ? <ul>{recos.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p>No recommendations yet.</p>}
      </div>
    </div>
  );
}

export default App;
