// Live browser reload (client code only)
'use strict'
module.exports = (gulp, config) => {


	gulp.task('sync', () => {
		const fs = require('fs')
		const url = require('url')
		const path = require('path')

		const folder = path.resolve(__dirname, `../${config.dist}`)
		
		config.browserSync.init({
			notify: false,
			port: 8080,
			server: {
				directory: false,
				baseDir: 'docs',
				middleware: [
					// Prefer loading name.html over name/index.html
					(req, res, next) => {
						let fileName = url.parse(req.url)
						const ext = path.extname(req.url)

						if(ext) return next()

						fileName = fileName.href.split(fileName.search).join('')
						if(fileName[fileName.length - 1] === '/'){
							fileName = fileName.slice(0, -1)
						}
						const check = `${folder + fileName}.html`
						const fileExists = fs.existsSync(check)
						if(fileExists && fileName.indexOf("browser-sync-client") < 0){
							if(fileName[fileName.length - 1] === '/'){
								fileName = fileName.slice(0, -1)
							}
							req.url = `${fileName}.html`
						}

						return next()
					}
				],
				serveStaticOptions: {
					extensions: ['html']
				}
			}
		})

	})


}