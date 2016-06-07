var gulp = require('gulp');
var ts = require('gulp-typescript');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build:server', function () {
    var tsProject = ts.createProject(path.resolve('./src/server/tsconfig.json'));
    var tsResult = gulp.src([
        'server/**/*.ts',
        '!server/typings/browser/**/*.ts',
        '!server/typings/browser.d.ts'
    ])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.resolve('./src/server')))
});
gulp.task('build:client', function () {
    var tsProject = ts.createProject(path.resolve('./src/client/tsconfig.json'));
    var tsResult = gulp.src([
        'client/app/**/*.ts',
        '!client/typings/browser/**/*.ts',
        '!client/typings/browser.d.ts'
    ])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.resolve('./src/client/app')))
});

gulp.task('build',['build:server', 'build:client']);

gulp.task('default', ['build']);
