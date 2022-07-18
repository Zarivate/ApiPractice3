// This contains all the API code

// Express is the backend framework that will be used to create the API
const express = require("express");
const request = require("request-promise");

// Initialization of app
const app = express();

// Initialization of the port(s) that will be used when running the server
const PORT = process.env.PORT || 5000;

const apiKey = process.env.AMAZON_API_KEY;
const baseURL = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

// Initial root route, the second parameters is the callback function that has our request and our response
app.get("/", (req, res) => {
  // When someone visit this url on the API, thsi message is what is sent back
  res.send("Welcome to my first API");
});

// Route for getting product details. The colon here means that "productId" will be dynamic
app.get("/products/:productId", async (req, res) => {
  // The productId will be populated inside of req.params
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseURL}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Start the server by having it listen to a port, thanks to express a callback function can also be called when the app starts running
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
