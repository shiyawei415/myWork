define(function(require,exports){
	function init(){
		var oPlanet = document.getElementById('planet');
		var oEm = oPlanet.getElementsByTagName('em');
		var oI = oPlanet.getElementsByTagName('i');
		var oSpan = oPlanet.getElementsByTagName('span');
		var oP = oPlanet.getElementsByTagName('p');
		var oA = oPlanet.getElementsByTagName('a');
		document.body.style.background='#473678';
		for(var i=0;i<oEm.length;i++){
			if(oEm[i].className==''){
				oEm[i].className = 'start';
				oI[i].className = 'iCircle';
				oSpan[i].className = 'spanLine';
				oP[i].className = 'pLine';
				oA[i].className = 'text';
				setTimeout(function(){
					for(var i=0;i<oEm.length;i++){
						oEm[i].className = '';
						oI[i].className = '';
						oSpan[i].className = '';
						oP[i].className = '';
						oA[i].className = '';
					}					
				},8000);
				
			}
		}
		
		require('index.js').getStyle(oPlanet)
	}
	exports.init = init;
	
});