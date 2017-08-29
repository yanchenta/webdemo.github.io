/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 14-6-9
 * Time: 上午6:47
 * To change this template use File | Settings | File Templates.
 */

var turnNum = 1;
var teamID = 'a0';
var groupIndex = 0;
var countryIndex = 0;
var imgSrcArr = [];
var countryArr = [];
var srcIndex = 0;
var timer = 0;
function getImgSrc(countryIndex){
    countryArr = [];
    imgSrcArr = [];
    $(".imgWrap").each(function(){
        countryArr.push($(this));
    });
    countryArr[countryIndex].children().each(function(){
        imgSrcArr.push($(this).attr("src"));
    });

//    alert(countryArr);
//    alert(countryArr[countryIndex].children().length);
//    alert(countryArr[countryIndex]);
//    alert(countryIndex);
//    alert(imgSrcArr);
//    alert(imgSrcArr.length);
//    alert(imgSrcArr[0]);
}
function playGif(srcArr){
    $("#teamGif").attr("src","");
    var arr = srcArr;
    $("#teamGif").attr("src",arr[srcIndex]);
    timer = setInterval(function(){
        srcIndex=srcIndex+1;
        $("#teamGif").attr("src",arr[srcIndex]);
    },100);
}
//选择国家
function selectCountry() {
    var arr = [];
    if ($.cookie('cIdid') == '182' || $.cookie('cIdid') == 'limei') {
        var form = teamID;
//        var submit = teamID+","+uid;

        limei("form", form);
    }
    $(".country").each(function () {
        $(this).click(function () {
            countryIndex = $(this).find(".K").parent().index();
            for (var i = 0; i < $(".country").length; i++) {
                $(".country").eq(i).find(".K").removeClass("selected_k");
                $(".country").eq(i).find(".countryImg").removeClass("showBig");
            }
            $(this).find(".K").addClass("selected_k");
            $(this).find(".countryImg").addClass("showBig");
            teamID = teamID[0] + $(this).find(".K").parent().index();
//            alert($(this).find(".K").parent().index());
            getImgSrc(countryIndex);
			qqq(groupIndex+1,countryIndex+1,gif[groupIndex].value[countryIndex].length);

//            playGif(imgSrcArr);
//            if(srcIndex==imgSrcArr.length-1){
//                alert(1);
//                $("#teamGif").attr("src",imgSrcArr[0]);
//                clearInterval(timer);
//            }

        });
    });
}

//替换分组对应的国家
function replaceCountryImg(index) {
    $.getJSON("js/country.json", function (json) {
        if (index == 0 || index == 1 || index == 2 || index == 3 || index == 4 || index == 5 || index == 6 || index == 7) {
            for (var j = 0; j < 4; j++) {
//                $(".c" + (j + 1)).find(".name").html(json[j + 4 * index].name);
                $(".c" + (j + 1)).find("img").attr("src", json[j + 4 * index].src);
            }
        }
    });
}

//好友左右箭头翻页
function fArrowPage(x, turnNum) {
    turnNum = turnNum + x;
    if (x > 0) {
        if (turnNum == 2 || turnNum == 3 || turnNum == 4 || turnNum == 5 || turnNum == 6 || turnNum == 7) {
            var nowPage = $(".numRed");
            var nextPage = $(".numRed").parent().next().children();
            nextPage.addClass("numRed");
            nowPage.removeClass("numRed");
        }
        if (turnNum == 8) {
            turnNum = 7;
        }
    }
    if (x < 0) {
        if (turnNum == 1 || turnNum == 2 || turnNum == 3 || turnNum == 4 || turnNum == 5 || turnNum == 6) {
            var nowPage = $(".numRed");
            var prevPage = $(".numRed").parent().prev().children();
            prevPage.addClass("numRed");
            nowPage.removeClass("numRed");
        }
        if (turnNum == 0) {
            turnNum = 1;
        }
    }
}

//好友点数字翻页
/*function fNumPage(turnNum) {
 var nowPage = $(".numRed");
 var turnPage = $(".num" + (turnNum + 1));
 if (turnPage.attr("class").indexOf("numRed") == -1) {
 turnPage.addClass("numRed");
 nowPage.removeClass("numRed");
 } else {


    }
}*/

$(function () {
    preLoadGroupImg(0,0);
    getImgSrc(0);
//    playGif(imgSrcArr);

//    字颜色
    $(".country .num").css({color: "#000"});
//    弹出好友选择
    $(".team .passBtn").click(function(){
    	//alert(teamID);
    	 addteam(teamID, uid);
    });
//    弹出定位
    $(".friend .f_btn").click(function () {
        if (friends == '' || friends == undefined) {
            alert('请选择好友');

            return false;
        }

        $(".zhao").removeClass("Dn");
        $(".tableHost").addClass("Dn");
        $(".friend").animate({opacity: 0}, 500, function () {
            $(this).addClass("Dn");
            $(".location").removeClass("Dn").animate({opacity: 1});
        });
    });
    //    弹出传球成功
//    $(".friend .f_btn").click(function () {
//        if (friends == '' || friends == undefined) {
//            alert('请选择好友');
//
//            return false;
//        }
//
//        $(".zhao").removeClass("Dn");
//        $(".tableHost").addClass("Dn");
//        $(".friend").animate({opacity: 0}, 500, function () {
//            $(this).addClass("Dn");
//            $(".passBallSuccess").removeClass("Dn").animate({opacity: 1});
//        });
//        playball();
//    });
//    
    $(".location .sureBtn").click(function(){
       
        $(".zhao").removeClass("Dn");
        $(".tableHost").addClass("Dn");
        $(".location").animate({opacity: 0}, 500, function () {
            $(this).addClass("Dn");
            $(".passBallSuccess").removeClass("Dn").animate({opacity: 1});
        });
        playball();
    });
//    弹出传球圈
    $(".passBallSuccess .btn1").click(function () {
        location.href = "map.html";
    });
//    到排行榜
    $(".passBallSuccess .btn2").click(function () {
        location.href = "rank.html";
    });
    $(".passBallSuccess .btn3").click(function () {
        location.href = "index.html";
    });
//      切换小组
    $(".group .groupImg").each(function () {
        $(this).click(function () {
                groupIndex = $(this).index();

                /*$(".imgWrap").each(function () {
                    $(this).empty();
                });*/
                preLoadGroupImg(groupIndex,countryIndex);
                getCountryGroup($(this).index());
                replaceCountryImg($(this).index());

                for (var i = 0; i < 8; i++) {
                    $(".group").eq(1).children().eq(i).addClass("Do");
                    $(".group").eq(0).children().eq(i).removeClass("Do");
                }
                $(this).removeClass("Do");
				/*alert(123);
                $(".group").eq(0).children().eq($(this).index()).addClass("Do");
				$(".selected_k").find(".showBig").removeClass('showBig');
				$(".K").removrClass("selected_k");
				$("#selected1").addClass('selected_k').find("countryImg").addClass("showBig");*/
				
                teamID = String.fromCharCode(97 + parseInt($(this).index())) + teamID[1];
        });
    });
//      选择国家
    selectCountry();
    //qqq(1,1,70);

//    if(srcIndex==imgSrcArr.length-1){
//        $("#teamGif").attr("src",imgSrcArr[0]);
//        clearInterval(timer);
//    }

//    选择好友
    $(".f_item").each(function () {
        $(this).click(function () {
            //alert($(this).find(".fselect").attr('class'));

        	selectFriends($(this));
           // $(this).find(".fselect").toggleClass("fselected");
        });
    });
//    好友左右箭头翻页
   /* $(".arrow_r").click(function () {
        fArrowPage(1, turnNum);
    });
    $(".arrow_l").click(function () {
        fArrowPage(-1, turnNum);
    });*/
//    好友点数字翻页
    $(".num").each(function () {
        $(this).click(function () {
           // fNumPage($(this).parent().index());
            turnNum = $(this).parent().index() + 1;
        });
    });
});
