	//存cookie: 两个参数，一个是cookie的key，一个是value
	function setCookie(name, value, days){
		var Days = 30; //此 cookie 将被保存 30 天
		if(!!days){
			Days = days;
		}
		var exp  = new Date();    //new Date("December 31, 9998");
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		//alert(document.cookie);
	}
	
	//取cookie:
	function getCookie(name){
		var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr != null) {
			//alert(JSON.stringify(arr));
			return unescape(arr[2]);
		}
		return null;
	}
	
	//删除cookie
	function delCookie(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		if(cval != null){
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
		}
	}