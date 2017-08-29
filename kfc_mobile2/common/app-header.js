 window.onload = function(){
	setTimeout(function(){ window.scrollTo(0, 1); }, 100);
	
	if(isIos()){
		//ios下载
		document.querySelector('.butt2').onclick = function(){
			track(channel,4334,'https://itunes.apple.com/cn/app/ken-de-ji/id587238847?mt=8');
		};
		document.querySelector('.butt4').onclick = function(){
			track(channel,4462,' https://itunes.apple.com/cn/app/ken-ji-zhai-ji-song-guan-fang/id655012687?ls=1&mt=8');
		};
	}else{
		document.querySelector('.butt1').onclick = function(){
			track(channel,4333,'http://download.mobile1.com.cn/KFC.apk');
		};
		document.querySelector('.butt3').onclick = function(){
			track(channel,4463,'http://download.app.4008823823.com.cn/kfcmos.apk');
		};
	}
	
}

function isIos() {
	var u = navigator.userAgent.toLowerCase();

	if (u.indexOf('iphone') > -1 || u.indexOf('ipod') > -1 ) {
		return true;
	}
	return false;
}

