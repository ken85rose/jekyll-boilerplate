'use strict'

// Load options
let _config = require('./config.js')
let config = {}
let i
for(i in _config){
	config[i] = _config[i]
}

// Require modules
const gulp = require('gulp')
const camelcase = require('camelcase')
const dotenv = require('dotenv')
const notify = require('gulp-notify')
const globAll = require('glob-all')
const util = require('gulp-util')
config.notify = function(msg){
	return notify({
		message: msg,
		onLast: true
	})
}

// Get configurable environment variables
dotenv.config({ silent: true })

// Get camelcase version of name
//const camelName = camelcase(config.package.name)

// Error handler
config.onError = {
	errorHandler: function(err) {
		util.log(util.colors.red(err))
		this.emit('end')
		gulp.src('')
			.pipe(config.notify('ERROR!!!'))
	}
}


// Browser sync
config.browserSync = require('browser-sync').create()

// Load tasks
let files = globAll.sync('./' + config.tasks + '/*.js')
for(i = 0; i < files.length; i++){
	require(files[i])(gulp, config)
}

// Test for errors
gulp.task('test', function(cb){
	cb()
})


// Prevent errors from ending watch or other tasks
process.on('uncaughtException', console.error.bind(console))












