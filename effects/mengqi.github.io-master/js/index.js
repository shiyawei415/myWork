define(function(require,exports){
    //index星球
    function getStyle(oPlanet){
        var oPlanet = document.getElementById('planet');
        var trackContent = document.getElementById('trackContent');
        var oContent = document.getElementById('content');
        var otrack = oContent.children[0];
        var aTrack = otrack.children;
        var allPlanet = oPlanet.children;
        var aPlanetSty = require('getclass.js').getElementsByClass(oPlanet, 'div', 'planetSty');
        var iMax=5;
        var boxList = document.getElementById('box-list');
        var listClose = boxList.getElementsByTagName('a')[0];
        var listText = boxList.getElementsByTagName('p')[0];
        var oBtn = document.getElementsByTagName('button')[0]
        /*轨道跟随鼠标移动*/
        for(var i=0;i<aTrack.length;i++){
            aTrack[i].startX=parseInt(getStyle(aTrack[i],"left"));
        }
        trackContent.onmousemove=function(ev){
            var iX=ev.clientX-(getX(this)+this.offsetWidth/2);
            for(var i=0;i<aTrack.length;i++)
            {
                var iZindex=getStyle(aTrack[i],"zIndex");
                var iDisL=-parseInt(iX/iMax*(iMax-iZindex)/20);
                aTrack[i].style.left=aTrack[i].startX+iDisL+"px";
                allPlanet[i].style.marginLeft = iDisL+'px';
            }
        };        
        function getStyle(obj,attr){
            if( obj.currentStyle){
                    return obj.currentStyle[attr];        
            }
            return getComputedStyle(obj)[attr];        
        }
        function getX(obj){
            var iLeft=0;
            while(obj)
            {
                iLeft+=obj.offsetLeft;
                obj=obj.offsetParent;
            }
            return iLeft;
            
        }
        for(var i=0;i<aPlanetSty.length;i++){
            aPlanetSty[i].onmouseover = function(){
                getBlock(this);
            }
        }
        function getBlock(obj){
            var oEm = obj.getElementsByTagName('em')[0];
            var oI = obj.getElementsByTagName('i')[0];
            var oSpan = obj.getElementsByTagName('span')[0];
            var oP = obj.getElementsByTagName('p')[0];
            var oA = obj.getElementsByTagName('a')[0];
            if(oEm.className==''){
                oEm.className = 'start';
                oI.className = 'iCircle';
                oSpan.className = 'spanLine';
                oP.className = 'pLine';
                oA.className = 'text';
                setTimeout(function(){
                    
                    oEm.className = '';
                    oI.className = '';
                    oSpan.className = '';
                    oP.className = '';
                    oA.className = '';
                    
                },8000);
                
            }
            
        }

        var str = "在网上看到的几个使用动画特效做成的案例，感觉效果很棒，闲来无事就动手在案例设计基础上加上自己的设计想法用原生js做成此小站。小站是使用seajs模块加载进行的一站式开发，技术多以html5和css3、javascript为主。但是由于时间原因，其中有的功能还没有完善，可能加载会慢一些，请您耐心等耐加载，小站会继续不断改进的。最后感谢您的访问。"
        var personBox = document.getElementById('person-box');
        var oul = personBox.getElementsByTagName('ul')[0];
        var ali = oul.getElementsByTagName('li');
        var r = 150;
        var num = 0;
        var layer =0;
        var wordNum = -1;
        var arr = [];
        listText.innerHTML = str;
        for(var i=4;i<13;i++){
            num = i*i + (i+1)*(i+1);
            if(num>=str.length){
                later = (i-1)*2+1;
                break;
            }
            layer = (i-1)*2+1;
        }
        for(var i=0;i<layer;i++){
            if(i<(layer+1)/2){
                wordNum += 2;
            }else{
                wordNum -= 2;
            }
            arr.push(wordNum)
        }
        getCircle()
        function getCircle(){
            var theta = Math.PI/(arr.length-1);
            var phi = 0;
            num =0;
            for(var i=0;i<arr.length;i++){
                phi = 2*Math.PI/arr[i];
                for(var j=0;j<arr[i];j++){
                    var li = document.createElement('li');
                    li.innerHTML= str[num];
                    num++;
                    getCircleAngle(li,theta,phi,i,j)
                    oul.appendChild(li);
                    
                }
            }
            /*关闭圆球，打开文字列表*/
            oBtn.onclick = function(){
                for(var i=0;i<ali.length;i++){
                    ali[i].style.transform = "translate3D("+ali[i].bigCircleX+"px,"+ali[i].bigCircleY+"px,"+ali[i].bigCircleZ+"px) rotateY("+ali[i].circlephi+"rad) rotateX("+ali[i].circleTheta+"rad)" //为什么用弧度，，是因为用的Math.Pi是弧度
                    ali[i].style.opacity = '0';
                }
                boxList.style.display = 'block'
                setTimeout(function(){
                    personBox.style.display='none';
                    boxList.style.opacity ='1';
                    boxList.style.transform = 'scale(1)'
                },1030)

            }
            listClose.onclick = function(){
                    boxList.style.transform = 'rotateX(-180deg)';
                    boxList.style.opacity = 0;
                    personBox.style.cssText='display:block;height:0px';
                    setTimeout(function(){
                       personBox.style.height = '100%'
                       boxList.style.display = 'none'
                       for(var i=0;i<ali.length;i++){
                            ali[i].style.transform = "translate3D("+ali[i].circleX+"px,"+ali[i].circleY+"px,"+ali[i].circleZ+"px) rotateY("+ali[i].circlephi+"rad) rotateX("+ali[i].circleTheta+"rad)"
                            ali[i].style.opacity = 1;
                        }
                    },550)
            }
            for(var i=0;i<ali.length;i++){
                ali[i].style.transform = "translate3D("+ali[i].circleX+"px,"+ali[i].circleY+"px,"+ali[i].circleZ+"px) rotateY("+ali[i].circlephi+"rad) rotateX("+ali[i].circleTheta+"rad)" //为什么用弧度，，是因为用的Math.Pi是弧度
            }
            rotate()
            function rotate(){
                var angleX = angleY =0;
                var timer = setInterval(function(){
                    angleX++;
                    personBox.style.transform = "rotateY("+angleX+"deg)";
                    personBox.style.WebkitTransform = "rotateY("+angleX+"deg)"
                },60)
            }
            function getCircleAngle(obj,theta,phi,i,j){
                obj.circleX = r*Math.sin(theta*i)*Math.sin(phi*j)+200; //其实都是弧度制的。
                obj.circleY = -r*Math.cos(theta*i)+200;
                obj.circleZ = r*Math.sin(theta*i)*Math.cos(phi*j);
                obj.circleTheta =  theta*(arr.length-i) - Math.PI/2;
                obj.circlephi = phi*j;
                obj.bigCircleX = (r+2000)*Math.sin(theta*i)*Math.sin(phi*j)+200; //其实都是弧度制的。
                obj.bigCircleY = -(r+2000)*Math.cos(theta*i)+200;
                obj.bigCircleZ = (r+2000)*Math.sin(theta*i)*Math.cos(phi*j);
            }
            personBox.onclick = function(){
                return false;
            };
            personBox.onmousedown = function(ev){
                var e = ev||event;
                var clinkX = e.clientX;
                var clinkY = e.clientY;
                var disX = 0;
                var disY = 0;
                document.onmousemove = function(ev){
                    var e = ev||event;
                    disX = e.clientX - clinkX;
                    disY = e.clientY - clinkY;
                    personBox.style.transform = "rotateX("+angleX-disY+"deg) rotateY("+angleY+disX+"deg)";
                    clearInterval(timer)
                }
                document.onmouseup = function(){
                    document.onmousemove =document.onmouseup = null;
                    angleX = angleX -disY;
                    angleY = angleY + disX;
                    if(disY==0&&disX==0){
                        disX = 100;
                    }
                    timer = setInterval(function(){
                        angleX -= disY/200;
                        angleY += disX/200;
                        personBox.style.transform = "rotateX("+angleX+"deg) rotateY("+angleY+"deg)"
                    },60)
                }
            }
        }
    }
    exports.getStyle = getStyle;
    
})

















