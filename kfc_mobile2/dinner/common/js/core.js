if (!ismobile()) {
	//location.href = "http://kfcdinner.qq.com/";
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
track(channel,4217);

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
var myScroll;
function resetNavHeight(){
    var docW=document.body.clientWidth;
    var navH=(docW>320&&docW<480)?Math.floor(238/320*docW):docW>=480?357:238;
    document.querySelector('.gallery').style.height=navH+"px";
    document.querySelector('.scroll-cover').style.top=navH+"px";
    myScroll.refresh();
    myScroll.scrollToPage(myScroll.currPageX,myScroll.currPageY,0);
}
window.onload=function(){

    document.getElementsByTagName('body')[0].onresize=function(){
        resetNavHeight();
    }
	var isFirstVisit = true;
	myScroll = new iScroll('my-menu', {
		snap : true,
		momentum : false,
		vScrollbar : false,
		hScrollbar : false,
		onScrollEnd: function () {
			var h= parseInt($('.menu img').eq(myScroll.currPageX).css('height').replace(/px/,''));
			//alert(h);
			document.querySelector('.menu').style.height=h+'px';
			document.querySelector('.scroll-cover').style.height=h+'px';

			myScroll.refresh();
			document.querySelector('#indicator > li.active').className = '';
			document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
		}

	});
    resetNavHeight();
	myScroll.scrollToPage(4,0,0);
	track(channel,4226);
	var locked=false,times= 1,timer,d=0;
	function swipeEvent(direc){
		if(locked){
			return;
		}
		locked=true;
		d=direc;
		timer=setInterval(newTurn,500);
	}
	$('.wrapper').swipeLeft(function(){swipeEvent(1)});
	$('.wrapper').swipeRight(function(){swipeEvent(0)});
	$('.scroll-cover').swipeLeft(function(){swipeEvent(1)});
	$('.scroll-cover').swipeRight(function(){swipeEvent(0)});
	$('.wrapper li').live("click",function(){
		if(locked){
			return;
		}
		var direction=$(this).attr('class');
		times=1;
		if(direction.indexOf('left')>-1){
			times=parseInt(direction.replace("left-",""));
			locked=true;
			d=1;
			timer=setInterval(newTurn,500);

		}else if(direction.indexOf('right')>-1){
			times=parseInt(direction.replace("right-",""));
			locked=true;
			d=0;
			timer=setInterval(newTurn,300);
		}
	});

	function newTurn(){
		var $items=$('.wrapper li');
		var $itemChild=$items.find('a');
		var newArr=[];
		for(var i=0; i<$itemChild.length;i++){
			newArr.push($itemChild[i]);
		}
		switch (d){
			case 0: newArr.unshift(newArr[newArr.length-1]);
				newArr.pop();
				break;
			case 1:newArr.push(newArr[0]);
				newArr.shift();
				break;
		}
		$items.each(function(i,e){
			$(this).empty().append(newArr[i]);
		});
		var curr=$('.front a').attr('class');
		curr=parseInt(curr.replace("item-",""))-1;
		myScroll.scrollToPage(curr,0,0);
		if(times>1){
			times--;
		}else{
			clearInterval(timer);
			locked=false;
			switch(myScroll.currPageX){
					case 0 : 				//明星产品
						track(channel,4232);
						break;
					case 1 : 				//无肉不欢
						track(channel,4223);
						break;
					case 2 : 				//小清新
						track(channel,4224);
						break;
					case 3 : 				//中式
						track(channel,4225);
						break;
					case 4 : 				//晚餐特选
						track(channel,4226);
						break;
					case 5 : 				//西式
						track(channel,4227);
						break;
					case 6 : 				//重口味
						track(channel,4228);
						break;
					case 7 : 				//加班必备
						track(channel,4229);
						break;
					case 8 : 				//人气推荐
						track(channel,4230);
						break;
					case 9 : 				//狠有料
						track(channel,4231);
						break;
				}
		}
	}

}

function shareToBlog(type,chann) {
	var shareContent='';
	var currentNum = myScroll.currPageX;
	if(currentNum ==0){
		
	}
	var share='';
	switch(currentNum){
		case 0:
			share = '#KFC尚选晚餐#下班了，还有各种补习，劳心劳神，就让最爱的明细产品抚慰我受伤的心灵吧！';
			break;
		case 1:
			share = '#KFC尚选晚餐#被难缠Boss拖住！一而再，再而三，走不开啊走不开！扛血打怪，MT就要无肉不欢！';
			break;
		case 2:
			share = '#KFC尚选晚餐#临时抱佛脚，闭关迎考，请都别来打扰我！晚餐生活我都要小清新！';
			break;
		case 3:
			share = '#KFC尚选晚餐#老爸麻将缠身，老妈舞无止境。我无处蹭饭，饿的前胸贴后背。中式口味，让蹭饭也有家的感觉！';
			break;
		case 4:
			share = '#KFC尚选晚餐#晚餐时刻遭遇各种尴尬，你又有那些经历？晚餐特选，让晚餐更多彩！';
			break;
		case 5:
			share = '#KFC尚选晚餐#每天面条+米饭，今晚不想再吃食堂，晚餐西式选择，换个口味就换个心情！';
			break;
		case 6:
			share = '#KFC尚选晚餐#人在江湖漂，躺着也中枪！晚饭时刻，停电停水，生活远远比晚餐更加重口味！';
			break;
		case 7:
			share = '#KFC尚选晚餐#下班时间又有新任务，今天注定OT，不想吃泡面，不想啃饼干！加班必备菜单，高手锦囊立即收藏！';
			break;
		case 8:
			share = '#KFC尚选晚餐#今天我是脱力系，懒得伸手，懒得动脚，懒得和谁比懒。晚餐时刻，还是选择大家的人气推荐！';
			break;
		case 9:
			share = '#KFC尚选晚餐#飞机餐腻烦到爆，谁来拯救我一万英尺上空的肚饿？就算忙着赶飞机无暇顾及晚餐也要狠有料！';
			break;
	}
	
	shareContent = encodeURIComponent(share + 'http://wap.kfc.com.cn/dinner/'); 
	//alert(shareContent);
	if (type == "sina") {

		track(channel,4233,"http://wap.kfc.com.cn/callback/sinacallback?content="+shareContent+"&ad=kfcd&k=kfcd_"+chann+"_sina&lat="+currentNum);

				
	} else if (type == "renren") {

			track(channel,4234,"http://wap.kfc.com.cn/callback/renrencallback?content="+shareContent+"&ad=kfcd&k=kfcd_"+chann+"_renren&lat="+currentNum);
		

	} else if (type == "tecent") {
		
		track(channel,4235,"http://wap.kfc.com.cn/callback/qqcallback?content="+shareContent+"&ad=kfcd&k=kfcd_"+chann+"_qq&lat="+currentNum);
		

	}
}