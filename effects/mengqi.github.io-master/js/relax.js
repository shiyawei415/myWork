define(function(require,exports){
	function relax(){
		document.body.style.background='#053362';
		var oUl = document.getElementById('oUl');
		var ali = oUl.getElementsByTagName('li');
		var aImg = oUl.getElementsByTagName('img');
		var rangeL = oUl.offsetWidth/ali.length*5;
		var middle = distance = scale = 0;
		var oDiv1 = document.getElementById('phone');
		var containDiv = document.getElementById('skyshow').children[0];
		var oBtnarea = document.getElementById('btnarea');
		var aDiv = oBtnarea.children;
		var timer = null;
		var clientX = 0;
		var onOff = true;
		var audio = new Audio();
		document.body.style.background="#363778"
		for(var i=0;i<ali.length;i++){
			ali[i].style.width = (view().w / (ali.length) /view().w)*100+'%'
		}
		containDiv.style.height = document.documentElement.clientHeight - 75+'px';
		window.onresize = function(){
			containDiv.style.height = document.documentElement.clientHeight - 75+'px';
		}
		oUl.onmousemove = mouseMove;
		function mouseMove(ev){
			var ev=ev||event;
			clientX = ev.clientX
			cancelAnimationFrame(timer)
			timer = requestAnimationFrame(move)
		};
		function move(){
			for(var i=0;i<aImg.length;i++){
				middle = ali[i].offsetWidth/2 + ali[i].offsetLeft;
				distance = Math.abs(clientX - middle);
				if(distance>rangeL){
					distance = rangeL
				}
				scale = (distance/rangeL)*60;
				//获取img到定位父级的高度
				var newtop = aImg[i].getBoundingClientRect().top - ali[i].getBoundingClientRect().top;
				var n = newtop / aImg[i].offsetHeight *100;
				var t = (scale - n) /2;
				n += t;
				aImg[i].style.transform = 'translate3d(0px, '+n+'%, 0px)';
				aImg[i].style.webkitTransform = 'translate3d(0px, '+n+'%, 0px)';
			}
		}
		oUl.onmouseout = mouseOut;
		function mouseOut(){
			cancelAnimationFrame(timer)
			for(var i=0;i<aImg.length;i++){
				aImg[i].removeAttribute('style')
			}
		}
		//点击居中显示
		oUl.onclick = function(ev){
			var midcenter='';
			cancelAnimationFrame(timer);
			if(onOff){
				oUl.onmouseout = oUl.onmousemove = null;
				if(ev.target.nodeName.toLowerCase()=='img'){
					midcenter = ev.target.parentNode.offsetLeft + (ev.target.parentNode.offsetWidth/2)
					midcenter = (view().w/2 - midcenter)
					oUl.style.cssText = "-webkit-transform : translate3d(" + 3 * midcenter + "px, 0, 0) scale(3);transform : translate3d(" + 3 * midcenter + "px, 0, 0) scale(3)";
					ev.target.parentNode.style = "-webkit-transform : translate3d(0,5%, 0);transform : translate3d(0, 5%, 0)";
					oDiv1.style.zIndex = '20'
				}
				onOff = false;
			}else{
				oUl.style.cssText = '';
				oDiv1.style.zIndex = '10'
				oUl.onmouseout = mouseOut;
				oUl.onmousemove = mouseMove;
				onOff = true;
			}
			
		}
		//可视化音乐
		music()
		function music(){
			var audioContext ,analyser,sourceNode,key,f,h,scaleX;
			window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
			var musicList = ['mp3/See You Again-Wiz Khalifa，Charlie Puth.mp3','mp3/Sugar.mp3','mp3/BANG BANG BANG (Inst.).mp3','mp3/The Dawn.mp3'];
			var color = ['#8CF6F3','#FFD96D','#92AEF0','#5FB65F']
			function audioint(){
				audio.pause();
				audio = null;
				audio = new Audio();
			}
			for(var i=0;i<aDiv.length-1;i++){
				aDiv[i].index=i;
				aDiv[i].onclick = function(){
					window.dancenum = this.index;
					for(var i=0;i<aDiv.length;i++){
						aDiv[i].style.background = '#fff';
						aDiv[i].children[0].style.cssText = 'transform:scale(1,1);-webkit-transform:scale(1,1);background:#fff';
					}
					this.style.background = color[this.index];
					this.children[0].style.background = color[this.index];
					audioint();
					audio.src = musicList[this.index];
					analysers();
					for( var i = 0; i < 7; i++ ){
						aImg[i].removeAttribute('style')
					}
				}
			}
			aDiv[aDiv.length-1].onclick = function(){
				cancelAnimationFrame(timer);
				audioint();
			}
			function analysers(){
		        audioContext = new AudioContext();
		        analyser = audioContext.createAnalyser();
		        sourceNode = audioContext.createMediaElementSource(audio);
		        sourceNode.connect(analyser);
		        sourceNode.connect(audioContext.destination);
		        audio.play();
		        update()

		    }
		    function update(){
		    	//得到的音频是一个二进制的，需要，解析数据
		    	var freqArray = new Uint8Array(analyser.frequencyBinCount);
		    	//得到数组
	 			analyser.getByteFrequencyData(freqArray);
	 			dance(freqArray);
		    	if(audio.paused){
					for( var i = 0; i < 7; i++ ){
						aImg[i].removeAttribute('style')
					}
				}else{
					requestAnimationFrame(update);
				}
		    }
		    function dance(arr){
		    	var step = Math.round(arr.length/9)
		    	for(var i=0;i<aImg.length;i++){
		    		num = arr[i * step];
		    		key = num / aImg[i].offsetHeight *100;
		    		m = 100-key;
					n = (m-30)>0?(m-30):0;
					scaleX = (n/50)>0.7&&(n/50)<1.5?(n/50):1;
					aImg[i].style.cssText = "-webkit-transform:(0," + n + "%,0);transform:translate3d(0," + n +"%,0);-moz-transform:(0," + n + "%,0);transform:translate3d(0," + n +"%,0)";
		    		if(i==0){
		    			aDiv[dancenum].children[0].style.transform='scale('+scaleX+','+scaleX+')';
		    			aDiv[dancenum].children[0].style.webkitTransform ='scale('+scaleX+','+scaleX+')';
		    		}
		    	}
		    }
		}
		window.bBtn = true;
	}
	//获取可视宽
	function view(){
		return {
			w:document.documentElement.clientWidth
		}
	}
	exports.relax = relax;
})