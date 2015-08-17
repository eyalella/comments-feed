var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var jslint = require('gulp-jslint');

gulp.task('sass', function () {
  gulp.src('./src/js/components/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browserify', function() {
	browserify('./src/js/main.js')
		.transform('reactify')
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));

	gulp.src('src/assets/**/*.*')
		.pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['browserify', 'copy'], function(){
	gulp.watch('src/**/*.*', ['browserify', 'copy']);
	gulp.watch('./src/js/components/*.scss', ['sass']);
	
	gulp.src(['source.js'])
        .pipe(jslint({
            predef: [],
            reporter: 'default'
        })).on('error', function (error) {
            console.error(String(error));
        });
});