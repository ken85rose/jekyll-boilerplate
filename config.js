'use strict'
let fs = require('fs')

// Config object
let config = {
	// Directories
	tasks: 'tasks',
	src: 'src',
	dev: 'dev',
	dist: 'docs',
	style: 'style',
	script: 'script',
	img: 'img',
	svgMapPrefix: 'svg-',

	// Set to false to process Pug to HTML
	// Set to true to copy Pug files to dist
	dynamicPug: false,
	dynamicPugDirectory: 'views',
	expressPort: 3000,
	browserSyncPort: 8080,

	// Minifies HTML and strips out comments
	minifyHtml: true,
	minifyHtmlOptions: {
		removeComments: true,
		removeAttributeQuotes: true,
		removeOptionalTags: true,
		removeEmptyAttributes: true,
		collapseBooleanAttributes: true,
		collapseInlineTagWhitespace: true,
		collapseWhitespace: true,
		decodeEntities: true,
		minifyCSS: true,
		minifyJS: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		sortAttributes: true,
		sortClassName: true
	},

	// Target browsers
	browsers: ['last 2 versions'],

	// Package file contents
	package: JSON.parse(fs.readFileSync('./package.json'))
}

// Info banner
let author = config.package.author.url ? config.package.author.url : config.package.author
config.info = `/*! ${config.package.title} v${config.package.version} | ${config.package.license} License | ${author} */\n`

// Expose
module.exports = config