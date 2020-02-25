const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
    Image Schema for storing images in the 
    mongodb database
*/
var ImageSchema = new Schema({
  picture: { data: Buffer, contentType: String }
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
