
var shaked = false;
var SHAKE_THRESHOLD = 1000;
var x, y, z, last_x, last_y, last_z, lastUpdate = 0;
var canShake = true;
var max_speed = 0;
var indexPoint = 0;
var points = [10,20,30,40,50,60,70,80,90,100,200,300];
var cms_points = [5110,5111,5112,5113,5114,5115,5116,5117,5118,5119,5121,5120];
var mevt_points = [891,894,895,896,897,898,899,900,901,902,907,906];

var titles = ["能量值10%","能量值20%","能量值30%","能量值40%","能量值50%","能量值60%","能量值70%","能量值80%","能量值90%","能量百分百!","能量爆表!","能量惊人!"];
var texts = ["目测你是饿着肚子摇的吧？<br/>是时候来个牛堡beef up一下！",
"偶巴，不要林妹妹附体哟！<br/>是时候来个牛堡beef up一下！",
"三分已注定，还有七分靠打拼！<br/>快来个牛堡beef up一下！",
"饿货，别死撑啦！<br/>是时候来个牛堡beef up一下！",
"半吊子神马的最尴尬啦！<br/>是时候来个牛堡beef up一下！",
"刚到及格线，信心很熬煎！<br/>是时候来个牛堡beef up一下！",
"牛排可以七分熟，活力怎能仅七成？<br/>快来个牛堡beef up一下！",
"你只使出了八成功力啊！快来个<br/>牛堡beef up一下，全力出击！",
"就差一点点！赶紧来个<br/>牛堡beef up一下，燃烧小宇宙！",
"正能量满满，各种牛起！<br/>来个牛堡继续保持无敌活力！",
"能量激增停不下来啊！<br/>你已beef up成活力小超人一枚！",
"能量惊呆全球小伙伴！<br/>请叫我牛魔王大人！"];
var isRunPoint = false;
function addListener() {
	if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
			return true;

    } else if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", deciceOrientationHandler, false);
        return true;
    } else {
        return false;
    }
}

function removeListener() {
    if (window.DeviceMotionEvent) {
        window.removeEventListener("devicemotion", deviceMotionHandler,false);

    } else if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", deciceOrientationHandler,false);
    }
}

function deciceOrientationHandler(eventData) {
	
    var curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 100) {
        var diffTime = (curTime - lastUpdate);
        lastUpdate = curTime;
        x = eventData.alpha;
        y = eventData.beta;
        z = eventData.gamma;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 1000;
        if (speed > SHAKE_THRESHOLD) {
            shaked = true;
			if(speed > max_speed){
				max_speed = speed;	
			}
        } else {
            if (shaked) {
                shaked = false;
                if(canShake){
					canShake = false;
					//removeListener();
					setTimeout(setanimation, 1000);
				}
                
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}

function deviceMotionHandler(eventData) {
	//alert('yaoyiyao aa');
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 100) {
        var diffTime = (curTime - lastUpdate);
        lastUpdate = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
		
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            shaked = true;
			if(speed > max_speed){
				max_speed = speed;	
			}
        } else {
            if (shaked) {
				shaked = false;
                if(canShake){
					canShake = false;
					//removeListener();
					setTimeout(setanimation, 1000);
				}
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
function setanimation(){
	removeListener();
	if(!isRunPoint){
		isRunPoint = true;
		clearInterval(timerPoint);
		showPoints(getPointBySpeed());
	}
}
function getPointBySpeed(){
	
	/*
	if(max_speed > 8000){
		index = Math.floor(Math.random()*2+10);
	}else if(max_speed > 5000){
		index = Math.floor(Math.random()*5+5);
	}else {
		index = Math.floor(Math.random()*5);
	}
	*/
	indexPoint = Math.floor((max_speed-1000)/500);
	indexPoint = indexPoint >= 10 ? Math.floor(Math.random()*2+10) : indexPoint;
	if(indexPoint < 0){indexPoint=0;}
	
	return points[indexPoint];
}
function showPoints(point){
	for(var i=0;i<=point;i+=10){
		if(i > 100){
			break;
		}
		setTimeout("showPoint("+i+")",7*i);
	}
	setTimeout(showPointBox,8*(point>100?100:point));
	setTimeout(function(){
			max_speed = 0;
			//indexPoint = 0;
			shaked = false;
			canShake = true;
			isRunPoint = false;
			lastUpdate = 0
			addListener();
	},9*(point>100?100:point));
	
	
		track(channel,cms_points[indexPoint]);
	_mz_mevt('123', mevt_points[indexPoint]);

}

function showPoint(point){
		$("img[point]").hide();
		$("img[point="+point+"]").show();
		$("html,body").css("background-color",(point>50?"rgb(164,197,3)":"rgb(241,224,199)"));
}
function showPointBox(){
	$('#hanbaobao').hide();
	$(".pointbox .title").text(titles[indexPoint]);
	$(".pointbox .text").html(texts[indexPoint]);
	if(indexPoint < 9){
		$("#pointbox1,#pointbox1_1").show();
		$("#pointbox2").hide();
	}else{
		$("#pointbox2").show();
		$("#pointbox1,#pointbox1_1").hide();
	}
}
function tryAgain(){
	showPoint(0);
	$('.pointbox').hide();
	$('#hanbaobao').show();
	max_speed = 0;
	indexPoint = 0;
	shaked = false;
	canShake = true;
	isRunPoint = false;
	lastUpdate = 0
	addListener();
	timerPoint = setInterval(ChanDong,120);
}

function request(paras)
    { 
        var url = location.href; 
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
        var paraObj = {} 
        for (i=0; j=paraString[i]; i++){ 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
        } 
        var returnValue = paraObj[paras.toLowerCase()]; 
        if(typeof(returnValue)=="undefined"){ 
        return ""; 
        }else{ 
        return returnValue; 
        } 
    }
	
function showHome(){
	//if(indexPoint >= 9){
		tryAgain();
	//}
	closeHaibao();	
}
function closeHaibao(){
	closeZhongjiangmingdan();
	closeHuodongxiangqing();
	$("#haibao,.closeHaibao").hide();	
}
function showHaibao(){
	closeZhongjiangmingdan();
	closeHuodongxiangqing();
	$("#haibao,.closeHaibao").show();	
}
function closeHuodongxiangqing(){
	$("#alertbg,#huodongtext,#huodongtitle").hide();
	
}
function showHuodongxiangqing(){
	closeZhongjiangmingdan();
	closeHaibao();
	$("#alertbg,#huodongtext,#huodongtitle").show();	
	myScroll.refresh();	
}
function closeZhongjiangmingdan(){
	$("#alertbg,#mingdantext,#mingdantitle").hide();
	
}
function showZhongjiangmingdan(){
	closeHuodongxiangqing();
	closeHaibao();
	$("#alertbg,#mingdantext,#mingdantitle").show();	
	winnerScroll.refresh();	
}
function closePopup(){
	document.querySelector('.popup').style.display = 'none';
}


function openPopup(){
	document.querySelector('.popup').style.display = 'block';
}
function openMenu(){
	$(".menu").removeClass("menuOut");
	$(".home,.menu,.hehe").show();
	$(".plus").hide();
}
function closeMenu(){
	$(".menu").addClass("menuOut");
	$(".menu").show();
	
	$(".home,.hehe").hide();
	$(".plus").show();
	
}
function ChanDong(){
	$("img[point]").hide();
	switch(indexChanDong){
		case 1:	$("img[point=0]").show();break;
		case 2:	$("img[point=1]").show();break;
		case 3:	$("img[point=2]").show();break;
		case 4:	$("img[point=1]").show();break;
		case 5:	$("img[point=0]").show();break;
	}
	indexChanDong ++;
	if(indexChanDong>5){
		indexChanDong=1;
	}
}

function getMobile(){
	$.ajax({
		url : "http://static.adwo.com/advmessage/trophy/winnerListByWeek.action?advid=392&onlymobile=1",
		cache : false,
		dataType : 'jsonp',
		jsonpCallback : "eventcallback2",
		success : function(data) {
			showMobile(data);
		}
	});
}

function showMobile(result) {
	createContent(result, "mobile");
}

function createContent(result, type) {
	var num=1;
	if (result == "") return;
	var objs =result;
	var propertyName = "";
	for (var o in objs) {
		var $container;
		switch (o) {
			case "week1":
				num = 1;
				$container = getContainer(1, type);
				propertyName = "week1"

				break;
			case "week2":
				num = 2;
				$container = getContainer(2, type);
				propertyName = "week2"
				break;
			case "week3":
				num = 3;
				$container = getContainer(3, type);
				propertyName = "week3"
				break;
			case "week4":
				num = 4;
				$container = getContainer(4, type);
				propertyName = "week4"
				break;
			default:
				break;
		}
		if (propertyName == "") return;
		var htmlContent = "";
		if (objs[propertyName].length > 0) {
			for (var j = 0; j < objs[propertyName].length; j++) {
				htmlContent += '<li>' +objs[propertyName][j][type] + '</li>';
			}
		} else {
			htmlContent = "<li>&nbsp;</li><li style='line-height:50px; text-align:center; background:none;color:red;'>敬请期待...</li>"
		}
		$container.html(htmlContent);
	}
	
	winnerScroll.refresh();
	
}
function getContainer(number, type) {
	var flider = "email";
	if ("mobile" == type) flider = "phone";
	var obj = $("#week" + number).find("ul." + flider);
	return obj;
}



function shareToBlog(type,trackid,evid) {
	
	_mz_mevt('123', evid);
	var shareContent="",shareUrl = "";
	var shareContentArray = ["#KFC层层薄片嫩牛堡#  摇摇手机，就能测能量值？你没看错！我刚测出的结果是——能量百分百！正能量满满，各种牛起！你也来测测看呗，还有机会赢20元话费哦！详情点击：",
	'#BEEF UP! 是时候牛起！# KFC层层薄片嫩牛堡全新上市，层层美味，鲜嫩多汁！能量不足？是时候来个牛堡BEEF UP一下！领取特惠券点这里：',
	"#KFC层层薄片嫩牛堡#  摇摇手机，就能测能量值？你没看错！我刚测出的结果是——能量爆表！活力小超人一枚！你也来测测看呗，还有机会赢20元话费哦！详情点击：",
	"#BEEF UP! 是时候牛起！# KFC层层薄片嫩牛堡全新上市，层层美味，鲜嫩多汁！能量不足？是时候来个牛堡BEEF UP一下！领取特惠券点这里：",
	"#KFC层层薄片嫩牛堡#  摇摇手机，就能测能量值？你没看错！我刚测出的结果是——能量惊人！能量惊呆全球小伙伴！你也来测测看呗，还有机会赢20元话费哦！详情点击：",
	"#BEEF UP! 是时候牛起！# KFC层层薄片嫩牛堡全新上市，层层美味，鲜嫩多汁！能量不足？是时候来个牛堡BEEF UP一下！领取特惠券点这里："];
	var randomNum = Math.floor(Math.random()*2);
	var indexShareContent=0;
	switch(indexPoint){
		case 9:indexShareContent = randomNum;break;
		case 10:indexShareContent = randomNum + 2;break;
		case 11:indexShareContent = randomNum + 4;break;
		default:indexShareContent = randomNum = 1;break;
	}
	shareContent = shareContentArray[indexShareContent] + "http://wap.kfc.com.cn/beef";
	shareContent = encodeURIComponent(shareContent); 
	//alert(shareContent);
	if (type == "sina") {
		shareUrl = "http://wap.kfc.com.cn/callback/sinacallback?content="+shareContent+"&ad=beef&k=beef_"+chann+"_sina&lat="+randomNum;
	} else if (type == "renren") {
		shareUrl = "http://wap.kfc.com.cn/callback/renrencallback?content="+shareContent+"&ad=beef&k=beef_"+chann+"_renren&lat="+randomNum;

	} else if (type == "tencent") {
		shareUrl = "http://wap.kfc.com.cn/callback/qqcallback?content="+shareContent+"&ad=beef&k=beef_"+chann+"_qq&lat="+randomNum;
	}
	track(channel, trackid, shareUrl);
}

function ismobile() {
    var u = navigator.userAgent.toLowerCase();
    if (u.indexOf('android') > -1 || u.indexOf('linux') > -1) {
        return true;
    }
    if (u.indexOf('dalvik') > -1) {
        return true;
    }
    if (u.indexOf('iphone') > -1 || u.indexOf('ipod') > -1 || u.indexOf('ipad') > -1) {
        return true;
    }
    if (u.indexOf('windows phone') > -1 || u.indexOf('windows mobile') > -1) {
        return true;
    }
    if (u.indexOf('uc ') > -1 || u.indexOf('ucweb') > -1) {
        return true;
    }
    if (u.indexOf('qqbrowser') > -1) {
        return true;
    }
    if (u.indexOf('opera') > -1 && u.indexOf('mobi') > -1) {
        return true;
    }
    return false;
}

if (ismobile()) {
    //首页PV
    track(channel, '5106');
} else {
    track(channel, 5106, 'http://kfc.qq.com/beefup');
}

var myScroll, winnerScroll, timerPoint, indexChanDong = 1;
$(document).ready(function (e) {
    
    max_speed = 0;
    indexPoint = 0;
    addListener();


    myScroll = new iScroll('step8-text', { vScrollbar: true, hScrollbar: false, });
    //中奖名单
    winnerScroll = new iScroll('wrapper');
    $("ul.weeks").delegate("li", "click", function () {
        var $this = $(this);
        $this.parent().find("li").removeClass("current");
        $this.addClass("current");
        var number = $this.attr("id");
        number = number.substring(3, number.length);
        $("div.wrap_c").hide();
        $("div#week" + number).show();
        winnerScroll.refresh();
    });

    timerPoint = setInterval(ChanDong, 120);

    //获取中奖名单
    getMobile();
    $(".home").hide();
    $(".plus").show();
    var r = request("r");
    if (r == "home") {

    } else if (r == "tryAgain") {
        track(channel, '5109'); _mz_mevt('123', '893');
    } else if (r == "huodong") {
        showHuodongxiangqing(); track(channel, '5130'); _mz_mevt('123', '913');
    } else if (r == "mingdan") {
        showZhongjiangmingdan(); track(channel, '5131'); _mz_mevt('123', '914');
    } else if (r == "haibao") {
        showHaibao(); track(channel, '5129'); _mz_mevt('123', '912');
    } else {
        setTimeout("$('.menu').css('display','inline-block')", 1000);
        setTimeout(closeMenu, 3000);

    }


    //预加载图片
    $('img').each(function () {
        if (!$(this).attr('data-src')) return;
        var imgSrc = $(this).attr('data-src');
        $(this).attr({ "src": imgSrc, "data-src": "" });
    });
});




