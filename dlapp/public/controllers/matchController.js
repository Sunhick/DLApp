/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: match controller 
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('matchController', ['$http', function($http) {
    "use strict";
    var self = this;

    // dummy data, to be fetched from backend
    self.matches = [
        {
            studentName: "John cart",
            assigned: "Project-1"
        },
        {
            studentName: "Lucy meyers",
            assigned: "Project-4"
        },
        {
            studentName: "William Luck",
            assigned: "Project-3"
        },
        {
            studentName: "Sunil Murthy",
            assigned: "Project-2"
        },
    ];

    // Get the list of students from database and auto-match project for each student
    self.students=[];
    self.getStudentsList = function() {
        $http.get("/students/list").then(function(response) {
            self.students = response.data;
            for(var i=0; i < self.students.length; i++){
                var student = self.students[i];
                var projectAssigned = self.getAutoMatch(student);
 
                // Save the project and student mapping
                self.saveAssignedProjectAndStudent(student,projectAssigned);
            }
        });
    }();

    // Check the eligibility of student for a given project and return true/false
    self.checkEligibilityOfStudent = function(student, project){
        // Check gpa, major and other requirements
        return true;
    };

    // Get the count of students already assigned for the project
    self.getCountOfStudentsAssignedForProject = function(project){
        return 3;
    };

    // Get the count of required students for the project
    self.getMaxStudentsRequiredForProject = function(project){
        return 5;
    };

    // Save the updated count of students assigned to the project
    self.saveUpdatedCount = function(project,updatedCount){
        // Write code
    };

    // Save the project assigned to student in database
    self.saveAssignedProjectAndStudent = function(student,project){
        // Write code
    };

    // Auto match student and project
    self.getAutoMatch = function(student) {
         var projectPreferences = [student.firstChoice, student.secondChoice, student.thirdChoice, student.fourthChoice, student.fifthChoice];

         for(var i = 0; i < projectPreferences.length; i++){

            var project = projectPreferences[i];
            // If student is eligible, assign the project

             if(self.checkEligibilityOfStudent(student, project)){

                // Get the count of students already assigned for the project
                var countOfStudentsAssigned = self.getCountOfStudentsAssignedForProject(project);

                // Get the count of required students for the project
                var maxStudentsForProject = self.getMaxStudentsRequiredForProject(project);
                
                if(countOfStudentsAssigned < maxStudentsForProject){
                    // Update count of students assigned
                    self.saveUpdatedCount(project,countOfStudentsAssigned+1);

                    return project;
                }  
             }
         }
         // If none of the students preferences match, return NA
         return "NA";
    };

    self.setSelection = function(student) {
        self.selectedStudent = student;
        self.tempAssigned = self.selectedStudent.assigned;
    };
    
}]);