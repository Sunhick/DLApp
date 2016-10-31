/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: students model
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
    countryBoulder: String,
    phoneNumberBoulder: String,
    emailBoulder: String,
    addressLine1Summer: String,
    addressLine2Summer: String,
    citySummer: String,
    stateSummer: String,
    zipSummer: String,
    countrySummer: String,
    phoneNumberSummer: String,
    emailSummer: String,
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
      upload_to: make_upload_to_model(uploads, 'data.resume')
   });

   studentSchema.plugin(filePlugin, {
      name: "coverLetter",
      upload_to: make_upload_to_model(uploads, 'data.coverLetter')
 });

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;
