define(function (require, exports, module) {    
	var  $ = require('jquery-1.7.2.js');
	 //暴露showAge函数
    exports.showAge = function(age) {
	    $('body').append('，我今年'+age+'岁')
	    //alert('我今年'+age+'岁');
    };

});