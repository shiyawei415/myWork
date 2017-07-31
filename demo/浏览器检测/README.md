
# js判断浏览器用法

1. 先引入Broeser.js

2. 调用：

```
	var info = new Browser();
	document.writeln("浏览器："+info.browser+"<br/>");
	document.writeln("版本："+info.version+"<br/>");
	document.writeln("内核："+info.engine+"<br/>");
	document.writeln("操作系统："+info.os+"<br/>");
	document.writeln("设备："+info.device+"<br/>");
	document.writeln("语言："+info.language+"<br/>");

	console.log(info)
	if(info.device == 'PC'){
		alert('pc端')
	}else{
		alert('移动端')
	}
```
