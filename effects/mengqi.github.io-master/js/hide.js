define(function(require,exports){
	function hide(aBtn,asection){
		var nownum = window.sessionStorage.getItem('navNum') || 0;
		aBtn[1].onclick = function(e){
			nownum++;
			nownum = nownum>=asection.length?0:nownum;
			hashTab();
			return false;
		}
		aBtn[0].onclick = function(e){
			nownum--;
			nownum = nownum<0?asection.length-1:nownum;
			hashTab();
			return false;
		}
		function hashTab(){
			window.sessionStorage.setItem('navNum',nownum);
			var hash = asection[nownum].dataset.hash;
			require('indexOut.js').init(asection,hash);
		}
	}
	exports.hide = hide;
});