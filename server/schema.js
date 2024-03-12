const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    name: String,
    transferFee: String,
    year: Number,
    from: String,
    to: String,
    img: String,
    created_by: String
});
const TestModel = mongoose.model("footycollections", testSchema);
console.log(TestModel)
module.exports = {TestModel};
