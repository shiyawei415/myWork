define(function(require,exports){
	function photos(date,prodUl,productionList,prodList,prodHtml,slowshow){
		var photosList = document.getElementById('photoslist');			
		var descriptionBack = '';
		var photoeDscription = document.getElementById('photo-description');
		for(var i=0;i<prodList.length;i++){
			var productico = prodList[i].getElementsByTagName('a')[1];
			var iLeft = (productico.parentNode.parentNode.offsetWidth-productico.offsetWidth)/2;
			var iTop = (productico.parentNode.parentNode.offsetHeight-productico.offsetHeight)/2;
			productico.style.cssText='left:'+iLeft+'px;top:'+iTop+'px';
			prodList[i].index = i;
			if(!date[i].name){
				(function(i){
					prodList[i].onclick = function(){
						return false;
					}
				})(i)
			}else{
				prodList[i].onclick = function(){
					var num = 0;
					var that = this;
					for(var j=0;j<prodList.length;j++){
						prodList[j].className = 'hidden';
					}
					prodList[prodList.length-1].addEventListener('transitionend',end,false);
					function end(){
						this.removeEventListener("transitionend",end,false);
						prodUl.style.display = 'none'
						productionList.style.display = 'block';
						photosOnload(date[that.index].contentImage);
						var timer = setInterval(function(){
							num += 28;
							if(num>=400){
								num = 400;
								clearInterval(timer);
							}
							photoeDscription.style.height = num + 'px';
						},50)
					}
					photoeDscription.innerHTML = '<span class="photo-description-back">X</span><h2>'+date[this.index].name+'</h2><time>Date:'+date[this.index].time+'</time><p>'+date[this.index].content+'</p>';
					var descriptionBack = photoeDscription.getElementsByTagName('span')[0];
					descriptionBack.onclick = function(){
						photoeDscription.style.height = '0px';
						productionList.style.display = 'none';
						prodUl.style.display = 'block';
						slowshow()
					}
				}
			}
		}
		function photosOnload(contentImage){
			var str = '';
			var aImg = contentImage;
			var iNow = 0;
			var iZindex=aImg.length;
			for(var i=0;i<aImg.length;i++){
				str += "<li style='background-image:url("+aImg[i]+");z-index:"+(aImg.length-i)+"'></li>";
			}
			photosList.innerHTML = str;
			photosLi = photosList.children;
			for(var i =0;i<photosLi.length;i++){
				iDeg = parseInt(Math.random()*100/7 - i*4);
				photosLi[i].iDeg = iDeg;
				photosLi[i].style.WebkitTransform = 'rotate('+iDeg+'deg) scale(1.5)';
				photosLi[i].style.transform = 'rotate('+iDeg+'deg) scale(1.5)';
			}
			setTimeout(function(){
				photoshow();	
			},100);

			function photoshow(){
				for(var i=0;i<photosLi.length;i++){
					photosLi[i].style.transition=".5s "+(photosLi.length-i)*300+"ms";
					photosLi[i].style.WebkitTransform = 'rotate('+photosLi[i].iDeg+'deg) scale(1)';
					photosLi[i].style.transform = 'rotate('+photosLi[i].iDeg+'deg) scale(1)';
					photosLi[i].style.opacity = 1;
				}
			}
			var oPhotos = document.getElementById('photos');
			var aPhotosbtn = oPhotos.getElementsByTagName('a');

			aPhotosbtn[0].onclick = function(){

				iNow--;
				if(iNow<0){
					iNow = photosLi.length-1
				}
				for(var i=0;i<aPhotosbtn.length;i++){
					aPhotosbtn[i].opacity = 0;
				}
				photosLi[iNow].style.left = '-150%';
				photosLi[iNow].style.opacity = 0;
				photosLi[iNow].style.transition = '1s';	
				photosLi[iNow].addEventListener('transitionend',end,false);
				
			};
			aPhotosbtn[1].onclick = function(){

				iNow++;
				if(iNow>photosLi.length-1){
					iNow = 0
				}
				for(var i=0;i<aPhotosbtn.length;i++){
					aPhotosbtn[i].opacity = 0;
				}
				photosLi[iNow].addEventListener('transitionend',end,false);
				photosLi[iNow].style.left = '70%';
				photosLi[iNow].style.opacity = 0;
				photosLi[iNow].style.transition = '1s';	
				
			}
			function end(){
				//防止多个transitionend事件的发生，所以及时清除；
				iZindex++;
				this.removeEventListener('transitionend',end,false)
				this.style.transform = 'rotate('+this.iDeg+'deg) scale(1.2)';
				this.style.zIndex = iZindex;
				this.style.transition = 'none';
				that = this;
				setTimeout(function(){
					that.style.transition='.4s';
					that.style.left = '40px';
					that.style.opacity = 1;
					that.style.transform = 'rotate('+that.iDeg+'deg) scale(1)';
				},40)
			}
		}
		
	}	
	exports.photos = photos
})
