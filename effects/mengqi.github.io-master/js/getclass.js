define(function(require,exports){
	//封装获取class函数
	function getElementsByClass(parent, tagName, className){
		var arrClassName = className.split(', '),
		arr = [],
		allElems = parent.getElementsByTagName(tagName);
		for(var i=0; i<arrClassName.length; i++){
			for(var j=0; j<allElems.length; j++){
				var aClassName = allElems[j].className.split(' ');
				for(var k=0; k<aClassName.length; k++){

					if(aClassName[k] == arrClassName[i]){
						arr.push(allElems[j]);
						break;
					}
				}
			}
		}
		return arr;
	}
	exports.getElementsByClass = getElementsByClass;
})