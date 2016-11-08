// Preprocesses Sass for development and production
'use strict'
module.exports = function(gulp, config){

	// Transpile Sass
	gulp.task('style', function(){

		const sourcemaps = require('gulp-sourcemaps')
		const sass = require('gulp-sass')
		const autoprefixer = require('gulp-autoprefixer')
		const csso = require('gulp-csso')
		const plumber = require('gulp-plumber')

		return gulp.src(`${config.src}/*.scss`)
			.pipe(plumber(config.onError))
			.pipe(sourcemaps.init())
			.pipe(sass({
				outputStyle: 'compressed',
				include: [
					'./node_modules'
				]
			}))
			.pipe(autoprefixer({
				browsers: config.browsers
			}))
			.pipe(csso())
			.pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(config.dist))
			.pipe(config.browserSync.stream())
			.pipe(config.notify('Styles processed'))

	})



}