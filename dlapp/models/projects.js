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
    weblink: String,
    specialReq: String,
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

var studentSchema = new Schema({
    firstName: String,
    lastName: String,
    gender: String,
    origin: String,
    race: String,
    addressLine1Boulder: String,
    addressLine2Boulder: String,
    cityBoulder: String,
    stateBoulder: String,
    zipBoulder: Number,
    emailBoulder: String,
    phoneNumerBouler: String,
    addressLine1Summer: String,
    addressLine2Summer: String,
    citySummer: String,
    stateSummer: String,
    zipSummer: String,
    emailSummer: String,
    phoneNumberSummer: String,
    primaryMajor: String,
    gpa: Number,
    secondaryMajor: String,
    schoolLevel: String,
    listGradMonth: String,
    listGradYear: Number,
    sid: Number,
    researchExperience: String,
    appliedBefore: String,
    otherFallEmployment: String,
    projectInterest: String,
    firstChoice: String,
    secondChoice: String,
    thirdChoice: String,
    fourthChoice: String,
    fifthChoice: String,
    backgroundCheck: String,
    backgroundCheckSem: String,
    backgroundCheckYear: String,
    awarenessTraining: String,
    awarenessTrainingSem: String,
    awarenessTrainingYear: String,
    ssnInfo: Number,
    firstSkill: String,
    secondSkill: String,
    thirdSkill: String,
 });

studentSchema.plugin(filePlugin, {
   name: "resume",
   upload_to: make_upload_to_model(uploads, 'resume')
});

studentSchema.plugin(filePlugin, {
   name: "coverLetter",
   upload_to: make_upload_to_model(uploads, 'coverLetter')
});
       
var Project = mongoose.model('Project', projectSchema);
var Student = mongoose.model('Student', studentSchema);

module.exports = Project;
