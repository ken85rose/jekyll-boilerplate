'use strict'
module.exports = (gulp, config) => {

	const runSequence = require('run-sequence')
	const shell = require('gulp-shell')
	const opt = { verbose: true }

	gulp.task('jekyll:build', () => {
		return gulp.src('')
			.pipe(shell('bundle exec jekyll build', opt))
			.pipe(config.notify('Jekyll built'))
	})

	gulp.task('jekyll:bundle', () => {
		return gulp.src('')
			.pipe(shell('bundle install', opt))
			.pipe(config.notify('Jekyll gems installed'))
	})

	gulp.task('jekyll', (cb) => {
		runSequence(
			['jekyll:date', 'jekyll:bundle'],
			'jekyll:build',
			'jekyll:fix',
			cb
		)
	})


	// Jekyll post-build quirk fixes
	// Prettify archive links
	gulp.task('jekyll:move-archive', () => {
		const rename = require('gulp-rename')
		const del = require('del')
		const paths = require('vinyl-paths')
		return gulp.src(`${config.dist}/archive/**/index.html`)
			.pipe(rename(path => {
				if(path.dirname == '.'){
					path.basename = 'archive'
				}
				else{
					path.basename = path.dirname
					path.dirname = 'archive'
				}
			}))
			.pipe(gulp.dest(config.dist))
	})
	gulp.task('jekyll:fix-clean', () => {
		const paths = require('vinyl-paths')
		const del = require('del')
		const addSrc = require('gulp-add-src')
		return gulp.src([
				`${config.dist}/archive/*`,
				`!${config.dist}/archive/*.html`
			])
			.pipe(addSrc(`${config.dist}/archive/index.html`))
			.pipe(paths(del))
	})
	gulp.task('jekyll:fix', cb => {
		runSequence(
			'jekyll:move-archive',
			'jekyll:fix-clean',
			cb
		)
	})

	// Automatically dates empty .md files
	gulp.task('jekyll:date', cb => {
		const glob = require('glob')

		let files
		glob('_posts/**/*.{md,markdown,html}', (err, f) => {
			if(err) throw err
			files = f
			next()
		})

		let prog = -1
		function next(){
			prog++
			if(prog >= files.length){
				return cb()
			}
			readFrontMatter(files[prog], next)
		}
	})
	gulp.task('date', ['jekyll:date'])

	// Reads front matter to see if it needs to be dated
	function readFrontMatter(file, cb){
		const fs = require('fs')
		const grayMatter = require('gray-matter')

		fs.readFile(file, 'utf8', (err, data) => {
			if(err) throw err

			let matter = grayMatter(data)
			if('date' in matter.data){
				cb()
			}
			else{
				writeFrontMatter(file, matter, cb)
			}
		})
	}

	// Writes front matter if it needs to be dated
	function writeFrontMatter(file, obj, cb){
		const fs = require('fs')
		const grayMatter = require('gray-matter')

		let date = (new Date()).toISOString()

		obj.data.date = date
		const data = grayMatter.stringify(obj.content, obj.data)

		fs.writeFile(file, data, err => {
			if(err) throw err
			cb()
		})
	}



}