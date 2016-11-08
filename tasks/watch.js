// Controls file watching & live reload
'use strict'
module.exports = function(gulp, config){


	// Watches files for changes
	gulp.task('watch', function(){

		// Process source files when changed
		gulp.watch(`${config.src}/**/*.scss`, ['style'])
		gulp.watch(`${config.src}/**/*.js`, ['script'])
		gulp.watch(`${config.src}/**/*.{png,jpg,jpeg,gif}`, ['img'])
		gulp.watch(`${config.src}/**/*.svg`, ['svg'])

		// Watch markdown for Jekyll builds
		gulp.watch([
			'**/*.md',
			'_layouts/*.html',
			'_config.yml',
			'!_drafts/*.md'
		], ['jekyll'])

		// Reload browser on file changes
		gulp.watch(`${config.dist}/**/*.{html,js,svg,jpg,gif,png}`, config.browserSync.reload)

		// Reload Gulp on task changes
		gulp.watch([
			'gulpfile.js',
			`${config.tasks}/**/*.js`
		], ['gulp-reload'])

	})


	// Watch and browser sync tasks
	gulp.task('default', function(cb){
		const runSequence = require('run-sequence')
		runSequence('build', ['sync', 'watch'], cb)
	})

	// Browser sync and watch files
	gulp.task('sync-watch', ['sync', 'watch'])
	gulp.task('watch-sync', ['sync', 'watch'])

	// Reloads gulp after task changes
	gulp.task('gulp-reload', function(){
		console.log('Gulp reloaded!')
		let spawn = require('child_process').spawn
		spawn('gulp', ['sync-watch'], { stdio: 'inherit' })
		process.exit()
	})


}