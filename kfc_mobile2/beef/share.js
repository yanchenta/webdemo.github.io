
var shaked = false;
var SHAKE_THRESHOLD = 1000;
var x, y, z, last_x, last_y, last_z, lastUpdate = 0;
var canShake = true;
var max_speed = 0;
var indexPoint = 0;
var points = [10,20,30,40,50,60,70,80,90,100,200,300];
var titles = ["能量值10%","能量值20%","能量值30%","能量值40%","能量值50%","能量值60%","能量值70%","能量值80%","能量值90%","能量百分百!","能量爆表!","能量惊人!"];
var texts = ["目测你是饿着肚子摇的吧？<br/>是时候来个牛堡beef up一下！",
"偶巴，不要林妹妹附体哟！<br/>是时候来个牛堡beef up一下！",
"三分已注定，还有七分靠打拼！<br/>快来个牛堡beef up一下！",
"做回自己，不要在当饿货！<br/>快来个牛堡beef up一下！",
"半吊子神马的最尴尬啦！<br/>快来个牛堡beef up一下！",
"刚到及格线，信心很熬煎！<br/>快来个牛堡beef up一下！",
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
	indexPoint = Math.floor((max_speed-1000)/600);
	indexPoint = indexPoint > 11 ? 11 : indexPoint;
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
}

function showPoint(point){
		$("img[point]").hide();
		$("img[point="+point+"]").show();
}
function showPointBox(){
	$('#hanbaobao').hide();
	$(".pointbox .title").text(titles[indexPoint]);
	$(".pointbox .text").html(texts[indexPoint]);
	if(indexPoint < 9){
		$("#pointbox1").show();
		$("#pointbox2").hide();
	}else{
		$("#pointbox2").show();
		$("#pointbox1").hide();
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
}

function trim(str){ //删除左右两端的空格
	return str;//.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
	return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
	return str.replace(/(\s*$)/g,"");
}

function matchUserName(val){
	var valnew = trim(val);
	var re1=/^[~!@#$%^&*()-+={}|;:<>?.,~！@#￥……&*（）+=｛｝【】|、：；"'《》、？，。]/i;
	if(valnew == ""){
		return false;
	}
	if(re1.test(valnew)){
		return false;
	}
	if(valnew.length<2||valnew.length>20){
		return false;
	}
}

function matchEmail(val){
	var valnew = trim(val);
	if(valnew.match( /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
		return true;
	}else{
		return false;
	}
}

function matchMobile(val){
	var valnew = trim(val);
	if(valnew.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/)){
		return true;
	}else{
		return false;
	}
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
function submit_phone() {
			var reg = /^1[3|4|5|8][0-9]\d{8}$/;
			var phone = $(".mobile").val();
			if (reg.test(phone)) {
				//手机号提交

				$.ajax({
					url : "http://static.adwo.com/advmessage/adv/addResultJsonP.action?advid=392",
					cache : false,
					dataType : 'jsonp',
					data : {
						uid : uid,
						trophyRecordid : trophyRecordid,
						mobile : phone
					},
					jsonpCallback : "eventcallback4",
					success : function(data) {
						if(data[0].success ==1){
							$('#pointbox3,#pointbox5').hide();
							$('#pointbox4').show();		
track(channel,'5126');_mz_mevt('123', '909');							
						}else if(data[0].success ==3){
							//alert('这个号码已经中过奖啦！');
						}else{	
							alert('提交失败！');
						}
					}
				});
			} else {
				alert("请输入正确的手机号码！")
			}
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
var yeyeye = false;
var myCanvas, timer, uid = request("uid");
var trophyRecordid;
$(document).ready(function (e) {
	$("html,body").css("background-color","rgb(181,223,18)");
    $(".home,.hehe").hide();
    $(".plus").show();

    myCanvas = new MyCanvas('canvas');
    myCanvas.drawImage('images/guagua.png');
    myCanvas.isEraser = true;
    timer = setInterval(removeCanvas, 1000);
    function removeCanvas() {
        if (myCanvas.checkCleared()) {
            clearInterval(timer);
            myCanvas.remove();
            //var img= new Image();
            //img.src="images/ok.png";			 
            myCanvas.clearAll();
            yeyeye ? guagua_ok() : guagua_no();
        }
    }

    if (uid) {

        $.ajax({
            url: "http://static.adwo.com/advmessage/trophy/awardJsonP.action?advid=392&userinfo=" + uid,
            cache: false,
            dataType: 'jsonp',
            jsonpCallback: "eventcallback3",
            timeout: 3500,
            success: function (data) {
                $("#awarding").hide();
                if (data[0].success == 1 && data[0].award == 1 && data[0].lotterycount <= 10) {		//中奖
                    trophyRecordid = data[0].prize.recordid;
                    $("#canvas").css("background-image", "url(images/ok.png)");
                    yeyeye = true;
                    track(channel, '5125'); _mz_mevt('123', '908');
                } else if (data[0].success == 1 && data[0].lotterycount > 10) {//超过次数
                    $('#pointbox3,#pointbox4').hide();
                    $('#pointbox5').show();
                    track(channel, '5128'); _mz_mevt('123', '911');
                } else {	//没中奖
                    $("#canvas").css("background-image", "url(images/no.png)");
                    yeyeye = false;
                    track(channel, '5127'); _mz_mevt('123', '910');
                }
            },
            error: function () {
                $("#canvas").css("background-image", "url(images/no.png)");
                yeyeye = false;
                track(channel, '5127'); _mz_mevt('123', '910');

            }
        });
    } else {
        $("#canvas").css("background-image", "url(images/no.png)");
        yeyeye = false;
        track(channel, '5127'); _mz_mevt('123', '910');
    }
});
function guagua_ok() {
    $(".guagua_ok").css("display", "inline-block");
    $("#pointbox3 #tip1").hide();
}
function guagua_no() {
    $(".guagua_no").css("display", "inline-block");
    $("#pointbox3 #tip1").hide();
}


