
window.onorientationchange = function(){
	if (window.orientation == 0 || window.orientation == 180) {
		//$("body").attr("class", "portrait");
		//orientation = 'portrait';
		//return false;
		
		//横版
		try{
			document.getElementsByClassName("coverxxx")[0].style.display = "block";
		}
		catch(ex){}
	}
	else if (window.orientation == 90 || window.orientation == -90) {
		//$("body").attr("class", "landscape");
		//orientation = 'landscape';
		//return false;
		
		//竖版
		try{
			document.getElementsByClassName("coverxxx")[0].style.display = "none";
		}
		catch(ex){}
	}
}

//页面加载完后执行
function waitLoaded(callback){
	setTimeout(function(){
		if("complete" == document.readyState){
			callback();
		}
		else{
			waitLoaded(callback);
		}
	}, 500);
};
//waitLoaded(window.onorientationchange);

function getRndInt(){
	return Math.floor(Math.random()*1000);
}

//注：http://catsite.ogilvy.com.cn/是测试地址，正式地址是 http://www.catwaji.com/
var agentPrefix = "http://test.zhangkuo.net/advmessage/advthird/accessJsonP.action"
//var actualUrlPrefix = "http://catsite.ogilvy.com.cn/";
var actualUrlPrefix = "http://www.catwaji.com/";

function agentAjax(url, objData, sucFunc){
	var balarnd = Math.floor(Math.random()*1000);
	var agentUrl = agentPrefix + "?rnd=" + balarnd;
	$.ajax({
		type: "post",
		url: agentUrl,
		data: {
			submitinfo:JSON.stringify({
				"url":url,
				"data":objData
			}),
			submittype:"post",
			rettype:"json",
			callback:"callback"
		},
		dataType: "text",
		success: function(data){
			sucFunc(data);
		}
	});
}


function agentAjax2(url, objData, sucFunc){
	//alert("url:" + url + ";" + JSON.stringify(objData));
	//var balarnd = Math.floor(Math.random()*1000);
	var agentUrl = "http://ama.adwo.com/advmessage/advthird/accessJsonP.action";
	$.ajax({
		type: "post",
		url: agentUrl,
		data: {
			submitinfo:JSON.stringify({
				"url":url,
				"data":objData
			}),
			submittype:"post",
			rettype:"json",
			callback:"callback"
		},
		dataType: "text",
		success: function(data){
			//alert(JSON.stringify(data));
			sucFunc(data);
		}
	});
}

//1. 省数据 => http://catsite.ogilvy.com.cn/Ajax/item.aspx?action=getprovince
//post参数
//action=getprovince
//rnd=随机数

//返回
//1,安徽|20,澳门|22,北京|24,重庆|26,福建|38,甘肃|54,广东|77,广西|93,贵州|104,海南|108,河北|121,河南|141,黑龙江|156,湖北|175,湖南|191,吉林|204,江苏|225,江西|238,辽宁|254,内蒙古|268,宁夏|275,青海|285,山东|304,山西|317,陕西|330,上海|332,四川|355,台湾|364,天津|366,西藏|375,香港|377,新疆|397,云南|415,浙江
//window.tmpProvinces = null;
function getProvinces(provsLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=getprovince&rnd=" + getRndInt();
	$.ajax({
		type: "POST",
		url: url,
		data: {},
		dataType: "text",
		success: function(data){
			var prosArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				prosArray.push({id:key, name:value});
			}
			provsLoadFunc(prosArray);
		}
	});
}
function getProvinces2(provsLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=getprovince&rnd=" + getRndInt();
	var objData = {};
	var sucFunc = function(data){
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			//alert(data);
			
			var prosArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				prosArray.push({id:key, name:value});
			}
			
			provsLoadFunc(prosArray);
		}
	//agentAjax(url, objData, sucFunc);
	agentAjax2(url, objData, sucFunc);
}



//2. 市数据 => http://catsite.ogilvy.com.cn/Ajax/item.aspx?action=getcity&pid=
//post参数
//action=getcity
//pid= 省ID
//rnd=随机数
//返回
//2,安庆|3,蚌埠|4,亳州|5,巢湖|6,池州|7,滁州|8,阜阳|9,合肥|10,淮北|11,淮南|12,黄山|13,六安|14,马鞍山|15,铜陵|16,芜湖|17,宿州|18,宣城|19,其他
function getCities(pid, citiesLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=getcity&pid=" + pid + "&rnd=" + getRndInt();
	$.ajax({
		type: "POST",
		url: url,
		data: {},
		dataType: "text",
		success: function(data){
			var citiesArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				citiesArray.push({id:key, name:value});
			}
			citiesLoadFunc(citiesArray);
		}
	});
}
function getCities2(pid, citiesLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=getcity&pid=" + pid + "&rnd=" + getRndInt();
	var objData = {};
	var sucFunc = function(data){
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			//alert(data);
			
			var citiesArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				citiesArray.push({id:key, name:value});
			}
			citiesLoadFunc(citiesArray);
		}
	//agentAjax(url, objData, sucFunc);
	agentAjax2(url, objData, sucFunc);
}


//3. 产品列表接口 => http://catsite.ogilvy.com.cn/Ajax/item.aspx?action=producttype
//post参数
//action=producttype
//rnd=随机数
//返回
//1,小型挖掘机|2,中型挖掘机|3,xxx
function getProducts(productLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=producttype&rnd=" + getRndInt();
	$.ajax({
		type: "POST",
		url: url,
		data: {},
		dataType: "text",
		success: function(data){
			var productsArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				productsArray.push({id:key, name:value});
			}
			productLoadFunc(productsArray);
		}
	});
}
function getProducts2(productLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=producttype&rnd=" + getRndInt();
	var objData = {};
	var sucFunc = function(data){
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			//alert(data);
			
			var productsArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				productsArray.push({id:key, name:value});
			}
			productLoadFunc(productsArray);
		}
	agentAjax(url, objData, sucFunc);
}


//4. 挖机产品详细参数接口: http://catsite.ogilvy.com.cn/Ajax/item.aspx?action=productdetail&ptid=
//post参数
//action=productdetail
//pid= 产品类型ID
//rnd=随机数
//返回
//1,313D2|2,XXX|3,XXX
function getProductDetail(pid, productDetailLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=productdetail&ptid=" + pid + "&rnd=" + getRndInt();
	$.ajax({
		type: "POST",
		url: url,
		data: {},
		dataType: "text",
		success: function(data){
			var productDetailInfoArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				productDetailInfoArray.push({id:key, name:value});
			}
			productDetailLoadFunc(productDetailInfoArray);
		}
	});
}
function getProductDetail2(pid, productDetailLoadFunc){
	var url = actualUrlPrefix + "Ajax/item.aspx?action=productdetail&ptid=" + pid + "&rnd=" + getRndInt();
	var objData = {};
	var sucFunc = function(data){
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			//alert(data);
			
			var productDetailInfoArray = [];
			var keyValueArray = data.split('|');
			for(var i = 0; i < keyValueArray.length; i++){
				var keyvalue = keyValueArray[i].split(',');
				var key = keyvalue[0];
				var value = keyvalue[1];
				productDetailInfoArray.push({id:key, name:value});
			}
			productDetailLoadFunc(productDetailInfoArray);
		}
	agentAjax(url, objData, sucFunc);
}

//5. 发送手机验证码接口 http://catsite.ogilvy.com.cn/clubtj/getcode.aspx
//post参数
//mobile=13601234123
//source=  web / wap / pad
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)
//返回
//{"done":"ok"}
//done="ok"说明获取验证码成功，否则done="出错说明文字"
//用户点击获取验证码以后，按钮就不能点了，按钮上面显示1分钟的倒计时，1分钟以后用户才可以重新点击获取。
function getMobileCheckCode(mobile, source, sucGetCheckCodeFunc){//fromtype:wap/pad
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	//var url = actualUrlPrefix + "clubtj/getcode.aspx?mobile=" + mobile + "&source=" + source + "&rnd=" + tmpRnd + "&token=" + md5Rlt;
	var url = actualUrlPrefix + "clubtj/getcode.aspx";
	//md5 is from md5.js
	
	$.ajax({
		type: "POST",
		url: url,
		data: {
			mobile:mobile,
			source:source,
			rnd:tmpRnd,
			token:md5Rlt
		},
		dataType: "json",
		success: function(data){
			if("string" == typeof(data)){
				data = eval(data);//转成json对象
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				sucGetCheckCodeFunc(data);
			}
			else{
				alert("获取验证码失败！" + data.done);
			}
		}
	});
}
function getMobileCheckCode2(mobile, source, sucGetCheckCodeFunc){
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	//var url = actualUrlPrefix + "clubtj/getcode.aspx?mobile=" + mobile + "&source=" + source + "&rnd=" + tmpRnd + "&token=" + md5Rlt;
	var url = actualUrlPrefix + "clubtj/getcode.aspx";
	
	var objData = {
			mobile:mobile,
			source:source,
			rnd:tmpRnd,
			token:md5Rlt
		}
	
	var sucFunc = function(data){
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			if(!data){
				alert("验证码发送失败！");
				return;
			}
			
			data = eval(data);
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				sucGetCheckCodeFunc(data);
			}
			else{
				alert("获取验证码失败！" + data.done);
			}
		}
	agentAjax(url, objData, sucFunc);
}

//6. 验证手机验证码接口 http://catsite.ogilvy.com.cn/clubtj/validatecode.aspx
//post参数
//mobile=13601234123
//code=123456
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)
//返回
//{"done":"ok"}
//done="ok"说明验证验证码成功，否则done="出错说明文字"
function checkMobileCode(mobile, code, sucCheckedMobileCodeFunc){
	var url = actualUrlPrefix + "clubtj/validatecode.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	$.ajax({
		type:"POST",
		url:url,
		data:{
			mobile:mobile,
			code:code,
			rnd:tmpRnd,
			token:md5Rlt
		},
		dataType:"json",
		success:function(data){
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){
				sucCheckedMobileCodeFunc(data);
			}
			else{
				alert("验证错误:" + data.done);
			}
		}
	});
}
function checkMobileCode2(mobile, code, sucCheckedMobileCodeFunc){
	var url = actualUrlPrefix + "clubtj/validatecode.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	
	var objData = {
			mobile:mobile,
			code:code,
			rnd:tmpRnd,
			token:md5Rlt
		};
	var sucFunc = function(data){
			
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){
				sucCheckedMobileCodeFunc(data);
			}
			else{
				alert("验证错误:" + data.done);
			}
		}
	agentAjax(url, objData, sucFunc);
}


//7. 验证手机号码对应会员身份接口/登录接口 http://catsite.ogilvy.com.cn/clubtj/memberidentity.aspx
//post参数
//mobile=13601234123
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)
//返回
//{"done":"ok","identity":"None","name":"李响","province":"1","city":"1","userid":"1"}
//done="ok"说明成功，否则done="出错说明文字"
//identity = None   	无此用户
//identity = Catwaji 	挖机用户
//identity = Club		Club会员用户
//province 		省ID
//city			市ID
//mobile  手机号码为空时检查是否有已经登录用户
function getUserInfo(mobile, checkUserTypeFunc){
	var _url = actualUrlPrefix + "clubtj/memberidentity.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	$.ajax({
		type:"POST", url:_url,
		data:{
			mobile:mobile,
			rnd:tmpRnd,
			token:md5Rlt
		},
		dataType: "json",
		success: function(data){
			if("string" == typeof(data)){
				data = eval(data);//转成json对象
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var paramObj = {
					mobile:data.mobile, 
					identity:data.identity, 
					name:data.name, 
					province:data.province, 
					city:data.city, 
					userid:data.userid
				}
				checkUserTypeFunc(paramObj);
			}
			else{
				alert("获取验证码失败！" + data.done);
			}
		}
	});
}
function getUserInfo2(mobile, checkUserTypeFunc){
	var _url = actualUrlPrefix + "clubtj/memberidentity.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	
	var objData = {
			mobile:mobile,
			rnd:tmpRnd,
			token:md5Rlt
		};
	var sucFunc = function(data){
			
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var paramObj = {
					mobile:data.mobile, 
					identity:data.identity, 
					name:data.name, 
					province:data.province, 
					city:data.city, 
					userid:data.userid
				}
				checkUserTypeFunc(paramObj);
			}
			else{
				alert("获取验证码失败！" + data.done);
			}
		}
	agentAjax(_url, objData, sucFunc);
}



//8. 注册接口 http://catsite.ogilvy.com.cn/clubtj/registration.aspx
//post参数
//mobile=13601234123
//name=
//province=
//city=
//userid=
//DriveAge =
//DrivePType=
//BuyTime=
//BuyPTime=
//PrvBuyTime=
//FromDealer=
//PrvBuyPType=
//PrvBuyPCode=
//InfoType=
//Source=  web / wap / pad
//utm_source=
//utm_medium=
//utm_content=
//utm_campaign=
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)


//返回
//{"done":"ok","userid":"1"}
//done="ok"说明成功，否则done="出错说明文字"
//province 		省ID
//city			市ID
//DriveAge =您的驾龄
//DrivePType=操作机型
//BuyTime=购机时间 
//BuyPTime=购机类型
//PrvBuyTime=上次购机时间
//FromDealer=购机经销商
//PrvBuyPType=购机类型 
//PrvBuyPCode=购机型号
//InfoType=身份（0：我是机手，1：我是机手，2：我已拥有卡特挖机）
//Source=来源  web / wap / pad
//userid=Catwaji身份用户需要传ID
function doRegistration(mobile, name, province, city, infoType, source, registerSucFunc, utm_source, utm_medium, utm_content, utm_campaign){
	
	var url = actualUrlPrefix + "clubtj/registration.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	var objData = {
        mobile:mobile,
		name:name,
		province:1,
		city:1,
		userid:"",
		DriveAge:"",
		DrivePType:"",
		BuyTime:"",
		BuyPTime:"",
		PrvBuyTime:"",
		FromDealer:"",
		PrvBuyPType:"",
		PrvBuyPCode:"",
		InfoType:infoType,
		Source :source,	
		rnd : tmpRnd,
		token : md5Rlt,
		utm_source : (!utm_source?"":utm_source),
		utm_medium : (!utm_medium?"":utm_medium),
		utm_content: (!utm_content?"":utm_content),
		utm_campaign : (!utm_campaign?"":utm_campaign)
	};
	$.ajax({
		type: "POST",
		url: url,
		data:objData,
		dataType: "json",
		success: function(data){
			
			if("string" == typeof(data)){
				data = eval(data);//转成json对象
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				registerSucFunc(newObj);
			}
			else{
				alert("注册失败！" + data.done);
			}
		}
	});
}
function doRegistration2(mobile, name, province, city, infoType, source, registerSucFunc, utm_source, utm_medium, utm_content, utm_campaign){
	var url = actualUrlPrefix + "clubtj/registration.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	
	
	var objData = {
        mobile:mobile,
		name:name,
		province:1,
		city:1,
		userid:"",
		DriveAge:"",
		DrivePType:"",
		BuyTime:"",
		BuyPTime:"",
		PrvBuyTime:"",
		FromDealer:"",
		PrvBuyPType:"",
		PrvBuyPCode:"",
		InfoType:infoType,
		Source :source,	
		rnd : tmpRnd,
		token : md5Rlt,
		utm_source : (!utm_source?"":utm_source),
		utm_medium : (!utm_medium?"":utm_medium),
		utm_content: (!utm_content?"":utm_content),
		utm_campaign : (!utm_campaign?"":utm_campaign)
	};
	var sucFunc = function(data){
			
			//alert(JSON.stringify(objData) + "\n\n\n" + JSON.stringify(data));
			
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				registerSucFunc(newObj);
			}
			else{
				alert("注册失败！" + data.done);
			}
		}
	agentAjax(url, objData, sucFunc);
}

//9. 提交表单接口 http://catsite.ogilvy.com.cn/clubtj/recommend.aspx
//post参数
//userid = "用户ID";
//frname = "好友姓名";
//frmobile = "好友手机";
//frnature = "购买性质";
//frjob = "行业工作";
//mobile=13601234123
//Source=  web / wap / pad
//utm_source=
//utm_medium=
//utm_content=
//utm_campaign=Z
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)
//返回
//{"done":"ok","id":"被推荐用户的ID"}
//done="ok"说明请求成功，否则done="出错说明文字"，这里验证的信息应该有：“1、好友号码已被邀请过。2、您已参与5次抽奖了。3、验证码错误。4、您的手机号码格式错误。5、好友手机号码格式错误。”
//id="123"以此ID为依据请求该用户此次玩老虎机是否会中奖
function doPlay(userid, mobile, frname, frmobile, frnature, frfield, source, playSuccFunc, utm_source, utm_medium, utm_content, utm_campaign){
	var url = actualUrlPrefix + "clubtj/recommend.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	//alert(document.domain + ";" + url);
	
	$.cookie("rnd", tmpRnd);
	$.cookie("token", md5Rlt);
	
	$.ajax({
		type: "POST",
		url: url,
		data:{
			userid:(!userid?"":userid),
			frname:frname,
			frmobile:frmobile,
			frnature:frnature,
			frjob:frfield,
			mobile:mobile,
			Source:source,
			utm_source : (!utm_source?"":utm_source),
			utm_medium : (!utm_medium?"":utm_medium),
			utm_content: (!utm_content?"":utm_content),
			utm_campaign : (!utm_campaign?"":utm_campaign),
			rnd:tmpRnd,
			token:md5Rlt
		},
		dataType: "json",
		success: function(data){
			
			if("string" == typeof(data)){
				data = eval(data);//转成json对象
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				playSuccFunc(newObj);
			}
			else{
				if("1" == data.id){
					alert("好友号码已被邀请过");
					dataLayer.push({'event':'page','branch':'已被邀请'});
				}
				else if("2" == data.done){
					alert("您已参与5次抽奖了");
					dataLayer.push({'event':'page','branch':'已达到5人'});
				}
				else if("3" == data.done){
					alert("验证码错误");
				}
				else if("4" == data.done){
					alert("您的手机号码格式错误");
				}
				else if("5" == data.done){
					alert("好友手机号码格式错误");
				}
				else{
					alert("抽奖失败！" + data.done);
				}
			}
		}
	});
}
function doPlay2(userid, mobile, frname, frmobile, frnature, frfield, source, playSuccFunc, utm_source, utm_medium, utm_content, utm_campaign){
	var url = actualUrlPrefix + "clubtj/recommend.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	
	var objData = {
			userid:(!userid?"":userid),
			frname:frname,
			frmobile:frmobile,
			frnature:frnature,
			frjob:frfield,
			mobile:mobile,
			Source:source,
			utm_source : (!utm_source?"":utm_source),
			utm_medium : (!utm_medium?"":utm_medium),
			utm_content: (!utm_content?"":utm_content),
			utm_campaign : (!utm_campaign?"":utm_campaign),
			rnd:tmpRnd,
			token:md5Rlt
		};
	
	//document.write(JSON.stringify(objData));
	
	var sucFunc = function(data){
			//alert(JSON.stringify(data));
			//return;
			
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				playSuccFunc(newObj);
			}
			else{
				if("1" == data.done){
					alert("好友号码已被邀请过");
				}
				else if("2" == data.done){
					alert("您已参与5次抽奖了");
				}
				else if("3" == data.done){
					alert("验证码错误");
				}
				else if("4" == data.done){
					alert("您的手机号码格式错误");
				}
				else if("5" == data.done){
					alert("好友手机号码格式错误");
				}
				else{
					alert("抽奖失败！" + data.done);
				}
			}
		}
	agentAjax(url, objData, sucFunc);
}


//1O. 老虎机请求查询是否中奖的接口  http://catsite.ogilvy.com.cn/clubtj/getaward.aspx
//post参数
//id="123"
//mobile=13601234123
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)
//返回
//{"done":"ok","award":"0|10|20|50"}
//done="ok"说明获取验证码成功，否则done="出错说明文字"
//award="10"该参数等于是否中奖的信息。0没中，10中十元话费，20...50...
//如果此接口请求异常，界面部分将提示“网络异常，请再次抽奖！”
function isAwardMobile(uid, mobile, isAwardFunc){
	var url = actualUrlPrefix + "clubtj/getaward.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	//alert("url:" + url + "; uid:" + uid + "; mobile:" + mobile + "; tmpRnd:" + tmpRnd + "; md5Rlt:" + md5Rlt);
	$.ajax({
		type: "POST",
		url: url,
		data:{
			id:uid,
			mobile:mobile,
			rnd:tmpRnd,
			token:md5Rlt
		},
		dataType: "json",
		success: function(data){
			
			if("string" == typeof(data)){
				data = eval(data);//转成json对象
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				isAwardFunc(newObj);
			}
			else{
				alert("网络异常，请再次抽奖！");
			}
		}
	});
}
function isAwardMobile2(uid, mobile, isAwardFunc){
	var url = actualUrlPrefix + "clubtj/getaward.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(mobile + "cat" + tmpRnd);
	
	var objData = {
			id:uid,
			mobile:mobile,
			rnd:tmpRnd,
			token:md5Rlt
		};
	var sucFunc = function(data){
			
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				isAwardFunc(newObj);
			}
			else{
				alert("网络异常，请再次抽奖！");
			}
		}
	agentAjax(url, objData, sucFunc);
}



//11. 查询获奖名单列表接口(充值卡) http://catsite.ogilvy.com.cn/clubtj/getwinners.aspx
//post参数
//key=13601234123	//查询号码，如果该参数为空""则返回默认列表数据，如果为电话号码，则返回是否中奖名单列表。
//page=页码
//mobile=13601234123
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)
//返回
//{"done":"ok", "totalepage":"5" ,"page":"1", "data":[
//	{"time":"10月30日","mobile":"13501234121","award":"10"},
//	{"time":"10月30日","mobile":"13501234122","award":"20"},
//	{"time":"10月30日","mobile":"13501234123","award":"50"},
//	{"time":"10月30日","mobile":"13501234124","award":"10"}]
//}
//done="ok"说明获取验证码成功，否则done="出错说明文字"
//totalepage:5（共5页）,page:1（当前第一页）
//data="列表数据"，如果没有数据返回 [] 空数组
function isAwardMobile1(queryMobile, userMobile, succGetWinlist1Func){
	var url = actualUrlPrefix + "clubtj/getwinners.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(userMobile + "cat" + tmpRnd);
	$.ajax({
		type: "POST",
		url: url,
		data:{
			key:queryMobile,//查询号码，如果该参数为空""则返回默认列表数据，如果为电话号码，则返回是否中奖名单列表。
			page:1,//页码:取查询结果的第一页
			mobile:userMobile,//电话号码
			rnd:tmpRnd,
			token:md5Rlt
		},
		dataType: "json",
		success: function(data){
			if("string" == typeof(data)){
				data = eval(data);//转成json对象
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				succGetWinlist1Func(newObj);
			}
			else{
				alert("网络异常，请再次抽奖！");
			}
		}
	});
}
function isAwardMobile12(queryMobile, userMobile, isAwardFunc){
	var url = actualUrlPrefix + "clubtj/getwinners.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(userMobile + "cat" + tmpRnd);
	
	var objData ={
			key:queryMobile,//查询号码，如果该参数为空""则返回默认列表数据，如果为电话号码，则返回是否中奖名单列表。
			page:1,//页码:取查询结果的第一页
			mobile:userMobile,//电话号码
			rnd:tmpRnd,
			token:md5Rlt
		};
		
	var sucFunc = function(data){
			
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				succGetWinlist1Func(newObj);
			}
			else{
				alert("网络异常，请再次抽奖！");
			}
		}
		
		
	agentAjax(url, objData, sucFunc);
}


//12. 查询获奖名单列表接口(1000油费)  http://catsite.ogilvy.com.cn/clubtj/getwinners2.aspx
//post参数
//key=13601234123	//查询号码，如果该参数为空""则返回默认列表数据，如果为电话号码，则返回是否中奖名单列表。
//page=页码
//mobile=13601234123
//rnd=随机数
//token=MD5(mobile+"cat"+rnd)
//返回
//{"done":"ok", "totalepage":"5" ,"page":"1", "data":[
//	{"Arward":" xxx 推荐 xxx 成功购机，双方均获得价值千元Cat大黄靴一双"},
//	{"Arward":" xxx 推荐 xxx 成功购机，双方均获得价值千元Cat大黄靴一双"},
//	{"Arward":" xxx 推荐 xxx 成功购机，双方均获得价值千元Cat大黄靴一双"}]
//}
//done="ok"说明获取验证码成功，否则done="出错说明文字"
//totalepage:5（共5页）, page:1（当前第一页）
//data="列表数据"，如果没有数据返回 [] 空数组
function getWinlist2(queryMobile, userMobile, succGetWinlist2Func){
	var url = actualUrlPrefix + "clubtj/getwinners2.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(userMobile + "cat" + tmpRnd);
	$.ajax({
		type: "POST",
		url: url,
		data:{
			key:queryMobile,	//查询号码，如果该参数为空""则返回默认列表数据，如果为电话号码，则返回是否中奖名单列表。
			page:1,//页码:取查询结果的第一页
			mobile:userMobile,
			rnd:tmpRnd,
			token:md5Rlt
		},
		dataType: "json",
		success: function(data){
			
			if("string" == typeof(data)){
				data = eval(data);//转成json对象
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				succGetWinlist2Func(newObj);
			}
			else{
				alert("网络异常，请再次抽奖！");
			}
		}
	});
}
function getWinlist22(queryMobile, userMobile, succGetWinlist2Func){
	var url = actualUrlPrefix + "clubtj/getwinners2.aspx";
	var tmpRnd = getRndInt();
	var md5Rlt = MD5(userMobile + "cat" + tmpRnd);
	
	var objData ={
			key:queryMobile,	//查询号码，如果该参数为空""则返回默认列表数据，如果为电话号码，则返回是否中奖名单列表。
			page:"1",		//页码:取查询结果的第一页
			mobile:userMobile,
			rnd:tmpRnd,
			token:md5Rlt
		};
	
	var sucFunc = function(data){
			//alert("接口代理调用:" + data);
			
			if("object" == typeof(data)){
				data = json.stringify(data);
			}
			
			//去除帮倒忙的jsonp
			var st = data.indexOf("callback(") + 9;
			if(st > 9 && data.indexOf(")") > st){
				data = data.substring(st, data.indexOf(")"));
			}
			if("string" == typeof(data)){
				data = eval(data);
			}
			
			if("ok" == data.done.toLowerCase()){//如果成功就执行
				var newObj = data;
				succGetWinlist2Func(newObj);
			}
			else{
				alert("网络异常，请再次抽奖！");
			}
		}
	agentAjax(url, objData, sucFunc);
}
