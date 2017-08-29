


window.onload = function(){
	
	resetPage();
	
}

window.onresize = function(){
	resetPage();
	
	
}

function resetPage() {
	var deviceWidth = document.documentElement.clientWidth,
	scale = deviceWidth/320;
	document.body.style.zoom = scale;
}

function sendInfo(){
	var mobile = $.trim($('#mobile').val());
	var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$$/;
	if(!mobile){
		alert('请您输入手机号码');
		return;
	}else if(!reg.test(mobile)){
		alert('请您输入正确的手机号码');	
		return;
	}
	track(1,10009);
	var url = "http://ama.adwo.com/advmessage/adv/addResultJsonP.action?advid=30004";
    $.ajax({
        url: url,
        cache: false,
        dataType : 'jsonp',
        jsonpCallback: "eventcallbackInfo",
        data: {
            mobile: mobile,
        },
        success: function(json) {
            if (json[0].success == 1) {
                alert('提交成功！');
				$('#mobile').val('');
            }
			else{
				alert('手机号重复或者提交失败');
			}
        }
    });
}