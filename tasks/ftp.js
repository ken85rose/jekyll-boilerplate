// Deploys changed files via FTP
'use strict'
module.exports = function(gulp, config){

	const vinylFtp = require('vinyl-ftp')
	const gitignoreGlobs = require('gitignore-globs')
	const plumber = require('gulp-plumber')

	function getFtpConnection(){

		if(!('FTP_PASS' in process.env)){
			return console.log('FTP_PASS must be an environment variable.')
		}
		if(!('FTP_USER' in process.env)){
			return console.log('FTP_USER must be an environment variable.')
		}

		return vinylFtp.create({
			host: process.env.FTP_HOST || localhost,
			port: process.env.FTP_PORT || port,
			user: process.env.FTP_USER,
			password: process.env.FTP_PASS,
			parallel: process.env.FTP_PARALLEL || 5,
			log: util,
		})
	}


	gulp.task('ftp', function(){

		// Glob files to upload
		let files
		if(config.dynamicPug){
			files = gitignoreGlobs('.gitignore', { negate: true })
			files.unshift('./**/*')
		}
		else{
			files = `${config.dist}/**/*`
		}

		// Connect
		let conn = getFtpConnection()
		return gulp.src(files, {
				buffer: false
			})
			.pipe(plumber(config.onError))
			.pipe(conn.newer(process.env.FTP_PATH))
			.pipe(conn.dest(process.env.FTP_PATH))

	})


}