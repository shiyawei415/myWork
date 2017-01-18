define(function(require,exports){
	
	function init(){
		var date = require('protoDate.js').protoDate;
		var prodUl=document.getElementById('prod-list');
		var productionList = document.getElementById('productionList');
		var prodList = prodUl.children;	
		var prodHtml = '';
		var aTags=''
		document.body.style.background='#473678';		
		for(var i=0;i<date.length;i++){
			aTags= date[i].name?'<P>'+date[i].name+'<br/></P><a class="productico"></a>':'<a></a>'
			prodHtml += '<li><a href=""></a><div class="prod-content"><b class="prod-border"></b><i class="prod-photo prod-picture" style="background: url('+date[i].themeImage[0]+');background-size: cover;background-position: center center;"></i><span class="prod-side prod-con" style="background: url('+date[i].themeImage[1]+');background-position: center center;background-size: cover;">'+aTags+'</span></div></li>';
			
		}
		prodUl.innerHTML = prodHtml;
		slowshow()
		function slowshow(){
			for(var j=0;j<prodList.length;j++){
				prodList[j].style.transition = 'none';
				setTimeout(function(){
					for(var j=0;j<prodList.length;j++){
						prodList[j].className = 'show';
						prodList[j].style.transition = '0.5s '+ j*200  +'ms'	
					}
				},60)			
							
			}
		}
		
		require('production.js').photos(date,prodUl,productionList,prodList,prodHtml,slowshow)
		
	}
	
	exports.init = init;
	
});