window.onload = function () {
    //配置文件
    var config = [
        {
            "width": 400,
            "top": 20,
            "left": 50,
            "opacity": 0.2,
            "zIndex": 2
        },
        {
            "width": 600,
            "top": 70,
            "left": 0,
            "opacity": 0.8,
            "zIndex": 3
        },
        {
            "width": 800,
            "top": 100,
            "left": 200,
            "opacity": 1,
            "zIndex": 4
        },
        {
            "width": 600,
            "top": 70,
            "left": 600,
            "opacity": 0.8,
            "zIndex": 3
        },
        {
            "width": 400,
            "top": 20,
            "left": 750,
            "opacity": 0.2,
            "zIndex": 2
        }
    ];

    //获取DOM元素
    var wrap = document.getElementById('wrap'),
        ul = wrap.firstElementChild.firstElementChild,
        lis = ul.children,
        arrow = document.getElementById('arrow'),
        arrLeft = document.getElementById('arrLeft'),
        arrRight = document.getElementById('arrRight');

    //标识变量
    var isCompleted = true;

    //各就位
    layout(lis, config);

    //鼠标经过显示箭头
    wrap.addEventListener('mouseover', function () {
        animate(arrow, {'opacity': 1});
    });
    wrap.addEventListener('mouseout', function () {
        animate(arrow, {'opacity': 0})
    });

    //给箭头绑定事件
    arrLeft.onclick = function () {
        if (isCompleted) {
            isCompleted = false;
            config.push(config.shift());
            layout(lis, config);
        }
    };
    arrRight.onclick = function () {
        if (isCompleted) {
            isCompleted = false;
            config.unshift(config.pop());
            layout(lis, config);
        }
    };

    //布局函数
    function layout(lis, config) {
        for (var i = 0, len = lis.length; i < len; i++) {
            animate(lis[i], config[i], function () {
                isCompleted = true;//节流阀
            });
        }
    }
};