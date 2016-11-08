// Preprocesses JavaScript for development and production
'use strict'
module.exports = function(gulp, config){

	gulp.task('script', cb => {

		const browserify = require('browserify')
		const babelify = require('babelify')
		const stream = require('vinyl-source-stream')
		const buffer = require('vinyl-buffer')
		const sourcemaps = require('gulp-sourcemaps')
		const uglify = require('gulp-uglify')
		const plumber = require('gulp-plumber')
		const glob = require('glob')
		const merge = require('merge-stream')

		const browserifyOpts = {
			debug: true
		}
		const babelifyOpts = {
			presets: ['es2015', 'react'],
			sourceMaps: true
		}
		const uglifyOpts = {
			preserveComments: 'some',
			outSourceMap: true
		}
		const sourceMapOpts = {
			loadMaps: true
		}

		glob(`${config.src}/*.js`, (err, files) =>{
			if(err) cb(err)

			const tasks = files.map(entry => {
				return browserify(entry, browserifyOpts)
				.transform(babelify, babelifyOpts)
				.bundle()
				.on('error', config.onError.errorHandler)
				.pipe(stream(entry.replace(`${config.src}/`, '')))
				.pipe(buffer())
				// Gulp pipe starts here
				.pipe(plumber(config.onError))
				.pipe(sourcemaps.init(sourceMapOpts))
				.pipe(uglify(uglifyOpts))
				.pipe(sourcemaps.write('./'))
				.pipe(gulp.dest(config.dist))
				.pipe(config.notify('JavaScript processed'))
			})

			merge(tasks)
				.on('end', cb)

		})
	})



}