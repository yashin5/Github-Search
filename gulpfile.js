
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
const minify = require('gulp-minify');

//task para o sass
gulp.task('sass', function () {
    return gulp.src('app/sass/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('app/css'));
});

//task para o watch
gulp.task('watch', function () {
    gulp.watch('app/sass/*.sass', ['sass'], ["js/**/*.js"]);
});

//task default gulp
gulp.task('default', ['sass', 'watch']);
 
gulp.task('compact', function() {
  gulp.src('app/js/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('app/js'))
});