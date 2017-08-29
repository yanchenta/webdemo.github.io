/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 14-6-8
 * Time: 下午6:52
 * To change this template use File | Settings | File Templates.
 */
//var cId = $.cookie("cid");
$(function () {
    $(".vjs-big-play-button").css({opacity: 0});
    var W = $(window).width();
    var H = $(window).height();
//    $("html,body").height(H).width(W);
    //    开始传球btn
   
    var startPassBtnCanvas = document.getElementById("canvasBtn1");
    var context = startPassBtnCanvas.getContext("2d");
    context.transform(1,0,-0.5,1,35,0);
    context.fillRect(0,0,280,70);
//    点击马上传球打开 开启挑战弹层
    
    $(startPassBtnCanvas).css({opacity:0}).click(function(){
        if (cId == '182' || cId == 'limei') {
            var oclick = "马上传球";

            limei("click", oclick);
        }
    	if( $.cookie('userInfo') == '' || $.cookie('userInfo')==undefined) {
            loginbefore();
    	} else {
//            track(cId,10074);
		    $(".zhao").removeClass("Dn");
		    $(".home").animate({opacity: 0}, 200, function () {
		        $(this).addClass("Dn");
		        $(".step_1").removeClass("Dn").animate({opacity: 1});
		    });
    	}
    });
//    点击 开启挑战之旅 打开定位弹层
    $(".step_1 .foot").click(function(){
        if (cId == '182' || cId == 'limei') {
            var oclick = "开启挑战之旅";

            limei("click", oclick);
        }
//        $(".step_1").animate({opacity: 0}, 500, function () {
//            $(this).addClass("Dn");
//            $(".step_2").removeClass("Dn").animate({opacity: 1});
//        });
        location.href="myborder.html" ;
    });
//    返回到 开启挑战弹层
//    $(".step_2 .foot").click(function(){
//        $(".step_2").animate({opacity: 0}, 500, function () {
//            $(this).addClass("Dn");
//            $(".home").animate({opacity: 1}, 200, function () {
//                $(this).removeClass("Dn");
//                $(".zhao").addClass("Dn");
//            })
//        });
//    });
//    定位弹层确定按钮跳到选择球队
//    $(".location .sureBtn").click(function(){
//        track(cId,10073,"myborder.html");
////       location.href="myborder.html" ;
//    });
});



