const express = require('express');
const { body } = require('express-validator');
const product_controller = require('../controller/productController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const errors = require('../middleware/errors');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/productLogo')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });
const router = express.Router();

router.post('/add-product', auth, upload.single('logo'),
  body('name').not().isEmpty().trim().escape(),
  body('sku').not().isEmpty(),
  body('description').not().isEmpty(),
  body('category').not().isEmpty(),
  body('assignedTo').not().isEmpty(),
  errors,
  product_controller.add_product
);

router.route('/product/:id/:source')
  .delete(auth, product_controller.deleteproduct)
  .patch(auth, product_controller.updateproduct)
  .get(auth, product_controller.getproduct);

router.get('/all-products', auth, product_controller.getallproducts);
router.post('/assign-product/:id', auth, product_controller.assignProductToUsers);

module.exports = router;
