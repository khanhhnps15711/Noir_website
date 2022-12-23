const userModel = require("./model");

// tầng gọi database
exports.login = async (username) => {
  // const user = data.filter(i => i.username==emai)[0];
  // return user;
  // asswordselect id username p from  users where username = ''
  const user = await userModel.findOne(
    { username: username },
    "id username password name phone_number address"
  );
  console.log("user: ", user);
  return user;
};

exports.register = async (username, password, phone_number, name, address) => {
  const user = new userModel({
    username,
    password,
    phone_number,
    name,
    address,
  });
  return await user.save();
};

exports.editProfile = async (username, name, phone_number , address) => {
  const user = await userModel.findOne({ username: username }, "id");
  console.log(user, "sao khong chay");
  if (user) {
    user.name = name;
    user.phone_number = phone_number;
    user.address = address;
    user.save();
  }
  return user;
};

exports.getUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};
