/* File: gulpfile.js */

//package requirements
var gulp =        require('gulp'),
    gutil =       require('gulp-util'),

    jshint =      require('gulp-jshint'),
    sass =        require('gulp-sass'),
    plumber =     require('gulp-plumber'), // continues pipe even if error
    concat =      require('gulp-concat'),
    copy =        require('gulp-copy'),
    bower =       require('gulp-bower'),
    watch =       require('gulp-watch'),
    browser =     require('browser-sync'),
    run =         require('run-sequence'),
    del =         require('del'),
    isProd =      gutil.env.type === 'prod',

    paths = {
      filesrc: ['./src/**/*.*'],
      htmlsrc: ['./src/**/*.html'],
      sasssrc: ['./src/**/*.scss'],
      jssrc: ['./src/**/*.js'],
      mediasrc: ['./src/media/**/*', './source/favicon.ico'],
      destination: './public',
      coffeesrc: './source/**/*.coffee',
      temp: './temp',
      tempfiles: ['./temp/*.css', './temp/*.js']
    };


//build tasks
gulp.task('default', function(cb){
  run('build', 'serve', 'watch', cb);
});
gulp.task('build', ['clean:public', 'clean:temp'], function(cb){
  run('bower', 'build-js', 'build-css', 'copy', cb);
});
//refresh tasks
gulp.task('refresh', function(cb){
  return run('build', 'reload', cb);
});
gulp.task('serve', function(){
  browser.init({server: paths.destination});
});
gulp.task('reload', function(){
  browser.reload();
});
//wipe out public and temp folders on build
gulp.task('clean:public', function(cb){
  del([
    paths.destination
  ], cb);
});
gulp.task('clean:temp', function(cb){
  del([
    paths.temp
  ], cb);
});


//set which files to watch for changes
gulp.task('watch', function(){
  return watch(paths.filesrc, function(){
    gulp.start('refresh');
  });
});

//helper tasks
gulp.task('bower', function(){
  return bower();
});
gulp.task('jshint', function(){
  return gulp.src(paths.jssrc)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('build-css', function(){
  return gulp.src(paths.sasssrc)
  .pipe(plumber(function(error) {
    gutil.log(gutil.colors.red(error.message));
    this.emit('end');
  }))
  .pipe(sass({errLogToConsole: true}))
  .pipe(concat('styles.css'))
  .pipe(gulp.dest(paths.destination));
});
gulp.task('build-js', function(){
  return gulp.src(paths.jssrc)
  .pipe(plumber())
  .pipe(concat('index.js'))
    //uglify if you run 'gulp --type prod'
  .pipe(isProd ? uglify() : gutil.noop())
  .pipe(gulp.dest(paths.destination));
});
