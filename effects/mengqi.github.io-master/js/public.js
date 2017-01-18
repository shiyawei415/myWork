define(function(require,exports){
	function init(){
		var oNav=document.getElementById("nav");
		var ofold=document.getElementById("fold");
		var oh2=ofold.getElementsByTagName("h2")[0];
		var aDiv=ofold.getElementsByTagName("div");
		var childNav=document.getElementById("child-nav");
		var navSpan=childNav.getElementsByTagName("span");
		var i=0;
		var oTimer=oTD=timer=null;
		var iDelay=200;
		var Boff=true;
		var Tab=true;
		var iTime=1000;
		
		oh2.onmouseover = showNav
		function showNav(){
			clearInterval(oTimer);
			if(!Boff){
				return false
			}
			ofold.className = 'fold T3D';
			oTimer=setInterval(function(){
				if(i<0){
					i=0;
				}else if(i>aDiv.length){
					i=aDiv.length-1;
				}
				console.log(i,777)
				aDiv[i].className="open";
				if(i==aDiv.length-1)
				{
					console.log(i,888)
					clearInterval(oTimer);
					Boff=false;
					Tab=false
				}
				i++;

			},iDelay);
		}
		oh2.onmouseout = hideNav
		function hideNav(){
			clearInterval(oTimer);
			ofold.className = 'fold';
			oTD=setInterval(function(){
				if(i>=aDiv.length){
					i=aDiv.length-1;
				}else if(i<0){
					i=0;
				}
				aDiv[i].className="clos";
				if(i==0)
				{
					clearInterval(oTD);
					Boff=true;
					Tab=true
					return false;
				}
				i--;
			},100);			
		}

	}
	exports.init = init;
})
