	function isPC()  
    {
		var userAgentInfo = navigator.userAgent;  
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
		var flag = true;  
		for (var v = 0; v < Agents.length; v++) {  
			if (userAgentInfo.indexOf(Agents[v]) >= 0) { flag = false; break; }  
		}  
		return flag;  
	}
	//初始判断: 一加载页面就判断是否PC，是就进行跳转
	if(isPC()){
		window.location.href = "http://www.kfc.com.cn/kfccda/index.aspx";
	}

	//实现全屏
function resetPage() {
    var deviceWidth = document.documentElement.clientWidth;
	var scale = 1;
    if(deviceWidth >= 1024)  //对应 "kfc-wifi-1024-768.css" => 横版
	{
		scale = deviceWidth / 1024;
	}
	else if(deviceWidth >= 768) //对应 "kfc-wifi-768-1024.css" => 竖版
	{
		scale = deviceWidth / 768;
	}
    else// if(deviceWidth > 640) //对应 "kfc-wifi-640-980.css" ... 样式
	{
		scale = deviceWidth / 640;
	}
	document.body.style.zoom = scale;
}

window.onresize = function() {
    resetPage();
}

window.onload = function() {
    resetPage();
	
	//首页PV加载
	if(window.curChannel.channel == window.codeConsts.channel.ipad)
	{
		track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_page_pv);
	}
	else if(window.curChannel.channel == window.codeConsts.channel.android)
	{
		track2(window.curChannel.channel, window.codeConsts.androidCodes.android_page_pv);
	}
	else if(window.curChannel.channel == window.codeConsts.channel.iphone)
	{
		track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_page_pv);
	}
	
	//轮播图加载
	if(window.curChannel.channel == window.codeConsts.channel.ipad)
	{
		track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_lunbo_pv);
	}
	else if(window.curChannel.channel == window.codeConsts.channel.android)
	{
		track2(window.curChannel.channel, window.codeConsts.androidCodes.andriod_lunbo_pv);
	}
	else if(window.curChannel.channel == window.codeConsts.channel.iphone)
	{
		track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_lunbo_pv);
	}
	
	//走马灯文字加载
	if(window.curChannel.channel == window.codeConsts.channel.ipad)
	{
		track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_zoumadeng_pv);
	}
	else if(window.curChannel.channel == window.codeConsts.channel.android)
	{
		track2(window.curChannel.channel, window.codeConsts.androidCodes.android_zoumadeng_pv);
	}
	else if(window.curChannel.channel == window.codeConsts.channel.iphone)
	{
		track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_zoumadeng_pv);
	}
	
	
	/*//轮播图
	AnimationObj.cursorImgs = [document.getElementById("cursorImgLink3"), document.getElementById("cursorImgLink1"), document.getElementById("cursorImgLink2")];
	//轮播文字
	AnimationObj.cursorTxts = [document.getElementById("cursorTextLink3"), document.getElementById("cursorTextLink1"), document.getElementById("cursorTextLink2")];
	AnimationObj.cursorCurIdx = 2;*/
	//AnimationObj.cursorImgs = [document.getElementById("cursorImgLink4"), document.getElementById("cursorImgLink3")];
	AnimationObj.cursorImgs = [document.getElementById("cursorImgLink5"), document.getElementById("cursorImgLink4")];
	//轮播文字
	//AnimationObj.cursorTxts = [document.getElementById("cursorTextLink4"), document.getElementById("cursorTextLink3")];
	AnimationObj.cursorTxts = [document.getElementById("cursorImgLink5"), document.getElementById("cursorTextLink4")];
	AnimationObj.cursorCurIdx = 1;
	AnimationObj.cursorImgsIntervalFunc = function(){
		//alert(1);
		//切换动画
		$(".box-img").eq(AnimationObj.cursorCurIdx).fadeIn(0).siblings(".box-img").fadeOut(250);
		
		//按索引轮播文字
		$(".box-txt").eq(AnimationObj.cursorCurIdx).fadeIn(0).siblings(".box-txt").fadeOut(0);
		
		var nextIdx = (AnimationObj.cursorCurIdx + 1) % AnimationObj.cursorImgs.length;
		AnimationObj.cursorCurIdx = nextIdx;
	}
	window.setInterval(AnimationObj.cursorImgsIntervalFunc, 6000);
	
	AnimationObj.cursorImgsIntervalFunc();
}

var AnimationObj = {};

function browserRedirect() {  
    //供应商
	var sUserAgent= navigator.userAgent.toLowerCase();
	//alert(sUserAgent);
	var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs= sUserAgent.match(/iphone/i) == "iphone";
	var bIsAndroid= sUserAgent.match(/android/i) == "android";
	//var bIsAndroid = (sUserAgent.indexOf("android") >= 0);
    
	//var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";  
	//var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";  
    //var bIsMidp= sUserAgent.match(/midp/i) == "midp";  
	//var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
	//var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";  
	if (bIsIpad){
		window.curChannel.channel = window.codeConsts.channel.ipad;
	}
	else if(bIsAndroid){
		window.curChannel.channel = window.codeConsts.channel.android;
	}
	else if(bIsIphoneOs){
		window.curChannel.channel = window.codeConsts.channel.iphone;
	}
	else {
		window.curChannel.channel = window.codeConsts.channel.unknown;
	}
	//alert("bIsIpad:" + bIsIpad + ",bIsIphoneOs:" + bIsIphoneOs + ",bIsAndroid:" + bIsAndroid);
}


function loadListners(){
	//判断设备与渠道
	browserRedirect();
	//banner
	//var btn_imgCursors = document.getElementsByClassName("cursor-image-a");
	var btn_imgCursors = document.getElementsByClassName("box-img");
	for(var i = 0; i < btn_imgCursors.length; i++){
		btn_imgCursors[i].channel = window.curChannel.channel;
		btn_imgCursors[i].onclick = function() {//轮播图点击
			var url = null;
			if(this.className.indexOf("cursor-image4") > -1){
				url = "http://youhui.kfc.com.cn/mobile/";
			}
			else if(this.className.indexOf("cursor-image5") > -1){
				//url = "http://m.kfc.com.cn/football/wifi/index.html";
				url = "http://m.kfc.com.cn/ttbj/poster";
			}
			
			if(window.curChannel.channel == window.codeConsts.channel.ipad)
			{
				track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_lunbo_click);
				yumTrack(window.yumConsts.lunboImgEvent, window.yumConsts.ipadMsg, url);
			}
			else if(window.curChannel.channel == window.codeConsts.channel.android)
			{
				track2(window.curChannel.channel, window.codeConsts.androidCodes.android_lunbo_click);
				yumTrack(window.yumConsts.lunboImgEvent, window.yumConsts.androidMsg, url);
			}
			else if(window.curChannel.channel == window.codeConsts.channel.iphone)
			{
				track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_lunbo_click);
				yumTrack(window.yumConsts.lunboImgEvent, window.yumConsts.iphoneMsg, url);
			}
		
			//alert(window.curChannel.channel + ":" +  window.codeConsts.ipadCodes.ipad_lunbo_click + "," + window.codeConsts.androidCodes.android_lunbo_click + "," + window.codeConsts.iphoneCodes.iphone_lunbo_click);
		
			//window.location.href = "http://m.kfc.com.cn/eggpancake/mobilesite/index.html";
			//window.location.href = "http://m.kfc.com.cn/football/wifi/index.html";
			
		}
	}
	
	//var btn_txtlinks = document.getElementsByClassName("link-text-a");
	var btn_txtlinks = document.getElementsByClassName("box-txt");
	for(var i = 0; i < btn_txtlinks.length; i++){
		btn_txtlinks[i].channel = window.curChannel.channel;
		btn_txtlinks[i].onclick = function() {//走马灯文字-点击
			var url = null;
			if(this.className.indexOf("cursor-text4") > -1){
				url = "http://youhui.kfc.com.cn/mobile/";
			}
			else{
				//url = "http://m.kfc.com.cn/football/wifi/index.html";
				url = "http://m.kfc.com.cn/ttbj/poster";
			}
			
			if(window.curChannel.channel == window.codeConsts.channel.ipad)
			{
				track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_zoumadeng_click);
				yumTrack(window.yumConsts.lunboStringEvent, window.yumConsts.ipadMsg, url);
			}
			else if(window.curChannel.channel == window.codeConsts.channel.android)
			{
				track2(window.curChannel.channel, window.codeConsts.androidCodes.android_zoumadeng_click);
				yumTrack(window.yumConsts.lunboStringEvent, window.yumConsts.androidMsg, url);
			}
			else if(window.curChannel.channel == window.codeConsts.channel.iphone)
			{
				track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_zoumadeng_click);
				yumTrack(window.yumConsts.lunboStringEvent, window.yumConsts.iphoneMsg, url);
			}
			//window.location.href="http://m.kfc.com.cn/eggpancake/mobilesite/index.html";
			//window.location.href = "http://m.kfc.com.cn/football/wifi/index.html";
			
		}
	}
	
	//增加的焦点图显示
	var topbtn_download = document.getElementsByClassName("div-top-area")[0];
	topbtn_download.channel = window.curChannel.channel;
	topbtn_download.onclick = function() {//官方app下载-点击
		if(window.curChannel.channel == window.codeConsts.channel.ipad)
		{
			track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_guanfang_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			yumTrack(window.yumConsts.guanfangAppEvent, window.yumConsts.ipadMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.android)
		{
			track2(window.curChannel.channel, window.codeConsts.androidCodes.android_guanfang_downloadnow);
			//window.location.href = "http://download.mobile1.com.cn/KFC.apk";
			//window.location.href = "http://s.yekmob.com/kfc/KFC-KFCKFCWifiA16-V1.0.6.apk";
			var url = "http://www.kfc.com.cn/kfccda/KFC-KFCKFCA12-V1.0.7.apk";
			// yumTrack(window.yumConsts.guanfangAppEvent, window.yumConsts.androidMsg);
			window.location = url;
		}
		else if(window.curChannel.channel == window.codeConsts.channel.iphone)
		{
			track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_guanfang_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			yumTrack(window.yumConsts.guanfangAppEvent, window.yumConsts.iphoneMsg, url);
		}
	}
	
	//left-button
	var left_download = document.getElementsByClassName("left-button")[0];
	left_download.channel = window.curChannel.channel;
	left_download.onclick = function() {//官方app下载-点击 => 订餐app下载-点击
		/*if(window.curChannel.channel == window.codeConsts.channel.ipad)
		{
			track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_guanfang_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			yumTrack(window.yumConsts.guanfangAppEvent, window.yumConsts.ipadMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.android)
		{
			track2(window.curChannel.channel, window.codeConsts.androidCodes.android_guanfang_downloadnow);
			//window.location.href = "http://download.mobile1.com.cn/KFC.apk";
			//window.location.href = "http://s.yekmob.com/kfc/KFC-KFCKFCWifiA16-V1.0.6.apk";
			var url = "http://s.yekmob.com/kfc/KFC-KFCKFCA12-V1.0.7.apk";
			// yumTrack(window.yumConsts.guanfangAppEvent, window.yumConsts.androidMsg);
			window.location = url;
		}
		else if(window.curChannel.channel == window.codeConsts.channel.iphone)
		{
			track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_guanfang_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8";
			yumTrack(window.yumConsts.guanfangAppEvent, window.yumConsts.iphoneMsg, url);
		}*/
		
		if(window.curChannel.channel == window.codeConsts.channel.ipad)
		{
			track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_dingcan_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.ipadMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.android)
		{
			track2(window.curChannel.channel, window.codeConsts.androidCodes.android_dingcan_downloadnow);
			//window.location.href = "http://download.app.4008823823.com.cn/kfcmos.apk";
			//window.location.href = "http://m.4008823823.com.cn/kfcmwos/appdownload/androidapk.htm";
			var url = "http://m.4008823823.com.cn/kfcmwos/appdownload/androidapk.htm";
			yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.androidMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.iphone)
		{
			track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_dingcan_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.iphoneMsg, url);
		}
		
	}
	//right-button
	var right_download = document.getElementsByClassName("right-button")[0];
	right_download.channel = window.curChannel.channel;
	right_download.onclick = function() {//订餐app下载-点击 => 预付快取-下载点击
		/*if(window.curChannel.channel == window.codeConsts.channel.ipad)
		{
			track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_dingcan_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.ipadMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.android)
		{
			track2(window.curChannel.channel, window.codeConsts.androidCodes.android_dingcan_downloadnow);
			//window.location.href = "http://download.app.4008823823.com.cn/kfcmos.apk";
			//window.location.href = "http://m.4008823823.com.cn/kfcmwos/appdownload/androidapk.htm";
			var url = "http://m.4008823823.com.cn/kfcmwos/appdownload/androidapk.htm";
			yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.androidMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.iphone)
		{
			track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_dingcan_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			var url = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.iphoneMsg, url);
		}*/
		if(window.curChannel.channel == window.codeConsts.channel.ipad)
		{
			//track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_dingcan_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			//var url = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			//yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.ipadMsg, url);
			window.location.href = "http://order.kfc.com.cn/download/iphone.htm";
		}
		else if(window.curChannel.channel == window.codeConsts.channel.android)
		{
			//track2(window.curChannel.channel, window.codeConsts.androidCodes.android_dingcan_downloadnow);
			//window.location.href = "http://download.app.4008823823.com.cn/kfcmos.apk";
			//window.location.href = "http://m.4008823823.com.cn/kfcmwos/appdownload/androidapk.htm";
			//var url = "http://m.4008823823.com.cn/kfcmwos/appdownload/androidapk.htm";
			//yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.androidMsg, url);
			window.location.href = "http://order.kfc.com.cn/download/android.htm";
		}
		else if(window.curChannel.channel == window.codeConsts.channel.iphone)
		{
			//track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_dingcan_downloadnow);
			//window.location.href = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			//var url = "https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8";
			//yumTrack(window.yumConsts.dingcanAppEvent, window.yumConsts.iphoneMsg, url);
			window.location.href = "http://order.kfc.com.cn/download/iphone.htm";
		}
	}
	
	//btn-weibo
	var btn_weibo = document.getElementsByClassName("btn-weibo")[0];
	btn_weibo.channel = window.curChannel.channel;
	btn_weibo.onclick = function() {//关注微博-点击
		var url = "http://m.weibo.cn/u/1687422352?";
		if(window.curChannel.channel == window.codeConsts.channel.ipad)
		{
			track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_attention_weiboclick);
			yumTrack(window.yumConsts.sinaWebChatEvent, window.yumConsts.ipadMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.android)
		{
			track2(window.curChannel.channel, window.codeConsts.androidCodes.android_attention_weiboclick);
			yumTrack(window.yumConsts.sinaWebChatEvent, window.yumConsts.androidMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.iphone)
		{
			track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_attention_weiboclick);
			yumTrack(window.yumConsts.sinaWebChatEvent, window.yumConsts.iphoneMsg, url);
		}
		//window.location.href = "http://m.weibo.cn/u/1687422352?";
	}
	//footer
	var btn_footer = document.getElementsByClassName("footer")[0];
	btn_footer.channel = window.curChannel.channel;
	btn_footer.onclick = function() {//跳转到官网-点击
		var url = "http://www.kfc.com.cn/kfccda/index.aspx?from=mobile";
		if(window.curChannel.channel == window.codeConsts.channel.ipad)
		{
			track2(window.curChannel.channel, window.codeConsts.ipadCodes.ipad_kendeji_guanfang_click);
			yumTrack(window.yumConsts.toPcPage, window.yumConsts.ipadMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.android)
		{
			track2(window.curChannel.channel, window.codeConsts.androidCodes.android_kendeji_guanfang_click);
			yumTrack(window.yumConsts.toPcPage, window.yumConsts.androidMsg, url);
		}
		else if(window.curChannel.channel == window.codeConsts.channel.iphone)
		{
			track2(window.curChannel.channel, window.codeConsts.iphoneCodes.iphone_kendeji_guanfang_click);
			yumTrack(window.yumConsts.toPcPage, window.yumConsts.iphoneMsg, url);
		}
		//window.location.href = "http://www.kfc.com.cn/kfccda/index.aspx?from=mobile";
		
	}
}

//...，，
window.yumConsts = {
	lunboImgEvent:"焦点图",
	lunboStringEvent:"焦点文字",
	guanfangAppEvent:"官方app下载",
	dingcanAppEvent:"订餐app下载",
	sinaWebChatEvent:"关注微博",
	toPcPage:"跳转到PC网站",
	androidMsg:"android",
	ipadMsg:"ipad",
	iphoneMsg:"iphone"
};

window.curChannel = {};
window.curChannel.channel = window.codeConsts.channel.unknown;

loadListners();