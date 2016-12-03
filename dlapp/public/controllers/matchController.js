/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: match controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('matchController', ['$http', function($http) {
    "use strict";
    var self = this;

    // Get the list of projects from database
    self.projects=[];

    self.getProjectsList = function() {
        $http.get("/projects/list").then(function(response) {
            self.projects = response.data;
        });
    }();

    // dummy data, to be fetched from backend
    self.matches = [];

    // Reset count of students assigned to each project, everytime the page is loaded
    self.resetCountsOfAssignedStudents = function(){
      console.log('***** Reset Counts *****');
        for (var i=0; i < self.projects.length; i++){
          self.projects[i].updatedCount = 0;
      }
    };

    self.getStudentPreferences = function(studentName) {
      var prefs = [];
      console.log(studentName);
      $.each(self.students, function(index) {
        var student = self.students[index];
        var sName = student.firstName.concat('  ' ,student.lastName);
        if (sName == studentName) {
          prefs = [student.firstChoice];
          if (typeof student.secondChoice !== 'undefined') {
              prefs = prefs.concat(student.secondChoice);
          }
          if (typeof student.thirdChoice !== 'undefined') {
              prefs = prefs.concat(student.thirdChoice);
          }
          if (typeof student.fourthChoice !== 'undefined') {
              prefs = prefs.concat(student.fourthChoice);
          }
          if (typeof student.fifthChoice !== 'undefined') {
              prefs = prefs.concat(student.fifthChoice);
          }

          console.log(prefs);
          return prefs;
        }
      });
      return prefs;
    };


    // Get the list of students from database and auto-match project for each student
    self.students=[];
    self.getStudentsList = function() {
        self.resetCountsOfAssignedStudents();
        $http.get("/students/list").then(function(response) {
            self.students = response.data;
            var autoMatchedStudents = [];
            var j = 0;
            for(var i=0; i < self.students.length; i++){
                var student = self.students[i];
                var studentName = student.firstName.concat('  ' ,student.lastName);
                // console.log('Student name - '+studentName);

                // Update manual student-project assignment     
                if(self.manuallyOverriddenStudents.indexOf(studentName) > -1){
                  var mAssignedProject = self.studentProjectMap[studentName];
                  // console.log('Manually Assigned Project : '+mAssignedProject);
                  
                   var countOfStudentsAssigned = self.getCountOfStudentsAssignedForProject(mAssignedProject);
                    if(countOfStudentsAssigned == undefined){
                      countOfStudentsAssigned = 0;
                    }
                    
                    var maxStudentsForProject = self.getMaxStudentsRequiredForProject(mAssignedProject);
                
                    // If the assigned students count is less than reuired students count
                    if(countOfStudentsAssigned < maxStudentsForProject){
                        
                        // Update count of student-project assignment (manual override)
                        self.matches[j++]={'studentName':studentName, 'assigned': mAssignedProject};
                        self.saveUpdatedCount(mAssignedProject,countOfStudentsAssigned+1);
                    } else {
                      //console.log('Required limit reached...!!!');
                      var projectAssigned = self.getAutoMatch(student);                
                      self.matches[j++]={'studentName':studentName, 'assigned':projectAssigned};
                    }
                } else 
                {
                  autoMatchedStudents.push(student);
                }
            }
            
            //console.log('**** autoMatchedStudents : '+autoMatchedStudents);

            for(var i = 0; i < autoMatchedStudents.length; i++ ){
                var student = autoMatchedStudents[i];
                var studentName = student.firstName.concat('  ' ,student.lastName);

                // Call auto-match script to get the system assigned project          
                var projectAssigned = self.getAutoMatch(student);                
                self.matches[j++]={'studentName':studentName, 'assigned':projectAssigned};
            }
            //console.log("Final List", self.matches);
        });
    };
    self.getStudentsList();

    // Check the eligibility of student for a given project and return true/false
    self.checkEligibilityOfStudent = function(student, project){
        // Check gpa, major and other requirements
        for (var i=0; i < self.projects.length; i++){
          if (self.projects[i].title == project){
            if (student.gpa >= self.projects[i].gpa && self.projects[i].areas.indexOf(student.primaryMajor) > -1 ){
              console.log("Student eligible");
              return true;
            }
          }
        }
        console.log("Student not eligible");
        return false;
    };

    // Get the count of students already assigned for the project
    self.getCountOfStudentsAssignedForProject = function(project){
      for (var i=0; i < self.projects.length; i++){
        if (self.projects[i].title == project){
            return self.projects[i].updatedCount;
        }
      }
    };

    // Get the count of required students for the project
    self.getMaxStudentsRequiredForProject = function(project){
      for (var i=0; i < self.projects.length; i++){
        if (self.projects[i].title == project){
            return self.projects[i].number;
        }
      }
    };

    // Save the updated count of students assigned to the project
    self.saveUpdatedCount = function(project, updatedCount){
        // $http.post("/projects/update",{title:project, updatedCount: updatedCount}).then(function(response){
        //   //console.log("Updated Count");
        // });
        for (var i=0; i < self.projects.length; i++){
        if (self.projects[i].title == project){
            self.projects[i].updatedCount = updatedCount;
        }
      }
    };

    // Auto match student and project
    self.getAutoMatch = function(student) { 
         var projectPreferences = [student.firstChoice, student.secondChoice, student.thirdChoice, student.fourthChoice, student.fifthChoice];

         for(var i = 0; i < projectPreferences.length; i++){

            if (projectPreferences[i] != undefined){
              var project = projectPreferences[i];
              
              // If student is eligible, assign the project
              
              if(self.checkEligibilityOfStudent(student, project)){
                // Get the count of students already assigned for the project
                var countOfStudentsAssigned = self.getCountOfStudentsAssignedForProject(project);
                if(countOfStudentsAssigned == undefined){
                  countOfStudentsAssigned = 0;
                }
  
                // Get the count of required students for the project
                var maxStudentsForProject = self.getMaxStudentsRequiredForProject(project);
                
                if(countOfStudentsAssigned < maxStudentsForProject){
                    // Update count of students assigned
                    self.saveUpdatedCount(project,countOfStudentsAssigned+1);
                    return project;
                }
             }
         }
       }
         // If none of the students preferences match, return NA
         return "NA";
    };

    self.setSelection = function(student) {
        self.selectedStudent = student;
        self.tempAssigned = {"title": self.selectedStudent.assigned};
    };

    self.manuallyOverriddenStudents = [];
    self.studentProjectMap = {};

    self.autoMatchAfterManualOverride = function(studentName){
        
        self.selectedStudent.assigned = self.tempAssigned.title;

        // Update manually overridden students list
        self.manuallyOverriddenStudents.push(studentName);
        // Save manually overridden student project assignment in a map
        self.studentProjectMap[studentName] =  self.tempAssigned.title;

        // Re-run auto-match script
        self.getStudentsList();
    };

}]);
