const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title : {
    type : String
  },
  link : {
    type : String
  },
  tag : {
    type : String
  },
  publication : {
    type : String
  }
});

const article = mongoose.model('article', articleSchema);

module.exports = article;
