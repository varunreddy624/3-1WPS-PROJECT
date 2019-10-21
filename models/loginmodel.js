var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });

var signUpSchema = new mongoose.Schema({
  username: String,
  emailid: String,
  password: String,
  item: [String],
  date: [Date],
  todo: [String],
  role: String
});

module.exports = mongoose.model('signup',signUpSchema);
