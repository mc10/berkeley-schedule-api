'use strict';

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let jshint = require('gulp-jshint');
let jscs = require('gulp-jscs');
let stylish = require('gulp-jscs-stylish');
let babel = require('gulp-babel');

let paths = ['src/*.js', '!node_modules/**/*.js'];

gulp.task('lint', function() {
  return gulp.src(paths)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jscs())
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build', function() {
  return gulp.src(paths)
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint']);
gulp.task('travis', ['lint']);
