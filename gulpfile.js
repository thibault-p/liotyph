'use strict';

// requirements
var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    size = require('gulp-size'),
    clean = require('gulp-clean');

function onError(err){
  console.log("Error: " + err.message);
  this.emit('end');
}



// tasks
gulp.task('default', ['clean'], function () {
  gulp.start('transform');
	gulp.watch('./liotyphserver/src/**/*', ['transform']);
});

gulp.task('transform', function () {
  return gulp.src('./liotyphserver/src/*.js')
    .pipe(browserify({transform: ['reactify']}).on('error', onError))
    .pipe(gulp.dest('./liotyphserver/static/js'))
    .pipe(size());
});

gulp.task('clean', function () {
  return gulp.src(["./liotyphserver/static/js"], {read: false}).pipe(clean());
});
