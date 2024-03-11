const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password:String
});
const UserModel = mongoose.model("user", userSchema);
console.log(UserModel)
module.exports = {UserModel};
