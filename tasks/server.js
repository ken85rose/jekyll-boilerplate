// Live browser reload (client code only)
'use strict'
module.exports = function(gulp, config){


	gulp.task('sync', function(){
		
		if(config.dynamicPug){
			startServer()
		}
		else{
			config.browserSync.init({
				notify: false,
				port: 8080,
				server: config.dist
			})
		}

	})

	function startServer(){
		const nodemon = require('nodemon')
		let started = false

		nodemon({
			script: './server.js',
			env: {
				'NODE_ENV': 'development'
			}
		}).on('crash', () => {
			// Exit Gulp process
			process.exit()
		}).on('exit', () => {
			// Exit Gulp process
			process.exit()
		})
	}

	function browserSyncGo(){
		config.browserSync.init({
			notify: false,
			proxy: `http://localhost:${process.env.PORT || config.expressPort}`,
			port: config.browserSyncPort,
			files: [`${config.dist}/**/*`, `${config.dynamicPugDirectory}/**/*`],
			open: 'local'
		})
	}



}