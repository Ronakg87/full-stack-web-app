const app = require('./app');
// const express = require("express");
require("dotenv").config();
const connectToMongo = require('./config/db');

const PORT = process.env.PORT || 5000

// const app = express();
// app.use(express.json());
// app.use(cors());

connectToMongo();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));