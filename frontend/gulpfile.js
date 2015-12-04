var gulp       = require('gulp');
var browserify = require('browserify');
var watchify   = require('watchify');
var streamify  = require('gulp-streamify');
var cssMin     = require('gulp-css');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var webserver  = require('gulp-webserver');

gulp.task('cssMinfy', function(){
    gulp.src('src/css/*.css')
    .pipe(cssMin())
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function () {
    watchify(browserify('./src/index.js'))
        .transform(babelify)
        .bundle()
        .on('error', function(err) {
            console.error(err.message);
        })
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify('./assets/')))
        .pipe(gulp.dest('./assets/'))
        .pipe(notify("Built Bundle"));
});

gulp.task('serve', function(){
  gulp.src('./')
        .pipe(webserver({
            livereload: true,
        }));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
        }));
    gulp.start('default');
    gulp.watch('./src/**/*.jsx', ['default']);
  });
