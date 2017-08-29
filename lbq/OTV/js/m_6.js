// JavaScript Document\

$(document).ready(function() {
	
	//返回首页
	$(".backBut6-1").click(function(){
		window.location = "m_6.html"
	})
	

	
	$(".hujiao").click(function(){
		lbReload("hotlinemiddle", "", "", "");
	
		window.location.href = "tel:400-821-5757";
	});
	$(".quxiao").click(function(){
		$(".tank").hide();
	})

		jq = jQuery;
	function pics_show(emId,delay){
	var obj=jq("#"+emId),
	con=obj.find("div.image"),
	len=con.length-1,
	lis=obj.find("div.change>i"),
	curr=0,old=-1,
	timer=null;
	var begin=false;
	function roll(curr_){
	con.css("display","none");
	if(curr_==old){return;}
	begin=true;
	curr=curr_;
	lis.removeClass("cur");
	jq(lis[curr]).addClass("cur");
	if(old>-1){
	jq(con[old]).css("z-index","0").find(">span").css("display","none");
	}
	jq(con[curr_]).find(">span").css("display","block");
	jq(con[curr_]).css({"display":"block","z-index":"9999"}).find("img").fadeIn(600,function(){
	if(old>-1){
	jq(con[old]).find("img").fadeOut("fast");
	jq(con[old]).css("display","none");
	}
	//alert(old+"|"+curr);
	old=curr;
	begin=false;
	});
	}
	function fnNext(curr_){
	var index=curr_;
	index+=1;
	if(index>len) index=0;
	return index;
	}
	function fnGo(){
	roll(fnNext(curr));
	}
	function fnPlay(){
	timer=setInterval(fnGo,delay);
	}
	function fnPause(){
	clearInterval(timer);
	}
	roll(curr);
	fnPlay();
	lis.each(function(i,li){
	jq(li).click(function(){
	if(begin){return;}
	fnPause();
	curr=i;
	roll(curr);
	fnPlay();
	})
	});
	}

	new pics_show("pics_show6",3000);
	
	//track-pv
	if(window.location.href.indexOf("m_6.html") >= 0){
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_chanping_pv);
	}
	
	//返回首页
	$(".backBut").click(function(){
		//track-back
		var url = "index.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.click_to_index, url);
		
		//window.location = "index.html";
	});
	
	
	$(".backBut2").click(function(){
		//track-tel
		track2(window.codeConsts.channelId, window.codeConsts.codes.click_to_tel);
		
		lbReload("hotlinetop", "", "", "");
		
		$(".tank").show();
	});
	
	$(".a-6-1").click(function(){
		var url = "m_6-1.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_chanping_click_neiqiangrujiaoqi, url);
		
		//window.location.href = "m_6-1.html";
	});
	$(".a-6-2").click(function(){
		var url = "m_6-2.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_chanping_click_waiqiangrujiaoqi, url);
		
		//window.location.href = "m_6-2.html";
	});
	$(".a-6-3").click(function(){
		var url = "m_6-3.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_chanping_click_muqiqi, url);
		
		//window.location.href = "m_6-3.html";
	});
	$(".a-6-4").click(function(){
		var url = "m_6-4.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_chanping_click_yishuqi, url);
		
		//window.location.href = "m_6-4.html";
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

//判断跳转路径是不是iPhone5访问
    function ismobile() {
		return true;
	 var u = navigator.userAgent.toLowerCase();
	 var h =window.screen.availHeight ;
	// var w= window.screen.availWidth;

	if (u.indexOf('iphone') > -1&&h>500) {
		return true;
	}	
	return false;
}
$(document).ready(function() {
 if (ismobile()) {	
    //  $("link").attr("href","css5/index.css");
	$("img").each(function(){
		var url = this.src;
		if (url.indexOf('images') > -1) {
				url=url.replace("images","images/iphone5");
				this.src=url;
		}
	})
 } 			
  })






















