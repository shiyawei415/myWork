//时间装换：("/Date(-62135596800000)/")  ->   2015-12-02 18:00:22;
var formatJsonDateStr = function (jsonDateStr) {
                var date = new Date(parseInt(jsonDateStr.replace("/Date(", "").replace(")/", ""), 10));
                var dateStr = [];
                dateStr.push(date.getFullYear());
                dateStr.push('-' + (Number(date.getMonth()) + 1));
                dateStr.push('-' + date.getDate());
                dateStr.push(' ' + date.getHours());
                dateStr.push(':' + date.getMinutes());
                dateStr.push(':' + date.getSeconds());
                return dateStr.join('');
}                

//from 表单转json
function getFormJson(form) {
	var o = {};
	var a = $(form).serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}	

    //禁止输入特殊字符
    $('input[name="resumeName"] , input[name="Name"] ').keyup(function () {
        $(this).val($(this).val().replace(/["'<>%;~!@#$%)(&+^]/, ""))
    });
    //只能输入数字
    $('#peoplePhone').keyup(function () {
        $(this).val($(this).val().replace(/[^\d]/, ""))
    });
