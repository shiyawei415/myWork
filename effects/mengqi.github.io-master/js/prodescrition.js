define(function(require,exports){
	function proDescrition(aDd,oStage,proStr,_deg){
		var num = 2000;
		var oStageRotateY = 0;
		var now =0;
		for(var i=0;i<aDd.length;i++){
			(function(i){
				aDd[i].onclick = function(){
					var that = this;
					oStageRotateY = -i*(_deg);
					oStage.style.transform = 'perspective('+num+'px) rotateX(-10deg) rotateY('+oStageRotateY+'deg)';
					oStage.style.transition = "2s";
					oStage.addEventListener('transitionend',end,false)
					function end(){
						this.removeEventListener('transitionend',end,false);
						that.getElementsByTagName('h3')[0].className = 'person-title step'
					}
				}
			})(i)
		}
		document.body.onmousewheel = mousefn;
		if (document.body.addEventListener) {
			document.body.addEventListener('DOMMouseScroll', mousefn, false);
		}
		function mousefn(ev){
			var e = ev||event;
			var direct = true;
			if(e.wheelDelta){
				direct = e.wheelDelta > 0 ? true : false;
			}else{
				direct = e.detail<0 ? true : false
			}
			if(direct){
				if( num > 350 )
				{

					num -= 150;
				};			
			}else{
				if( num < 4000 )
				{
					num += 150;
				};
			}
			oStage.style.transform = 'perspective('+num+'px) rotateX(-10deg) rotateY('+oStageRotateY+'deg)';
		}
		function getLeft(obj){
			var iLeft = '';
			if(obj){
				iLeft += obj.offsetLeft;
				obj = obj.offsetParent;
			}
			return iLeft;
		}
		window.bBtn = true;
	}
	exports.proDescrition = proDescrition;
})