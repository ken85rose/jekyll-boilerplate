// Fastclick to fix iOS tap delay
require('fastclick')(document.body)

// Support for SVG maps
require('svg4everybody/dist/svg4everybody')()

// Only target "HTML5 browsers"
if('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {

	// Boilerplate test, remove for production!
	document.body.classList.remove('noJs')

	// DOM bindings
	let dom = require('./script/dom')

	// Touch-screen specific code
	require('./script/touch')()

	// Boilerplate test
	let el = document.createElement('div')
	el.className = 'test'
	el.innerText = 'JavaScript file ran successfully!'
	document.body.appendChild(el)
	console.log('main.js loaded!')

}