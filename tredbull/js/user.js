var uid,name,head;
$(function () {
			
			
    //点击登陆打开弹层
    $("#loginbefore").click(function () {
        loginbefore();
    });
    //从登陆弹层返回首页
    $(".Login_index .foot").click(function () {
        $(".Login_index").animate({opacity: 0}, 500, function () {
            $(this).addClass("Dn");
            //关闭遮罩
            $(".zhao").addClass("Dn");
            $(".home").removeClass("Dn").animate({opacity: 1});
        });
    });
	
        if ($.cookie('userInfo') != '' && $.cookie('userInfo') != undefined) {
            var userInfo = eval('(' + $.cookie('userInfo') + ')');
            uid = userInfo.uid;
            name = userInfo.name;
            head = userInfo.head;
        }
		
        if (head != null) {
            $("#loginbefore").hide();
			if(head == ''){
				$('#loged').html('<img src="img/headImg.png" width="70" height="70">');
			}else{
            	$('#loged').html('<img src="' + head + '" width="70" height="70">');
            	$('#fImg').html('<img id="heads" src="' + head + '" alt="" width="100%" height="100%"/>');
			}
            $("#loged,#userOut").show();
        } else {
        }
});

function userOut(){
	$.removeCookie('userInfo');
	$.removeCookie('jq');
	window.location.href = "index.html";
}



