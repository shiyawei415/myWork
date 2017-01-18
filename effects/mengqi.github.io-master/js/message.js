define(function(require,exports){
	function messageOnload(){
		var date = require('date.js').date; //r
		var messageFoot = document.getElementById('footer');
		var msgPage =8;
		var str = '';
		var iprev = 0;
		var iNum = window.localStorage.getItem('number') || 0
		var messageList = document.getElementById('message-list');
		var messageBoard = document.getElementById('messageBoard');
		var aInput = messageBoard.getElementsByTagName('input');
		var oTextarea = messageBoard.getElementsByTagName('textarea')[0];
		var oBtn = messageBoard.getElementsByTagName('button')[0];
		var msgError = document.getElementById('msg-error');
		//生成页数。
		var page = Math.ceil(date.length/msgPage);
		document.body.style.background='#363778';
		str='<a href="javascript:;">首页</a><a href="javascript:;" >上一页</a><p>'
		for(var i=1;i<=page;i++){
			str += '<a href="javascript:;">'+i+'</a>'
		}
		str+='</p><a href="javascript:;">下一页</a><a href="javascript:;">末页</a>';
		messageFoot.innerHTML = str;
		//本地存储
		if(window.localStorage.getItem('number')){
			for(var i=0;i<iNum;i++){
				aInput[0].value=window.localStorage.getItem('name'+i);
				aInput[1].value=window.localStorage.getItem('theme'+i);
				oTextarea.value=window.localStorage.getItem('content'+i);
				msgData(aInput[0].value,aInput[1].value,oTextarea.value);
				aInput[0].value = aInput[1].value = oTextarea.value = '';
			}
		}

		createMsg(0)
		//把内容生成出来(每一页对应当页的内容)
		function createMsg(iNub){
			var msgHtml = '';
			var msgStart = iNub*msgPage;
			var msgEnd = msgStart+msgPage;
		    msgEnd = msgEnd > date.length?date.length : msgEnd;
			for(var i=msgStart;i<msgEnd;i++){
				msgHtml+='<li><div class="box"><img src="image/photo.png"  class="pic" /><div class="ico"></div><div class="msg-list-content text"><header class="msg-theme"><span class="rowleft row"></span><h3>'+date[i].name+'</h3><span class="theme-content">[主题是:'+date[i].theme+']</span></header><section><p class="answer">'+date[i].content+'</p></section></div>'
				if(date[i].reply){
					msgHtml+='<div class="msg-list-reply text"><header class="msg-reply"><span class="rowtop row"></span><h3>管理员回复</h3></header><section class="msg-reply-content"><p class="answer">'+ date[i].reply+'</p></section></div>'
				}
				msgHtml+='</div></li>'
			}
			messageList.innerHTML = msgHtml
			footPageStyle(iNub)
		}

		//点击页数加载对应的内容
		var pages = messageFoot.getElementsByTagName('a');
		var aPage = messageFoot.getElementsByTagName('p')[0].getElementsByTagName('a');
		for(var i=0;i<aPage.length;i++){
			(function(a){
				aPage[a].onclick = function(){
					footHide(a)
				}
			})(i)
		};
		pages[0].onclick = function(){
			footHide(0)
		};
		pages[1].onclick = function(){
			footHide(iprev-1)
		};
		pages[pages.length-1].onclick = function(){
			footHide(aPage.length-1)
		};
		pages[pages.length-2].onclick = function(){
			footHide(iprev+1)
		};
		//footpage样式的切换
		function footPageStyle(iNow){	
			var pages = messageFoot.getElementsByTagName('a');
			var aPage = messageFoot.getElementsByTagName('p')[0].getElementsByTagName('a');
			
			aPage[iprev].className = '';
			iprev=iNow;
			aPage[iNow].className = 'active';
			if(iNow==0){
				pages[0].style.display = 'none';
				pages[1].style.display = 'none';
			}
			else{
				pages[0].style.display = 'inline-block';
				pages[1].style.display = 'inline-block'
			}
			if(iNow==aPage.length-1){
				pages[pages.length-1].style.display="none";
				pages[pages.length-2].style.display="none";
			}else{
				pages[pages.length-1].style.display="inline-block";
				pages[pages.length-2].style.display="inline-block";
			}
			for(var i=0;i<pages.length;i++){
				pages[i].style.opacity=1
			}
			msgshowList()
		}

		//留言板中的内容show出来
		function msgshowList(){
			messageList.style.height = '0px';
			var iHeight = 0;
			var oList = messageList.children;
			for(var i=0;i<oList.length;i++){
				iHeight += oList[i].offsetHeight;
			}
			messageList.style.height = iHeight+25+'px';
			messageList.addEventListener('transitionend',end)
			function end(){
				this.removeEventListener("transitionend",end,false);
				openli();
				window.onresize = window.onscroll = function(){
					openli();
				}
			}
		}
		function openli(){
			var scrolltop = document.documentElement.scrollTop + document.body.scrollTop;
			var iTop =  scrolltop + document.documentElement.clientHeight;
			var oList = messageList.children;
			var iTime=0;
			for(var i=0;i<oList.length;i++){
				if(getTop(oList[i]) < iTop){
					msglishow(oList[i],iTime);
					iTime+=100;
				}
			}
		}
		function msglishow(obj,iTime){
			var oBox = obj.children[0];
			var aReply = oBox.children[oBox.children.length-1];

			oBox.addEventListener('transitionend',end,false);
			setTimeout(function() {
				oBox.style.cssText = '-webkit-transform:rotateY(0deg);-moz-transform:rotateY(0deg);transform:rotateY(0deg);';
			}, iTime);
			
			function end(){
				this.removeEventListener("transitionend",end,false);
				aReply.style.cssText = 'opacity:1;-webkit-transform:rotateX(0deg);-moz-transform:rotateX(0deg);transform:rotateX(0deg);'
			
			}
		}
		//foot消失
		function footHide(iNub){
			var pages = messageFoot.getElementsByTagName('a');
			for(var i=0;i<pages.length;i++){
				pages[i].style.opacity = 0;
				pages[i].addEventListener("transitionEnd",function(ev){
					 ev.cancelBubble=true;
				},false);	
			}
			messageFoot.style.cssText = 'margin-top:50px;opacity:0;'
			messageFoot.addEventListener('transitionend',end,false);
			function end(){
				this.removeEventListener('transitionend',end,false)
				msglistHide(iNub)
			}
		}

		//列表消失
		function msglistHide(iNub){
			var oList = messageList.children;

			for(var i=0;i<oList.length;i++){
				oList[i].style.transition = '.5s '+ (oList.length -i)*100  +'ms';
				oList[i].style.opacity = 0;
				oList[i].style.marginTop = '50px';
				oList[i].addEventListener('transitionend',function(ev){
					ev.cancelBubble=true;
				},false);
				
			}
			messageList.style.cssText = 'height:0px;transition:1s .5s;'
			messageFoot.style.cssText = 'opacity:1;margin-top:0px;transition:.5s 1.5s'
			messageList.addEventListener('transitionend',end,false);
			function end(){
				this.removeEventListener('transitionend',end,false);
				createMsg(iNub)
			}
		}

		//创建留言
		oBtn.onclick = function(){
			msgForm()
			msgKeyMatch()
			if(aInput[0].value && aInput[1].value &&oTextarea.value){
				window.localStorage.setItem('name'+iNum,aInput[0].value);
				window.localStorage.setItem('theme'+iNum,aInput[1].value);
				window.localStorage.setItem('content'+iNum,oTextarea.value);
				msgData(aInput[0].value,aInput[1].value,oTextarea.value);
				iNum++;
				window.localStorage.setItem('number',iNum);
				aInput[0].value = aInput[1].value = oTextarea.value = '';
			}
		}
		//form表单值得判断
		function msgForm(){
			if(!aInput[0].value){
				msgError.style.cssText = 'top:92px;display:block'
			}else if(!aInput[1].value){
				msgError.style.cssText = 'top:130px;display:block'
			}else if(!oTextarea.value){
				msgError.style.cssText = 'top:170px;display:block'
			}else{
				msgError.style.display = 'none';
				
			}	
		}

		function msgKeyMatch(){
			aInput[0].onkeyup = aInput[1].onkeyup = oTextarea.onkeyup = function(){
				msgForm();
			}
			
			
		}
		//塞入数据
		function msgData(name,theme,content){
			msgdata = {name : name,theme:theme,content:content}
			date.unshift(msgdata);
			createMsg(0)
		}
		//获取元素到文档顶部的距离
		function getTop(obj){
			var iTop = '';
			if(obj){
				iTop += obj.offsetTop;
				obj = obj.offsetParent
			}
			return iTop;
		}
		window.bBtn = true;
	}
	exports.messageOnload = messageOnload;
})