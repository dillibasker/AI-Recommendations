const express = require("express");
const cors = require("cors");
const tf = require("@tensorflow/tfjs");

const app=express()
app.use(cors());
app.use(express.json())


// Dummy movie dataset
const movies = ["Inception", "Titanic", "Avatar", "Joker", "Interstellar", "The Matrix"];

function getRecommendations(preferences){
    return movies.filter(movie => preferences.some(pref => movie.toLowerCase().includes(pref.toLowerCase())))
}

//API ENdpoint

app.post("/recommendations",(req,res) =>{
    const {userPreferences} =req.body;
    const recommendations=getRecommendations(userPreferences);
    res.json({recommendations})
})

const PORT=5000;
app.listen(PORT,()=>console.log(`Server is running on this port${PORT}`))