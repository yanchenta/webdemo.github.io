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

var param='';

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



function go313D2(){
	window.location = '../313D2/index.html?param='+param;
}

function go320D2(){
	window.location = '../320D2/index.html?param='+param;
}

function go360D2(){
	window.location = '../336D2/index.html?param='+param;
}

if(initArguments('loginInfo')){
	var loginInfo = $.parseJSON(decodeURIComponent(initArguments('loginInfo')));
	setCookie('name',loginInfo.Name,date);
	setCookie('userid',loginInfo.UserID,date);
	setCookie('mobile',loginInfo.Mobile,date);
	setCookie('province',loginInfo.Province,date);
	setCookie('city',loginInfo.City,date);
	
	localStorage.setItem('name',loginInfo.Name);
	localStorage.setItem('userid',loginInfo.UserID);
	localStorage.setItem('mobile',loginInfo.Mobile);
	localStorage.setItem('province',loginInfo.Province);
	localStorage.setItem('city',loginInfo.City);
	
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
	resetPage();
	
	addListener();
	setProvenices();
    
	$(".prov").live("change", function () {
        setCities($(this).val());
    });
	
	if(document.documentElement.clientHeight<440){
		$('#m,#text').css("position","fixed");
	}
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


//获取手机方向值
function mobileDirection(e){
	var Alpha = Math.round(e.alpha);
	var position;
		if(isFrist){
			
			fristNum = Alpha;
			
		}else{
			position = (Alpha-fristNum)-50;
		}
		
		
		
		//$('#a').html(position+'---'+Alpha+'---'+fristNum+'11'+$('#bg').css('-webkit-transform'));
		
		if(position ==0&&isFrist){
			
			$('#bg').css('-webkit-transform','translate(-140px,0)');
			isFrist=false;
		}else{
			
			isFrist=false;
			if(position >-300 && position <-1){
				$('#bg').css('-webkit-transform','translate('+(position-50)+'px,0)');
			}
			
		}
	
	
}

function showText(num){
	removeListener();
	$('.pop,.aside2,.nav,#m').hide();
	$('.point').css('z-index','2');
	$('.p'+num).css('z-index','5');
	$('.navlist ul').css('z-index','-1');
	$('#bg').css('-webkit-transition','all .2s ease');
	$('.mark').show();
	switch(num){
		case 1 :
			$('#bg').css('-webkit-transform','translate(-260px,0)');
			$('.text1').show();
			break;
		case 2 :
			$('#bg').css('-webkit-transform','translate(-230px,0)');
			$('.text2').show();
			break;
		case 3 :
			$('#bg').css('-webkit-transform','translate(-240px,0)');
			$('.text3').show();
			break;
		case 4 :
			$('#bg').css('-webkit-transform','translate(-250px,0)');
			$('.text4').show();
			break;
		case 5 :
			$('#bg').css('-webkit-transform','translate(-300px,0)');
			$('.text5').show();
			break;
	}
}

function closePop(){
	$('.pop').hide();
	$('#bg').css('-webkit-transform','translate(-100px,0)');
	setTimeout(function(){$('#bg').css('-webkit-transition','');},200);
	$('.point').css('z-index','5');
	$('.navlist ul').css('z-index','1');
	$('.aside2,.nav,#m').show();
	$('.mark').hide();
	addListener();
	
}

function enquiry(){
	
	//询价
	track(20,10105);
	
	removeListener();
	$('.pop').hide();	
	isLogin(1);	//1 询价
}

function download(){
	//下载
	track(20,10106);
	
	removeListener();
	$('.pop').hide();
	isLogin(2);	//下载产品手册
}
var isDownLoad = false;
function isLogin(num){
	if(localStorage.getItem('name')){
		setCookie('name',localStorage.getItem('name'),date);
		setCookie('userid',localStorage.getItem('userid'),date);
		setCookie('mobile',localStorage.getItem('mobile'),date);
		setCookie('province',localStorage.getItem('province'),date);
		setCookie('city',localStorage.getItem('city'),date);
	}
	
	if (!getCookie("name")||!localStorage.getItem('name')) {
		//setCookie('login','yes',date);
		if(num==2){
			isDownLoad = true;
		}else{
			isDownLoad = false;
		}
		$('.info').show();
		
		
	}else{
		

		if(num==1){				//询价
				$('.waiting').show();
				xunjia(getCookie('name'),getCookie('userid'),getCookie('mobile'),getCookie('province'),getCookie('city'));
		}else if(num==2){		//下载
				
				$('.down').show();
		}
	}
	
}


//登录前询价
function sendInfo(){
	

	
	var name = $.trim($('#name').val());
	var mobile = $.trim($('#mobile').val());
	var province = $('#province').val();
	var city = $('#citys').val();
	
	if (!name) {
		alert("请输入您的姓名！");
		return
	} 
	var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$$/;
	if (!mobile || !reg.test(mobile)) {
		alert("请输入正确的手机号码...");
		return
	}
	if (!province) {
		alert("请选择省份");
		return
	}
	if (!city) {
		alert("请选择城市");
		return
	}
	$('.waiting').show();
	
	var url = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011";
	//var url = "http://test.zhangkuo.net/advmessage/adv/addResultJsonP.action?advid=20011";
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
			expand1 : '336D2WAP',
			expand3 : param,
		},
		success: function(json) {
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
					
					if(isDownLoad){
						$('.pop').hide();
						$('.down').show();
					}else{
						$('.waiting').hide();
						$('.pop').hide();
						$('.succ').show();
					}
					
				}else{
					alert('询价失败~');
				}
				
				
						
			}
			else{
				alert('提交失败');
			}
		}
	});
	
	
	
	
}

//登录后询价
function xunjia(name,userid,mobile,province,city){
	//http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011
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
			expand1 : '336D2WAP',
			expand3 : param,
		},
		success: function(json) {
			$('.waiting').hide();
			if (json[0].success == 1) {
				
				$('.pop').hide();
				$('.succ').show();
						
			}
			else{
				$('.waiting').hide();
				alert('询价失败');
			}
		}
	});
}


function showLoginPop(){
	$('.pop').hide();
	$('.loginPop').show();
}

/*****************************************
*
*登录接口
*
****************************************/
function userLogin(){
	
	
	var mobile = $.trim($('#mobile2').val());
	var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$$/;
	if (!mobile || !reg.test(mobile)) {
		alert("请输入正确的手机号码...");
		return
	}
	$('.waiting').show();
	//var url = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011&expand2=login";
	var url = "http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20011&expand2=login";
	$.ajax({
		url: url,
		cache: false,
		dataType : 'jsonp',
		jsonpCallback: "eventcallback4",
		data: {
			mobile : mobile,
			expand1 : '336D2WAP',
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
					
					if(isDownLoad){
						$('.pop').hide();
						$('.down').show();
					}else{
						xunjia(name,userid,mobile,province,city);
					}
					
				}else if(json[0].ServiceReturn.userid==""){
					alert("用户不存在，请注册一个新账户");
					$('.pop').hide();
					$('.info').show();
				}else{
					$('.waiting').hide();
					alert('登录失败~');
				}
				
			}
			else{
				$('.waiting').hide();
				alert('登录失败！');
			}
		}
	});
	
}

//跳转到产品详情页面
function goToDetailed(){
	//var data = {"Success":"Y","UserID":getCookie('userid'),"Name":escape(getCookie('name')),"Gender":"","Province":getCookie('province'),"City":getCookie('city'),"BirthYear":"","BirthMonth":"","CityOther":[],"ErrMessage":[],"Mobile":getCookie('mobile')};
	var data =  encodeURIComponent('{"Success":"Y","UserID":"'+getCookie("userid")+'","Name":"'+getCookie("name")+'","Gender":"","Province":"'+getCookie("province")+'","City":"'+getCookie("city")+'","BirthYear":"","BirthMonth":"","CityOther":[],"ErrMessage":[],"Mobile":"'+getCookie("mobile")+'"}');
	var callBackUrl = encodeURIComponent("http://catwaji.mobileone.com.cn/xiangqing.php?cate=big&type=0");
	
	window.location = "http://catwaji.mobileone.com.cn/jump.php?loginInfo="+data+"&callback="+callBackUrl;
	
	
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

