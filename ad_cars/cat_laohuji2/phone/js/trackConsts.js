//首页
function cms_phone_index_pv(){
	track2(201,10371);
}
function cms_phone_index_tuijian(){
	track2(201,10372,"m2-1.html");
}
function cms_phone_index_xiangqing(){
	track2(201,10373,"m1-1.html");
}


//详情界面
function cms_phone_xiangqing_pv(){
	track2(201,10374);
}
function cms_phone_xiangqing_tozhuce(){
	track2(201,10375,"m2-1.html?param1=register");
}
function cms_phone_xiangqing_totuijian(){
	track2(201,10376,"m2-1.html");
}

//底部点击
function cms_phone_bottom_m1(url){
	track2(201, 10377, url);
}
function cms_phone_bottom_m2(url){
	track2(201, 10378, url);
}
function cms_phone_bottom_m3(url){
	track2(201, 10379, url);
}
function cms_phone_bottom_m4(url){
	track2(201, 10380, url);
}

//推荐页面
function cms_phone_tuijian_pv(){
	track2(201, 10381);
}
function cms_phone_tuijian_tolayerlogin(){
	track2(201, 10382);
}
function cms_phone_tuijian_getcode(){
	track2(201, 10383);
}
function cms_phone_tuijian_lastsubmit(){
	track2(201, 10384);
}
function cms_phone_tuijian_loginnow(){
	track2(201, 10387);
}
function cms_phone_tuijian_tolayerreg(){
	track2(201, 10388);
}

//掘宝页面
function cms_phone_juebao_pv(){
	track2(201, 10385);
}
function cms_phone_juebao_tuijian(){
	track2(201, 10386);
}


//*****************************************
//*****************************************

//首页
function cms_pad_index_pv(){
	track2(203,10371);
}
function cms_pad_index_tuijian(){
	track2(203,10372,"m2-1.html");
}
function cms_pad_index_xiangqing(){
	track2(203,10373,"m1-1.html");
}

//详情
function cms_pad_xiangqing_pv(){
	track2(203,10374);
}
function cms_pad_xiangqing_tozhuce(){
	track2(203,10375,"m2-1.html?param1=register");
}
function cms_pad_xiangqing_totuijian(){
	track2(203,10376,"m2-1.html");
}

//底部点击
function cms_pad_bottom_m1(url){
	track2(203, 10377, url);
}
function cms_pad_bottom_m2(url){
	track2(203, 10378, url);
}
function cms_pad_bottom_m3(url){
	track2(203, 10379, url);
}
function cms_pad_bottom_m4(url){
	track2(203, 10380, url);
}

//推荐页面
function cms_pad_tuijian_pv(){
	track2(203, 10381);
}
function cms_pad_tuijian_tolayerlogin(){
	track2(203, 10382);
}
function cms_pad_tuijian_getcode(){
	track2(203, 10383);
}
function cms_pad_tuijian_lastsubmit(){
	track2(203, 10384);
}
function cms_pad_tuijian_loginnow(){
	track2(203, 10387);
}
function cms_pad_tuijian_tolayerreg(){
	track2(203, 10388);
}

//掘宝页面
function cms_pad_juebao_pv(){
	track2(203, 10385);
}
function cms_pad_juebao_tuijian(){
	track2(203, 10386);
}

//*********************************************
//*********************************************

function setModuleLinkTrack(){
	document.getElementById("m1").onclick = function(){
		if(window.location.href.indexOf("index.html") < 0){
			dataLayer.push({'event':'gaevent','cat':'导航活动首页','act':'返回所在页面','lbl':''});
			var url = "index.html";
			cms_phone_bottom_m1(url);
		}
	}
	
	document.getElementById("m2").onclick = function(){
		if(window.location.href.indexOf("m2") < 0){
			dataLayer.push({'event':'gaevent','cat':'导航幸运掘宝','act':'返回所在页面','lbl':''});
			var url = "m2-1.html";
			cms_phone_bottom_m2(url);
		}
	}
	
	document.getElementById("m3").onclick = function(){
		if(window.location.href.indexOf("m3") < 0){
			dataLayer.push({'event':'gaevent','cat':'导航获奖名单','act':'返回所在页面','lbl':''});
			var url = "m3.html";
			cms_phone_bottom_m3(url);
		}
	}
	
	document.getElementById("m4").onclick = function(){
		dataLayer.push({'event':'gaevent','cat':'导航Cat挖掘中心','act':'返回所在页面','lbl':''});
		//var url = "http://www.catwaji.com/?utm_source=cattuijian&utm_medium=nav1&utm_campaign=tuijian";
		var url = "http://catwaji.mobileone.com.cn/"
		if(!!$.cookie("mobile") && "" != $.cookie("mobile")){
			url += "?mobile=" + $.cookie("mobile");
		}
		cms_phone_bottom_m4(url);
	}
}


function track2(channel, code, url){
	if(!channel || !code) return;
	
	//alert("channel:" + channel + ', code:' + code);
	//alert("channel:" + channel + ', codeKey:[' + getCodeKeyByValue(code) + "], url:" + url);
	//return;
	
	if(!!url){
		track(channel, code, url);
	}
	else{
		track(channel, code);
	}
}

function getCodeKeyByValue(value){
	for(var key in window.codeConsts.codes){
		if(value === window.codeConsts.codes[key]){
			return key;
		}
	}
}