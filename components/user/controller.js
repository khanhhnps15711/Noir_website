// tầng xử lý
const userService = require('./service');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');

exports.login = async (username, password) => {
    const user = await userService.login(username);
    // console.log('login', username, password, user)
    // if (user && user.password == password) {
    //     return user;
    // }
    // return null;
    // console.log(user, username, password);
    if (!user) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(checkPassword, password, user.password);
    if (!checkPassword) return null;
    return { _id: user._id, username: user.username, name: user.name, phone_number: user.phone_number, address: user.address };

}

exports.register = async (username, password, confirm_password, phone_number, name, address) => {
    if (password != confirm_password) return null;
    let user = await userService.login(username);
    if (user) return null;

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(username, hash, phone_number, name, address);
    return { _id: user._id };
}

exports.editProfile = async (username , phone_number, name, address ) => {
    const user = await userService.editProfile(username, phone_number, name, address);
    console.log(user);
    return {phone_number: user.phone_number, name: user.name, address: user.address };
    // await userService.editProfile(id, phone_number, name, address);
}

exports.getUserById = async(id) => {
    try {
    let user = await userService.getUserById(id);
     user = {
        _id: user._id,
        name: user.name,
        phone_number: user.phone_number,
        address: user.address
     }
     return user;
    }
    catch (err) {
        console.log('error',err);
        return null;
    }
};

