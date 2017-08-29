
var imgUrl = initArguments('imgUrl');
if(!imgUrl){
	imgUrl = 't1_pro1';
}
function initArguments(p) {
    var paramString = window.location.search;
    if (paramString.indexOf("?") > -1) {
        paramString = paramString.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
        var paramObjs = JSON.parse('{"' + paramString + '"}');
        return paramObjs[p];
    }
}
var shareContent='';

//约会券页面PV
track(channel,4349);
addEventListener('load', function(){
	setTimeout(function(){ window.scrollTo(0, 1); }, 800);
});	
window.onload = function(){
	
	var ouyu = '#夜遇@KFC尚选晚餐# 33场偶遇，101次媚眼，矜持，并不是我的强项。我认输！今晚KFC尚选晚餐，一起吃饭吧！不见不散哦！点击http://wap.kfc.com.cn/dinner/index.html，获8折起约会券~';
	var friend = '#夜遇@KFC尚选晚餐# 朋友圈里天天聊，你的真容好久不见，今晚我请客，你买单，坐标选KFC尚选晚餐，嘿嘿~就这么愉快地决定了，Cheers！http://wap.kfc.com.cn/dinner/index.html，还有8折起约会券哦～';
	var one = '#夜遇@KFC尚选晚餐# 把PPT甩给明天，和老板相忘于江湖，被解放的晚餐时刻，一个人约会KFC尚选晚餐，就好！点击http://wap.kfc.com.cn/dinner/index.html，获8折起约会券~';
	var married = '#夜遇@KFC尚选晚餐# 我本浪漫，你也不乏温柔，习惯了老夫老妻的节奏，今夜来场"那些年"的浪漫回忆，点击http://wap.kfc.com.cn/dinner/index.html，获8折起约会券！一起约会KFC尚选晚餐吧！';
	
	switch(imgUrl){
		case 't1_pro1' :
			bg1();
			currentNum = 0;
			shareContent = ouyu;
			track(channel,4337);
			break;
		case 't1_pro2' :
			bg1();
			currentNum = 1;
			shareContent = ouyu;
			track(channel,4338);
			break;
		case 't1_pro3' :
			bg1();
			currentNum = 2;
			shareContent = ouyu;
			track(channel,4339);
			break;
		case 't2_pro1' :
			bg2();
			currentNum = 3;
			shareContent = friend;
			track(channel,4340);
			break;
		case 't2_pro2' :
			bg2();
			currentNum = 4;
			shareContent = friend;
			track(channel,4341);
			break;
		case 't2_pro3' :
			bg2();
			currentNum = 5;
			shareContent = friend;
			track(channel,4342);
			break;
		case 't3_pro1' :
			bg3();
			currentNum = 6;
			shareContent = one;
			track(channel,4343);
			break;
		case 't3_pro2' :
			bg3();
			currentNum = 7;
			shareContent = one;
			track(channel,4344);
			break;
		case 't3_pro3' :
			bg3();
			currentNum = 8;
			shareContent = one;
			track(channel,4345);
			break;
		case 't4_pro1' :
			bg4();
			currentNum = 9;
			shareContent = married;
			track(channel,4346);
			break;
		case 't4_pro2' :
			bg4();
			currentNum = 10;
			shareContent = married;
			track(channel,4347);
			break;
		case 't4_pro3' :
			bg4();
			currentNum = 11;
			shareContent = married;
			track(channel,4348);
			break;
	}
	
	
	if(channel == '20'){
		document.querySelector('.img').src = 'common/images/ticket/'+imgUrl+'.jpg';
	}else{
		document.querySelector('.img').src = '../../dinner/common/images/ticket/'+imgUrl+'.jpg';
	}
	
	var u = navigator.userAgent.toLowerCase();
	if(u.indexOf('537.3') > -1&&u.indexOf('chrome') > -1||u.indexOf('27.0') > -1&&u.indexOf('chrome') > -1){
		$('#btn-bc').attr({'href':'http://wap.kfc.com.cn/dinner/common/images/ticket/share'+currentNum+'.jpg','download':'ticket.jpg'});
	}
	
}

function bg1(){
	document.getElementsByTagName("html")[0].style.background = '#a29aba';
	document.getElementsByTagName("body")[0].style.background = '#a29aba';
}
function bg2(){
	document.getElementsByTagName("html")[0].style.background = '#fda99f';
	document.getElementsByTagName("body")[0].style.background = '#fda99f';
}
function bg3(){
	document.getElementsByTagName("html")[0].style.background = '#66b9d9';
	document.getElementsByTagName("body")[0].style.background = '#66b9d9';
}
function bg4(){
	document.getElementsByTagName("html")[0].style.background = '#d2967c';
	document.getElementsByTagName("body")[0].style.background = '#d2967c';
}


function openShare(){
	//晚餐-分享按钮
	track(channel,4351);
	$(".fx,.bg").css("display","block");
}
function closeShare(){
	$(".fx,.bg").css("display","none");
}

function closePopup(){
	$(".popup,.bg").css("display","none");
}


function openPopup(){
	
	//晚餐-保存按钮
	track(channel,4350);
	
	if(isIos()){
		document.querySelector('.popup1').style.display = 'block';
	}else{
		//alert('除了ios其他下载在图片');
		//window.location = document.querySelector('.img').src;
		
		document.querySelector('.popup2').style.display = 'block';
	}
}


function isIos() {
	var u = navigator.userAgent.toLowerCase();
	if (u.indexOf('iphone') > -1 || u.indexOf('ipod') > -1 || u.indexOf('ipad') > -1) {
		return true;
	}

	return false;
}
var currentNum=0;
function shareToBlog(type,chann) {
	
	
	
	shareContent = encodeURIComponent(shareContent); 
	//alert(shareContent);
	if (type == "sina") {

		track(channel,4352,"http://wap.kfc.com.cn/callback/sinacallback?content="+shareContent+"&ad=kfcd&k=kfcd_"+chann+"_sina&lat="+currentNum);

				
	} else if (type == "renren") {

			track(channel,4354,"http://wap.kfc.com.cn/callback/renrencallback?content="+shareContent+"&ad=kfcd&k=kfcd_"+chann+"_renren&lat="+currentNum);
		

	} else if (type == "tecent") {
		
		track(channel,4353,"http://wap.kfc.com.cn/callback/qqcallback?content="+shareContent+"&ad=kfcd&k=kfcd_"+chann+"_qq&lat="+currentNum);
		

	}
}