/**
*  @Author: Sunil bn <sunhick@gmail.com>
*  @Desc: grunt file for deployment
*
*  Copyright (c) 2016. University of Colorado, boulder
*/
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['public/controllers/*.js', 'public/filters/*.js']
    },

    uglify: {
      build: {
        files: {
          'dist/js/dlapp.min.js': [
              'public/bower_components/jquery/dist/jquery.min.js',
              'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
              'public/bower_components/angular/angular.min.js',
              'public/bower_components/angular-route/angular-route.min.js',
              'public/bower_components/angular-resource/angular-resource.min.js',
              'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
              'public/bower_components/datatables.net/js/jquery.dataTables.min.js',
              'public/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js',
              'public/bower_components/angular-datatables/dist/angular-datatables.min.js',
              'public/controllers/dlapp.js', 
              'public/controllers/*.js', 
              'public/filters/*.js'
              ]
        },
        tasks: ['jshint', 'uglify']
      }
    },

    cssmin: {
      build: {
        files: {
          'dist/css/style.min.css': [
              'public/stylesheets/*.css',
              'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
              'public//bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css',
              ]
        }
      }
    },

    watch: {
      css: {
        files: ['public/stylesheets/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/controllers/*.js', 'public/filters/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    nodemon: {
      dev: {
        script: 'app.js'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },

    copy: {
        images: {
          files: [
            { expand: true, 
              //flatten: true,
              cwd: 'public/',
              src: [
                      // copy images
                      'images/*'
                    ], 
              dest: 'dist/' },
          ]},

          fonts: {
            files: [
            { expand: true, 
              flatten: true,
              cwd: 'public/',
              src: [
                      'bower_components/bootstrap/fonts/*',
                      'bower_components/font-awesome/fonts/*',
                    ], 
              dest: 'dist/fonts' },
          ]}
        },

    // copy: {
    //     main: {
    //       files: [
    //         { expand: true, 
    //           //flatten: true,
    //           cwd: 'public/',
    //           src: [
    //                   'bower_components/**/*.min.js',
    //                   'bower_components/**/*.min.css',

    //                   // copy images
    //                   'images/*'
    //                 ], 
    //           dest: 'dist/' },
    //       ]}
    //     },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-nodemon');
  // grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', [
          'cssmin', 
          'jshint', 
          'uglify',
          'copy',
          // 'concurrent'
        ]);

};