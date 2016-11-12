'use strict'
const gulp = require('gulp')
const dotenv = require('dotenv')
const notify = require('gulp-notify')
const globAll = require('glob-all')
const util = require('gulp-util')

// Load options
let _config = require('./config.js')
let config = {}
let i
for(i in _config){
	config[i] = _config[i]
}

// Notifications after tasks
config.notify = msg => {
	return notify({
		message: msg,
		onLast: true
	})
}

// Get configurable environment variables
dotenv.config({ silent: true })

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
gulp.task('test', cb => {
	cb()
})


// Prevent errors from ending watch or other tasks
process.on('uncaughtException', console.error.bind(console))





