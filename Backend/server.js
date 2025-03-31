const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://dillibasker1:dilli1488@cluster0.b0c7pub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Schema & Model
const userInteractionSchema = new mongoose.Schema({
  userId: String,
  product: String,
  interactionType: String, // 'view', 'click', 'purchase'
  timestamp: { type: Date, default: Date.now },
});
const UserInteraction = mongoose.model("UserInteraction", userInteractionSchema);

const products = [
  "Laptop", "Phone", "Tablet", "Headphones", "Camera", "Watch", "TV", "Shoes", "Bag", "Smart Speaker"
];

const productCategories = {
  "Laptop": ["Tablet", "Phone", "Smart Speaker"],
  "Phone": ["Laptop", "Tablet", "Smart Speaker"],
  "Tablet": ["Laptop", "Phone", "Smart Speaker"],
  "Headphones": ["Phone", "Smart Speaker", "Laptop"],
  "Camera": ["Bag", "Laptop", "Phone"],
  "Watch": ["Shoes", "Bag", "Phone"],
  "TV": ["Smart Speaker", "Laptop", "Phone"],
  "Shoes": ["Bag", "Watch", "Camera"],
  "Bag": ["Shoes", "Camera", "Watch"],
  "Smart Speaker": ["Laptop", "Phone", "Tablet"],
};

// API to get products
app.get("/products", (req, res) => {
  res.json(products);
});

// API to store user interactions
app.post("/interaction", async (req, res) => {
  const { userId, product, interactionType } = req.body;
  if (!userId || !product || !interactionType) return res.status(400).json({ message: "Missing parameters" });
  
  await UserInteraction.create({ userId, product, interactionType });
  res.json({ message: "Interaction stored" });
});

// AI-based Recommendation API
app.get("/recommendations/:userId", async (req, res) => {
  const { userId } = req.params;
  const interactions = await UserInteraction.find({ userId }).sort({ timestamp: -1 }).limit(5);
  
  let recommendedProducts = new Set();
  interactions.forEach(({ product }) => {
    if (productCategories[product]) {
      productCategories[product].forEach(p => recommendedProducts.add(p));
    }
  });
  
  res.json(Array.from(recommendedProducts));
});

app.listen(5000, () => console.log("Server running on port 5000"));