var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const imageController = require('../components/image/controller');
const upload = require('../middle/upload');
const authentication = require('../middle/authentication');


/**
 * page: product
 * http://localhost:3000/product
 * method: get
 * detail: get list products
 */
router.get('/', [], async function (req, res, next) {

  // lấy danh sách sản phẩm
  const data = await productController.getProducts();
  console.log(data)

  res.render('products',  {products: data} );
});

/**
* page: product
* http://localhost:3000/product
* method: post
* detail: insert new products
*/
router.post('/', [upload.single('image'),], async function (req, res, next) {

  // xử lý thêm mới sản phẩm
  let { body, file} = req;
  let image = '';
  if (file) {
    image = `http://192.168.1.5:3000/images/${file.filename}`
    body = { ...body, image }
    console.log("image", body);
  }
  await productController.insert(body);

  res.redirect('/product');
});

/**
 * page: product
 * http://localhost:3000/product/:id/delete
 * method: delete
 * detail:delete products
 */
router.delete('/:id/delete', [], async function (req, res, next) {
  // xóa sản phẩm
  const { id } = req.params;
  await productController.delete(id);
  // tra ve dữ liệu dạng json
  res.json({ result: true });
});

/**
 * page: product
 * http://localhost:3000/product/:id/edit
 * method: get
 * detail:get one product
 */
router.get('/:id/edit', [], async function (req, res, next) {
  // lấy 1 sản phẩm
  const { id } = req.params;
  const product = await productController.getById(id);
  console.log("1 product", product)
  //lấy danh mục 1 sp
  const categories = await categoryController.getCategories();

  res.render('product_update', { product: product, categories: categories });
});

/**
 * page: product
 * http://localhost:3000/product/:id/edit
 * method: post
 * detail:update one product
 */
router.post('/:id/edit', [upload.single('image'),], async function (req, res, next) {
  // cập nhật 1 sản phẩm
  let { params, body, file } = req;
  let image = '';
  delete body.image;
  if (file) {
    image = `http://192.168.1.5:3000/images/${file.filename}`
    body = { ...body, image }
  }
  await productController.update(params.id, body);

  res.redirect('/product');
});

/**
 * page: product
 * http://localhost:3000/product/insert
 * method: get
 * detail:insert new product
 */
router.get('/insert', [], async function (req, res, next) {
  // hiển thị trang thêm mới
  const categories = await categoryController.getCategories();
  res.render('product_insert', { categories: categories });
});

/**
 * page: insert image
 * http://localhost:3000/product/:id/insert_image
 * method: get
 * detail:get one image
 */
 router.get('/:id/insert_image', [], async function (req, res, next) {
  // hiển thị trang thêm mới
  const {id} = req.params;
  res.render('image_insert', {id: id});
});

module.exports = router;

