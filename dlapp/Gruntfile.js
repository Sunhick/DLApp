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
          'dist/js/dlapp.min.js': ['public/controllers/dlapp.js', 'public/controllers/*.js', 'public/filters/*.js']
        },
        tasks: ['jshint', 'uglify']
      }
    },

    cssmin: {
      build: {
        files: {
          'dist/css/style.min.css': 'public/stylesheets/*.css'
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
        main: {
          files: [
            { expand: true, 
              //flatten: true,
              cwd: 'public/',
              src: [
                      'bower_components/*',

                      // copy images
                      'images/*'
                    ], 
              dest: 'dist/' },
          ]}
        },
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