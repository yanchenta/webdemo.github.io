var shakeNumber = 0;
var animationTimer;
var shake = false, shaked = false;
var SHAKE_THRESHOLD = 800;
var x, y, z, last_x, last_y, last_z, lastUpdate = 0;
var canShake = true;
var currentTimes,recordid,prizeName;

function addListener() {
	if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
			return true;

    } else if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", deciceOrientationHandler, false);
        return true;
    } else {
        return false;
    }
}

function removeListener() {
    if (window.DeviceMotionEvent) {
        window.removeEventListener("devicemotion", deviceMotionHandler,false);

    } else if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", deciceOrientationHandler,false);
    }
}

function deciceOrientationHandler(eventData) {
	
    var curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 100) {
        var diffTime = (curTime - lastUpdate);
        lastUpdate = curTime;
        x = eventData.alpha;
        y = eventData.beta;
        z = eventData.gamma;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 1000;
        if (speed > SHAKE_THRESHOLD) {
            shaked = true;
        } else {
            if (shaked) {
                shaked = false;
                if(canShake){
					//removeListener();
					setTimeout(setanimation, 500);
				}
                
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}

function deviceMotionHandler(eventData) {
	//alert('yaoyiyao aa');
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - lastUpdate) > 100) {
        var diffTime = (curTime - lastUpdate);
        lastUpdate = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
		
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        if (speed > SHAKE_THRESHOLD) {
            shaked = true;
        } else {
            if (shaked) {
				shaked = false;
                if(canShake){
					//removeListener();
					setTimeout(setanimation, 500);
				}
            }
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


function showCon(obj){
	var startX;
	var x;
	var hitoryX;
	var isActive;
	//mobile
	obj.addEventListener('touchstart',function(e){
		isActive = $('.change-nav').hasClass('active');
		startX = e.touches[0].pageX;
		e.preventDefault();
		
	},false);
	
	obj.addEventListener('touchmove',function(e){
		x = e.touches[0].pageX-startX;
		
		//obj.style.backgroundPosition =x + "px , 0";
		
		e.preventDefault();
	},false)
	
	obj.addEventListener('touchend',function(e){
		
		if(Math.abs(x)>10){
			
			$('.change-nav').toggleClass('active');
			changeNav();
			
		}
		
	},false)
	
	//PC
	
}
var trackNumYao = 0,trackClickBreak=0,trackNumBreak=0,trackNumJiao=0;
/**********************************************
*
*	step1
*
***********************************************/

function setanimation() {
	removeListener();
   if($('.step-1').css('display') != 'block')return;
   $('.step1-text').hide();
   $('.step1-shake').removeClass('shake-a1');
   $('.step1-shake').addClass('shake-a2');
   setTimeout(breakAgg, 800);
   if(trackNumYao !=0)return;
   trackNumYao++;
   track(channelId,4510);	//摇一摇成功
   
}

function breakAgg(){
	canShake = false;
	$('.step1-text').hide();
	$('.step1-shake').removeClass('shake-a2');
    $('.step1-shake').addClass('shake-a1');
	$('.step1-shake,.step1-cushion').fadeOut();
	$('.step1-broken-agg').fadeIn();
	setTimeout(showStep2,500);
    if(trackNumBreak !=0)return;
    trackNumBreak++;
	track(channelId,4511);	
	switch(channelId){
		case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//蛋破碎-根目录、
			_mz_mevt('110', '622');
			break;
		case 101 :						//地铁
			_mz_mevt('110', '642');
			break;
		case 102 :						//候车亭
			_mz_mevt('110', '662');
			break;
		case 103 :						//大屏幕
			_mz_mevt('110', '682');
			break;
		case 104 :						//Print
			_mz_mevt('110', '702');
			break;
		case 105 :						//店内桌贴
			_mz_mevt('110', '722');
			break;
		case 81 :						//品牌APP
			_mz_mevt('110', '742');
			break;
		case 107 :						//PCQR
			_mz_mevt('110', '762');
			break;
	} 
}


//判断是否切换再玩一次
function changeNav(){
	if($('.change-nav').hasClass('active')){
			canShake = false;
			$('.popup1').css({"right":"0","display":"none"});
			showStepEight();
			
		}else{
			$('.content').hide();
			$('.step-1').show();
			resetGamges();
		}
}

//设置为再玩一次按钮
function SetchangeNav(){
	$('.change-nav').addClass('active');
}

//初始化游戏
function resetGamges(str){
	if(str == 'shareBack'){
		$('.change-nav').removeClass('active');
		$('.step-7 > div').hide();
	}
	//step1、2
	trackNumYao = 0,trackNumBreak=0,trackNumJiao=0,trackClickBreak = 0;
	addListener();
	canShake = true;
    $('.step1-shake').addClass('shake-a1');
    $('.step1-shake').removeClass('shake-a2');
	$('.step1-broken-agg,.step-top2,.step2-egg').hide();
	$('.step-1,.step-1 .step-top,.step1-text,.step1-shake,.step1-cushion,.step-top1,.hand,.step2-arrows,.step2-text,.step2-egg1,.step2-egg1,.step3_text').show();
	
	//step3
	document.querySelector('.step3-drag0').style.webkitTransform = 'translate(0 , 0)';
	document.querySelector('.step3-drag1').style.webkitTransform = 'translate(0 , 0)';
	$('.content-container').removeClass('step3-container');
	$('.popup1').css({"right":"0","display":"none"});
	areaString='',stepFlag=false,isShowAgg=false;
	$('.step2-pan').removeClass('step2-pan-egg3');
	$('.step2-egg3').removeClass('step2-egg3-animate');
	$('#step2-egg3').removeClass('step2-egg3-img');
	removeFillingHandler(step3Pro1);
	removeFillingHandler(step3Pro);
	
	//step4
	$('.cake-bottom-fillings').hide();
	$rollCakeContainer.css('width','320px');
	$('.rolling').css({'left':'','-webkit-transform':''}).find('img').css({'left':'','-webkit-transform':''});
	$(rollingController).css('-webkit-transform','');
	$('.tip-container').show();
	rolled = false;
	removeRollingEvent();
	
	//step5
	$('#step5-pro1,#step5-pro1 .step-top,#step5-pro2,#step5-pro2 .step-top,.step-6').hide();
}

	addEventListener('load', function(){
		setTimeout(function(){ window.scrollTo(0, 1); }, 100);
	});	
var surplusWidth = 0;
window.onload = function(){
	
}
$(document).ready(function(){
	
	surplusWidth = ($('.containers').width()-$('.content-container').width())/2;
	//预加载图片
	$('img').each(function(){
		if(!$(this).attr('data-src'))return;
		var imgSrc = $(this).attr('data-src');
		$(this).attr({"src":imgSrc,"data-src":""});
	});
	if(channelId != 81){
		showNext();
	}
	
	$('.shake-a1,.step1-text').click(function(){
		breakAgg();
		if(trackClickBreak !=0)return;
			trackClickBreak++;
			track(channelId,4934);	
		});
	
	
	if (!addListener()) {
		alert("您的手机不支持摇一摇功能");
	}
	
	
	$('.h-logo').click(function(){
		$('.change-nav').removeClass('active');
		$('.content').hide();
		$('.step-1').show();
		resetGamges();
		
		
	});
	
	//step8
    myScroll = new iScroll('step8-text',{vScrollbar : false,hScrollbar : false,});
	
	//中奖名单
	winnerScroll = new iScroll('wrapper');
	$("ul.weeks").delegate("li", "click", function () {
		var $this = $(this);
		$this.parent().find("li").removeClass("current");
		$this.addClass("current");
		var number = $this.attr("id");
		number = number.substring(3, number.length);
		$("div.wrap_c").hide();
		$("div#week" + number).show();
		winnerScroll.refresh();
	});
	
	//获取中奖名单
	getMobile();
	
	var changeNavButt = document.querySelector('.change-nav');
	showCon(changeNavButt);
	
	//step7
	if(uid){
		SetchangeNav();
		$('.content').hide();
		$('.step-7').show();
		var trophyRecordid;
		$.ajax({
			url : "http://static.adwo.com/advmessage/trophy/awardJsonP.action?advid=151&userinfo="+uid,
			cache : false,
			dataType : 'jsonp',
			jsonpCallback : "eventcallback3",
			success : function(data) {
				$("#awarding").hide();
				if(data[0].success==1&&data[0].award==1&&data[0].lotterycount<=10){							
					$("#step7-2").show();
					trophyRecordid = data[0].prize.recordid;
					
					track(channelId,4525);
					switch(channelId){
						case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//中奖页面
							_mz_mevt('110', '636');
							break;
						case 101 :						//地铁
							_mz_mevt('110', '656');
							break;
						case 102 :						//候车亭
							_mz_mevt('110', '676');
							break;
						case 103 :						//大屏幕
							_mz_mevt('110', '696');
							break;
						case 104 :						//Print
							_mz_mevt('110', '716');
							break;
						case 105 :						//店内桌贴
							_mz_mevt('110', '736');
							break;
						case 81 :						//品牌APP
							_mz_mevt('110', '756');
							break;
						case 107 :						//PCQR
							_mz_mevt('110', '776');
							break;
					} 
					
				}else if(data[0].success==1&&data[0].lotterycount>10){
					$('#step7-4').show();
				}else{
					$('#step7-1').show();
					
					track(channelId,4524);
					switch(channelId){
						case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//未中奖页面
							_mz_mevt('110', '635');
							break;
						case 101 :						//地铁
							_mz_mevt('110', '655');
							break;
						case 102 :						//候车亭
							_mz_mevt('110', '675');
							break;
						case 103 :						//大屏幕
							_mz_mevt('110', '695');
							break;
						case 104 :						//Print
							_mz_mevt('110', '715');
							break;
						case 105 :						//店内桌贴
							_mz_mevt('110', '735');
							break;
						case 81 :						//品牌APP
							_mz_mevt('110', '755');
							break;
						case 107 :						//PCQR
							_mz_mevt('110', '775');
							break;
					} 
					
				}
			}
		});
		
		$("#phone-sub").live("click", function () {
			var reg = /^1[3|4|5|8][0-9]\d{8}$/;
			var phone = $("input#txtPhone").val();
			if (reg.test(phone)) {
				//手机号提交

				$.ajax({
					url : "http://static.adwo.com/advmessage/adv/addResultJsonP.action?advid=151",
					cache : false,
					dataType : 'jsonp',
					data : {
						uid : uid,
						trophyRecordid : trophyRecordid,
						mobile : phone
					},
					jsonpCallback : "eventcallback4",
					success : function(data) {
						if(data[0].success ==1){
							$('#step7-2,#step7-1').hide();
							$('#step7-3').show();
							
							track(channelId,4526);
							switch(channelId){
								case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//提交成功页面
									_mz_mevt('110', '637');
									break;
								case 101 :						//地铁
									_mz_mevt('110', '657');
									break;
								case 102 :						//候车亭
									_mz_mevt('110', '677');
									break;
								case 103 :						//大屏幕
									_mz_mevt('110', '697');
									break;
								case 104 :						//Print
									_mz_mevt('110', '717');
									break;
								case 105 :						//店内桌贴
									_mz_mevt('110', '737');
									break;
								case 81 :						//品牌APP
									_mz_mevt('110', '757');
									break;
								case 107 :						//PCQR
									_mz_mevt('110', '777');
									break;
							} 
							
						}else if(data[0].success ==3){
							alert('这个号码已经中过奖啦！');
						}else if(data[0].success ==5){
							alert('已超时，请重新抽奖');
						}else{
							alert('提交失败！');
						}
					}
				});
			} else {
				alert("请输入正确的手机号码！")
			}
		});
	}
	
	
	
});


var proNum = 0,isActiveShow = false;




function showNext(){
	setTimeout(function(){
		$('.change').show();
		hideNext();
	},3000);
}

function hideNext(){
	setTimeout(function(){
		$('.change').hide();
		showNext();
	},3000);
}

/****************************************
*
*	step2
*
*****************************************/

function showStep2(){
	$('.content').hide();
	$('.step-2').show();
	$('.step2-arrows').hide();
	//addUnfoldHandler();
	if(trackNumJiao !=0)return;
	trackNumJiao++;
	
	setTimeout(function(){
		document.querySelector('.step2-text').style.display = 'none';
		$('.hand,.step2-text').hide();
		$('.step2-egg1').fadeOut();
		$('.step2-egg2').fadeIn();
	},100);
	track(channelId,4512);	
	switch(channelId){
	case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//搅一搅-根目录、
		_mz_mevt('110', '623');
		//alert('jiaoaa');
		break;
	case 101 :						//地铁
		_mz_mevt('110', '643');
		break;
	case 102 :						//候车亭
		_mz_mevt('110', '663');
		break;
	case 103 :						//大屏幕
		_mz_mevt('110', '683');
		break;
	case 104 :						//Print
		_mz_mevt('110', '703');
		break;
	case 105 :						//店内桌贴
		_mz_mevt('110', '723');
		break;
	case 81 :						//品牌APP
		_mz_mevt('110', '743');
		break;
	case 107 :						//PCQR
		_mz_mevt('110', '763');
		break;
	} 
	setTimeout(function(){
		ShowStep2Egg3();
	},500);

}

var areaString='',stepFlag=false,isShowAgg=false;
function addUnfoldHandler(){
    var pie =document.querySelector('.step2-mark');
    pie.addEventListener('touchstart',startEvent,false);
    pie.addEventListener('touchmove',moveEvent,false);
    pie.addEventListener('touchend',endEvent,false);
    function startEvent(event) {
        event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
		document.querySelector('.step2-text').style.display = 'none';
    }
	
	function removepicListener(){
		pie.removeEventListener('touchstart',startEvent,false);
		pie.removeEventListener('touchmove',moveEvent,false);
		pie.removeEventListener('touchend',endEvent,false);
	}

    function moveEvent(event) {
        event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];
        var x = touch.pageX;
        var y = touch.pageY;
        if(areaString == '5678'){
			stepFlag = true;
			$('.hand,.step2-text').hide();
			$('.step2-egg1').fadeOut();
			$('.step2-egg2').fadeIn();
		}if(areaString ==''&&!isShowAgg){
			isShowAgg = true;
			ShowStep2Egg3();
		}
		if (x-surplusWidth > 160) {
            if (y > 235) {
				
                if (areaString.indexOf('1') > -1) {

                    areaString=areaString.replace('1', '');
                }else{
					if(!stepFlag)return;
					areaString=areaString.replace('5', '');
				}
            }else {
                if (areaString.indexOf('2') > -1) {
                    areaString=areaString.replace('2', '');

                }
				else{
					if(!stepFlag)return;
					areaString=areaString.replace('6', '');
				}
			
            }
        }else{
            if(y>235){
                if(areaString.indexOf('3')>-1){
                    areaString=areaString.replace('3','');
                }else{
					if(!stepFlag)return;
					areaString=areaString.replace('7', '');
				}
            }else{
                if(areaString.indexOf('4')>-1){
                    areaString=areaString.replace('4','');
                }else{
					if(!stepFlag)return;
					areaString=areaString.replace('8', '');
				}
            }
        }
        
    }
    function endEvent(event){
        if(areaString==''){
			removepicListener();
			if(trackNumJiao !=0)return;
			trackNumJiao++;
			track(channelId,4512);	
			switch(channelId){
			case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//搅一搅-根目录、
				_mz_mevt('110', '623');
				//alert('jiaoaa');
				break;
			case 101 :						//地铁
				_mz_mevt('110', '643');
				break;
			case 102 :						//候车亭
				_mz_mevt('110', '663');
				break;
			case 103 :						//大屏幕
				_mz_mevt('110', '683');
				break;
			case 104 :						//Print
				_mz_mevt('110', '703');
				break;
			case 105 :						//店内桌贴
				_mz_mevt('110', '723');
				break;
			case 81 :						//品牌APP
				_mz_mevt('110', '743');
				break;
			case 107 :						//PCQR
				_mz_mevt('110', '763');
				break;
			} 
			
            setTimeout(egg3AddAnimate,500);
			
        }else if(areaString!='5678'&&areaString!='12345678'&&areaString!=''){
			areaString = "12345678";
		}else if(areaString!=''&&areaString.indexOf('1')==0&&areaString.indexOf('2')==0&&areaString.indexOf('3')==0&&areaString.indexOf('4')==0){
			areaString = "5678";
		}
		
		
    }

}
function egg3AddAnimate(){
	
	$('.step2-pan').addClass('step2-pan-egg3');
	$('.step2-egg3').addClass('step2-egg3-animate');
}

function ShowStep2Egg3(){
	$('.step-top,.step2-arrows').hide();
	$('.step-top2').show();
	$('.step2-egg').fadeOut();
	$('.step2-egg3').fadeIn();
	document.getElementById("zizi").play();
	shakedEgg = false;
	$('#step2-egg3').css('-webkit-transform','rotateX(0)');
	//setTimeout(setDeviceOrientationEvent,1000);
	
	setTimeout(turnEggBegin,1000);
}

/*var shakedEgg = false,step2_x=0, step2_last_x=0,step2_lastUpdate=0;;
function setDeviceOrientationEvent() {
	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler2, false);

	} else if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", deviceMotionHandler2, false);
	}
}

function deviceMotionHandler2(eventData) {
	
	var acceleration = eventData.accelerationIncludingGravity;
	var curTime = new Date().getTime();

	if ((curTime - step2_lastUpdate) > 100) {
            var diffTime = (curTime - step2_lastUpdate);
            step2_lastUpdate = curTime;
            step2_x = acceleration.y;
			//console.log(step2_x);
            var speed = Math.abs(step2_x - step2_last_x) / diffTime * 1000;
            if (speed > 50) {
                setTimeout(turnEgg, 500);

                window.removeEventListener("devicemotion", deviceMotionHandler2, false);
            }
			//console.log(speed);
        }
	step2_last_x = step2_x;
	
}

function turnEgg(){
	if (!shakedEgg) {
            shakedEgg = true;
            turnEggBegin();
        }
}*/

function turnEggBegin(){
	//shakedEgg = true;
	//$('.step2-pan').removeClass('step2-pan-egg3')
	$('#step2-egg3').addClass('step2-egg3-img');
	setTimeout(function(){
		$('#step2-egg3').css('-webkit-transform','rotateX(-180deg)');
	},1000);
	setTimeout(showStep3,1500);
}

/**********************************************
*
*	step3
*
***********************************************/
var proIndex = 0;
var fillFilling=false;
var fillings;
var step3Pro,step3Pro1;

function showStep3(){
	$('.content').hide();
	$('.content-container').addClass('step3-container');
	$('.step-3,.popup1,.step-3 .step-top').show();
	
	step3Pro = document.querySelector('.step3-drag0');
	step3Pro1 = document.querySelector('.step3-drag1');
	addFillingHandler(step3Pro);
	addFillingHandler(step3Pro1);

	
	pageWith = $('.containers').width();
	getImgPosition();
	
	
}
//获取拖拽图片的区域
var imgLeftPosition,imgRightPosition,imgTopPosition,imgBottomPosition;
function getImgPosition(){
	imgLeftPosition = document.querySelector('.step-3').offsetLeft+document.querySelector('.step3-bigegg').offsetLeft;
	imgRightPosition = imgLeftPosition+246;
	imgTopPosition = $('.nav-bar').height()+86;
	imgBottomPosition = imgTopPosition+240;
	
} 

window.onresize = function(){
	getImgPosition();
	surplusWidth = ($('.containers').width()-$('.content-container').width())/2;
}


function removeFillingHandler(t){
	if(!t)return;
	t.removeEventListener('touchstart',startEvent,false);
	t.removeEventListener('touchmove',moveEvent,false);
	t.removeEventListener('touchend',endEvent,false);
}

function addFillingHandler(t){
	fillings = t;
	//var fillings = document.querySelectorAll('.step3-drag');
    /*for(var i=0;i<fillings.length;i++){
		t= fillings[i];
        fillings[i].addEventListener('touchstart',startEvent,false);
        fillings[i].addEventListener('touchmove',moveEvent,false);
        fillings[i].addEventListener('touchend',endEvent,false);
    }*/
	fillings.addEventListener('touchstart',startEvent,false);
	fillings.addEventListener('touchmove',moveEvent,false);
	fillings.addEventListener('touchend',endEvent,false);
	
	
    
}
var objX=0,objY=0,touch,step3StartX,step3StartY,step3X,step3Y,isHideAcitve=false;
function startEvent(event){
	event.preventDefault();
	if (!event.touches.length) return;
	fillFilling=false;
	var $t = $(this);
	$('.step3-jian').hide();
	if(!$t.parent().hasClass('active')){
		isHideAcitve = true;
		$('.step3-pro').removeClass('active');
		$t.parent().addClass('active');
		if($t.hasClass('step3-drag0')){		
			proIndex = 0;
			
		}else{								
			proIndex = 1;
		}
	}else{
		isHideAcitve = false;
	}
	currentFilling=event.currentTarget;
	touch = event.touches[0];
	step3StartX = touch.pageX;
	step3StartY = touch.pageY;
	
	if($t.hasClass('step3-drag0')){
			
			track(channelId,4513);		
			switch(channelId){
				case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//拖油条
					_mz_mevt('110', '624');
					break;
				case 101 :						//地铁
					_mz_mevt('110', '644');
					break;
				case 102 :						//候车亭
					_mz_mevt('110', '664');
					break;
				case 103 :						//大屏幕
					_mz_mevt('110', '684');
					break;
				case 104 :						//Print
					_mz_mevt('110', '704');
					break;
				case 105 :						//店内桌贴
					_mz_mevt('110', '724');
					break;
				case 81 :						//品牌APP
					_mz_mevt('110', '744');
					break;
				case 107 :						//PCQR
					_mz_mevt('110', '764');
					break;
			} 
			
		}else{			
			
			track(channelId,4514);						
			switch(channelId){
				case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//拖鸡肉
					_mz_mevt('110', '625');
					break;
				case 101 :						//地铁
					_mz_mevt('110', '645');
					break;
				case 102 :						//候车亭
					_mz_mevt('110', '665');
					break;
				case 103 :						//大屏幕
					_mz_mevt('110', '685');
					break;
				case 104 :						//Print
					_mz_mevt('110', '705');
					break;
				case 105 :						//店内桌贴
					_mz_mevt('110', '725');
					break;
				case 81 :						//品牌APP
					_mz_mevt('110', '745');
					break;
				case 107 :						//PCQR
					_mz_mevt('110', '765');
					break;
			} 
		}
}
function moveEvent(event){
	event.preventDefault();
	if (! event.touches.length) return;
	var touch = event.touches[0];
	step3X = touch.pageX;
	step3Y = touch.pageY;
	if(isHideAcitve){
		currentFilling.style.webkitTransform = 'translate(' + (step3X-step3StartX+68) + 'px, ' + (step3Y-step3StartY) + 'px)';
	}else{
		currentFilling.style.webkitTransform = 'translate(' + (step3X-step3StartX) + 'px, ' + (step3Y-step3StartY) + 'px)';
	}
	
	
}
function endEvent(){
	
	if(step3X-surplusWidth>imgLeftPosition&&step3X-surplusWidth<imgRightPosition&&step3Y>imgTopPosition&&step3Y<imgBottomPosition){
		fillBigFilling();
		document.querySelector('.popup1').style.right = '-140px';
		$('.step3_text').hide();
	}else{
		currentFilling.style.webkitTransform='';
		fillFilling=false;
		currentFilling=undefined;
		document.querySelector('.popup1').style.right = '0';
	}
	
}
//拖拽成功
function fillBigFilling(){
	//alert(step3X+'_'+step3Y)
	showStepFour();
	removeFillingHandler(step3Pro1);
	removeFillingHandler(step3Pro);
	//alert('aa');
}


/**********************************************
*
*	step4
*
***********************************************/
/**
 * Created with JetBrains WebStorm.
 * User: Tosmon
 * Date: 13-7-22
 * Time: 下午3:57
 * To change this template use File | Settings | File Templates.
 */
var proIndex=0;
var rollingController,$rollCakeContainer,rolled=false,rollStartX,rollStartY,restoreInterval,restoreIndex=1;
function showStepFour(){
	//初始化step3
	$('.popup1').hide();
	$('.content-container').removeClass('step3-container');
	document.querySelector('.step3-drag0').style.webkitTransform = 'translate(0 , 0)';
	document.querySelector('.step3-drag1').style.webkitTransform = 'translate(0 , 0)';
	removeFillingHandler(step3Pro1);
	removeFillingHandler(step3Pro);
	
	//step4开始
	rollingController= document.querySelector('.rolling-control');
    $rollCakeContainer=$('.cake-container');
    $('.content').hide();
    $('.step-4').show();
    if(typeof proIndex==="number"){
        $('.step-4').find('.cake-bottom-fillings').eq(proIndex).show();
    }
    addRollingEvent();
}
function addRollingEvent(){
    if(!rollingController)
        return;
    rollingController.addEventListener('touchstart',rollingStartHandler,false);
    rollingController.addEventListener('touchmove',rollingMoveHandler,false);
    rollingController.addEventListener('touchend',rollingEndHandler,false);

}
function removeRollingEvent(){
    if(!rollingController)
        return;
    rollingController.removeEventListener('touchstart',rollingStartHandler,false);
    rollingController.removeEventListener('touchmove',rollingMoveHandler,false);
    rollingController.removeEventListener('touchend',rollingEndHandler,false);
}
function rollingStartHandler(event){
    $('.tip-container').hide();
    event.preventDefault();
//    if (!event.touches.length) return;
//    var touch = event.touches[0];
    rollStartX = !event.touches?event.offsetX:event.touches[0].pageX;
    rollStartY = !event.touches?event.offsetY:event.touches[0].pageY;
//    rollStartX = touch.pageX;
//    rollStartY = touch.pageY;
}
function rollingMoveHandler(event){
    event.preventDefault();
//    if ( !event.touches.length) return;
//    var touch = event.touches[0];
    var x = !event.touches?event.offsetX:event.touches[0].pageX;
    var y = !event.touches?event.offsetY:event.touches[0].pageY;
    var moveX=x-rollStartX;
    if(moveX<140){
        $rollCakeContainer.css('width',320-moveX-40+"px");
        $(rollingController).css('-webkit-transform','translateX('+(moveX)+'px)');
        $('.rolling').css({'-webkit-transform':'translateX('+(moveX)+'px)'}).find('img').css('-webkit-transform','translateX('+(moveX)+'px)');
    }else{
		removeRollingEvent();
        rolled=true;
		if(proIndex == 0){
			//alert('jaa');
			track(channelId,4515);		
			switch(channelId){
				case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//卷油条
					_mz_mevt('110', '626');
					break;
				case 101 :						//地铁
					_mz_mevt('110', '646');
					break;
				case 102 :						//候车亭
					_mz_mevt('110', '666');
					break;
				case 103 :						//大屏幕
					_mz_mevt('110', '686');
					break;
				case 104 :						//Print
					_mz_mevt('110', '706');
					break;
				case 105 :						//店内桌贴
					_mz_mevt('110', '726');
					break;
				case 81 :						//品牌APP
					_mz_mevt('110', '746');
					break;
				case 107 :						//PCQR
					_mz_mevt('110', '766');
					break;
			} 
		}else{
			
			track(channelId,4516);		
			switch(channelId){
				case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//卷鸡肉
					_mz_mevt('110', '627');
					break;
				case 101 :						//地铁
					_mz_mevt('110', '647');
					break;
				case 102 :						//候车亭
					_mz_mevt('110', '667');
					break;
				case 103 :						//大屏幕
					_mz_mevt('110', '687');
					break;
				case 104 :						//Print
					_mz_mevt('110', '707');
					break;
				case 105 :						//店内桌贴
					_mz_mevt('110', '727');
					break;
				case 81 :						//品牌APP
					_mz_mevt('110', '747');
					break;
				case 107 :						//PCQR
					_mz_mevt('110', '767');
					break;
			} 
			
		}
		
		showStepFive();
		
    }
}
function rollingEndHandler(event){
    if(!rolled){
        setRestoreAnimation();
    }
}
function setRestoreAnimation(){
    restoreIndex=1;
    restoreInterval = setInterval(restoreAnimation,50);
}
function restoreAnimation(){
    var containerWidth=parseInt($rollCakeContainer.css('width').replace('px',''));
    if(containerWidth<320){
        $rollCakeContainer.css('width',(containerWidth+5)+'px');
        $('.rolling').css('-webkit-transform','translateX('+(-restoreIndex*5)+'px)').find('img').css('-webkit-transform','translateX('+(-restoreIndex*5)+'px)');
        restoreIndex++;
    }else{
        $rollCakeContainer.css('width','320px');
        $('.rolling').css({'left':'','-webkit-transform':''}).find('img').css({'left':'','-webkit-transform':''});
        $(rollingController).css('-webkit-transform','');
        clearInterval(restoreInterval);
        $('.tip-container').show();
    }
}

/**********************************************
*
*	step5
*
***********************************************/
function showStepFive(){
	$('.content').hide();
	$('.step-5').show();
	if(proIndex ==0){
		$('#step5-pro1,#step5-pro1 .step-top').show();
		//alert('aa');
		track(channelId,4517);	
		switch(channelId){
			case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					//油条诞生
				_mz_mevt('110', '628');
				break;
			case 101 :						//地铁
				_mz_mevt('110', '648');
				break;
			case 102 :						//候车亭
				_mz_mevt('110', '668');
				break;
			case 103 :						//大屏幕
				_mz_mevt('110', '688');
				break;
			case 104 :						//Print
				_mz_mevt('110', '708');
				break;
			case 105 :						//店内桌贴
				_mz_mevt('110', '728');
				break;
			case 81 :						//品牌APP
				_mz_mevt('110', '748');
				break;
			case 107 :						//PCQR
				_mz_mevt('110', '768');
				break;
		} 
		
	}else{
		$('#step5-pro2,#step5-pro2 .step-top').show();
		
		track(channelId,4518);	
		switch(channelId){
			case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					//鸡肉诞生
				_mz_mevt('110', '629');
				break;
			case 101 :						//地铁
				_mz_mevt('110', '649');
				break;
			case 102 :						//候车亭
				_mz_mevt('110', '669');
				break;
			case 103 :						//大屏幕
				_mz_mevt('110', '689');
				break;
			case 104 :						//Print
				_mz_mevt('110', '709');
				break;
			case 105 :						//店内桌贴
				_mz_mevt('110', '729');
				break;
			case 81 :						//品牌APP
				_mz_mevt('110', '749');
				break;
			case 107 :						//PCQR
				_mz_mevt('110', '769');
				break;
		} 
		
	}
	
	setTimeout(showStepSix,3500);
}

/**********************************************
*
*	step6
*
***********************************************/

function showStepSix(){
	$('.content,.show-pop').hide();
	$('.step-6').show();
	
	track(channelId,4519);	
	switch(channelId){
		case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					//尝鲜券页面
			_mz_mevt('110', '630');
			break;
		case 101 :						//地铁
			_mz_mevt('110', '650');
			break;
		case 102 :						//候车亭
			_mz_mevt('110', '670');
			break;
		case 103 :						//大屏幕
			_mz_mevt('110', '690');
			break;
		case 104 :						//Print
			_mz_mevt('110', '710');
			break;
		case 105 :						//店内桌贴
			_mz_mevt('110', '730');
			break;
		case 81 :						//品牌APP
			_mz_mevt('110', '750');
			break;
		case 107 :						//PCQR
			_mz_mevt('110', '770');
			break;
	} 
}

function showShare(){
	$(".show-pop").show();
	
	track(channelId,4520);
	switch(channelId){
		case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					//分享并抽奖button
			_mz_mevt('110', '631');
			break;
		case 101 :						//地铁
			_mz_mevt('110', '651');
			break;
		case 102 :						//候车亭
			_mz_mevt('110', '671');
			break;
		case 103 :						//大屏幕
			_mz_mevt('110', '691');
			break;
		case 104 :						//Print
			_mz_mevt('110', '711');
			break;
		case 105 :						//店内桌贴
			_mz_mevt('110', '731');
			break;
		case 81 :						//品牌APP
			_mz_mevt('110', '751');
			break;
		case 107 :						//PCQR
			_mz_mevt('110', '771');
			break;
	} 
	
}

function hideShowPop(){
	$('.show-pop').hide();
}

/**********************************************
*
*	step7
*
***********************************************/
function initArguments(p) {
    var paramString = window.location.search;
    if (paramString.indexOf("?") > -1) {
        paramString = paramString.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
        var paramObjs = JSON.parse('{"' + paramString + '"}');
        return paramObjs[p];
    }
}

var uid = initArguments('uid');
//首页PV
if(!uid){
	track(channelId,4509);
}



/**********************************************
*
*	step8、9
*
***********************************************/
function showStepEight(){
	SetchangeNav();
	$('.content').hide();
	$('.step-8').show();
	myScroll.refresh();
	
	track(channelId,4527);
	switch(channelId){
		case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					//活动详情页面
			_mz_mevt('110', '638');
			break;
		case 101 :						//地铁
			_mz_mevt('110', '658');
			break;
		case 102 :						//候车亭
			_mz_mevt('110', '678');
			break;
		case 103 :						//大屏幕
			_mz_mevt('110', '698');
			break;
		case 104 :						//Print
			_mz_mevt('110', '718');
			break;
		case 105 :						//店内桌贴
			_mz_mevt('110', '738');
			break;
		case 81 :						//品牌APP
			_mz_mevt('110', '758');
			break;
		case 107 :						//PCQR
			_mz_mevt('110', '778');
			break;
	} 
}


function getMobile(){
	$.ajax({
		url : "http://static.adwo.com/advmessage/trophy/winnerListByWeek.action?advid=151",
		cache : false,
		dataType : 'jsonp',
		jsonpCallback : "eventcallback2",
		success : function(data) {
			showMobile(data);
		}
	});
}

function showMobile(result) {
	createContent(result, "mobile");
}

function createContent(result, type) {
	var num=1;
	if (result == "") return;
	var objs =result;
	var propertyName = "";
	for (var o in objs) {
		var $container;
		switch (o) {
			case "week1":
				num = 1;
				$container = getContainer(1, type);
				propertyName = "week1"

				break;
			case "week2":
				num = 2;
				$container = getContainer(2, type);
				propertyName = "week2"
				break;
			case "week3":
				num = 3;
				$container = getContainer(3, type);
				propertyName = "week3"
				break;
			case "week4":
				num = 4;
				$container = getContainer(4, type);
				propertyName = "week4"
				break;
			case "week5":
				propertyName = 'week5';
				break;
			case "week6":
				propertyName = 'week6';
				break;
		}
		//if (propertyName == "") continue;
		var htmlContent = "";
		if (objs[propertyName].length > 0 &&propertyName !="week6" && propertyName != "week5") {
			for (var j = 0; j < objs[propertyName].length; j++) {
				htmlContent += '<li>' +objs[propertyName][j][type] + '</li>';
			}
		} else {
			htmlContent += "<li style='width:100%;line-height:100px; text-align:center; background:none;font-size:14px;font-weight:bold;'>敬请期待...</li>";
		}
		if(propertyName !="week6" && propertyName != "week5"){
			$container.append(htmlContent);
		}
		
	}
	
	winnerScroll.refresh();
	
}
function getContainer(number, type) {
	var flider = "email";
	if ("mobile" == type) flider = "phone";
	var obj = $("#week" + number).find("ul." + flider);
	return obj;
}

//显示活动详情
function showRulesMod(){
	$('.content').hide();
	$('.step-8').show();
	myScroll.refresh();
	
	track(channelId,4527);
	switch(channelId){
		case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					//活动详情页面
			_mz_mevt('110', '638');
			break;
		case 101 :						//地铁
			_mz_mevt('110', '658');
			break;
		case 102 :						//候车亭
			_mz_mevt('110', '678');
			break;
		case 103 :						//大屏幕
			_mz_mevt('110', '698');
			break;
		case 104 :						//Print
			_mz_mevt('110', '718');
			break;
		case 105 :						//店内桌贴
			_mz_mevt('110', '738');
			break;
		case 81 :						//品牌APP
			_mz_mevt('110', '758');
			break;
		case 107 :						//PCQR
			_mz_mevt('110', '778');
			break;
		
	} 
}

//显示中奖名单
function showWinnerMod(){
	$('.content').hide();
	$('.step-9').show();
	winnerScroll.refresh();
	
	track(channelId,4528);
	switch(channelId){
		case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//中奖名单页面
			_mz_mevt('110', '639');
			break;
		case 101 :						//地铁
			_mz_mevt('110', '659');
			break;
		case 102 :						//候车亭
			_mz_mevt('110', '679');
			break;
		case 103 :						//大屏幕
			_mz_mevt('110', '699');
			break;
		case 104 :						//Print
			_mz_mevt('110', '719');
			break;
		case 105 :						//店内桌贴
			_mz_mevt('110', '739');
			break;
		case 81 :						//品牌APP
			_mz_mevt('110', '759');
			break;
		case 107 :						//PCQR
			_mz_mevt('110', '779');
			break;
	} 
	
}
function closeStepPop(){
	$('.step-pop').hide();
}

function showBdjPop(str){
	$('.step-pop').show();
	
	track(channelId,4529);
	switch(channelId){
		case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						//被蛋卷海报页面
			_mz_mevt('110', '640');
			break;
		case 101 :						//地铁
			_mz_mevt('110', '660');
			break;
		case 102 :						//候车亭
			_mz_mevt('110', '680');
			break;
		case 103 :						//大屏幕
			_mz_mevt('110', '700');
			break;
		case 104 :						//Print
			_mz_mevt('110', '720');
			break;
		case 105 :						//店内桌贴
			_mz_mevt('110', '740');
			break;
		case 81 :						//品牌APP
			_mz_mevt('110', '760');
			break;
		case 107 :						//PCQR
			_mz_mevt('110', '780');
			break;
	} 
}

/*********************************************
*
*share to weibo
*
*********************************************/

function shareToBlog(type,chann) {
	var shareContent="";
	var shareContentArray = ["#KFC早餐被蛋卷# 香嫩蛋卷皮，卷起丰富美味！我不是蛋卷，我是被蛋卷！手机上做被蛋卷，还有机会赢20元手机话费哦～",'#KFC早餐被蛋卷# "蛋"当重任，格外香嫩！被蛋卷全新上市，更有限时尝鲜价哦！立即走起～',"#KFC早餐被蛋卷# 早餐被蛋卷，手机上也能做？参与互动，还有机会赢20元手机话费哦～"];
	var randomNum = Math.floor(Math.random()*3);
	shareContent = shareContentArray[randomNum]+"http://wap.kfc.com.cn/eggpancake";
	shareContent = encodeURIComponent(shareContent); 
	//alert(shareContent);
	if (type == "sina") {
		
		switch(channelId){
			case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :						
				_mz_mevt('110', '632');
				break;
			case 101 :						//地铁
				_mz_mevt('110', '652');
				break;
			case 102 :						//候车亭
				_mz_mevt('110', '672');
				break;
			case 103 :						//大屏幕
				_mz_mevt('110', '692');
				break;
			case 104 :						//Print
				_mz_mevt('110', '712');
				break;
			case 105 :						//店内桌贴
				_mz_mevt('110', '732');
				break;
			case 81 :						//品牌APP
				_mz_mevt('110', '752');
				break;
			case 107 :						//PCQR
				_mz_mevt('110', '772');
				break;
			
		} 	
		
		track(channelId,4521,"http://wap.kfc.com.cn/callback/sinacallback?content="+shareContent+"&ad=bdj&k=bdj_"+chann+"_sina&lat="+randomNum);
				
	} else if (type == "renren") {
		
		switch(channelId){
			case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					
				_mz_mevt('110', '633');
				break;
			case 101 :						//地铁
				_mz_mevt('110', '653');
				break;
			case 102 :						//候车亭
				_mz_mevt('110', '673');
				break;
			case 103 :						//大屏幕
				_mz_mevt('110', '693');
				break;
			case 104 :						//Print
				_mz_mevt('110', '713');
				break;
			case 105 :						//店内桌贴
				_mz_mevt('110', '733');
				break;
			case 81 :						//品牌APP
				_mz_mevt('110', '753');
				break;
			case 107 :						//PCQR
				_mz_mevt('110', '773');
				break;
		}
		
		track(channelId,4522,"http://wap.kfc.com.cn/callback/renrencallback?content="+shareContent+"&ad=bdj&k=bdj_"+chann+"_renren&lat="+randomNum);

	} else if (type == "qq") {
		
		
		switch(channelId){
			case 1 : case 2 : case 13 : case 14 : case 16 : case 21 : case 20 : case 99 : case 100 :					
				_mz_mevt('110', '634');
				break;
			case 101 :						//地铁
				_mz_mevt('110', '654');
				break;
			case 102 :						//候车亭
				_mz_mevt('110', '674');
				break;
			case 103 :						//大屏幕
				_mz_mevt('110', '694');
				break;
			case 104 :						//Print
				_mz_mevt('110', '714');
				break;
			case 105 :						//店内桌贴
				_mz_mevt('110', '734');
				break;
			case 81 :						//品牌APP
				_mz_mevt('110', '754');
				break;
			case 107 :						//PCQR
				_mz_mevt('110', '774');
				break;
		}
		
		track(channelId,4523,"http://wap.kfc.com.cn/callback/qqcallback?content="+shareContent+"&ad=bdj&k=bdj_"+chann+"_qq&lat="+randomNum);

	}
}