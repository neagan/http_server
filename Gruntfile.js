'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.initConfig({
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'server.js', 'routes.js', 'test/**/*.js']
      },
      options: {
        jshintrc: './config/.jshintrc'
      }
    },

    jscs: {
      dev: {
        src: ['Gruntfile.js', 'server.js', 'routes.js', 'test/**/*.js']
      },
      options: {
        config: './config/.jscsrc',
        esnext: true,
        verbose: true,
        requireCurlyBraces: ['if']
      }
    },

    simplemocha: {
      dev: {
        src: ['test/**/*.js']
      },
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      }
    }
  });

  grunt.registerTask('test', ['jshint:dev', 'jscs:dev', 'simplemocha:dev']);
  grunt.registerTask('default', ['test']);
};
