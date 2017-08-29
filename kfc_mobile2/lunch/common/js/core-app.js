
if (!ismobile()) {
	//location.href = "http://kfclunch.qq.com/";
}

function ismobile() {
	var u = navigator.userAgent.toLowerCase();
	if (u.indexOf('android') > -1 || u.indexOf('linux') > -1) {
		return true;
	}
	if (u.indexOf('dalvik') > -1) {
		return true;
	} 
	if (u.indexOf('iphone') > -1 || u.indexOf('ipod') > -1 || u.indexOf('ipad') > -1) {
		return true;
	}
	if (u.indexOf('windows phone') > -1 || u.indexOf('windows mobile') > -1) {
		return true;
	}
	if (u.indexOf('uc ') > -1 || u.indexOf('ucweb') > -1) {
		return true;
	}
	if (u.indexOf('qqbrowser') > -1) {
		return true;
	}
	if (u.indexOf('opera') > -1 && u.indexOf('mobi') > -1) {
		return true;
	}
	return false;
}

//首页PV
track(channel,4182);

var myScroll,myScroll2;
function initArguments(p) {
    var paramString = window.location.search;
    if (paramString.indexOf("?") > -1) {
        paramString = paramString.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
        var paramObjs = JSON.parse('{"' + paramString + '"}');
        return paramObjs[p];
    }
}

var isSuccessShare = initArguments('share');
if(isSuccessShare){
	alert('分享成功');
}

window.onload=function(){
	
	$('.pop').height(document.body.scrollHeight);
	
	myScroll = new iScroll('prode', {
		snap : true,
		momentum : false,
		vScrollbar : false,
		hScrollbar : false,
		onScrollEnd: function () {
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';

			switch(this.currPageX){
				case 0 : 				//A大图
					track(channel,4200);
					break;
				case 1 : 				//B大图
					track(channel,4201);
					break;
				case 2 : 				//AB大图
					track(channel,4202);
					break;
				case 3 : 				//C大图
					track(channel,4203);
					break;
				case 4 : 				//D大图
					track(channel,4204);
					break;
				case 5 : 				//CD大图
					track(channel,4205);
					break;
				case 6 : 				//E大图
					track(channel,4206);
					break;
				case 7 : 				//F大图
					track(channel,4207);
					break;
				case 8 : 				//G大图
					track(channel,4208);
					break;
			}
		}

	});
	
	
	
	$('#prolist a').click(function(){
		var currentPro = $(this).index();
		if(currentPro !=41){
			$('.pop').show();
			myScroll.refresh();
			//if(currentPro>4){currentPro = currentPro-1;}
			myScroll.scrollToPage(currentPro,0,0);
			switch(currentPro){
					case 0 : 				//A小图
						track(channel,4191);
						break;
					case 1 : 				//B小图
						track(channel,4192);
						break;
					case 2 : 				//AB小图
						track(channel,4193);
						break;
					case 3 : 				//C小图
						track(channel,4194);
						break;
					case 4 : 				//D小图
						track(channel,4195);
						break;
					case 5 : 				//CD小图
						track(channel,4196);
						break;
					case 6 : 				//E小图
						track(channel,4197);
						break;
					case 7 : 				//F小图
						track(channel,4198);
						break;
					case 8 : 				//G小图
						track(channel,4199);
						break;
				}
		}
	})
	
	$('.close').click(function(){
		$('.pop').hide();
	});
	
	

}
window.onresize = function(){
	$('.pop').height(document.body.scrollHeight);
}

function shareToBlog(type,chann) {
	var shareContent = encodeURIComponent($('#wrapp ul li').eq(myScroll2.currPageX).text()+'http://wap.kfc.com.cn/lunch');
	//alert(shareContent);
	if (type == "sina") {
		
		track(channel,4188,"http://wap.kfc.com.cn/callback/sinacallback?content="+shareContent+"&ad=kfcl&k=kfcl_"+chann+"_sina");
		
		
	} else if (type == "renren") {
		
		track(channel,4189,"http://wap.kfc.com.cn/callback/renrencallback?content="+shareContent+"&ad=kfcl&k=kfcl_"+chann+"_renren");
		 
		 
	} else if (type == "tecent") {
		
		track(channel,4190,"http://wap.kfc.com.cn/callback/qqcallback?content="+shareContent+"&ad=kfcl&k=kfcl_"+chann+"_qq");

		
	}
}