'use strict';

// requirements
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    size = require('gulp-size'),
    clean = require('gulp-clean');

// tasks
gulp.task('default', ['clean'], function () {
  gulp.start('transform');
	gulp.watch('./project/src/', ['transform']);
});

gulp.task('transform', function () {
	gulp.task('transform', function () {
  return gulp.src('./project/src/*.js')
    .pipe(browserify({transform: ['reactify']}))
    .pipe(gulp.dest('./project/static/js'))
    .pipe(size());
});
});

gulp.task('clean', function () {
  return gulp.src(["./project/static/js"], {read: false}).pipe(clean());
});
