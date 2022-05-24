import Dogs from './src/lib/dogs.js'
import express from "express";

const app = express();
app.use(express.json());


app.get("/dogs", async (req, res) => {
  const params = req.query;

  try {
    const result = await Dogs.breeds(params);
    return res.json(result);
  } catch (error) {
    console.log(error);
  } 
});

app.get("/api/status", async (req, res) => {
  return res.json({message: "Test up!"});;
});

app.listen(process.env.PORT || "3000", () => {
  console.log('Listening application...')
});