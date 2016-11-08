'use strict'
module.exports = function(gulp, config){

	const runSequence = require('run-sequence')
	const shell = require('gulp-shell')
	const opt = { verbose: true }

	gulp.task('jekyll:build', () => {
		return gulp.src('')
			.pipe(shell('jekyll b', opt))
			.pipe(config.notify('Jekyll built'))
	})

	gulp.task('jekyll:bundle', () => {
		return gulp.src('')
			.pipe(shell('bundle install', opt))
			.pipe(config.notify('Jekyll gems installed'))
	})

	gulp.task('jekyll', cb => {
		runSequence('jekyll:build', 'jekyll:bundle', cb)
	})

}