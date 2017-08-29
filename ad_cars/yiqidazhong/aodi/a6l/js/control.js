$(document).ready(function(e) {

});

function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
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
var isSubmit = false;
//ajax提交车主认证的表单
function submitForm(){
	if(isSubmit){
		alert("正在提交，请稍等一下吧~");
		return;
	}
	isSubmit = true;
	var name = trim($("#name").val()),
		mobile = trim($("#mobile").val()),
		email = trim($("#email").val()),
		sex = $("#sex").val(),
		dealername = $("#dealername").val(),
		cartype = $("#cartype").val(),
		buytime = $("#buytime").val(),
		alertInfo = '';
		
		
		
	if(matchUserName(name)==false ){
		alertInfo += "请输入2-20位的中文字姓名！\n";
	}
	if(trim(sex) == ""){
		alertInfo += "请选择称谓！\n";
	}
	if(matchMobile(mobile)==false ){
		alertInfo += "请输入正确的手机格式！\n";
	}
	if(matchEmail(email)==false ){
		alertInfo += "请输入正确的邮箱格式！\n";
	}
	if(trim(dealername) == ""){
		alertInfo += "请选择经销商！\n";
	}
	if(trim(cartype) == ""){
		alertInfo += "请选择车型！\n";
	}
	if(trim(buytime) == ""){
		alertInfo += "请选择意向购买时间！\n";
	}

	if(alertInfo){
		alert(alertInfo);
		isSubmit = false;
		return false;
	}else{				
		var userInfo = {		
			advid:"613",		            
			realname: name,
			sex:sex,
			mobile : mobile,
			email:email,
			expand1:dealername,
            expand2:cartype,
			expand3:buytime
		};
		//if($.cookie("webcpa").length > 0){
		//	userInfo.expand5 = "webcpa="+$.cookie("webcpa");	
		//}
		$.ajax({
				url : 'http://track.mobile1.com.cn/advmessage/adv/addResultJsonP.action',
				cache : false,
				dataType : 'jsonp',
				jsonpCallback : "eventcallback1",
				data : userInfo,
				success : function(json) {
					if (json[0].success == 1) {
						alert("提交成功！");
						isSubmit = false;
						document.getElementById("name").value = "";
						document.getElementById("mobile").value = "";
						document.getElementById("email").value = "";
						document.getElementById("sex").value = "";
						document.getElementById("dealername").value = "";
						document.getElementById("cartype").value = "";
						document.getElementById("buytime").value = "";
					} else {
						alert(json[0].info);
						isSubmit = false;
					}
				}
			});
	}
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
	

