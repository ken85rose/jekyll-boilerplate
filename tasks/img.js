// Preprocesses and copies images
'use strict'
module.exports = function(gulp, config){
	const plumber = require('gulp-plumber')

	let imgConfig = []

	// Process images in _config.json file
	gulp.task('img:process', () => {

		const fs = require('fs')
		const gulpIf = require('gulp-if')
		const imageResize = require('gulp-image-resize')
		const merge = require('merge-stream')
		const rename = require('gulp-rename')
		const imageMin = require('gulp-imagemin')
		const changed = require('gulp-changed')

		// Needs to be sync due to a post-finish gulp/write stream error?
		const data = fs.readFileSync(`./${config.src}/${config.img}/_config.json`, 'utf8')

		imgConfig = JSON.parse(data)
		const streams = []

		// Create a different stream for each group of images
		imgConfig.forEach((imgData, i) => {

			// If format is changing
			const opts = {}
			if(imgData.format){
				opts.extension = `.${imgData.format}`
			}

			imgData.imageMagick = true
			streams[i] = gulp.src(imgData.src)
				.pipe(plumber(config.onError))
				.pipe(gulpIf(('suffix' in imgData), rename(function(path){
					path.basename += imgData.suffix
					delete imgData.suffix
				})))
				.pipe(gulpIf(('prefix' in imgData), rename(function(path){
					path.basename = `${imgData.prefix}${path.basename}`
					delete imgData.prefix
				})))
				.pipe(gulpIf(('rename' in imgData), rename(function(path){
					path.basename = imgData.rename
					delete imgData.rename
				})))
				.pipe(changed(`${config.dist}/${config.img}`, opts))
				.pipe(imageResize(imgData))
		})



		// Merge streams & minify
		return merge(streams)
			.pipe(imageMin())
			.pipe(gulp.dest(`${config.dist}/${config.img}`))




	})


	gulp.task('img:ico', () => {
		const changed = require('gulp-changed')
		return gulp.src(`${config.src}/**/*.ico`)
			.pipe(plumber(config.onError))
			.pipe(changed(`${config.dist}`))
			.pipe(gulp.dest(`${config.dist}`))
	})

	// Doesn't process, just copies and minifies images
	gulp.task('img:copy', () => {
		const imageMin = require('gulp-imagemin')
		const changed = require('gulp-changed')

		// Build a glob of images that were not processed
		const src = [
			`${config.src}/${config.img}/**/*.{png,jpg,gif}`
		]
		let i
		for(i = imgConfig.length; i--;){
			src.push(`!${imgConfig[i].src}`)
		}

		// Copy to img dir
		return gulp.src(src)
			.pipe(plumber(config.onError))
			.pipe(changed(`${config.dist}/${config.img}`))
			.pipe(imageMin())
			.pipe(gulp.dest(`${config.dist}/${config.img}`))

	})
	gulp.task('img:notify', () => {
		return gulp.src('')
			.pipe(config.notify('Images processed & compressed'))
	})


	// Process and copy
	gulp.task('img', cb => {
		const runSequence = require('run-sequence')
		runSequence(
			'img:process',
			['img:copy', 'img:ico'],
			'img:notify',
			cb
		)
	})



}