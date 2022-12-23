var express = require('express');
var router = express.Router();

const userController = require('../components/user/controller');
const authentication = require('../middle/authentication');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', layout: false });
});

module.exports = router;

/* GET login page. */
router.get('/login', [], function(req, res, next) {
  console.log("Thấy dòng này là không sai login nhưng vẫn quay lại login");
  res.render('login', {layout: false});

});

router.post('/login', async function (req, res, next) {
  // xử lý login
  // đọc email, password từ body
  const { username, password } = req.body;
  // kiểm tra email, password
  const result = await userController.login(username, password);
  // nếu đúng: chuyển qua trang sản phẩm
  if (result) {
    const token = jwt.sign({_id: result._id, username: result.username}, 'mykey');
    req.session = token;
    console.log("Session:", req.body);
    res.redirect('/category');
  }
  // nếu sai: vẫn ở trang login
  else {
    console.log("Thấy dòng này là sai login");
    res.redirect('/login');
  }
});


module.exports = router;


//test router
router.get('/1', function(req, res, next) {
  res.render('order_detail');
});

module.exports = router;

//test router
router.get('/2', function(req, res, next) {
  res.render('profile');
});

module.exports = router;

//test router
router.get('/3', function(req, res, next) {
  res.render('image_insert');
});

module.exports = router;