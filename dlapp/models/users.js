/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: app users model
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: String,
    email: String,
    password: String
});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
