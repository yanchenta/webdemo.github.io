
//注册上传数据的prev检查
function submit_reg_prev(){
	
	//注册部分 数据有效性验证
	var myname = $('#myname1').val();
	var mobile = $('#mymobile1').val()
	
	var myidentity = $('[name=myidentity1]:checked').val();
	if(myidentity == ""){
		myidentity = $('#myidentity').val();
	}
	var province = $('#province1').val();
	var city = $("#city1").val();
	//alert("myname:" + myname + "; mobile" + mobile + "; myidentity:" + myidentity + "; province:" + province + "; city:" + city);
	//alert(mobile);
	mobile = trim(mobile);
	
	if(!matchUserName(myname)){
		alert("请输入您的姓名");
		return false;
	}
	if(!matchMobile(mobile)){
		alert("请输入有效的手机号码");
		return false;
	}
	else{
		//mobile = $.cookie("mobile");
	}
	
	if(!isGetMobileCode){
		alert("请发送手机验证码，进行验证");
		return false;
	}

	
	//邀请部分 数据有效性验证 ... 
	var frname = $('#frname1').val();
	var frmobile = trim($('#frmobile1').val());
	var frnature = $('[name=frnature1]:checked').val();
	var frjob = $('#frjob1').val();
	//alert("frname:" + frname + "; frmobile:" + frmobile + "; frnature:" + frnature + "; frjob:" + frjob);
	
	if(!matchUserName(frname)){
		//showMsg("请输入好友姓名");
		alert("请输入好友姓名");
		return false;
	}
	if(!matchMobile(frmobile)){
		//showMsg("请输入有效的好友手机号码");
		alert("请输入有效的好友手机号码");
		return false;
	}
	
	if(mobile == frmobile){
		//showMsg("推荐人和被推荐人的手机号码不能相同");
		alert("推荐人和被推荐人的手机号码不能相同");
		return false;
	}
	
	return true;
}
function submit_reg(registerSucFunc){
	//注册部分
	var myname = $('#myname1').val();
	var mobile = $('#mymobile1').val()
	
	var myidentity = $('[name=myidentity1]:checked').val();
	if(myidentity == ""){
		myidentity = $('#myidentity').val();
	}
	var province = $('#province1').val();
	var city = $("#city1").val();
	//alert("myname:" + myname + "; mobile" + mobile + "; myidentity:" + myidentity + "; province:" + province + "; city:" + city);
	mobile = trim(mobile);
	
	
	/*//邀请部分
	var frname = $('#frname').val();
	var frmobile = trim($('#frmobile').val());
	var frnature = $('[name=frnature]:checked').val();
	var frjob = $('#frjob').val();
	//alert("frname:" + frname + "; frmobile:" + frmobile + "; frnature:" + frnature + "; frjob:" + frjob);
	*/
	
	//
	//新注册接口
	doRegistration(mobile, myname, province, city, 0, 'wap', registerSucFunc, $.cookie("utm_source"), $.cookie("utm_medium"), $.cookie("utm_content"), $.cookie("utm_campaign"));
	/*var source = "wap";
	doRegistration(mobile, name, province, city, userDriveType, source, function(data){
		//需要登陆才能获取到userid
		
		
		//注册成功，推荐好友
		var userid = $.cookie("userid");
		var frname = "王五";
		var frmobile = "15877777777";
		var frnature = "公司";
		var frfield = "程序员";
		var source = "wap";
		var mobile = tmpMobile;
		doPlay(userid, mobile, frname, frmobile, frnature, frfield, source, sucFunc);//此接口支持跨域，不能使用托管(null);
	});*/
	
	
	/*//老注册接口
	var userInfo = {
		myname : myname,
		mymobile : mobile,
		frname : frname,
		frmobile : frmobile,
		myidentity : myidentity,
		myverification : "",
		frnature : frnature,
		frjob : frjob,
		mobile : mobile,
		rnd : rnd,
		token : MD5(mobile + 'cat' + rnd),
		source : 'wap',
		utm_source : $.cookie("utm_source"),
		utm_medium : $.cookie("utm_medium"),
		utm_content: $.cookie("utm_content"),
		utm_campaign : $.cookie("utm_campaign"),
		hmci : $.cookie("hmci")
	};
	
	$.ajax({
		url : 'http://www.catwaji.com/tuijian/api/reguserinfo.aspx',
		type:"POST",
		cache : false,
		dataType : 'json',
		data : userInfo,
		success : function(result) {
			if(result.done.toLocaleLowerCase() == "ok"){
				$.cookie("id",result.id);
				$.cookie("isPlay","1");
				$.cookie("token",userInfo.token);
				location = "m2-2.html";
				
			}else{
				showMsg(result.done);
			}
		},error:function(xhr){
			
		}
	});*/
}

function submit_form(type){
	cms_phone_tuijian_lastsubmit();
	if(1 == type){//..........................注册邀请
		dataLayer.push({'event':'gaevent','cat':'注册','act':'发送邀请','lbl':''});
		if(!submit_reg_prev()){//本地数据有效性 - 验证
			return;
		}
		
		//alert("注册2");
		
		var mobile = $("#mymobile1").val();
		var code = $("#myverification1").val();
		//验证码接口调用
		checkMobileCode(mobile, code, function(data){ //1. 验证码验证(当前位置) -> 注册 -> 好友推荐
			if("ok" != data.done.toLowerCase()){
				alert("验证码验证失败！"+ data.done);
				return;
			}
			
			var succFunc = function(data){ //2. 验证码验证 -> 注册(当前位置) -> 好友推荐
				if("ok" != data.done.toLowerCase()){
					alert("注册失败！" + data.done);
					return;
				}
				else if("" == data.userid || "null" == data.userid){
					alert("该手机号码已被注册。清换用其他手机号码注册或直接登陆！");
					return;
				}
				else{
					$.cookie("userid", data.userid);//1.注册成功后，修改userid数据
				}
				
				$.cookie("identity", "Club");//2.注册成功后，修改identity数据
				
			
				//...
				//var userid = $.cookie("userid");
				var userid = !$.cookie("userid")?"":$.cookie("userid");
				var mobile = $("#mymobile1").val();
				$.cookie("mobile", mobile);//3.注册成功后，存入mobile数据
				
				var myname = $('#myname1').val();
				$.cookie("name", myname);//4.注册成功后，存入mobile数据
				
				var frname = $("#frname1").val();
				var frmobile = $("#frmobile1").val();
				var frnature = $('[name=frnature1]:checked').val();
				if(frnature == ""){
					frnature = $('#frnature1').val();
				}
				var frfield = $("#frjob1").val();
				var source = "wap";
				//推荐好友            3. 验证码验证 -> 注册 -> 好友推荐(当前位置)
				doPlay(userid, mobile, frname, frmobile, frnature, frfield, source, function(data){
					if("ok" == data.done.toLowerCase()){
						$.cookie("isPlay", "1");//推荐成功后, 1. 存入flag数据
						$.cookie("id", data.id);//推荐成功后, 2. 存入此次抽奖相关的id数据
						
						window.location.href = "m2-2.html";
					}
					else{
						alert("推荐失败！"+ data.done);
						return;
					}
				}, $.cookie("utm_source"), $.cookie("utm_medium"), $.cookie("utm_content"), $.cookie("utm_campaign"));
			//}, 10000);
			}
			//干净的注册
			submit_reg(succFunc);
		});
	}
	else if(2 == type){//.........................激活邀请
		//激活部分
		var myname = $.cookie("name");
		var mobile = $.cookie("mobile");
		var myidentity = $('[name=myidentity2]:checked').val();
		if(myidentity == ""){
			myidentity = $('#myidentity2').val();
		}
		
		var province = $('#province2').val();
		var city = $('#city2').val();
	
		if(null == province || "" == province){
			alert("请选择省份");
			return;
		}
		if(null == city || "" == city){
			alert("请选择城市");
			return;
		}
	
		//邀请部分
		var frname = $("#frname2").val();
		var frmobile = $("#frmobile2").val();
		
		if(!matchUserName(frname)){
			//showMsg("请输入好友姓名");
			alert("请输入好友姓名");
			return;
		}
		if(!matchMobile(frmobile)){
			//showMsg("请输入有效的好友手机号码");
			alert("请输入有效的好友手机号码");
			return;
		}
	
		if(mobile == frmobile){
			//showMsg("推荐人和被推荐人的手机号码不能相同");
			alert("推荐人和被推荐人的手机号码不能相同");
			return;
		}
		
		var succFunc = function(data){	//1. 激活(注册)
			//alert("in zhuce");
			
			if("ok" != data.done.toLowerCase()){
				alert("注册失败！" + data.done);
				return;
			}
			$.cookie("identity", "Club");

			//...
			var userid = $.cookie("userid");
			var mobile = $("#mymobile2").val();
			var frname = $("#frname2").val();
			var frmobile = $("#frmobile2").val();
			var frnature = $('[name=frnature2]:checked').val();
			if(frnature == ""){
				frnature = $('#frnature2').val();
			}
			var frfield = $("#frjob2").val();
			var source = "wap";
			//推荐好友            2. 激活 -> 好友推荐(当前位置)
			doPlay(userid, mobile, frname, frmobile, frnature, frfield, source, function(data){
				//alert("in tuijian");
				
				if("ok" == data.done.toLowerCase()){
						$.cookie("isPlay", "1");//推荐成功后, 1. 存入flag数据
						$.cookie("id", data.id);//推荐成功后, 2. 存入此次抽奖相关的id数据
						
					window.location.href = "m2-2.html";
				}
				else{
					alert("推荐失败！"+ data.done);
					return;
				}
			}, $.cookie("utm_source"), $.cookie("utm_medium"), $.cookie("utm_content"), $.cookie("utm_campaign"));
		}
		
		doRegistration(mobile, myname, province, city, 0, 'wap', succFunc, $.cookie("utm_source"), $.cookie("utm_medium"), $.cookie("utm_content"), $.cookie("utm_campaign"));
		
		/*var succFunc = function(data){
			if(!submit_jihuo_prev()){//本地数据有效性 - 验证
				return;
			}
			
			//
			var userid = $.cookie("userid");
			var mobile = $.cookie("mobile");
			var frname = $("#frname2").val();
			var frmobile = $("#frmobile2").val();
			var frnature = $('[name=frnature2]:checked').val();
			if(frnature == ""){
				frnature = $('#frnature2').val();
			}
			var frfield = $("#frjob2").val();
			var source = "wap";
			//推荐好友
			doPlay(userid, mobile, frname, frmobile, frnature, frfield, source, function(data){
				window.location.href = "m2-2.html";
			});
		}
		//激活
		submit_jihuo(succFunc);*/
	}
	else if(3 == type){ //........................直接邀请
		dataLayer.push({'event':'gaevent','cat':'登录','act':'发送邀请','lbl':''});
		
		//邀请部分
		//1. 数据有效性验证
		var frname = $("#frname3").val();
		var frmobile = $("#frmobile3").val();
		var mobile = $.cookie("mobile");
		if(!matchUserName(frname)){
			showMsg("请输入好友姓名");
			return;
		}
		if(!matchMobile(frmobile)){
			showMsg("请输入有效的好友手机号码");
			return;
		}
		if(mobile == frmobile){
			showMsg("推荐人和被推荐人的手机号码不能相同");
			return;
		}
		
		//数据提交
		var submit_frinfo = function(){
			//
			var userid = $.cookie("userid");
			var mobile = $.cookie("mobile");
			
			var frnature = $('[name=frnature3]:checked').val();
			if(frnature == ""){
				frnature = $('#frnature3').val();
			}
			var frfield = $("#frjob3").val();
			var source = "wap";
			
			doPlay(userid, mobile, frname, frmobile, frnature, frfield, source, function(data){
				$.cookie("isPlay", "1");//推荐成功后, 1. 存入flag数据
				$.cookie("id", data.id);//推荐成功后, 2. 存入此次抽奖相关的id数据
				
				window.location.href = "m2-2.html";
			}, $.cookie("utm_source"), $.cookie("utm_medium"), $.cookie("utm_content"), $.cookie("utm_campaign"));
		}
		//推荐好友
		submit_frinfo();
	}
}

function doLoginEx(){
	dataLayer.push({'event':'gaevent','cat':'登录','act':'登录','lbl':''});
	cms_phone_tuijian_loginnow();
	
	var mobile = $("#login_mobile").val();
	var code = $("#login_code").val();
	
	if(!matchMobile(mobile)){
		//showMsg("请输入有效的好友手机号码");
		alert("请输入有效的手机号码");
		return;
	}
	if("" == code|| null == code){
		alert("请输入验证码");
		return;
	}
	var sucFunc = function(data){	//1. 手机验证码验证
		if("ok" == data.done.toLowerCase()){
			getUserInfo(mobile, function(data){		//2. 登陆
				//alert(JSON.stringify(data))
				if("" != data.mobile && null != data.mobile && "undefined" != data.mobile && "none" != data.identity.toLowerCase()){
					$.cookie("mobile", data.mobile);
					$.cookie("identity", data.identity);
					$.cookie("name", data.name);
					$.cookie("province", data.province);
					$.cookie("city", data.city);
					$.cookie("userid", data.userid);
					
					show_logined();//显示推荐页面
				}
				else{
					alert("登陆失败！" + data.done);
				}
			});
		}
		else{
			alert("验证码验证失败");
		}
	}
	checkMobileCode(mobile, code, sucFunc);
	
}


function numRand() {
	var x = 9999; 
	var y = 1000; 
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	return rand;
}
var _t;
var _r;
function getVer(){
	var mobile = trim($('#mymobile').val());
	var rnd = $.cookie("rnd");
	if(!rnd){
		rnd = Guid.NewGuid().ToString();
		$.cookie("rnd",rnd);
	}
	if(!matchMobile(mobile)){
		showMsg("请输入有效的手机号码");
		return;
	}else{
		$.cookie("mobile",mobile);
	}
	//
	var userInfo = {
		mobile : mobile,
		rnd : rnd,
		token : MD5(mobile + 'cat' + rnd),
		source : 'wap'
	};
	
	
	$('#m2-1_1').hide();
	$('#m2-1_3').show();
	$('#m2-1_3 #text').text('正在发送短信...');
	$('#m2-1_3 #time').text('');
	var api_url = 'http://catsite.ogilvy.com.cn/tuijian/api/getcode.aspx?';
	$.ajax({
		url : api_url,
		type:"POST",
		cache : false,
		dataType : 'json',
		data : userInfo,
		success : function(result) {
			if(result.done.toLocaleLowerCase() == "ok"){
				$('#m2-1_3 #time').text('60');
				$('#m2-1_3 #text').text('秒后可再次获取');
				_t = setInterval(function(){
					var time = parseInt($('#m2-1_3 #time').text());
					if(time <= 1){
						$('#m2-1_3').hide();
						$('#m2-1_1').show();
						clearInterval(_t);
					}
					$('#m2-1_3 #time').text(time-1);
				},1000);
			}else{
				$('#m2-1_3').hide();
				$('#m2-1_1').show();
				showMsg(result.done);
			}
		},error:function(xhr){
			
		}
	});
}
$(document).ready(function(){
	track(channel,5882);
	_r = numRand();
	$("#m2-1_4").html(_r);
	$("#myname").val($.cookie("myname"));
	$("#mymobile").val($.cookie("mobile"));
//	$('#myidentity1').attr("checked",$.cookie("myidentity1"));
//	$('#myidentity2').attr("checked",$.cookie("myidentity2"));
//	$('#myidentity3').attr("checked",$.cookie("myidentity3"));
//	$('#myidentity').val($.cookie("myidentity"));
	$("#myverification").val($.cookie("myverification"));
	
	//加载 ... province1 绑定city1
	var provElem1 = document.getElementById("province1");
	
	//alert("getProvinces2 prev!");
	getProvinces2(function(data){
		//alert("getProvinces2 result");
		
		for(var i = 0; i < data.length; i++){
			var opt = document.createElement("option");
			opt.value = data[i].id;
			opt.innerHTML = data[i].name;
			provElem1.appendChild(opt);
		}
	});
	
	//var cityElem2 = document.getElementById("city1");
	provElem1.onchange = function(){
		var pid = this.value;
		getCities2(pid, function(data){
			var cityElem1 = document.getElementById("city1");
			cityElem1.innerHTML = "";
			
			for(var i = 0; i < data.length; i++){
				var opt = document.createElement("option");
				opt.value = data[i].id;
				opt.innerHTML = data[i].name;
				cityElem1.appendChild(opt);
			}
		});
	}
	
	
	//加载 ... province2 绑定city2
	var provElem2 = document.getElementById("province2");
	getProvinces2(function(data){
		
		for(var i = 0; i < data.length; i++){
			var opt = document.createElement("option");
			opt.value = data[i].id;
			opt.innerHTML = data[i].name;
			provElem2.appendChild(opt);
		}
	})
	//var cityElem2 = document.getElementById("city1");
	provElem2.onchange = function(){
		var pid = this.value;
		getCities2(pid, function(data){
			var cityElem2 = document.getElementById("city2");
			cityElem2.innerHTML = "";
			
			for(var i = 0; i < data.length; i++){
				var opt = document.createElement("option");
				opt.value = data[i].id;
				opt.innerHTML = data[i].name;
				cityElem2.appendChild(opt);
			}
		});
	}
});
