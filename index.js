// This contains all the API code

// Express is the backend framework that will be used to create the API
const express = require("express");
const request = require("request-promise");

// Initialization of app
const app = express();

const PORT = process.env.PORT || 5000;
