/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 14-6-10
 * Time: 上午1:07
 * To change this template use File | Settings | File Templates.
 */
//$(function(){
//    var W = $(window).width();
//    var H = $(window).height();
//    $("html,body,.body2,.BG,.introduceActive").height(H);
//});
//var endY = 0;
//var startY = 0;
//var startX = 0;
//var xStart = 0;
//var xEnd = 0;
//var yStart = 0;
//var yEnd = 0;
//var len = 0;
////var nodeTop
//var Move = 0;
//var fangxiang = 0;
////touchstart事件
//function touchSatrtFunc(evt) {
//    try {
//        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
//        var touch = evt.changedTouches[0];
//        var nodeObj = evt.target;
//        yStart = 0 ;
//        startY = parseInt(touch.pageY);
//        nodeTop = parseInt(nodeObj.offsetTop);
//        if (startY > 247 && startY < 846 || nodeTop >= 0) {
//            Move = 1;
////            alert(Move+"..."+nodeTop + " ... "+startY);
////            alert(nodeTop);
//        } else {
//            Move = 0;
//        }
//    }
//    catch (e) {
//        alert('touchSatrtFunc：' + e.message);
//    }
//}
//
//function touchMoveFunc(evt) {
//    try {
//        evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
//        var touch = evt.changedTouches[0];
//        yStart = parseInt(touch.pageY);
//        xStart = parseInt(touch.pageX);
//
//        var nodeObj = evt.target;
//        nodeTop = parseInt(nodeObj.offsetTop);
////        if((endY-startY)>0)
//        len = yStart - nodeTop;
//        scollScreen(len);
//        nodeObj.offsetTop = len;
////        $("#scollObj").animate({marginTop:Math.abs(fangxiang)},0);
////            $(nodeObj).css({top: Math.abs(fangxiang)});
////        if (Move != 0 && startY > 247 && startY < 846) {
////        } else {
////            Move = 0;
////        }
//
//    }
//    catch (e) {
//        alert('touchMoveFunc：' + e.message);
//    }
//}
//
////touchend事件
//function touchEndFunc(evt) {
//    try {
//        var touch = evt.changedTouches[0];
//        endY = parseInt(touch.pageY);
//        var nodeObj = evt.target;
//        nodeTop = parseInt(nodeObj.offsetTop);
//        fangxiang = endY - startY;
////        alert(fangxiang +"   ////" + yStart + ">>>>>"+nodeTop);
////        if( fangxiang>30 && Move!=0 )
////        var nowTop = parseInt(nodeObj.offsetTop);
////        if (nowTop < 145 && nowTop > 600) {
////            Move = 0;
////        }
////alert(endY);
//    }
//    catch (e) {
////        alert('touchEndFunc：' + e.message);
//    }
//}
//
////绑定事件
//function bindEvent() {
//    var evtObj = document.getElementById("scollObj");
//    evtObj.addEventListener('touchstart', touchSatrtFunc, false);
//    evtObj.addEventListener('touchmove', touchMoveFunc, false);
//    evtObj.addEventListener('touchend', touchEndFunc, false);
//}
//
////判断是否支持触摸事件
//function isTouchDevice() {
//    try {
//        document.createEvent("TouchEvent");
//        bindEvent(); //绑定事件
//    }
//    catch (e) {
//        //alert("不支持TouchEvent事件！" + e.message);
//        alert(e.message);
//    }
//}
//
//window.onload = isTouchDevice;
//function scollScreen(changedL) {
////    alert(changedL);
//    var percent = parseInt(changedL) / 390;
//    var marginTopCon = parseInt($("#scollCon").css("height")) * percent;
////    alert(marginTopCon);
////    var per = marginTopCon/10;
//    $("#scollCon").animate({marginTop:-( marginTopCon)},0);
//
//}