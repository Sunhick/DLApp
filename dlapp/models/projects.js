/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: routes
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
var mongoose = require('mongoose');
var filePluginLib = require('mongoose-file');
var filePlugin = filePluginLib.filePlugin;
var make_upload_to_model = filePluginLib.make_upload_to_model;
var path = require('path');

var Schema = mongoose.Schema;

var uploads_base = path.join(__dirname, "uploads");
var uploads = path.join(uploads_base, "u");

var projectSchema = new Schema({
    // primary faculty information
    fName: String,
    phoneNumber: String,
    fEmail: String,
    fDepartment: String,
    fCommunities: Boolean,

    // secondary faculty information
    secName: String,
    secphoneNumber: String,
    secEmail: String,
    secDepartment: String,
    secCommunities: Boolean,

    // grad student information
    gradName: String,
    gradPhoneNumber: String,
    gradEmail: String,

    // apprenticeship information
    title: String,
    number: Number,
    Specific: String,
    updatedCount: Number,
    weblink: String,
    specialReq: String,
    gpa: String,
    hours: String,
    desc: String,
    areas: [String],
    supervisionAmt: String,
    supervisionBy: String,
    natureWrk: String,
    priorWrk: String,

    // finances
    finances: String,

    //other
    pastApprentice: Boolean
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
