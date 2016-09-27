const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () =>
    gulp.src(['src/**/*.js', '!src/**/__tests__/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('lib'))
);
