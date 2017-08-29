function resetPage() {
	var deviceWidth = document.documentElement.clientWidth,
	scale = deviceWidth/640;
	document.body.style.zoom = scale;
}

window.onresize = function(){
	resetPage();
}

function loadProData() {
	var proOption = "<option value=''>省</option>";
	for (var i=0;i<cityArea.citylist.length;i++) {
		proOption += "<option value='" + cityArea.citylist[i].p + "'>" + cityArea.citylist[i].p + "</option>";
	}
	$("#province").empty().append(proOption).bind('change', function() {
		if (!$(this).val()) {
			return
		}
		loadCityData($(this).find('option:selected').val());
	});
}

function loadCityData(pro) {
	var cityOption = "<option value=''>市</option>";
	for (var i=0;i<cityArea.citylist.length;i++) {
		if(cityArea.citylist[i].p == pro){
			for(var j=0;j<cityArea.citylist[i].c.length;j++){
				cityOption += "<option value='" + cityArea.citylist[i].c[j]["n"] + "'>" + cityArea.citylist[i].c[j]["n"] + "</option>";
			}
		}
	}
	$("#citys").empty().append(cityOption);
}

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
function showMsg(msg){
	alert(msg);
}
var isSubmit = false;
//ajax提交车主认证的表单
function submitForm(){
	if(isSubmit){
		showMsg("正在提交，请稍等一下吧~");
		return;
	}
	isSubmit = true;
	//track(1,4321);
	var name = trim($("#name").val()),
		mobile = trim($("#mobile").val()),
		email = trim($("#email").val()),
		cartypenow = $("#cartypenow").val(),
		cartype = $("#cartype").val(),
		buytime = $("#buytime").val(),
		carage = $("#carage").val(),
		sex = $("#sex").val(),
		jxs = $("#jxs").val(),
		alertInfo = '';
		
		
		
	if(trim(jxs) == ""){
		alertInfo = "请选择经销商！\n";
	}
    if(trim(cartype) == ""){
		alertInfo = "请选择预购车型！\n";
	}
    if(trim(cartypenow) == ""){
		alertInfo = "请输入现有车型！\n";
	}
	if(trim(buytime) == ""){
		alertInfo = "请选择预约时间！\n";
	}
	if(trim(carage) == ""){
		alertInfo = "请输入驾龄！\n";
	}
	
	if(email == ""){
		alertInfo = "请输入邮箱的手机格式！\n";
	}else if(matchEmail(email)==false ){
		alertInfo = "请输入邮箱的手机格式！\n";
	}
	
	if(mobile == ""){
		alertInfo = "请输入正确的手机格式！\n";
	}else if(matchMobile(mobile)==false ){
		alertInfo = "请输入正确的手机格式！\n";
	}
	if(name == ""){
		alertInfo = "请输入您的姓名！\n";
	}

	if(alertInfo){
		alertMsg(alertInfo);
		isSubmit = false;
		return false;
	}else{
		
		
		var userInfo = {		
			advid:"30003",		            
			realname: name,
			sex:sex,
			mobile : mobile,
			email : email,
			expand1:carage,
            expand2:buytime,
			expand3:cartypenow,
			expand4:cartype,
			expand5:jxs
		};
		$.ajax({
				url : 'http://ama.adwo.com/advmessage/adv/addResultJsonP.action',
				cache : false,
				dataType : 'jsonp',
				jsonpCallback : "eventcallback",
				data : userInfo,
				success : function(json) {
					if (json[0].success == 1) {
                        alertMsg("提交成功");
                        location.reload();
					} else {
						alertMsg(json[0].info);
						isSubmit = false;
					}
				}
			});
			
		
	}
}
function alertMsg(msg){
    alert(msg);
}
var tap_id,tap_move = false;
function tap(el,func,className){
    function tap_start(){
        tap_move = false;
        tap_id = el.id;
        if(className && !el.classList.contains(className)){
            el.classList.add(className);
        }
    }
    function tap_move(){
        tap_move = true;
        if(className && el.classList.contains(className)){
            el.classList.remove(className);
        }
    }
    function tap_end(){
        if(className && el.classList.contains(className)){
            el.classList.remove(className);
        }
        if(tap_id == el.id && !tap_move){
            if(func){
                func(el);
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return false;
    }
    el.addEventListener("touchstart",tap_start);
    el.addEventListener("touchmove",tap_move);
    el.addEventListener("touchend",tap_end);
}
