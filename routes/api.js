var express = require('express');
var router = express.Router();

const userController = require('../components/user/controller');
const productController = require('../components/products/controller');
const cartController = require('../components/carts/controller');
const cart_itemController = require('../components/cart_item/controller');
const orderController = require('../components/orders/controller');
const imageController = require('../components/image/controller');
const jwt = require('jsonwebtoken');
const authentication = require('../middle/authentication');
const { eventNames } = require('../components/carts/model');

/**
 * page: register
 * http://localhost:3000/api/register
 * method: post
 */
router.post('/register', async function (req, res, next) {
    const { username, password, confirm_password, phone_number, name, address } = req.body;
    // kiểm tra username, password
    const result = await userController.register(username, password, confirm_password, phone_number, name, address);
    if (result) {
        res.json({ status: true });
    } else {
        res.json({ status: false });
    }
});

/**
 * page: login
 * http://localhost:3000/login
 * method: post
 */
router.post('/login', async function (req, res, next) {
    const { username, password } = req.body;
    const result = await userController.login(username, password);
    if (result) {
        const token = jwt.sign({ _id: result._id, username: result.username, name: result.name, phone_number: result.phone_number, address: result.address }, 'mykey');
        res.json({ status: true, result, token });
        console.log(result)
    } else {
        res.json({ status: false });
    }
});

/**
 * page: edit profile
 * http://localhost:3000/edit_profile
 * method: post
 */
router.post('/editprofile', async function (req, res, next) {
    const { username, name, phone_number, address } = req.body;
    const result = await userController.editProfile(username, name, phone_number, address);
    if (result) {
        res.json({ status: true });
    } else {
        res.json({ status: false });
    }
    // await userController.editProfile(id, phone_number,name,address);
});
/**
 * page: user
 * http://localhost:3000/api/profile/:id
 * method: get
 */
router.get("/profile/:id", async function(req, res , next) {
    const { id } = req.params;
    const user = await userController.getUserById(id);
    res.json(user);
    
});



/**
 * page: products
 * http://localhost:3000/api/products
 * method: get
 */
router.get("/products", async function (req, res, next) {
    const products = await productController.getProducts();
    res.json(products);
});
/**
 * page: products detail
 * http://localhost:3000/api/products/id/detail
 * method: get
 */
router.get("/products/:id/detail", async function (req, res, next) {
    const { id } = req.params;
    const product = await imageController.getImagesById(id);
    console.log("detail 1product", product)
    res.json(product);
});

/**
 * page: search product
 * http://localhost:3000/api/products/search
 * method: get
 */
 router.post("/products/search", async function (req, res, next) {
    const {name} = req.body;
    const products = await productController.search(name);
    res.json(products);
});

/*
lay danh sach san pham trong cart theo id
*/
router.get("/cart_item/:id", async function (req, res, next) {
    const { id } = req.params;
    const cart_item = await cart_itemController.getAll(id);
    if (cart_item) {
        res.json({ status: true , cart_item });
    } else {
        res.json({ status: false });
    }
    
   
});

/**
 * page: cart
 * http://localhost:3000/api/insert_cart
 * method: post
 */
router.post('/insert_cart', async function (req, res, next) {
    const { user_id } = req.body;
    const result = await cartController.insert(user_id);
    console.log('hello', result);
    res.json(result);

});
/**
 * chỉnh sữa total trong cart
 * page: cart
 * http://localhost:3000/api/update_cart
 * method: post
 */
router.post('/update_cart', async function (req, res, next) {
    const { total, user_id } = req.body;
    await cartController.update(total, user_id);
});

/**
 * delete cart
 * page: cart
 * http://localhost:3000/api/:id/delete
 * method: delete
 */
router.delete('/:id/delete', async function (req, res, next) {
    const { id } = req.params;
    await cartController.delete(id);
});

/**
 * page: cart_item
 * http://localhost:3000/api/insert_cart_item
 * method: post
 */
router.post('/insert_cart_item', async function (req, res, next) {
    const { price, quantity, cart_id, product_id } = req.body;
    const result = await cart_itemController.insert(price, quantity, cart_id, product_id);
    if (result) {
        res.json({ status: true, data: result });
    } else {
        res.json({ status: false });
    }
});

/**
 * chỉnh sữa peice, quantity trong cart_item
 * page: cart
 * http://localhost:3000/api/update_cart_item
 * method: post
 */
router.post('/update_cart_item', async function (req, res, next) {
    const { id, price, quantity } = req.body;
    await cart_itemController.update(id, price, quantity);
});

/**
 * delete cart_item
 * page: cart
 * http://localhost:3000/api/:id/delete
 * method: delete
 */
router.delete('/:id/delete_cart_item', async function (req, res, next) {
    const { id } = req.params;
    await cart_itemController.delete(id);
});

/**
 * insert order 
 * page: 
 * http://localhost:3000/api/insert_order
 * method: post
 */
router.post('/insert_order', async function (req, res, next) {
    const { status, total, products ,shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address} = req.body;
    const result = await orderController.insert(status, total, products ,shipping_fee, pay_id, user_id , user_name , user_phonenumber , user_address);
    if (result) {
        res.json({ status: true });
    } else {
        res.json({ status: false });
    }
});

/**
 * insert order detail
 * page: 
 * http://localhost:3000/api/insert_order_detail
 * method: post
 */
router.post('/insert_order_detail', async function (req, res, next) {
    const { quantity, price, order_id, product_id } = req.body;
    await orderController.insert(quantity, price, order_id, product_id);
})

router.get("/getAllOrders/:id", async function (req, res, next) {
    const { id } = req.params;
    const oder = await orderController.getAllOrders(id);
    res.json(oder);
});

router.get("/getOrderDetail/:id", async function (req, res, next) {
    const { id } = req.params;
    const oderdetail = await orderController.getByIdOder(id);
    res.json(oderdetail);
});


module.exports = router;