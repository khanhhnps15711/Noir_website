var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();

const ordersController = require('../components/orders/controller');
const authentication = require('../middle/authentication');
/**
 * page: order
 * http://localhost:3000/order
 * method: get
 * detail: get list orders
 */
 router.get('/', [], async function (req, res, next) {

  // lấy danh sách danh muc
  const data = await ordersController.getOrders();
  console.log("data", data)
  res.render('orders', { orders: data });
});



/**
 * page: order
 * http://localhost:3000/order/:id/edit
 * method: get
 * detail:get one order
 */
router.get('/:id/edit', [], async function (req, res, next) {
  // lấy 1 danh muc
  const { id } = req.params;
  const orders = await ordersController.getById(id);
  console.log("oder_detail", orders)
  res.render('order_update', { orders: orders });
});

/**
 * page: order
 * http://localhost:3000/order/:id/edit
 * method: post
 * detail:update one order
 */
router.post('/:id/edit', [], async function (req, res, next) {
  // cập nhật 1 danh muc
  let { params, body } = req;

  await ordersController.update(params.id, body);

  res.redirect('/orders');
});

/**
 * page: detail
 * http://localhost:3000/orders/:id/detail
 * method: get
 * detail: detail one order
 */

  router.get('/:id/detail', async function (req, res, next){
    let {params} = req;
    let detail = await ordersController.getByIdOder(params.id);
    console.log("detail", detail)
    res.render('order_detail', {detail: detail});    
  });
module.exports = router;