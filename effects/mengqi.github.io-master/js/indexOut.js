define(function(require,exports){
	function init(asection,hash){
		window.location.hash = hash;
		require('show.js').show(asection)	
	}
	exports.init = init;	
});