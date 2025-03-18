const express = require("express");
require("dotenv").config();
const connectToMongo = require('./config/db');
const { body } = require('express-validator');
const cors = require('cors');
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(cors());

connectToMongo();

app.use("")


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));