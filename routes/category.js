var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const categoryController = require('../components/categories/controller');
const authentication = require('../middle/authentication');
/**
 * page: category
 * http://localhost:3000/category
 * method: get
 * detail: get list categories
 */
 router.get('/', [], async function (req, res, next) {

  // lấy danh sách danh muc
  const data = await categoryController.getCategories();
  console.log("data", data)
  res.render('categories', { categories: data });
});

/**
* page: category
* http://localhost:3000/category
* method: post
* detail: insert new categories
*/
router.post('/', [],  async function (req, res, next) {

  // xử lý thêm mới danh muc
  let { body } = req;

  await categoryController.insert(body);

  res.redirect('/category');
});


/**
 * page: category
 * http://localhost:3000/category/:id/edit
 * method: get
 * detail:get one category
 */
router.get('/:id/edit', [], async function (req, res, next) {
  // lấy 1 danh muc
  const { id } = req.params;
  const category = await categoryController.getById(id);

  res.render('category_update', { category: category });
});

/**
 * page: category
 * http://localhost:3000/category/:id/edit
 * method: post
 * detail:update one category
 */
router.post('/:id/edit', [], async function (req, res, next) {
  // cập nhật 1 danh muc
  let { params, body } = req;

  await categoryController.update(params.id, body);

  res.redirect('/category');
});

/**
 * page: category
 * http://localhost:3000/category/insert
 * method: get
 * detail:insert new category
 */
router.get('/insert', [],  async function (req, res, next) {
  // hiển thị trang thêm mới
  const categories = await categoryController.getCategories();
  res.render('category_insert', { categories: categories });
});


module.exports = router;