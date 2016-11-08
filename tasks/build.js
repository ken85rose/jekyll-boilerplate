// Builds from src to dist or from dist to build
'use strict'
module.exports = function(gulp, config){


	// Clears, then builds dist folder
	gulp.task('dist', function(cb){
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
	gulp.task('undist', function(){
		const del = require('del')
		const vinylPaths = require('vinyl-paths')
		return gulp.src(config.dist)
			.pipe(vinylPaths(del))
	})



}