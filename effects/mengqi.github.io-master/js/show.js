define(function(require,exports){
	function show(asection){
		var hash = window.location.hash.substring(1) || 'index';
		for(var i=0;i<asection.length;i++){
			asection[i].style.display = 'none';
			if(hash == asection[i].dataset.hash){
				asection[i].style.display = 'block';
				switch(hash){
					case 'index':
						require('indexIn.js').init();
					break;
					case 'production':
						require('productionIn.js').init();
					break;
					case 'description':
						require('descriptionIn.js').init();
					break;
					case 'message':
						require('message.js').messageOnload();
					break;
					case 'relax':
						require('relax.js').relax();
					break;
				}
			}
		}
	}
	exports.show = show;
	
});