

function resetHeight(){
	pageHeight = document.documentElement.scrollHeight;
	clientHeight = document.documentElement.clientHeight;
	$('.mark').height(pageHeight);
	//alert(pageHeight);
	if(parseInt(clientHeight) > 440){
		
		$('#bg').attr("src","images/bg.jpg");
		//$(".container").height(pageHeight);
	}
}


var pageHeight;

function sendInfo(){
	
	
	var tel = $.trim($("#mobile").val()), reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$$/;
	if (!tel || !reg.test(tel)) {
		alert("请输入正确的手机号码...");
		return
	}
	
	//挑战成功-提交
	track(20,5833);
	
	var data = {
			mobile: tel
		}
		
	showSubMod();
	
	var url = "http://track.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=582";
	$.ajax({
		url: url,
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback2",
		data: data,
		success: function(json) {
			hideSubMod();
			
			if (json[0].success == 1) {
				document.getElementsByTagName('form')[0].reset();
				$('.pop').hide();
				$('.pop2').show();
			}
			else{
				alert('手机号重复或者提交失败');
			}
		}
	});
}

function showSubMod(){
	$('.subload').fadeIn();
}

function hideSubMod(){
	$('.subload').fadeOut();
}

function shareWeiBo(str){
	
	if(str == "success"){
		//提交成功-分享新浪微博
		track(20,5834);
	}else if(str == "chaochu"){
		//挑战失败-分享新浪微博
		track(20,5837);
	}else{
		//挑战失败-力量太小-分享新浪微
		track(20,5839);
	}
	
	var shareText = "我正在玩DHL飞机大战，非常嗨！还有手机版DHL曼联传球大赛，你也加入吧！http://trophytour.mobile1.com.cn/share/";
	
	setTimeout(window.open("http://service.weibo.com/share/share.php?url=&appkey=&title=" + encodeURIComponent(shareText) + "&pic=&ralateUid=&language=", "_blank"),500);
}

