// JavaScript Document
if (window.DeviceMotionEvent) {
	window.addEventListener('devicemotion', deviceMotionHandler, false);
} 

var SHAKE_THRESHOLD = 400;
var lastUpdate = 0;

var x, y, z, last_x, last_y, last_z;

var canShake=1; //Gorden 130718,  

function deviceMotionHandler(eventData) {
  var acceleration = eventData.accelerationIncludingGravity;

  var curTime = new Date().getTime();
  if ((curTime - lastUpdate) > 200) { 

      var diffTime = (curTime - lastUpdate);
      lastUpdate = curTime;

      x = acceleration.x;
      y = acceleration.y;
      z = acceleration.z;

      var speed = Math.abs(x+y+z-last_x-last_y-last_z) / diffTime * 8000;

      
	  if (speed > SHAKE_THRESHOLD && canShake==1) {//Gorden 130718
		  canShake=0;//Gorden 130718
		  setTimeout('canShake=1', 2000)//Gorden 130718
		//摇动手机触发事件，监测代码可以加在这里
		_mz_mevt('104', '553');
		track(channelNum,4453);
		changePic(); //随即触发显示一朵花
      }
      last_x = x;
      last_y = y;
      last_z = z;
	 
	  
    } 

}
 

function initArguments(p) {
    var paramString = window.location.search;
    if (paramString.indexOf("?") > -1) {
        paramString = paramString.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
        var paramObjs = JSON.parse('{"' + paramString + '"}');
        return paramObjs[p];
    }
}


function changePic(){

var num=Math.ceil(Math.random()*5); 
	//window["pic"+num]()
	//window.location.href="wenyihua.html";


switch (num){
	case 1:
		$.mobile.changePage("#wenyihua","pop");
		_mz_mevt('104', '558');
		
		break;
	case 2:
		$.mobile.changePage("#aojiaohua","pop");
		_mz_mevt('104', '558');
		break;
	case 3:
		$.mobile.changePage("#chihuoha","pop");
		_mz_mevt('104', '558');
		break;
	case 4:
		$.mobile.changePage("#zhengnenglianghua","pop");
		_mz_mevt('104', '558');
		break;
	case 5:
		$.mobile.changePage("#nixihua","pop");
		_mz_mevt('104', '558');
		break;
		
	}
	
	
}

$(document).bind('pageinit', function(){ 

   $('.save').tap(function(){ 
   
   //点击保存优惠券提示内容
   alert("请长按图片3秒保存优惠券，或截屏幕保存(iPhone:同时按Home键与关机键。Android:同时按音量减小键和电源键。)")
   
   })
});


//$(document).bind('pageinit', function(){ 

//});
var channelName;
if(channelNum == '20'){
	channelName = 'root';
}else if(channelNum == '1'){
	channelName = 'adwo';
}else if(channelNum == '2'){
	channelName = 'domob';
}else if(channelNum == '14'){
	channelName = 'inmobi';
}else if(channelNum == '16'){
	channelName = 'uc';
}else if(channelNum == '23'){
	channelName = 'renren';
}else if(channelNum == '28'){
	channelName = 'qr';
}





//share 傲娇花
function xinlang_aojiaohua(){
	
	//分享"傲娇花"至新浪按钮 
	
	//分享到sina 监测代码可以加在这里
	_mz_mevt('104', '554');
	track(channelNum,4454);
	
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/sinacallback?content="+encodeURIComponent('我就是能将高傲毒舌与羞涩温柔自由转换无缝衔接的“傲娇花”！我参加KFC #花淇淋，花一夏 # 活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_sina&ad=hql&log=xx&lat=1","_self");
		},500)
}

function qq_aojiaohua(){
	//分享"傲娇花"至QQ按钮 
	
	//分享到qq 监测代码可以加在这里
	_mz_mevt('104', '555');
	track(channelNum,4455);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/qqcallback?content="+encodeURIComponent('我就是能将高傲毒舌与羞涩温柔自由转换无缝衔接的“傲娇花”！我参加KFC #花淇淋，花一夏 # 活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_qq&ad=hql&log=xx&lat=1","_self");},500)
}

function rr_aojiaohua(){
	//分享"傲娇花"至人人网按钮
	
	//分享到rr 监测代码可以加在这里
	_mz_mevt('104', '556');
	track(channelNum,4456);
	
	setTimeout(function(){ 
	window.open("http://wap.kfc.com.cn/callback/renrencallback?content="+encodeURIComponent('我就是能将高傲毒舌与羞涩温柔自由转换无缝衔接的“傲娇花”！我参加KFC #花淇淋，花一夏 # 活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_renren&ad=hql&log=xx&lat=1","_self");},500)
}

//share吃货花

function xinlang_chihuohua(){
	
	//分享到sina 监测代码可以加在这里
	_mz_mevt('104', '554');
	track(channelNum,4454);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/sinacallback?content="+encodeURIComponent('原来我是有吃就活蹦乱跳，节能环保好哄的“吃货花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_sina&ad=hql&log=xx&lat=2","_self");},500)
}

function qq_chihuohua(){
	
	//分享到qq 监测代码可以加在这里
	_mz_mevt('104', '555');
	track(channelNum,4455);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/qqcallback?content="+encodeURIComponent('原来我是有吃就活蹦乱跳，节能环保好哄的“吃货花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_qq&ad=hql&log=xx&lat=2","_self");},500)
}

function rr_chihuohua(){
	
	//分享到rr 监测代码可以加在这里
	_mz_mevt('104', '556');
	track(channelNum,4456);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/renrencallback?content="+encodeURIComponent('原来我是有吃就活蹦乱跳，节能环保好哄的“吃货花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_renren&ad=hql&log=xx&lat=2","_self");},500)
}

//share逆袭花

function xinlang_nixihua(){
	
	//分享到sina 监测代码可以加在这里
	_mz_mevt('104', '554');
	track(channelNum,4454);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/sinacallback?content="+encodeURIComponent('我勇敢PK高富帅/白富美，凭借真我魅力开出一朵“逆袭花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_sina&ad=hql&log=xx&lat=4","_self");},500)
}

function qq_nixihua(){
	
	//分享到qq 监测代码可以加在这里
	_mz_mevt('104', '555');
	track(channelNum,4455);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/qqcallback?content="+encodeURIComponent('我勇敢PK高富帅/白富美，凭借真我魅力开出一朵“逆袭花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_qq&ad=hql&log=xx&lat=4","_self");},500)
}

function rr_nixihua(){
	
	//分享到rr 监测代码可以加在这里
	_mz_mevt('104', '556');
	track(channelNum,4456);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/renrencallback?content="+encodeURIComponent('我勇敢PK高富帅/白富美，凭借真我魅力开出一朵“逆袭花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_renren&ad=hql&log=xx&lat=4","_self");},500)
}

//share文艺花
function xinlang_wenyihua(){
	
	//分享到sina 监测代码可以加在这里
	_mz_mevt('104', '554');
	track(channelNum,4454);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/sinacallback?content="+encodeURIComponent('原来我的文化底蕴、艺术气质、清新气息已经绽放出“文艺花”了！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_sina&ad=hql&log=xx&lat=3","_self");},500)
}

function qq_wenyihua(){
	
	//分享到qq 监测代码可以加在这里
	_mz_mevt('104', '555');
	track(channelNum,4455);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/qqcallback?content="+encodeURIComponent('原来我的文化底蕴、艺术气质、清新气息已经绽放出“文艺花”了！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_qq&ad=hql&log=xx&lat=3","_self");},500)
}

function rr_wenyihua(){
	
	//分享到rr 监测代码可以加在这里
	_mz_mevt('104', '556');
	track(channelNum,4456);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/renrencallback?content="+encodeURIComponent('原来我的文化底蕴、艺术气质、清新气息已经绽放出“文艺花”了！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_renren&ad=hql&log=xx&lat=3","_self");},500)
}

//share正能量花
function xinlang_zhengnengliang(){
	
	//分享到sina 监测代码可以加在这里
	_mz_mevt('104', '554');
	track(channelNum,4454);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/sinacallback?content="+encodeURIComponent('我就是元气满满，时刻为朋友们注入亢奋鸡血的“正能量花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_sina&ad=hql&log=xx&lat=0","_self");},500)
}

function qq_zhengnengliang(){
	
	//分享到qq 监测代码可以加在这里
	_mz_mevt('104', '555');
	track(channelNum,4455);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/qqcallback?content="+encodeURIComponent('我就是元气满满，时刻为朋友们注入亢奋鸡血的“正能量花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_qq&ad=hql&log=xx&lat=0","_self");},500)
}

function rr_zhengnengliang(){
	
	//分享到rr 监测代码可以加在这里
	_mz_mevt('104', '556');
	track(channelNum,4456);
	
	setTimeout(function(){
	window.open("http://wap.kfc.com.cn/callback/renrencallback?content="+encodeURIComponent('我就是元气满满，时刻为朋友们注入亢奋鸡血的“正能量花”！我参加KFC#花淇淋，花一夏#活动，获得“减2元优惠券”！赞！快来看你是什么花吧！点击：http://wap.kfc.com.cn/hql/')+"&k=hql_"+channelName+"_renren&ad=hql&log=xx&lat=0","_self");},500)
}

