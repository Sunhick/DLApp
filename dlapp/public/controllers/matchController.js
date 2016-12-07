/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: match controller
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
angular.module('dlapp').controller('matchController', ['$http', '$window', function($http, $window) {
    "use strict";
    var self = this;

    // Get the list of projects from database
    self.projects=[];

    self.getProjectsList = function() {
        $http.get("/projects/list").then(function(response) {
            self.projects = response.data;
        });
    }();


    // Map of Number of student who applied to each project
    self.studentCount = {};
    self.updateStudentCount = function(project){
      if(self.studentCount[project] == undefined){
        self.studentCount[project] = 0;
      }
      self.studentCount[project] = self.studentCount[project]+1;
    };

    // Has student-project matched list
    self.matches = [];

    // Reset count of students assigned to each project, everytime the page is loaded
    self.resetCountsOfAssignedStudents = function(){
      console.log('***** Reset all Counts *****');
      self.studentCount={};   //needs to be reset everytime
        for (var i=0; i < self.projects.length; i++){
          self.projects[i].updatedCount = 0;
      }
    };

    self.getStudentPreferences = function(studentName) {
      var prefs = [];
      $.each(self.students, function(index) {
        var student = self.students[index];
        var sName = student.firstName.concat(' ' ,student.lastName);
        if (sName == studentName) {
          prefs = [student.firstChoice];
          // self.updateStudentCount(student.firstChoice)
          if (typeof student.secondChoice !== 'undefined') {
              prefs = prefs.concat(student.secondChoice);
              // self.updateStudentCount(student.secondChoice);
          }
          if (typeof student.thirdChoice !== 'undefined') {
              prefs = prefs.concat(student.thirdChoice);
              // self.updateStudentCount(student.thirdChoice);
          }
          if (typeof student.fourthChoice !== 'undefined') {
              prefs = prefs.concat(student.fourthChoice);
              // self.updateStudentCount(student.fourthChoice);
          }
          if (typeof student.fifthChoice !== 'undefined') {
              prefs = prefs.concat(student.fifthChoice);
              // self.updateStudentCount(student.fifthChoice);
          }
          return prefs;
        }
      });
      return prefs;
    };

    self.compare = function (student1, student2){
      if(parseFloat(student1.gpa) < parseFloat(student2.gpa))
        return 1;
      if (parseFloat(student1.gpa) > parseFloat(student2.gpa))
        return -1;
      return 0;
    };


    self.sortList = function(seniors, autoMatchedStudents, finalList, toDo){
      var seniorIndex =[];

      if (toDo == "add"){
        for (var student in seniors){
          finalList.push(seniors[student]);
          seniorIndex.push(autoMatchedStudents.indexOf(seniors[student]));
        }
      }
      if (toDo == "remove"){
        for (var student in seniors){
          seniorIndex.push(autoMatchedStudents.indexOf(seniors[student]));
        }
      }
      for(var i = 0; i < autoMatchedStudents.length; i++ ){
        if(seniorIndex.indexOf(i) == -1 )
          finalList.push(autoMatchedStudents[i]);
      }
      console.log("Final List in function:", finalList);
      return finalList;
    };

    // Get the list of students from database and auto-match project for each student
    self.students=[];
    self.getStudentsList = function() {
        self.resetCountsOfAssignedStudents();

        $http.get("/students/list").then(function(response) {
            self.students = response.data;

            // for(var i=0; i < self.students.length; i++){
            //   var studentName = self.students[i].firstName.concat(' ' ,self.students[i].lastName);
            //   self.updateStudentCount(self.students[i].firstChoice)
            //   if (typeof self.students[i].secondChoice !== 'undefined') {
            //       self.updateStudentCount(self.students[i].secondChoice);
            //   }
            //   if (typeof self.students[i].thirdChoice !== 'undefined') {
            //       self.updateStudentCount(self.students[i].thirdChoice);
            //   }
            //   if (typeof self.students[i].fourthChoice !== 'undefined') {
            //       self.updateStudentCount(self.students[i].fourthChoice);
            //   }
            //   if (typeof self.students[i].fifthChoice !== 'undefined') {
            //       self.updateStudentCount(self.students[i].fifthChoice);
            //   }
            // }
            //
            // self.students = response.data;

            var autoMatchedStudents = [];
            var finalList = [];
            var j = 0;

            for(var i=0; i < self.students.length; i++){
                var student = self.students[i];
                var studentName = student.firstName.concat(' ' ,student.lastName);
                // console.log('Student name - '+studentName);

                // Update manual student-project assignment
                if(self.manuallyOverriddenStudents.indexOf(studentName) > -1){
                  var mAssignedProject = self.studentProjectMap[studentName];
                  // console.log('Manually Assigned Project : '+mAssignedProject);

                  var index = self.projects.findIndex(x=> x.title==mAssignedProject);  //made changes to get Count and getMax functions

                   var countOfStudentsAssigned = self.getCountOfStudentsAssignedForProject(self.projects[index] );
                    if(countOfStudentsAssigned == undefined){
                      countOfStudentsAssigned = 0;
                    }

                    var maxStudentsForProject = self.getMaxStudentsRequiredForProject(self.projects[index]) ;

                    // If the assigned students count is less than reuired students count
                    if(countOfStudentsAssigned < maxStudentsForProject){

                        // Update count of student-project assignment (manual override)
                        self.matches[j++]={'studentName':studentName, 'assigned': mAssignedProject};
                        self.saveUpdatedCount(self.projects[index], countOfStudentsAssigned+1);
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
            console.log("Count of students in each project:", self.studentCount);

            //Remove students with less than 3.0 GPA
            var gpa = autoMatchedStudents.filter(function(o){return parseFloat(o.gpa) < 3.0;} );
            finalList = self.sortList(gpa, autoMatchedStudents, [], "remove");
            console.log("Final list after GPA:", finalList);

            //Sort based on GPA
            finalList.sort(self.compare);
            console.log("Lets see if this is sorted on GPA", finalList);


            // Re-arranging the student list to priorities Senior-level students
            var seniors = finalList.filter(function(o){return o.schoolLevel == "Senior";} );
            finalList = self.sortList(seniors, finalList, [], "add");
            console.log("Final list senior:", finalList);

            // Re-arranging the student list to priorities 5th-year Senior-level students
            var seniors5 = finalList.filter(function(o){return o.schoolLevel == "5th year Senior";} );
            console.log(seniors5);
            finalList = self.sortList(seniors5, finalList, [], "add");
            console.log("Final list 5th year:", finalList);


            // Prioritise based on previous DLA application
            var notSelectedEarlier = finalList.filter(function(o){return (o.appliedBefore == "yes" && o.appliedBeforeProjectAssigned == "no");} );
            finalList = self.sortList(notSelectedEarlier, finalList, [], "add");
            console.log("Finallist after DLA add", finalList);

            var selectedEarlier = finalList.filter(function(o){return (o.appliedBefore == "yes" && o.appliedBeforeProjectAssigned == "yes");} );
            finalList = self.sortList(selectedEarlier, finalList, [], "remove");
            console.log("Finallist after DLA remove", finalList);

            for(var i=0; i < finalList.length; i++){
              var studentName = finalList[i].firstName.concat(' ' ,finalList[i].lastName);
              self.updateStudentCount(finalList[i].firstChoice)
              if (typeof finalList[i].secondChoice !== 'undefined') {
                  self.updateStudentCount(finalList[i].secondChoice);
              }
              if (typeof finalList[i].thirdChoice !== 'undefined') {
                  self.updateStudentCount(finalList[i].thirdChoice);
              }
              if (typeof finalList[i].fourthChoice !== 'undefined') {
                  self.updateStudentCount(finalList[i].fourthChoice);
              }
              if (typeof finalList[i].fifthChoice !== 'undefined') {
                  self.updateStudentCount(finalList[i].fifthChoice);
              }
            }
            console.log(self.studentCount);

            //console.log('**** autoMatchedStudents : '+autoMatchedStudents);
            for(var i = 0; i < finalList.length; i++ ){
                var student = finalList[i];
                var studentName = student.firstName.concat(' ' ,student.lastName);

                // Call auto-match script to get the system assigned project
                var projectAssigned = self.getAutoMatch(student);
                self.matches[j++]={'studentName':studentName, 'assigned':projectAssigned};
            }
            //console.log("Final List", self.matches);
        });
    };
    self.getStudentsList();

    self.findMax = function(projectScore){
      var max = -99, x, assignedProject;
      for( x in projectScore) {
          if( projectScore[x] > max){
            max = projectScore[x];
            assignedProject=x;
          }
        }
        return assignedProject;
    }

    self.isEmpty = function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  };

    // Check the eligibility of student for a given project and return true/false
    self.checkEligibilityOfStudent = function(student, project){
      console.log("In checkEligibilityOfStudent....");
      var projectScore={}; // holds the score for each project
      var flag=false;

        // Check gpa, major and other requirements
      for (var i=0; i < project.length; i++){
        console.log("Project under consideration:", student, project[i]);
        var index = self.projects.findIndex(x=> x.title==project[i]);
        console.log("Find index:", self.projects[index].gpa);
        console.log("sGPA:", student.gpa);
        //if (student.bsMbProgram == "no")

        if (parseFloat(student.gpa) >= parseFloat(self.projects[index].gpa) && self.projects[index].areas.indexOf(student.primaryMajor) > -1 && (student.serverAllYear == "yes" || student.serverAllYear == "not_sure" || typeof student.serverAllYear == 'undefined')){
          console.log("Student meets gpa & major criteria...");
          if (i==0 || i ==1){
            var studentName = student.firstName.concat(' ' ,student.lastName);
            if (studentName.localeCompare(self.projects[index].Specific)!=-1){
              console.log("Student is selected by faculty...");
              return project[i];
            }
            console.log("Student is not selected by faculty...");
          }

          console.log("Updating student count...", self.studentCount);
          projectScore[self.projects[index].title] = 1/self.studentCount[self.projects[index].title];
          console.log("Project score update:", projectScore[self.projects[index].title]);
          console.log("Student eligible");
          flag = true;
          }
        }

        console.log(projectScore);


      if(flag){

        // while (projectScore !== 'undefined') {
        while (!self.isEmpty(projectScore)) {

          var assignedProject = self.findMax(projectScore);
          console.log("Max Valued Project:", assignedProject);

          var project = self.projects[self.projects.findIndex(x=> x.title==assignedProject)];
          console.log(project);
          var countOfStudentsAssigned = self.getCountOfStudentsAssignedForProject(project);
          if(countOfStudentsAssigned == undefined){
            countOfStudentsAssigned = 0;
          }

          // Get the count of required students for the project
          var maxStudentsForProject = self.getMaxStudentsRequiredForProject(project);
          // console.log(maxStudentsForProject);
          if(countOfStudentsAssigned < maxStudentsForProject){
            // self.studentCount[assignedProject] = self.studentCount[assignedProject]-1;
            return assignedProject;
          }
          delete projectScore[assignedProject];
          console.log("after", projectScore);

        }
        return false;
      }
      console.log("Student not eligible");
      return false;
    };


    // Get the count of students already assigned for the project
    self.getCountOfStudentsAssignedForProject = function(project){
            return project.updatedCount;
    };

    // Get the count of required students for the project
    self.getMaxStudentsRequiredForProject = function(project){
            return project.number;
    };

    // Save the updated count of students assigned to the project
    self.saveUpdatedCount = function(project, updatedCount){
        // $http.post("/projects/update",{title:project, updatedCount: updatedCount}).then(function(response){
        //   //console.log("Updated Count");
        // });
        var index = self.projects.findIndex(x=> x.title==project.title)
        self.projects[index].updatedCount = updatedCount;

    };

    // Auto match student and project
    self.getAutoMatch = function(student) {
              var studentName = student.firstName.concat(' ' ,student.lastName);
              var studentProject = self.getStudentPreferences(studentName);

              // If student is eligible, assign the project
              var matchedProject = self.checkEligibilityOfStudent(student, studentProject);
              var project = self.projects[self.projects.findIndex(x=> x.title==matchedProject)];
              console.log("matched project for:", student, matchedProject);
              if(matchedProject){
                // Get the count of students already assigned for the project
                // console.log("inside if");
                console.log(project);
                var countOfStudentsAssigned = self.getCountOfStudentsAssignedForProject(project);
                if(countOfStudentsAssigned == undefined){
                  countOfStudentsAssigned = 0;
                }

                // Get the count of required students for the project
                var maxStudentsForProject = self.getMaxStudentsRequiredForProject(project);
                // console.log(maxStudentsForProject);
                if(countOfStudentsAssigned < maxStudentsForProject){
                    // Update count of students assigned
                    self.saveUpdatedCount(project,countOfStudentsAssigned+1);
                    return project.title;
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
    //Export to Excel sheet
    self.generateReport = function(){
      var styles = {
        headerDark: {
          font: {
            bold: true
          }
        }
      };
      var specification = {studentName:{displayName: "Student Names", headerStyle: styles.headerDark}};
      self.projects.forEach(function(project){
        specification[project.title.split(' ').join('_').toLowerCase()] = {displayName: project.title, headerStyle: styles.headerDark};
      });
      //console.log(specification)
      var dataSet = [];
      self.matches.forEach(function(match){
        var tempData = {};
        tempData['studentName'] = match.studentName;
        tempData[match.assigned.split(' ').join('_').toLowerCase()] = 'X';
        dataSet.push(tempData);
      })
      //console.log(dataSet);
      $http.post('/projects/report',{specification: specification, dataset: dataSet, responseType: 'arraybuffer'}).then(function(res){
        console.log("report generated");
        $window.open('/projects/getcsv');
        // var blob = new Blob([res.data], {type: res.headers()['content-type']})
        // var link = document.createElement('a');
        // link.href = URL.createObjectURL(blob);
        // link.download = "report.xlsx"
        // link.click();
      })

      //window.location.href = "/projects/report?specification="+JSON.stringify(specification)+"&dataset="+JSON.stringify(dataSet);
    }
}]);
