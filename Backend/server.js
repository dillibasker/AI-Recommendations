const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app=express()
app.use(cors());
app.use(express.json())

const searchSchema= new mongoose.Schema({
    term: String,
  count: { type: Number, default: 1 },
})
const Search = mongoose.model("Search", searchSchema);


// Connect to MongoDB

mongoose.connect("mongodb+srv://dillibasker1:dilli1488@cluster0.b0c7pub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  

  
const products = [
  "Laptop", "Phone", "Tablet", "Headphones", "Camera", "Watch", "TV", "Shoes", "Bag", "Smart Speaker"
];

// API to get products
app.get("/products", (req, res) => {
  res.json(products);
});

// API to store search queries
app.post("/search", async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ message: "Search term required" });
  
  let search = await Search.findOne({ term });
  if (search) {
    search.count++;
    await search.save();
  } else {
    await Search.create({ term });
  }
  res.json({ message: "Search stored" });
});

// API to get recommended products
app.get("/recommendations", async (req, res) => {
  const recommendations = await Search.find().sort({ count: -1 }).limit(5);
  res.json(recommendations.map(r => r.term));
});

app.listen(5000, () => console.log("Server running on port 5000"));