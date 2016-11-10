define(function (require, exports, module) {      //获得依赖
	 var $ = require('jquery-1.7.2.js');
	 
	 
	 //暴露showName函数
	exports.showName = function (name){
		$('body').append('我是'+name)
	//	alert('我是'+name)
	}

});