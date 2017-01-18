define(function(require,exports){
	function init(){
		var proStr = '';
		var prodate = require('prodata.js').prodate;
		var oStage = document.getElementById('stage');
		var _deg = '';
		document.body.style.background='#363778';
		oStage.innerHTML = '';
		for(var i=0;i<prodate.length;i++){
			proStr += '<dd><img src='+prodate[i].themeImage+' class="person-img" /><div class="person-dec"><h3 class="person-title">'+prodate[i].Title+'</h3><p class="person-content">'+prodate[i].reply+'</p></div><div class="over" style="background-image: -moz-linear-gradient(top , rgb(54, 55, 120) 65%, rgba(255, 255, 255, 0)), url('+prodate[i].themeImage+'); background-image: -webkit-linear-gradient(top, rgb(54, 55, 120) 50%, rgba(255, 255, 255, 0)), url('+prodate[i].themeImage+');background-image: linear-gradient(top , rgb(54, 55, 120) 65%, rgba(255, 255, 255, 0)), url('+prodate[i].themeImage+');opacity:0.1"></div></dd>'
		}
		oStage.innerHTML = '<div class="stage-shadow"></div>' + proStr;
		var aDd = oStage.getElementsByTagName('dd');
		setTimeout(function(){
			for(var i=0;i<aDd.length;i++){
				_deg = 360/aDd.length;
				aDd[i].style.transition = '.5s '+ (aDd.length -i)*200  +'ms';
				aDd[i].style.transform = "rotateY("+(i*_deg)+"deg) translateZ(360px)";
				aDd[0].getElementsByTagName('h3')[0].className = 'person-title step'
			}
			
			require('prodescrition.js').proDescrition(aDd,oStage,proStr,_deg)
		},50)
	}
	exports.init = init;
});