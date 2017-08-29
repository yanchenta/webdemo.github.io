function showCard(str){
	if(str =='heart'){
		$('#page1').addClass('scard2');
		$('#page2').addClass('hmark2');
	}else{
		$('#page1').addClass('scard');
		$('#page2').addClass('hmark');
	}
	
	setTimeout(showDecoration,1000);
}

function showDecoration(){
	$('.cimg1,.cimg2,#ctext').fadeIn();
}

function sendInfo(){
	var mobile = $.trim($('.mobile').val());
	var name = $.trim($('.name').val());
	var reg = /^(13|14|15|18)\d{9}$$/;
	if (!mobile || !reg.test(mobile)) {
        alert("请输入正确的手机号码..."); 
        return;
    }
	if(!name){
		alert('请您输入您的姓名');
		return;
	}
	var data = {
		realname: name,
		mobile: mobile,
		expand1: userInfo,
		trophyRecordid:trophyRecordid
	}
	sendData(data);
	
}

function sendTaoBaoInfo(){
	var taoBao = $.trim($('.tname').val());
	if(!taoBao){
		alert('请您输入您的淘宝账号');
		return;
	}
	var data = {
		expand1: userInfo,
		expand2: taoBao,
		trophyRecordid:trophyRecordid
	}
	sendData(data);
}

function sendData(data){
	var url = "http://ama.adwo.com/advmessage/adv/addResultJsonP.action?advid=30031";
    $.ajax({
        url: url,
        cache: false,
        dataType : 'jsonp',
        jsonpCallback: "eventcallback4",
        data:data,
        success: function(json) {
            if (json[0].success == 1) {
				$('.pop4').show();
				document.getElementsByTagName('form')[0].reset();
				document.getElementsByTagName('form')[1].reset();
            }
			else{
				alert('提交失败');
			}
        }
    });
}

function showShareMod(){
	$('.sharepop').show();
}
function showMore(){
	$('.morepop').show();
}

function shareWeibo(str){
	var shareText = '博朗全新5系"礼赞父亲节"，助你成为梦想新老爸。参加博朗#梦想新老爸#父亲节活动，上传珍贵瞬间，记录高低起伏，赢取全新5系梦想大奖。';
	var linkUrl = "http://test.zhangkuo.net/yct/braun/";//window.location
	/*
	var imgUrl = "http://test.zhangkuo.net/ms/fjj/3/braun/images/share1.jpg";
	if(str){
		imgUrl = "http://test.zhangkuo.net/ms/fjj/3/braun/images/share2.jpg";
	}*/
	imgUrl = "http://test.zhangkuo.net/yct/braun/images/share3.jpg";
	window.location = "http://service.weibo.com/share/share.php?url=&appkey=&title=" + encodeURIComponent(shareText) + linkUrl + "&pic="+ encodeURIComponent(imgUrl) +"&ralateUid=&language=";

}
function closePop(str){
	$('.'+str).hide();
}

function resetGame(){
	$('#img1,#img2,#img3,#img4,#img5,#img6,#img11,#img12,#img13,#img14,#img15,#img16').attr('src','images/transparent.png');
	$('.pop,.pmod,.cimg1,.cimg2,#ctext').hide();
	$('.plistcon').removeClass('panimate');
	$('.shaver').removeClass('sanimate');
	$('#page1').removeClass('scard scard2');
	$('#page2').removeClass('hmark hmark2');
	$('.sub-mainbody0').show();
	
	try{
		checkAndUpdateBtnOpenClass();
	}
	catch(ex){
		
	}
}
var userInfo='';
$(function(){
	if(!localStorage.getItem('userInfo')){
		userInfo = new Date().getTime();
		localStorage.setItem('userInfo',userInfo);
	}else{
		userInfo = localStorage.getItem('userInfo');
	}

	
});
var trophyRecordid;
function beginDraw(){
	$('.pop5').show();
	var url = "http://ama.adwo.com/advmessage/trophy/awardJsonP.action?advid=30031";
    $.ajax({
        url: url,
        cache: false,
        dataType : 'jsonp',
        jsonpCallback: "eventcallback4",
        data:{
			userinfo : userInfo,
		},
        success: function(json) {
			$('.pop5').hide();
            if (json[0].success == 1&&json[0].award==1) {
				var randomNum = Math.floor(Math.random()*100)+100;
				trophyRecordid = json[0].prize.recordid;
				$('.pop2 .rnum').html(randomNum);
				$('.pop2').show();
            }
			else{
				var randomNum = Math.floor(Math.random()*10000)+10000;
				$('.pop3 .rnum').html(randomNum);
				$('.pop3').show();
			}
        }
    });
}