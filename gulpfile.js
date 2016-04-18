const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['server.js', 'gulpfile.js', '/lib/**/*.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(files, testFiles)
    .pipe(eslint({}))
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(testFiles)
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('watch', () => {
  gulp.watch(files, testFiles, ['default']);
});

gulp.task('default', ['lint', 'test']);
