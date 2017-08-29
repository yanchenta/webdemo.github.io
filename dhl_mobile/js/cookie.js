//设定cookie
function setCookie(name,value,exp) {
	var LargeExpDate = new Date ();
	expires = exp?ex:exp;
	LargeExpDate.setTime(LargeExpDate.getTime() + (3600*1000*24*30));
	path = '/';
	document.cookie = name + "="+ escape (value) + ";expires=" + LargeExpDate.toGMTString()+path;
}

//获得cookie
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}
//删除cookie
function delCookie(name){
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	path = '/';
	if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+path;
}