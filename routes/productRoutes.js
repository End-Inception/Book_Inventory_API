const express = require('express');
const router = express.Router();
const { getProducts, postProducts, updateProduct, delProduct } = require('../controllers/productController');


router.get('/products', getProducts);
router.post('/products', postProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', delProduct);

module.exports = router;