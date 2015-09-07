var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var run = require('run-sequence');

var config = {
  src: {
    sass: ['./sass/*.scss'],
  },

  dest: {
    css: './public/stylesheets'
  }
};

gulp.task('default', function(cb) {
  run('css', 'watch', cb);
});

gulp.task('css', function(cb) {
  return gulp.src(config.src.sass)
    .pipe(sass({errLogToConsole: true}))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('watch', function() {
  return watch(config.src.sass, function() {
    gulp.start('css')
  });
});
