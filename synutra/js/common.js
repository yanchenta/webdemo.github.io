function login(callbackUrl){
	//登陆
	if(window.location.href.indexOf("haha=") < 0){
		window.location.href = "my_login.html?callbackurl=" + escape(callbackUrl);//传回调url
	}
	else{
		//跳转回来的参数附带 haha = thisiscallback , 但是要判断登陆是否失败
		var uid = getParamValueFromUrl("id");
		localStorage.setItem("id", uid);//保存用户id
		var nickname = getParamValueFromUrl("nickname");
		localStorage.setItem("nickname", nickname);//保存用户昵称
		var imgurl = getParamValueFromUrl("imgurl");
		localStorage.setItem("imgurl", imgurl);//保存imgurl
		localStorage.setItem("video_videoid", "1");//表示对这个视频赞过了
	}
}
function logout(){
	//登出
	//window.location.href = "";
	//localStorage.setItem("key", "value");
	localStorage.removeItem("id");
	localStorage.removeItem("nickname");
	localStorage.removeItem("imgurl");
	
	//如果在我的精彩瞬间模块，则跳转回主页
	if(window.location.href.indexOf("my_wondful.html") >= 0
		|| window.location.href.indexOf("my_select.html") >= 0
		|| window.location.href.indexOf("my_uploadsuccess") >= 0){
		window.location.href = "index.html";
	}
}
function isLogined(){
	if(!!localStorage.getItem("id") && 
		!!localStorage.getItem("nickname") &&
		!!localStorage.removeItem("imgurl")){
		return true;
	}
	return false;
}

function getParamValueFromUrl(url, key){
	var stIdx = url.indexOf(key);
	if(stIdx < 0) return "";
	stIdx += key.length + 1;
	
	var len = url.substr(stIdx).indexOf("&");
	if(len < 0) {
		len = url.substr(stIdx).length;
	}
	
	return url.substr(stIdx, len);
}

function navEventBinding(){
	//导航事件
	document.getElementById("toindex").onclick = function(){
		if(window.location.href.indexOf("index.html") < 0){
			window.location.href = "index.html";
		}
	};
	document.getElementById("todetail").onclick = function(){
		if(window.location.href.indexOf("act_list.html") < 0){
			window.location.href = "act_list.html";
		}
	};
	document.getElementById("toalllist").onclick = function(){
		if(window.location.href.indexOf("all_wondeful.html") < 0){
			window.location.href = "all_wondeful.html";
		}
	};
	document.getElementById("tomylist").onclick = function(){
		if(window.location.href.indexOf("my_wondful.html") < 0){
			window.location.href = "my_wondful.html";
		}
	};
	document.getElementById("totmall").onclick = function(){
		//window.location.href = "";
		alert("未给定天猫店铺链接");
	};
}
navEventBinding();