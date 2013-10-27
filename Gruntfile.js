/* jshint node: true */
module.exports = function (grunt) {
  'use strict';

  // Automatically load npm tasks from package.json
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Output project byte size
    bytesize: {
      all: {
        src: [
          'dist/*.js',
          'src/<%= pkg.name %>.js'
        ]
      }
    },

    clean: ['dist'],

    jshint: {
      files: ['src/<%= pkg.name %>.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    uglify: {
      build: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
        }
      }
    }

  });

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'jshint',
    'uglify',
    'bytesize'
  ]);

};