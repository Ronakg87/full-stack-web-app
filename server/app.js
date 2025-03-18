const express = require('express');
const app = express();
const { body } = require('express-validator');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const errors = require('./middleware/errors');
const user_controller = require("./controller/userController");
const product_controller = require("./controller/productController");
const auth = require("./middleware/auth");
app.post("/api/login", 
    body('email').not().isEmpty().isEmail().normalizeEmail(),
    body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
    minLength: 8,
    maxLength: 20,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    }),
    errors,
    user_controller.user_login);

app.get("/api/auth", auth, user_controller.auth);

app.post("/api/create-user", 
  body('name').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
    minLength: 8,
    maxLength: 20,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body('role').not().isEmpty(),
  errors,
  auth,
  user_controller.register_user
);

app.post("/api/add-product",
    auth,
    body('product_name').not().isEmpty().trim().escape(),
    body('sku').not().isEmpty(),
    body('description').not().isEmpty(),
    body('category').not().isEmpty(),
    // body('logo').not().isEmpty(),
    errors,
    product_controller.add_product);

    
// app.post("/api/secure_password", body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
//     minLength: 8,
//     maxLength: 20,
//     minLowercase: 1,
//     minUppercase: 1,
//     minNumbers: 1,
//     minSymbols: 1,
//     }),
//     errors,
//     user_controller.securepassword);

    
module.exports = app;