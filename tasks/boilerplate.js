// Push to or pull from boilerplate repo
'use strict'
module.exports = (gulp, config) => {
	const shell = require('gulp-shell')
	const vinylPaths = require('vinyl-paths')
	const jsonEditor = require('gulp-json-editor')
	const runSequence = require('run-sequence')
	const fs = require('fs')

	const boilerplateRepo = 'https://github.com/ken85rose/jekyll-gulp-boilerplate.git'
	const shellOpt = {
		verbose: true
	}
	const shellTempOpt = {
		cwd: 'temp',
		verbose: true
	}



	// Update to latest boilerplate
	// Clone boilerplate to temp directory
	gulp.task('boilerplate:clone', () => {
		return gulp.src('')
			.pipe(shell(`git clone "${boilerplateRepo}" temp`, shellOpt))
	})
	// Clean dependencies and task files
	gulp.task('boilerplate:preclean', () => {
		return gulp.src([
				'node_modules',
				'bower_components',
				'tasks'
			])
			.pipe(vinylPaths(del))
	})
	// Copy relevent files from boilerplate repo
	gulp.task('boilerplate:copyfromtemp', () => {
		return gulp.src([
				'temp/**/*',
				'!temp/.git',
				'!temp/src/**/*',
				'!temp/dist/**/*',
				'!temp/demo/**/*',
				'!temp/README.md',
				'!temp/build'
			])
			.pipe(gulp.dest('./'))
	})
	// Delete temp boilerplate directory
	gulp.task('boilerplate:postclean', () => {
		return gulp.src('temp')
			.pipe(vinylPaths(del))
	})
	// Update settings with project info
	gulp.task('boilerplate:settings', () => {
		return gulp.src([
				'./package.json',
				'./bower.json'
			])
			.pipe(jsonEditor(json => {
				json.name = config.package.name
				json.title = config.package.title
				json.description = config.package.description
				return json
			}))
			.pipe(gulp.dest('./'))
	})
	// Install new dependencies
	gulp.task('boilerplate:install', () => {
		return gulp.src('')
			.pipe(shell('npm install', shellOpt))
			.pipe(shell('bower install', shellOpt))
	})


	// Pull!
	gulp.task('boilerplate:pull', cb => {
		runSequence(
			['boilerplate:clone', 'boilerplate:preclean'],
			'boilerplate:copyfromtemp',
			['boilerplate:postclean', 'boilerplate:settings'],
			'boilerplate:install',
			cb
		)
	})



	// Delete tasks from boilerplate repo
	gulp.task('boilerplate:deleterepofiles', () => {
		return gulp.src([
				'temp/tasks',
				'temp/src'
			])
			.pipe(vinylPaths(del))
	})

	// Copy relevent files to boilerplate repo
	gulp.task('boilerplate:copytotemp', () => {
		return gulp.src([
				'gulpfile.js',
				'.gitignore'
			])
			.pipe(gulp.dest('./temp/'))
	})
	gulp.task('boilerplate:copytotemptasks', () => {
		return gulp.src('tasks/**/*')
			.pipe(gulp.dest('temp/tasks'))
	})
	gulp.task('boilerplate:copytotempsrc', () => {
		return gulp.src('src/**/*')
			.pipe(gulp.dest('temp/src'))
	})

	// Copy dependencies to json files
	gulp.task('boilerplate:copypackage', cb => {
		fs.readFile('./package.json', 'utf8', (err, data) => {
			if(err){
				throw err
			}
			let obj = JSON.parse(data)
			gulp.src('./temp/package.json')
				.pipe(jsonEditor(json => {
					json.devDependencies = obj.devDependencies
					return json
				}))
				.pipe(gulp.dest('./temp'))
				.on('end', cb)
		})
	})
	gulp.task('boilerplate:pushrepo', () => {
		return gulp.src('')
			.pipe(shell('git add .', shellTempOpt))
			.pipe(shell(`git commit -m "Updates from ${config.package.title}"`, shellTempOpt))
			.pipe(shell('git push -u origin master', shellTempOpt))
	})


	// Push!
	gulp.task('boilerplate:push', cb => {
		runSequence(
			'boilerplate:clone',
			'boilerplate:deleterepofiles',
			[
				'boilerplate:copytotemp',
				'boilerplate:copytotemptasks',
				'boilerplate:copypackage'
			],
			'boilerplate:pushrepo',
			'boilerplate:postclean',
			cb
		)
	})


}