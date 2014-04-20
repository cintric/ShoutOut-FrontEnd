module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: [ 'js/*.js', 'css/*.css' ],
        tasks: ['default'],
      },
    },
    uglify: {
      options: {
        banner: '/*! Last Modified: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand: true,
        src: ['js/*.js', '!*.min.js'],
        dest: '',
        ext: '.min.js'
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    }
  });

  // Watch for changes
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Minify JS
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Minify CSS
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);
};