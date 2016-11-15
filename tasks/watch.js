// Controls file watching & live reload
'use strict'
module.exports = (gulp, config) => {

	// Watches files for changes
	gulp.task('watch-files', () => {

		// Process source files when changed
		gulp.watch(`${config.src}/**/*.scss`, ['style'])
		gulp.watch(`${config.src}/**/*.js`, ['script'])
		gulp.watch(`${config.src}/**/*.{png,jpg,jpeg,gif}`, ['img'])
		gulp.watch(`${config.src}/**/*.svg`, ['svg'])

		// Watch markdown for Jekyll builds
		gulp.watch([
			'**/*.{md,markdown}',
			'_layouts/*.html',
			'_config.yml',
			'!_drafts/*.{md,markdown}'
		], ['jekyll:build'])

		// Watch for gem changes
		gulp.watch('Gemfile', ['jekyll'])

		// Reload browser on file changes
		gulp.watch(`${config.dist}/**/*.{html,js,svg,jpg,jpeg,gif,png}`, config.browserSync.reload)

	})


	// Watch and browser sync tasks
	gulp.task('default', cb => {
		const runSequence = require('run-sequence')
		runSequence('build', ['watch'], cb)
	})

	// Browser sync and watch files
	gulp.task('watch', ['server', 'watch-files', 'auto-reload'])
	gulp.task('sync', ['watch'])


	gulp.task('auto-reload', function() {
		let p
		// Reload Gulp on task changes
		gulp.watch([
			'gulpfile.js',
			`${config.tasks}/**/*.js`
		], spawnChildren)
		spawnChildren()

		function spawnChildren(e) {
			const spawn = require('child_process').spawn
			if(p) p.kill()
			p = spawn('gulp', ['watch-files'], {stdio: 'inherit'})
		}

	})
}