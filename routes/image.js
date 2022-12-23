var express = require('express');
var router = express.Router();

const imageController = require('../components/image/controller');
const upload = require('../middle/upload');
const authentication = require('../middle/authentication');

/* GET image page. */
router.get('/', [], async function (req, res, next) {

  // lấy danh sách hình ảnh
  const data = await imageController.getImages();
  console.log(data)
  res.render('image', { image: data });
});



/**
 * page: insert image
 * http://localhost:3000/product/:id/insert_image
 * method: post
 * detail:add one image
 */
 router.post('/', [upload.single('image'),  ], async function (req, res, next) {
  // hiển thị trang thêm mới
  let { body, file } = req;
  let image = '';
  if (file) {
    image = `http://192.168.1.5:3000/images/${file.filename}`
    body = { ...body, image }
    console.log("image", body);
  }
  await imageController.insert_image(body);
  res.redirect('/image');
});

/* GET image page. */
router.get('/:id', [], async function (req, res, next) {
  const {id} = req.params;
  // lấy danh sách hình ảnh
  const data = await imageController.getImagesById(id);
  console.log(data)
  res.render('image_1product', { image: data });
});

module.exports = router;