var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var run = require('run-sequence');
var plumber = require('gulp-plumber');

var config = {
  src: {
    sass: ['./sass/*.scss'],
    js: ['./js/*.js', './js/**/*.js']
  },

  dest: {
    css: './public',
    js: './public'
  }
};

gulp.task('default', function(cb) {
  run('css', 'watch', cb);
});

gulp.task('css', function(cb) {
  return gulp.src(config.src.sass)
    .pipe(plumber())
    .pipe(sass({errLogToConsole: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('js', function(cb) {
  return gulp.src(config.src.js)
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('watch', function() {
  gulp.watch(config.src.sass, ['css']);
  gulp.watch(config.src.js, ['js']);
});
