"use strict";
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    prefix = require('gulp-autoprefixer');

gulp.task('server', function() {
    browserSync.init({
      server: {
        port: 3000,
        baseDir: "./app"
      },
      notify:false
    });
});

gulp.task('styles', function(){
  gulp.src('./app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 15 versions']
    }))
    .pipe( gulp.dest('./app/css') )
    .pipe(browserSync.stream());
});

gulp.task('build', function(){
  gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
    .pipe(gulp.dest('./build'))
})

gulp.task('csso', function () {
    return gulp.src('./app/css/main.css')
        .pipe(csso())
        .pipe(gulp.dest('./build/css/main.min.css'));
});

gulp.task('watch', ['server'], function(){
  gulp.watch('./app/sass/**/*.sass', ['styles']);
  gulp.watch(`app/*.html`, browserSync.reload);
  gulp.watch(`app/js/**/*.js`, browserSync.reload);
});

gulp.task('default', ['watch']);
