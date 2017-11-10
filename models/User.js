const mongoose = require("mongoose");
// assign mongoose promise the global promise for async wait functionality
mongoose.Promise = global.Promise;
// get the schema obj 
const Schema = mongoose.Schema;
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [email.validator, "Enter a valid email address"],
    required: "Provide a valid email address"
  },
  name: {
    type: String,
    trim: true,
    required: "Supply your name please"
  }
});