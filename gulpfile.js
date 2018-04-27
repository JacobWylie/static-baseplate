'use strict'

const gulp       = require('gulp'),
	  concat     = require('gulp-concat'),
	  babel      = require('gulp-babel'),
	  sass       = require('gulp-sass'),
	  bs         = require('browser-sync').create();


gulp.task('browser-sync', () => {
	bs.init({
		server: {
			baseDir: './'
		}
	});
	gulp.watch('./sass/**/*.scss',['sass']);
	gulp.watch('./js/**/*.js',['javascript']);
	gulp.watch('index.html',['html']);
});


gulp.task('javascript', () => {
    gulp.src(['./js/**/*.js'])
        .pipe(babel({
            presets: ['env']
            }))
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(bs.reload({stream: true}));
})


gulp.task('sass', () => {
    gulp.src(['./sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(bs.reload({stream: true})); 
})


gulp.task('html', () => {
    gulp.src(['./index.html'])
        .pipe(gulp.dest((file) => file.base))
        .pipe(bs.reload({stream: true})); 
})


gulp.task('start', ['javascript', 'sass', 'html', 'browser-sync']);












