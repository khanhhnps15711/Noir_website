const jwt = require('jsonwebtoken');

exports.checkLogin = function(req, res, next){
    const {session} = req;
    const url = req.originalUrl.toLowerCase();


    if (!session) {
        if (url.includes('login')) {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        const {token} = session;
        if (!token) {
            if (url.includes('login')) {
                next();
            } else {
                res.redirect('/login');
            }
        } else {
            jwt.verify(token, 'myKey', function(error, decoded){
                if (error) {
                    if (url.includes('login')) {
                        next();
                    } else {
                        res.redirect('/login');
                    }
                } else {
                    if (url.includes('login')) {
                        res.redirect('/category');
                    } else {
                        next();
                    }
                }
            })
        }
    }
}

// sử dụng cho API
exports.checkToken = function(request, response, next) {
    let token = null;
    if(request.headers.authorization &&
        request.headers.authorization.split(' ')[0] == 'Bearer')
        token = request.headers.authorization.split(' ')[1];
    
    if(token){
        jwt.verify(token, 'mykey', function(error, decoded) {
            if(error){
                response.json({ status: false })
            } else {                    
                next();            
            }
        })
    } else {
        response.json({ status: false })
    }    
}