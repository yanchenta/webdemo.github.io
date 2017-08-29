// JavaScript Document
function buildSexRadioList()
	{
		$(".boy").click(function() {
				var parent = this.parentNode;
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					parent.childNodes[j].style = {};
					parent.childNodes[j].style.backgroundColor = "#898989";
				}
				this.style.backgroundColor = "#00338B";
		});
			
		$(".girl").click(function() {
				var parent = this.parentNode;
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					parent.childNodes[j].style = {};
					parent.childNodes[j].style.backgroundColor = "#898989";
				}
				this.style.backgroundColor = "#F074BA";
		});
	}

	function loadDistricts(city)
	{
		
	}
		
	function loadCities(province)
	{
		//cities list: ajax => "http://shuaxinfuwu.nipponpaint.com.cn/getCitiesForJson.action?user.province=" + province;
		//var returnStr_City = "{\"result\":{\"cities\":[{\"city\":\"杭州\"},{\"city\":\"宁波\"},{\"city\":\"温州\"}],\"status\":\"OK\"}}";
		//ajax("http://shuaxinfuwu.nipponpaint.com.cn/getProvincesForJson.action");
		var _url = "http://shuaxinfuwu.nipponpaint.com.cn/getCitiesForJson.action?user.province=" + province;
		ajax(_url,function(response){
			if("" == response) return;
			var return_city = eval('(' + response + ')');
			if("ERROR" == return_city.status) return;
			
			var cities = return_city.result.cities;
			//var cities = ["石家庄", "唐山", "邯郸", "承德", "沧州", "廊坊", "衡水"];
			var citiesDiv = $(".m4-cities")[0];
			
			for(var i = citiesDiv.childNodes.length - 1; i >= 0; i--)
			{
				citiesDiv.removeChild(citiesDiv.childNodes[i]);
			}
			
			for(var i = 0; i < cities.length; i++)
			{
				var elem_city = document.createElement("div");
				elem_city.innerHTML = cities[i].city;
				elem_city.style.textAlign="center";
				elem_city.style.cursor = "pointer";
				elem_city.tagText = "2";
				elem_city.onclick = function()
				{
					//...
					this.parentNode.tagText = this.innerHTML;
				
					//...
					var parent = this.parentNode;
					for(var j = 0; j < parent.childNodes.length; j++)
					{
						parent.childNodes[j].style = {};
						parent.childNodes[j].style.backgroundColor = "white";
					}
					this.style.backgroundColor = "#f0b22d";
					
					//loadDistricts(city);
				}
				citiesDiv.appendChild(elem_city);
			}
		});
		
	}
	
	//地址单选列表(级联)
	function loadProvinces()
	{
		//...
		//省市区级联
		
		//var provinces = ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "陕西省", "山东省", "河南省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "江西省", "福建省", "湖北省", "湖南省", "四川省", "贵州省", "云南省", "广东省", "海南省", "甘肃省", "青海省", "台湾省", "内蒙古自治区", "新疆维吾尔自治区", "西藏自治区", "广西壮族自治区", "宁夏回族自治区", "香港特别行政区", "澳门特别行政区"];
		var provinces = [];
		
		var _url = "http://shuaxinfuwu.nipponpaint.com.cn/getProvincesForJson.action";
		ajax(_url,function(response){
			if("" == response) return;
			var return_Province = eval('(' + response + ')');
			if("ERROR" == return_Province.status) return;
			
			var provinces = return_Province.result.provinces;
			var provincesDiv = $(".m4-provinces")[0];
			for(var i = 0; i < provinces.length; i++)
			{
				var elem_pro = document.createElement("div");
				elem_pro.innerHTML = provinces[i].province;
				elem_pro.style.textAlign = "center";
				elem_pro.style.cursor = "pointer";
				elem_pro.onclick = function()
				{
					//...
					this.parentNode.tagText = this.innerHTML;
					
					//...
					var parent = this.parentNode;
					for(var j = 0; j < parent.childNodes.length; j++)
					{
						parent.childNodes[j].style = {};
						parent.childNodes[j].style.backgroundColor = "white";
					}
					this.style.backgroundColor = "#f0b22d";
					
					//alert(this.innerHTML);
					loadCities(this.innerHTML);//用省份-查询城市数据
				};
				provincesDiv.appendChild(elem_pro);
			}
		});
	}
	
	//getProvinces
	//getCities
	//getDistricts
	
	
	//户型单选框列表
	function buildHouseTypeRadioList()
	{
		//...
		var houseTypeList = $(".ting")[0];
		for(var i = 0; i < houseTypeList.childNodes.length; i++)
		{
			houseTypeList.childNodes[i].onclick = function() {
				//...
				this.parentNode.tagText = this.innerHTML;
				
				//...
				var parent = this.parentNode;
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					parent.childNodes[j].style = {};
					parent.childNodes[j].style.backgroundColor = "white";
				}
				this.style.backgroundColor = "#f0b22d";
			};
		}
	}
	
	//面积单选列表
	function buildAreaRadioList()
	{
		//...
		var houseAreaList = $(".ting2")[0];
		for(var i = 0; i < houseAreaList.childNodes.length; i++)
		{
			houseAreaList.childNodes[i].onclick = function() {
				//...
				this.parentNode.tagText = this.innerHTML;
				
				//...
				var parent = this.parentNode;
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					parent.childNodes[j].style = {};
					parent.childNodes[j].style.backgroundColor = "white";
				}
				this.style.backgroundColor = "#f0b22d";
			};
		}
	}
	
	//房屋年龄单选列表
	function buildHouseAgeRadioList()
	{
		//...
		var houseAgeList = $(".ting3")[0];
		for(var i = 0; i < houseAgeList.childNodes.length; i++)
		{
			houseAgeList.childNodes[i].onclick = function() {
				//...
				this.parentNode.tagText = this.innerHTML;
				
				//...
				var parent = this.parentNode;
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					parent.childNodes[j].style = {};
					parent.childNodes[j].style.backgroundColor = "white";
				}
				this.style.backgroundColor = "#f0b22d";
			};
		}
	}
	
	//装修年限单选列表
	function buildZXAgeRadioList()
	{
		//...
		var zxAgeList = $(".ting4")[0];
		for(var i = 0; i < zxAgeList.childNodes.length; i++)
		{
			zxAgeList.childNodes[i].onclick = function() {
				//...
				this.parentNode.tagText = this.innerHTML;
				
				//...
				var parent = this.parentNode;
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					parent.childNodes[j].style = {};
					parent.childNodes[j].style.backgroundColor = "white";
				}
				this.style.backgroundColor = "#f0b22d";
			};
		}
	}
	
	function selectProblemsInList(elem, value) {
		//...
		$('#wall_cont').tagValue = value;
		/*
		$('.pro0')[0].style.backgroundColor = "white";
		$('.pro0')[0].style.color = "#a0a0a0";
		$('.pro1')[0].style.backgroundColor = "white";
		$('.pro1')[0].style.color = "#a0a0a0";
		$('.pro2')[0].style.backgroundColor = "white";
		$('.pro2')[0].style.color = "#a0a0a0";
		$('.pro3')[0].style.backgroundColor = "white";
		$('.pro3')[0].style.color = "#a0a0a0";
		$('.pro4')[0].style.backgroundColor = "white";
		$('.pro4')[0].style.color = "#a0a0a0";
		$('.pro5')[0].style.backgroundColor = "white";
		$('.pro5')[0].style.color = "#a0a0a0";
		$('.pro6')[0].style.backgroundColor = "white";
		$('.pro6')[0].style.color = "#a0a0a0";
		$('.pro7')[0].style.backgroundColor = "white";
		$('.pro7')[0].style.color = "#a0a0a0";
		$('.pro8')[0].style.backgroundColor = "white";
		$('.pro8')[0].style.color = "#a0a0a0";
		*/
		//elem.style.backgroundColor = "#f0b22d";
		//elem.style.color = "white";
		
		//alert("elem.tagSelected:" + elem.tagSelected);
		if(!elem.tagSelected || "false" == elem.tagSelected)
		{
			elem.tagSelected = "true";
			elem.style.backgroundColor = "#f0b22d";
			elem.style.color = "white";
		}
		else
		{
			//alert("return unseected status.")
			elem.tagSelected = "false";
			elem.style.backgroundColor = "white";
			elem.style.color = "#a0a0a0";
		}
		
		
		var arrSelected = [];
		if("true" == $('.pro0')[0].tagSelected) arrSelected.push($('.pro0')[0].tagValue);
		if("true" == $('.pro1')[0].tagSelected) arrSelected.push($('.pro1')[0].tagValue);
		if("true" == $('.pro2')[0].tagSelected) arrSelected.push($('.pro2')[0].tagValue);
		if("true" == $('.pro3')[0].tagSelected) arrSelected.push($('.pro3')[0].tagValue);
		if("true" == $('.pro4')[0].tagSelected) arrSelected.push($('.pro4')[0].tagValue);
		if("true" == $('.pro5')[0].tagSelected) arrSelected.push($('.pro5')[0].tagValue);
		if("true" == $('.pro6')[0].tagSelected) arrSelected.push($('.pro6')[0].tagValue);
		if("true" == $('.pro7')[0].tagSelected) arrSelected.push($('.pro7')[0].tagValue);
		if("true" == $('.pro8')[0].tagSelected) arrSelected.push($('.pro8')[0].tagValue);
		
		var strSelected = "";
		for(var i = 0; i < arrSelected.length; i++)
		{
			if(0 != i)
			{
				strSelected += ",";
			}
			strSelected += "\"" + arrSelected[i] + "\"";
		}
		strSelected = "[" + strSelected + "]";
		$(".wall_cont")[0].tagValue = arrSelected; //save selected-value
	}
	
	//墙面问题 复选列表
	function buildProblemsCheckboxList()
	{
		//...
		//var houseAgeDiv = $(".house-nx-tk")[0];
		$(".pro0")[0].tagValue = "0裂变";
		$(".pro0")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro1")[0].tagValue = "1霉变";
		$(".pro1")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro2")[0].tagValue = "2脱皮";
		$(".pro2")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro3")[0].tagValue = "3空鼓";
		$(".pro3")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro4")[0].tagValue = "4改色";
		$(".pro4")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro5")[0].tagValue = "5陈旧";
		$(".pro5")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro6")[0].tagValue = "6污渍";
		$(".pro6")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro7")[0].tagValue = "7除味";
		$(".pro7")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
		
		$(".pro8")[0].tagValue = "8新房装修";
		$(".pro8")[0].onclick = function() {
			selectProblemsInList(this, this.tagValue);
		}
	}
	
	function trim(s){
　　    return s.replace(/(^\s*)|(\s*$)/g, "");
　　}
	
	function validatefixPhone(fixphone)
	{
		if(null == fixedPhone || "" == fixedPhone) return false;
		return true;
	}
	
	function validateMPhone(mphone)
	{
		if(null == mPhone || "" == mPhone) return false;
		return true;
	}

	
$(function() {

	//客户的基本信息   弹框内容 => 地址
	$(".addresstxt").click(function(){
		$(".scroll-area").show();
	});
	

	//房屋结构 弹框内容					   
	$(".house-jg-txt").click(function(){
		$(".house-tk").show();
	});										   				   
	
	//房屋面积
	$(".house-area-txt").click(function(){
		$(".house-area-tk").show();
	});									   
	
	//房屋年龄
	$(".house-age-txt").click(function(){
		$(".house-age-tk").show();
	});									   
	
	//房屋年限
	$(".house-nx-txt").click(function(){
		$(".house-nx-tk").show();
	});									   										   
	
	//性别
	buildSexRadioList();//构架 性别单选列表
	
	//房屋地址 => 单选
	//buildAddressRadioList();//构建 地址单选列表
	loadProvinces();
	
	//地址列表确认按钮
	$(".sure").click(function(){
		var str = "";
		if(null != $(".m4-provinces")[0].tagText && "" != $(".m4-provinces")[0].tagText)
		{
			str = $(".m4-provinces")[0].tagText;
		}
		
		if(null != $(".m4-cities")[0].tagText && "" != $(".m4-cities")[0].tagText)
		{
			str += $(".m4-cities")[0].tagText;
		}
		
		if(null != $(".m4-districts")[0].tagText && "" != $(".m4-districts")[0].tagText)
		{
			str += $(".m4-districts")[0].tagText;
		}
		
		$(".addresstxt")[0].value = trim(str);
		
		$(".scroll-area").hide();
	});
	
	//房屋户型 => 单选
	buildHouseTypeRadioList();//构建 户型 单选列表
	$(".sure2").click(function(){
		var houseType = $('.ting')[0];
		//alert(houseType.tagText);
		if(!!houseType.tagText)
		{
			$('.house-jg-txt')[0].value = houseType.tagText;
		}
		$(".house-tk").hide();
	});
	
	//房屋面积 => 单选
	buildAreaRadioList();//构建 面积 单选列表
	$(".sure2-2").click(function(){
		var houseArea = $('.ting2')[0];
		//alert(houseArea.tagText);
		if(!!houseArea.tagText)
		{
			$('.house-area-txt')[0].value = houseArea.tagText;
		}
		$(".house-area-tk").hide();
	});
	
	//房屋房龄 => 单选
	buildHouseAgeRadioList();//构建 房龄 单选列表
	$(".sure2-3").click(function(){
		var houseAge = $('.ting3')[0];
		//alert(houseAge.tagText);
		if(!!houseAge.tagText)
		{
			$('.house-age-txt')[0].value = houseAge.tagText;
		}
		$(".house-age-tk").hide();
	});
	
	//房屋装修年限 => 单选
	buildZXAgeRadioList();//构建 装修年限 单选列表
	$(".sure2-4").click(function(){
		var houseZXAge = $('.ting4')[0];
		//alert(houseZXAge.tagText);
		if(!!houseZXAge.tagText)
		{
			$('.house-nx-txt')[0].value = houseZXAge.tagText;
		}
		$('.house-nx-tk').hide();
	});
	
	//房屋问题 => 多选
	buildProblemsCheckboxList();//构建 房屋问题 复选列表
	
	//关闭提交失败/成功的弹框
	$(".m4-close-fnotice").click(function(){
		//...
		$(".subm-failure")[0].style.display = "none";
	});
	$(".m4-close-snotice").click(function(){
		//...
		$(".subm-success")[0].style.display = "none";
	});
	
	
	//报名页面PV
	if(window.location.href.indexOf("m_4.html") >= 0){
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_baoming_pv);
	}
	
		
	//返回首页
	$(".backBut").click(function(){
		var url = "index.html";;
		track2(window.codeConsts.channelId, window.codeConsts.codes.click_to_index, url);
		//window.location = "index.html";
	});
	
	//提交按钮
	$(".backBut2").click(function(){
		lbReload('mobilesubmit','','','');
		//提交pv
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_baoming_click_submit);
	
		//获取值
		var name = $(".txtname")[0].value;
		var sex = $(".sex")[0].tagValue;
		var remotePhone = $(".phonetxt")[0].value;
		var fixedPhone = $(".calltxt")[0].value;
		//var address = $(".addresstxt")[0].value;
		
		var curProvince = $(".m4-provinces")[0].tagText;
		var curCity = "";
		if($(".m4-cities").length > 0){
			curCity = $(".m4-cities")[0].tagText;
		}
		var curDistrict = "";
		if($(".districts").length > 0){
			curDistrict = (!!$(".districts")[0].tagText) ? $(".districts")[0].tagText : "";
		}
		var hosueType = $(".house-jg-txt")[0].value;
		var houseArea = $(".house-area-txt")[0].value;
		var houseAge = $(".house-age-txt")[0].value;
		var ZXAge = $(".house-nx-txt")[0].value;
		var problems = [];
		if(!!$(".wall_cont")[0].tagValue) problems = eval($(".wall_cont")[0].tagValue);
		
		
		//cast from ...
		var tmp_channels = $(".checkbox-channel");
		var channels = [];
		for(var i = 0; i < tmp_channels.length; i++)
		{
			if(tmp_channels[i].checked)
			{
				channels.push(tmp_channels[i].value);
			}
		}
		
		
		//适配提交URL字符串
		var paramStr = "";
		//if(null == name || "" == name) return;
		//if(!validatefixPhone(remotePhone) && validateMPhone(fixedPhone)) return;
		//if(!validatefixPhone(remotePhone) && validateMPhone(fixedPhone)) return;
		//由服务端做验证
		
		paramStr += "&custom.userName=" + name;
		paramStr += "&custom.sex=" + sex;
		paramStr += "&custom.mphone=" + remotePhone;
		paramStr += "&custom.phead=" + fixedPhone;
		paramStr += "&custom.phone=" + fixedPhone;
		paramStr += "&custom.province=" + curProvince;
		paramStr += "&custom.city=" + curCity;
		paramStr += "&custom.area=" + curDistrict;
		paramStr += "&custom.street=" + "";
		paramStr += "&custom.struts=" + hosueType;
		paramStr += "&custom.acreage=" + houseArea;
		paramStr += "&custom.age=" + houseAge;
		paramStr += "&custom.useage=" + ZXAge;
		for(var i = 0; i < problems.length; i++)
		{
			paramStr += "&problems=" + problems[i];
		}
		
		for(var i = 0; i < channels.length; i++)
		{
			paramStr += "&custFrom=" + channels[i];
		}
		if(paramStr.length > 0) paramStr = "?" + paramStr.substring(1, paramStr.length);
		var url = "http://shuaxinfuwu.nipponpaint.com.cn/addCustomViaJson.action"
		url = url + paramStr;
		ajax(url, function(response){
			
			var objResponse = window.eval('(' + response + ')');
			$(".m4-notice-txt2")[0].innerHTML = objResponse.result.message.replace(/\\[n]/g, "</br>");
			
			if("ERROR" == objResponse.result.status) //不考虑提交超时么?
			{
				$(".subm-failure")[0].style.display = "block";
				$(".subm-success")[0].style.display = "none";
			}
			else {
				$(".subm-failure")[0].style.display = "none";
				$(".subm-success")[0].style.display = "block";
			}
			
			
		});
		

	});
 });






//实现全屏
function resetPage() {
var deviceWidth = document.documentElement.clientWidth,
scale = deviceWidth/320;
document.body.style.zoom = scale;
}
 
window.onresize = function(){
resetPage();
}
 
window.onload = function(){
resetPage();
}

//实现全屏结束
