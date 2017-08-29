
if (!ismobile()) {
	//location.href = "http://kfcbreakfast.qq.com/";
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
track(channel,4173);
_mz_mevt('92', '521');

_mz_timer_start(1, 'http://mse.mbm.cn.miaozhen.com/e.gif?ae=92&n=522&rt=2');


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
var myScroll2;
$(document).ready(function() {
	var liLength = $('#wrapp li'),firstLi='',lastLi='';
	for(var i=0;i<liLength.length;i++){
		if(i==0){
			firstLi = liLength.eq(i).clone();
		}else if(i==liLength.length-1){
			lastLi = liLength.eq(i).clone();
		}
	}
	$('#wrapp ul').prepend(lastLi);
	$('#wrapp ul').append(firstLi);
	$('#wrapp ul').width($('#wrapp li').width()*$('#wrapp li').length);
    clearEvent();
    initAnimate();
    myScroll2 = new iScroll('wrapp',{
		snap: true,
		momentum: false,
		hScrollbar: false,
		onScrollEnd: function () {
			if(this.currPageX ==0){
				myScroll2.scrollToPage(3,0,0);
				
			}
			else if(this.currPageX ==4){
				myScroll2.scrollToPage(1,0,0);
			}
		}
	});
    //随机显示分享内容
	var shareConRandom = parseInt(Math.random()*3);
	myScroll2.scrollToPage(shareConRandom+1,0,0);

});

function initAnimate() {
    setTimeout(function() {
        $(".title .t").css({
            "width" : "28px",
            "height" : "28px"
        });
    }, 2000);
    
    $(".icon").each(function(index) {
        switch(index) {
            case 0:
                $(".icon-1").css({
                    'left': '88px',
                    'top': '100px',
                    'width': '14px',
                    'height': '39px'
                });
                break;
            case 1:
                $(".icon-2").css({
                    'left': '100px',
                    "top": '57px',
                    'width': '26px',
                    'height': '31px'
                });
                break;
            case 2:
                $(".icon-3").css({
                    'left': '147px',
                    'top': '41px',
                    'width': '43px',
                    'height': '14px'
                });
                break;
            case 3:
                $(".icon-4").css({
                    'left': '206px',
                    'top': '55px',
                    'width': '30px',
                    'height': '32px'
                });
                break;
            case 4:
                $(".icon-5").css({
                    'left': '234px',
                    'top': '97px',
                    'width': '12px',
                    'height': '39px'
                });
                break;
        }
    });
}

function clearEvent() {
    setTimeout(function() {
        $(".clock").removeClass("shaking");
        addEvent();
    }, 2500);
}

function addEvent() {
    setTimeout(function() {
        $(".clock").addClass("shaking");
        clearEvent();
    }, 2500);
}

function shareToBlog(type,chann) {
	var shareContent = $('#wrapp ul li').eq(myScroll2.currPageX).text();
		shareContent = shareContent+"详情点击：http://m.kfc.com.cn/breakfast/index.html";
    	shareContent = encodeURIComponent(shareContent);
    
    if (type == "sina") {
		_mz_mevt('92', '523');
		
		track(channel,4179,"http://newcms.mobile1.com.cn/callback/sinacallback?content="+shareContent+"&ad=kfcb&k=kfcb_"+chann+"_sina");

		
    } else if (type == "renren") {
		_mz_mevt('92', '525');

		track(channel,4180,"http://newcms.mobile1.com.cn/callback/renrencallback?content="+shareContent+"&ad=kfcb&k=kfcb_"+chann+"_renren");

		
	   
    } else if (type == "tecent") {
		_mz_mevt('92', '524');

		track(channel,4181,"http://newcms.mobile1.com.cn/callback/qqcallback?content="+shareContent+"&ad=kfcb&k=kfcb_"+chann+"_qq");
	
    }
}

function getText() {
    var shareTextArray = ["亲，早餐不吃，体力不支呢，KFC五好早餐不错哦，想吃的话点这里：http://m.kfc.com.cn/breakfast","咕噜咕噜咕噜……肚子又叫唤了。偶想吃KFC五好早餐，你懂的：http://m.kfc.com.cn/breakfast","人是铁饭是钢，早餐不吃饿得慌。亲，早上记得来一份KFC五好早餐：http://m.kfc.com.cn/breakfast","一份早餐，不二之选，三天不吃，四体不勤，KFC五好早餐，只要六元起：http://m.kfc.com.cn/breakfast"];
    
    return shareTextArray[Math.floor(Math.random()*(shareTextArray.length-1))];
}

function getImg() {
    var shareImgArray = ["http://m.kfc.com.cn/breakfast/common/images/breakfast_feeds-1.jpg", "http://m.kfc.com.cn/breakfast/common/images/breakfast_feeds-2.jpg", "http://m.kfc.com.cn/breakfast/common/images/breakfast_feeds-3.jpg"];
    
    return shareImgArray[Math.floor(Math.random()*(shareImgArray.length-1))];
}