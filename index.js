// This contains all the API code

// Express is the backend framework that will be used to create the API
const express = require("express");
const request = require("request-promise");

// Initialization of app
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Initial root route, the second parameters is the callback function that has our request and our response
app.get("/", (req, res) => {
  // When someone visit this url on the API, thsi message is what is sent back
  res.send("Welcome to my first API");
});

// Start the server by having it listen to a port, thanks to express a callback function can also be called when the app starts running
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
