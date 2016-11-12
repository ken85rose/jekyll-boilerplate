// Builds from src to dist or from dist to build
'use strict'
module.exports = (gulp, config) => {


	// Clears, then builds dist folder
	gulp.task('dist', cb => {
		const runSequence = require('run-sequence')
		runSequence(
			'undist',
			'jekyll',
			['style', 'script', 'svg', 'img'],
			cb
		)
	})


	// Clears, then builds dist
	gulp.task('build', ['dist'])


	// Clear dist folder
	gulp.task('undist', () => {
		const del = require('del')
		const paths = require('vinyl-paths')
		return gulp.src(config.dist)
			.pipe(paths(del))
	})



}