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
const UserCreationAccess = require("./middleware/userAccessibility");
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
  auth,
  UserCreationAccess,
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
  user_controller.register_user
);

app.post("/api/update-password", 
  auth, 
  // body('password', 'Password must be at least 8 chars long').isLength({ min: 8 }).not().isEmpty(),
  body('password','Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long').isStrongPassword({
    minLength: 8,
    maxLength: 20,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  errors,
  user_controller.update_password);

app.route('/api/user/:id').patch(auth, user_controller.updateuser).get(auth, user_controller.getuser);
app.get("/api/allusers", user_controller.getAllUsers);

app.post("/api/add-product",
    auth,
    body('name').not().isEmpty().trim().escape(),
    body('sku').not().isEmpty(),
    body('description').not().isEmpty(),
    body('logo').not().isEmpty(),
    body('category').not().isEmpty(),
    // body('source').not().isEmpty(),
    body('assignedTo').not().isEmpty(),
    errors,
    product_controller.add_product);

    app.route('/api/product/:id').delete(auth, product_controller.deleteproduct).patch(auth, product_controller.updateproduct).get(auth, product_controller.getproduct);

    app.get("/api/all-products", auth, product_controller.getallproducts);

    app.post("/api/assign-product/:id", auth, product_controller.assignProductToUsers);

    
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