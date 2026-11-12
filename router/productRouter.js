const router = require('express').Router();
const { addProduct, getAllProduct, getOneProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const uploads = require('../middlewares/multer');

router.post('/product', uploads.single('productImage'), addProduct);

router.get('/allProduct',  getAllProduct);

router.get('/oneProduct/:id',  getOneProduct);

router.patch('/product/:id', uploads.single('productImage'), updateProduct);

router.delete('/deletedProduct/:id', uploads.single('productImage'), deleteProduct);

module.exports = router;