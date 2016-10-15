/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: app users model
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    // username: String,
    email: String,

    // I shouldn't be storing clear text password. But it's okay for now. will change it to hash later
    password: String 
});

var Users = mongoose.model('Users', usersSchema);

module.exports = Users;
