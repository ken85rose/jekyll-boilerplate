// List all plugin names
'use strict'
module.exports = (gulp, config) => {


	// Trims out bower, node module, dist, git, and demo folders	
	gulp.task('trim', cb => {
		const vinylPaths = require('vinyl-paths')
		const del = require('del')
		let src = [
			'.sass-cache',
			'_site',
			'docs',
			'dist',
			'node_modules',
			'bower_components',
			'.git'
		]
		if(config.dynamicPug){
			src.push(config.dist)
			src.push(config.dynamicPugDirectory)
		}
		return gulp.src(src)
			.pipe(vinylPaths(del))
	})

	gulp.task('clean', ['trim'])

}