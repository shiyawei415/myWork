function smsTimer() {
    if ($("b.s").size() == 0) {
        var n = 60;
        var timer = null;
        timer = setInterval(function() {
            $(".m_yzm1").html("<b class='s'>" + n + "</b>秒后可再次获取");
            n--;
            if (n < 0) {
                $(".m_yzm1").html('<a href="javascript:void(0);">重新发送</a>');
                clearInterval(timer);
            }
        }, 1000)
    }
}

/*登录显示推官人信息*/
function showLoginInfo() {
    $.ajax({
        url: '/spreader',
        type: "GET",
        dataType: "JSON",
        data: {
            r: Math.random()
        },
        success: function(d) {
            if (d.status == 'success') {
                var spreaderStatus = d.data.spreaderStatus;
                var account = d.data.account;

                switch (spreaderStatus) {
                    case 'common':
                        /*是推广员*/
                    case 'official':
                        /*是官方推广员*/
                        $(".js_copyLink").val("http://extend.gyyx.cn/ExtendManage/ExtendPublicity/?username=" + account);
                        copyLink();
                        break;
                    case 'blackList':
                        /*拉黑推广员*/
                        $(".js_copyLink").val("http://extend.gyyx.cn/ExtendManage/ExtendPublicity/?username=" + account);
                        copyLink();
                        break;
                }
            }
        }
    });
}

function showList() {
    aa = [];
    aa++;

}