'use strict';

var gulp = require('gulp');
var browserSync  = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch([
      'loader/**/*.html',
      'loader/**/*.js'
    ]).on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);