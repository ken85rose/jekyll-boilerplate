// Polyfills
require('fastclick')(document.body)
require('svg4everybody/dist/svg4everybody')()
require('picturefill')

// Jekyll search
require('simple-jekyll-search/src/index.js')

// Only target "HTML5 browsers"
if('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {

	// Boilerplate test, remove for production!
	document.body.classList.remove('noJs')

	// DOM bindings
	let dom = require('./script/dom')

	// Touch-screen specific code
	require('./script/touch')()

	// Search input
	SimpleJekyllSearch({
		searchInput: document.getElementById('searchInput'),
		resultsContainer: document.getElementById('resultsCont'),
		json: '/search.json'
	})

}