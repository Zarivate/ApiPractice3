// Express is the backend framework that will be used to create the API
const express = require("express");
const request = require("request-promise");

// Initialization of app
const app = express();

// Initialization of the port(s) that will be used when running the server
const PORT = process.env.PORT || 5000;

// Since apiKeys should normally not be public, this function will instead take an API key and return a url
// with that key as a parameter that can be used later on in the rest of the code
const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

// Initial root route, the second parameters is the callback function that has our request and our response
app.get("/", (req, res) => {
  // When someone visit this url on the API, thsi message is what is sent back
  res.send("Welcome to my first API");
});

// Route for GETting product details. The colon here means that "productId" will be dynamic and all the urls are based off the actual Amazon urls query params
app.get("/products/:productId", async (req, res) => {
  // The productId will be populated inside of req.params
  const { productId } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Another route/endpoint, this time for GETting the reviews of the item
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Route/endpoint for GETting the product offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET search results for any product
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Start the server by having it listen to a port, thanks to express a callback function can also be called when the app starts running
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
