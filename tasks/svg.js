// Minifies and creates SVG maps
'use strict'
module.exports = (gulp, config) => {
	const plumber = require('gulp-plumber')

	// Minify and map SVGs
	gulp.task('svg:map', () => {
		const svgMin = require('gulp-svgmin')
		const svgStore = require('gulp-svgstore')
		const rename = require('gulp-rename')

		let dirName
		return gulp.src(`${config.src}/${config.img}/${config.svgMapPrefix}*/*.svg`)
			.pipe(plumber(config.onError))

			// Minify and give each sprite an ID that matches its filename
			.pipe(svgMin(file => {
				let prefix = path.basename(file.relative, path.extname(file.relative));
				return {
					plugins: [{
						cleanupIDs: {
							prefix: prefix + '-',
							minify: true
						}
					}]
				}
			}))

			// Get directory name
			.pipe(rename(path => {
				dirName = path.dirname.replace(config.svgMapPrefix, '')
			}))

			// Create map
			.pipe(svgStore())

			// Rename map to directory name without prefix
			.pipe(rename(path => {
				path.basename = dirName
			}))

			// Done!
			.pipe(gulp.dest(config.dist + '/' + config.img))
	})

	// Minify non-map SVGs
	gulp.task('svg:min', () => {
		const svgMin = require('gulp-svgmin')
		const changed = require('gulp-changed')
		return gulp.src([
				`${config.src}/${config.img}/**/*.svg`,
				`!${config.src}/${config.img}/${config.svgMapPrefix}*/*.svg`
			])
			.pipe(plumber(config.onError))
			.pipe(changed(`${config.dist}/${config.img}`))
			.pipe(svgMin())
			.pipe(gulp.dest(`${config.dist}/${config.img}`))
	})


	gulp.task('svg', ['svg:min', 'svg:map'])

}