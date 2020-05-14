const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const yargs = require('yargs').argv;
var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(babel())
    .pipe(gulp.dest('./dist'));
});

if (yargs.listen) {
  gulp.watch('src/**/*.ts', gulp.parallel(['default']));
}
