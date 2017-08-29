/****
*
*	author fengjianjun
*
****/
var date = new Date();
	date.setTime(date.getTime() + 480 * 3600 * 1000);
function initArguments(p) {
    var paramString = window.location.search;
    if (paramString.indexOf("?") > -1) {
        paramString = paramString.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
        var paramObjs = JSON.parse('{"' + paramString + '"}');
        return paramObjs[p];
    }
}

window.urlMainpage = "http://catwaji.mobileone.com.cn/";
//window.urlPrefix = "http://hezhanglin.com:33/h5/ad/ad_cars/cat/mobilesite/";//to product detail
window.urlPrefix = window.urlPrefix;
//window.url3InterfaceReg = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20065";
//window.url3InterfaceLogin = "http://newcms.mobile1.com.cn/advmessage/advthird/accessJsonP.action?advid=20065&expand2=login";
//window.url3InterfaceXunjia = "http://newcms.mobile1.com.cn/advmessage/advthird/accessJsonP.action";

window.url3InterfaceReg = "http://www.catwaji.com/club/api/users/";
window.url3InterfaceLogin = "http://www.catwaji.com/club/api/users/";
window.url3InterfaceXunjia = "http://www.catwaji.com/club/api/users/";

window.url2Interface = "http://newcms.mobile1.com.cn/advmessage/advthird/accessJsonP.action";

var param = '';

if(initArguments('param')){
	param = initArguments('param');
}else{
	var hmsr='',hmmd='',hmpl='',hmkw='',hmci='',utm_source='',utm_medium='',utm_content='',utm_campaign='';
	
	hmsr = initArguments('hmsr'),
	hmmd = initArguments('hmmd'),
	hmpl = initArguments('hmpl'),
	hmkw = initArguments('hmkw'),
	hmci = initArguments('hmci'),
	utm_source = initArguments('utm_source'),
	utm_medium = initArguments('utm_medium'),
	utm_content = initArguments('utm_content'),
	utm_campaign = initArguments('utm_campaign');

	if(hmsr){
		param = hmsr+','+hmmd+','+hmpl+','+hmkw+','+hmci;
	}else if(utm_source){
		param = utm_source+','+utm_medium+','+utm_content+','+utm_campaign;
	}	
}

if(initArguments('loginInfo')){
	var loginInfo = $.parseJSON(decodeURIComponent(initArguments('loginInfo')));
	setCookie('name',loginInfo.Name,date);
	setCookie('userid',loginInfo.UserID,date);
	setCookie('mobile',loginInfo.Mobile,date);
	setCookie('province',loginInfo.Province,date);
	setCookie('city',loginInfo.City,date);
	
	setCookie('pc',true);
	
}

function resetPage() {
	var deviceWidth = document.documentElement.clientWidth,
	scale = deviceWidth/320;
	document.body.style.zoom = scale;
}

window.onresize = function(){
	resetPage();
}

window.onload = function(){
	if(window.location.href.indexOf("?mobile") > -1){
		document.cookie = "";
		localStorage.clear();
		
		var mobile = window.location.href.substring(window.location.href.indexOf("?mobile") + 8);
		userLogin(mobile);
	}
	
	resetPage();
	
	setProvenices();
    
	$(".prov").live("change", function () {
        setCities($(this).val());
    });
	
	if(document.documentElement.clientHeight<440){
		$('#m,#text').css("position","fixed");
	}
	
	track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_pv);
	
	addListener();
}

var isFrist=true,fristNum;
function addListener(){
	if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', mobileDirection,false);
        return true;
    } else {
        return false;
    }
}

function removeListener() {
   if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", mobileDirection,false);
    }
}

//清理掉input-focus的效果
var inputs = document.getElementsByTagName("input");
for(var i = 0; i < inputs.length; i++){
	inputs[i].onfocus = function(e){
		$('.main-body').css('-webkit-transform','translate(0px,0)');
	}
	
	inputs[i].onblur = function(e){
		$('.main-body').css('-webkit-transform','translate(0px,0)');
	}
}

var islock = false;
//获取手机方向值
function mobileDirection(e){
	if(islock) return;
	
	var Alpha = Math.round(e.alpha);
	var position;
	if(isFrist){
		fristNum = Alpha;
	}else{
		position = (Alpha-fristNum) - 50;
	}
	
	if(position == 0 && isFrist){
		$('.main-body').css('-webkit-transform','translate(0px,0)');
		isFrist = false;
	}else{//正常状态
		isFrist = false;
		if(position > -346 && position < 0){
			$('.main-body').css('-webkit-transform','translate(' + (position-30) + 'px,0)');
		}
	}
}

function resertToMainPage(){
	
	//window.location.href = window.urlMainpage;
	//window.location.href = "http://demo.mobileone.com.cn/cat_mobilesite/index.html";
	setTimeout(function(){
		var mobile = getCookie('mobile');
		if(!!mobile){
			window.location = window.urlMainpage + "?mobile=" + getCookie('mobile');
		}
		else{
			window.location = window.urlMainpage;
		}
	}, 500);//等监控执行
}

function closePop(){
	$('.pop').hide();
	$('#bg').css('-webkit-transform','translate(0,0)');
	setTimeout(function(){$('#bg').css('-webkit-transition','');},200);
	$('.navlist ul').css('z-index','1');
	$('.point').css('z-index','5');
	$('.aside2,.nav,#m').show();
	$('.aside1').css({'top':'193px','left':'10px'});
	$('.mark').hide();
	addListener();
	closeNotice();
}

function enquiry(){
	//询价
	removeListener();
	$('.pop').hide();
	
	if(isLogin()){
		//1 询价
		openNotice();
		
		var name = localStorage.getItem('name');
		var userid = localStorage.getItem('userid');
		var mobile = localStorage.getItem('mobile');
		var province = localStorage.getItem('province');
		var city = localStorage.getItem('city');
		
		xunjia(name,userid,mobile,province,city);
	}
	
}

function closeNotice(){
	document.getElementById("title").className = "title-1";
	
	//关闭所有有notice行为的text
	document.getElementById("fdj").className = "fdj-closed";
	document.getElementById("jss").className = "jss-closed";
	document.getElementById("jzsj").className = "jzsj-closed";
	document.getElementById("tsb").className = "tsb-closed";
	document.getElementById("wh").className = "wh-closed";
	document.getElementById("yyxt").className = "yyxt-closed";
	document.getElementsByClassName("inner-cover")[0].style.display = "none";
	islock = false;
	
}

var allInputs = document.querySelectorAll("input");
for(var i = 0; i < allInputs.length; i++){
	allInputs[i].onfocus = function(){
		//window.onresize();
		$('.main-body').css('-webkit-transform', 'translate(0px,0)');
		$('.main-body').css('-webkit-transform', $('.main-body')[0].style.webkitTransform);
		
		
	}
	allInputs[i].onblur = function(){
		//window.onresize();
		//document.querySelector(".main-body")[0].style.top = "0px";
		//alert(document.querySelector(".main-body")[0].offsetTop);
		//alert($('.main-body')[0].style.webkitTransform);
		$('.main-body').css('-webkit-transform', 'translate(0px,0)');
		$('.main-body').css('-webkit-transform', $('.main-body')[0].style.webkitTransform);
		
		//alert($('.main-body')[0].style.webkitTransform);
		
	}
}


function openNotice(){
	document.getElementById("title").className = "title-2";
	
	//关闭所有有notice行为的text
	document.getElementById("fdj").className = "fdj-closed";
	document.getElementById("jss").className = "jss-closed";
	document.getElementById("jzsj").className = "jzsj-closed";
	document.getElementById("tsb").className = "tsb-closed";
	document.getElementById("wh").className = "wh-closed";
	document.getElementById("yyxt").className = "yyxt-closed";
	document.getElementsByClassName("inner-cover")[0].style.display = "none";
	islock = true;
}

function download(){
	//下载
	removeListener();
	$('.pop').hide();
	if(isLogin()){
		ga('send','pageview','/下载产品手册浮层/下载产品手册浮层显示/下载产品手册浮层');
		
		//下载产品手册
		openNotice();
		$(".down").show();
		
	}
	else{
		$(".info").show();
		
		//注册浮层显示 ga监测
		ga('send','pageview','/注册浮层/注册浮层显示/注册浮层');
	}
}

function isLogin(){
	
	if(localStorage.getItem('name')){
		setCookie('name',localStorage.getItem('name'),date);
		setCookie('userid',localStorage.getItem('userid'),date);
		setCookie('mobile',localStorage.getItem('mobile'),date);
		setCookie('province',localStorage.getItem('province'),date);
		setCookie('city',localStorage.getItem('city'),date);
	}
	
	if (!getCookie("name") || !localStorage.getItem('name')) {
		return false;
	}else{
		return true;
	}
}

//登录后询价
function xunjia(name,userid,mobile,province,city){
	//http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011
	
	//alert(window.url2Interface + "," + window.url3InterfaceXunjia);
	/*
	$.ajax({
		url: window.url2Interface,
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback3",
		data: {
			submitinfo:JSON.stringify({
				url:window.url3InterfaceXunjia,
				data:{
					id:'0',
					mobileno:mobile,
					usertype:encodeURIComponent('有购机意向'),
					username:encodeURIComponent(name),
					userarea:encodeURIComponent(province + '|' + city),
					regsource:'CATCLUB-WAP',
					openid:mobile
				}
			}),
			submittype:'get',
			rettype:'json',
			callback:'callback1'
		},
		success: function(json) {
			//alert("xunjia:" + JSON.stringify(json));
			
			$('.waiting').hide();
			$('.pop').hide();
			
			$('.succ').show();
		},
		error:function(ex){
			
		}
	});*/
	$.ajax({
		url: "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011",
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback3",
		data: {
			uid:userid,
			realname: name,
			mobile: mobile,
			provinceid:province,
			cityid : city,
			expand1 : 'CATWAP-950GC',
			expand3 : param,
		},
		success: function(json) {
			$('.waiting').hide();
			if (json[0].success == 1) {
				
				$('.pop').hide();
				$('.succ').show();
				
				ga('send','pageview','/我要询价浮层/我要询价浮层显示/我要询价浮层');

			}
			else{
				$('.waiting').hide();
				alert('询价失败');
			}
		}
	});
}


function showLoginPop(){
	ga('send','pageview','/登录浮层/登录浮层显示/登录浮层');
	
	$('.pop').hide();
	$('.loginPop').show();
}

/*****************************************
*
*登录接口
*
****************************************/
window.loginTrigger = "";
function loginTriggerInvoke(elem){
	$('.pop').hide();
	switch(window.loginTrigger){
		case "down":
			openNotice();
			
			$('.down').show();
			
			
			break;
			
		case "xunjia":
			openNotice();
			
			var name = localStorage.getItem('name');
			var userid = localStorage.getItem('userid');
			var mobile = localStorage.getItem('mobile');
			var province = localStorage.getItem('province');
			var city = localStorage.getItem('city');
			
			xunjia(name,userid,mobile,province,city);
			break;
						
		case "fdj":
			if("fdj-closed" == elem.className){
				ga('send','event','首页','强劲又高效','首页');
				
				openNotice();
				elem.className = "fdj-opened";
				$('.inner-cover').show();
			}
			else if("fdj-opened" == elem.className){
				closeNotice();
			}
			break;
		
		case "jss":
			if("jss-closed" == elem.className){
				ga('send','event','首页','宽敞驾驶室','首页');
				
				openNotice();
				elem.className = "jss-opened";
				$('.inner-cover').show();
			}
			else if("jss-opened" == elem.className){
				closeNotice();
			}
			break;
			
		case "jzsj":
			if("jzsj-closed" == elem.className){
				ga('send','event','首页','全球工厂','首页');
				
				openNotice();
				elem.className = "jzsj-opened";
				$('.inner-cover').show();
			}
			else if("jzsj-opened" == elem.className){
				closeNotice();
			}
			break;
			
		case "tsb":
			if("tsb-closed" == elem.className){
				ga('send','event','首页','可靠的z型','首页');
				
				openNotice();
				elem.className = "tsb-opened";
				$('.main-body').css('-webkit-transform','translate(-50px,0)');
				
				$('.inner-cover').show();
			}
			else if("tsb-opened" == elem.className){
				closeNotice();
			}
			break;
		
		case "wh":
			if("wh-closed" == elem.className){
				ga('send','event','首页','保养维修','首页');
				
				openNotice();
				elem.className = "wh-opened";
				$('.main-body').css('-webkit-transform','translate(-50px,0)');
				
				$('.inner-cover').show();
			}
			else if("wh-opened" == elem.className){
				closeNotice();
			}
			break;
			
		case "yyxt":	
			if("yyxt-closed" == elem.className){
				ga('send','event','首页','闭式负载','首页');
				
				openNotice();
				elem.className = "yyxt-opened";
				$('.main-body').css('-webkit-transform','translate(-30px,0)');
				$('.inner-cover').show();
			}
			else if("yyxt-opened" == elem.className){
				closeNotice();
			}
			break;
		
		default:
			break;
	}
}

window.loginTrigger = "";
function loginTriggerInvoke2(elem){
	$('.pop').hide();
	switch(window.loginTrigger){
		case "down":
			openNotice();
			
			$('.down').show();
			break;
			
		case "xunjia":
			openNotice();
			$('.succ').show();//...show
			break;
			
		case "fdj":
			if("fdj-closed" == elem.className){
				openNotice();
				elem.className = "fdj-opened";
				$('.inner-cover').show();
			}
			else if("fdj-opened" == elem.className){
				closeNotice();
			}
			break;
			
		case "jss":
			if("jss-closed" == elem.className){
				openNotice();
				elem.className = "jss-opened";
				$('.inner-cover').show();
			}
			else if("jss-opened" == elem.className){
				closeNotice();
			}
			break;
			
		case "jzsj":
			if("jzsj-closed" == elem.className){
				openNotice();
				elem.className = "jzsj-opened";
				$('.inner-cover').show();
			}
			else if("jzsj-opened" == elem.className){
				closeNotice();
			}
			break;
			
		case "tsb":
			if("tsb-closed" == elem.className){
				openNotice();
				elem.className = "tsb-opened";
				$('.main-body').css('-webkit-transform','translate(-50px,0)');
				
				$('.inner-cover').show();
			}
			else if("tsb-opened" == elem.className){
				closeNotice();
			}
			break;
		
		case "wh":
			if("wh-closed" == elem.className){
				openNotice();
				elem.className = "wh-opened";
				$('.main-body').css('-webkit-transform','translate(-50px,0)');
				
				$('.inner-cover').show();
			}
			else if("wh-opened" == elem.className){
				closeNotice();
			}
			break;
			
		case "yyxt":	
			if("yyxt-closed" == elem.className){
				openNotice();
				elem.className = "yyxt-opened";
				$('.main-body').css('-webkit-transform','translate(-50px,0)');
				$('.inner-cover').show();
			}
			else if("yyxt-opened" == elem.className){
				closeNotice();
			}
			break;
		
		default:
			break;
	}
}


function sendInfo_new(){
	var mobile = $.trim($('#mobile').val());
	userLogin(mobile, sendInfo);
}

//(注册)
function sendInfo(){
	
	track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_click_xunjiasubmit);
	
	var name = $.trim($('#name').val());
	var mobile = $.trim($('#mobile').val());
	var province = $('#province').val();
	var city = $('#citys').val();
	
	if (!name) {
		alert("请输入您的姓名！");
		return;
	} 
	var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$$/;
	if (!mobile || !reg.test(mobile)) {
		alert("请输入正确的手机号码...");
		return;
	}
	if (!province) {
		alert("请选择省份");
		return;
	}
	if (!city) {
		alert("请选择城市");
		return;
	}
	$('.waiting').show();
	
	
	var url = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011";
	
	$.ajax({
		url: url,
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback2",
		data: {
			realname: name,
			mobile: mobile,
			provinceid : province,
			cityid : city,
			expand1 : 'CATWAP-950GC',
			expand3 : param,
		},
		success: function(json) {
			//alert(JSON.stringify(json));
			//return;
			
			$('.waiting').hide();
			if (json[0].success == 1) {
				
				if(json[0].ServiceReturn.flag){
					var data = json[0].ServiceReturn;
					var name = data.name;
					var userid = data.userid;
					var province = data.provice;
					var city = data.city;
					
					setCookie('name',name,date);
					setCookie('userid',userid,date);
					setCookie('mobile',mobile,date);
					setCookie('province',province,date);
					setCookie('city',city,date);
					localStorage.setItem('name',name);
					localStorage.setItem('userid',userid);
					localStorage.setItem('mobile',mobile);
					localStorage.setItem('province',province);
					localStorage.setItem('city',city);
					
					//...
					if(window.loginTrigger != "down" && window.loginTrigger != "xunjia"){
						loginTriggerInvoke(document.getElementById(window.loginTrigger));
					}
					else{
						loginTriggerInvoke2();
					}
					
				}else{
					alert('询价失败~');
				}
				
				//注册-提交成功
				ga('send','event','注册浮层','提交成功','注册浮层');
			}
			else{
				alert('提交失败');
			}
		}
	});
	//var url = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011";
	/*
	$.ajax({
		url: window.url2Interface,
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback2",
		data: {
			submitinfo:JSON.stringify({
				url:window.url3InterfaceReg,
				data:{
					id:'0',
					mobileno:mobile,
					usertype:encodeURIComponent('机手'),
					username:encodeURIComponent(name),
					userarea:encodeURIComponent(province + '|' + city),
					regsource:'CATCLUB-WAP',
					openid:mobile
				}
			}),
			submittype:'get',
			rettype:'json',
			callback:'callback1'
		},
		success: function(json) {
			
			alert(JSON.stringify(json));
			
			$('.waiting').hide();
			$('.info').hide();
			
			if (!!json[0] && json[0].success == 1) {
				
				setCookie('name',name,date);
				setCookie('userid',"",date);
				setCookie('mobile',mobile,date);
				setCookie('province',province,date);
				setCookie('city',city,date);
				localStorage.setItem('name',name);
				localStorage.setItem('userid',"");
				localStorage.setItem('mobile',mobile);
				localStorage.setItem('province',province);
				localStorage.setItem('city',city);
			}
			else{
				alert('提交失败');
			}
		}
	});*/
}


function userLogin(mobile, loginCallback){
	ga('send','event','登录浮层','登录','登录浮层');
	
	if(!mobile){
		mobile = $.trim($('#mobile2').val());
	}
	var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$$/;
	if (!mobile || !reg.test(mobile)) {
		alert("请输入正确的手机号码...");
		return;
	}
	$('.waiting').show();
	//var url = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011&expand2=login";
	//alert(window.url2Interface + "," + window.url3InterfaceLogin);
	var url = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011&expand2=login";
	$.ajax({
		url: url,
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback4",
		data: {
			mobile : mobile,
			expand1 : 'CATWAP-950GC',
			expand3 : param,
		},
		success: function(json) {
			
			if (json[0].success == 1) {
				
				if(json[0].ServiceReturn.flag){
					var data = json[0].ServiceReturn;
					var name = data.name;
					var userid = data.userid;
					var province = data.provice;
					var city = data.city;
					
					setCookie('name',name,date);
					setCookie('userid',userid,date);
					setCookie('mobile',mobile,date);
					setCookie('province',province,date);
					setCookie('city',city,date);
					
					localStorage.setItem('name',name);
					localStorage.setItem('userid',userid);
					localStorage.setItem('mobile',mobile);
					localStorage.setItem('province',province);
					localStorage.setItem('city',city);
					
					if(!!loginCallback){
						alert("此号码为已注册号码，现帮您登录成功");
					}
					
					//登陆成功 ga监控
					ga('send','event','登录浮层','登录成功','登录浮层');

					//...
					if(window.loginTrigger != "down" && window.loginTrigger != "xunjia"){
						loginTriggerInvoke(document.getElementById(window.loginTrigger));
					}
					else{
						loginTriggerInvoke2();
					}
					
				}else if(json[0].ServiceReturn.userid==""){
					$('.pop').hide();
					
					if(!!loginCallback){
						loginCallback();
					}
					else{
						alert("用户不存在，请注册一个新账户");
						$('.info').show();
						
						//注册浮层显示 ga监控
						ga('send','pageview','/注册浮层/注册浮层显示/注册浮层');
					}
				}else{
					$('.waiting').hide();
					
					if(!!loginCallback){
						loginCallback();
					}
					else{
						alert('登录失败~');
					}
				}
				
			}
			else{
				$('.waiting').hide();
				
				if(!!loginCallback){
					loginCallback();
				}
				else{
					alert('登录失败！');
				}
			}
		}
	});
	/*$.ajax({
		url: window.url2Interface,
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback4",
		data: {
			submitinfo:JSON.stringify({url:window.url3InterfaceLogin,data:{id:'2',Mobileno:mobile}}),
			submittype:'get',
			rettype:'json',
			callback:'callback1'
		},
		success: function(json) {
			//alert(JSON.stringify(json));
			if (json.ErrorCode == 0) {
				var data = json;
				var name = data.username;
				var userid = data.uid;
				var province = data.userarea.split('|')[0];
				var city = data.userarea.split('|')[1];
				
				setCookie('name',name,date);
				setCookie('userid',userid,date);
				setCookie('mobile',mobile,date);
				setCookie('province',province,date);
				setCookie('city',city,date);
				
				localStorage.setItem('name',name);
				localStorage.setItem('userid',userid);
				localStorage.setItem('mobile',mobile);
				localStorage.setItem('province',province);
				localStorage.setItem('city',city);
				
				loginTriggerInvoke();
				
			}else if(json.userid == ""){
					$('.pop').hide();
					$('.info').show();
			}else{
				alert('登录失败~');
			}
			
			$('.waiting').hide();
		},
		error:function(e){
			$('.waiting').hide();
		}
	});*/
	
}

//跳转到产品详情页面
function goToDetailed(){
	//var data = {"Success":"Y","UserID":getCookie('userid'),"Name":escape(getCookie('name')),"Gender":"","Province":getCookie('province'),"City":getCookie('city'),"BirthYear":"","BirthMonth":"","CityOther":[],"ErrMessage":[],"Mobile":getCookie('mobile')};
	var data =  encodeURIComponent('{"Success":"Y","UserID":"'+getCookie("userid")+'","Name":"' + getCookie("name") + '","Gender":"","Province":"'+getCookie("province")+'","City":"'+getCookie("city")+'","BirthYear":"","BirthMonth":"","CityOther":[],"ErrMessage":[],"Mobile":"'+getCookie("mobile")+'"}');
	var callBackUrl = encodeURIComponent("http://catwaji.mobileone.com.cn/xiangqing.php?cate=small&type=0");
	
	//window.location = "http://catwaji.mobileone.com.cn/jump.php?loginInfo="+data+"&callback="+callBackUrl;
	var mobile = getCookie('mobile');
	if(!!mobile){
		window.location = window.urlPrefix + "?mobile=" + getCookie('mobile');
	}
	else{
		window.location = window.urlPrefix;
	}
	
	//window.location = "http://ts.domob.cn/lp/catwaji_test/jump.php?loginInfo="+data+"&callback="+callBackUrl;
}


//初始化省份、城市列表
function setProvenices(pId, cId) {
   
        var htmlContent = '';
        
        for (var i = 0; i < prov.length; i++) {
			if(pId!=undefined){
				var isCurr = false;
				for(var j = 0;j<prov[i].cities.length;j++){
					if(pId.indexOf(prov[i].cities[j].areacityname) !=-1){
						isCurr = true;
					}else{
						isCurr = false;
					}
				}
				if(isCurr){
					htmlContent += '<option value="' + prov[i].provinceid + '" data-value='+prov[i].provincename+' selected="selected">' + prov[i].provincename + '</option>';
					setCities(prov[i].provinceid,pId);
				}else{
					htmlContent += '<option value="' + prov[i].provinceid + '" data-value='+prov[i].provincename+'>' + prov[i].provincename + '</option>'
				}
				
			}else{
				htmlContent += '<option value="' + prov[i].provinceid + '" data-value='+prov[i].provincename+'>' + prov[i].provincename + '</option>'
			}		
			

        }
        if (htmlContent == '') return;
        htmlContent = '<option value="0">省份</option>' + htmlContent;
        $(".prov").html(htmlContent);

       
    

}

function setCities(pId, cId) {
   
    for (var i = 0; i < prov.length; i++) {

        if (pId != prov[i].provinceid) continue;
        var cities = prov[i].cities;
        var htmlContent = '';
        for (var j = 0; j < cities.length; j++) {
			if(cId){
				if(cId.indexOf(cities[j].areacityname) !=-1){
				htmlContent += '<option value="' + cities[j].cityid + '" data-value='+cities[j].cityname+' selected="selected">' + cities[j].cityname + '</option>';
                    //GetDealers(cities[j].areacityname);
				}else{
					htmlContent += '<option value="' + cities[j].cityid + '" data-value='+cities[j].cityname+'>' + cities[j].cityname + '</option>'
				}
			}else{
				htmlContent += '<option value="' + cities[j].cityid + '" data-value='+cities[j].cityname+'>' + cities[j].cityname + '</option>'
			}
			
            
        }
        if (htmlContent == '') return;
        htmlContent = '<option value="0">城市</option>' + htmlContent;
        $(".city").html(htmlContent);

        
    }
}

