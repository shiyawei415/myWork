    // 设置seajs配置
    seajs.config({
          alias: {
              "jquery": "./js/jquery-1.7.2"
         },
         paths: {
			'script': './js'   //给js文件路径 一个变量
		}
    });

    seajs.use(["script/showName","script/showAge"],function (showName,showAge){
   		showName.showName('成龙');
   		showAge.showAge(14);
    });
   