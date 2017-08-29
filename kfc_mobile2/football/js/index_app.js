var mySwipe;
var elem = document.getElementById('wrapper2');
mySwipe = Swipe(elem, {
	continuous : false,
	callback: function(index, element) {
				if(index==0){
					document.querySelector('.iprev').className = 'iprev inone';
					document.querySelector('.inext').className = 'inext';
				}else if(index ==3){
					document.querySelector('.iprev').className = 'iprev';
					document.querySelector('.inext').className = 'inext inone';
				}else{
					document.querySelector('.iprev').className = 'iprev';
					document.querySelector('.inext').className = 'inext';
				}
				
		   }	
});

function isIos(){
	var u = navigator.userAgent;
	if(u.indexOf('iPhone') > -1 ||u.indexOf('iPad') > -1 ||u.indexOf('iPod') > -1){
		return true;
	}
	return false;
}
function iosDownload(){
	if(isIos()){
		_mz_mevt('164', '1633');
		track(channel,10320,'https://itunes.apple.com/us/app/ken-de-jik-qiu-ba/id871042438?l=zh&ls=1&mt=8');
	}
}

function andriodDownload(){
	if(!isIos()){
		// _mz_mevt('164', '1632');
		// track(channel,10319,androidUrl);
		window.location = androidUrl;
	}
}

function download(){
	if(isIos()){
		iosDownload();
	}else{
		andriodDownload();
	}
}

var area = document.querySelector('#ballmark'),
	text = document.querySelector('#tishi'),
	hand = document.querySelector('#hand'), 
	ball = document.querySelector('#ball');
	
var startX,moveX,startY,moveY,canTouch=true,moveLeft = false,moveRight=false;
area.ontouchstart = function(e){
	e.preventDefault();
	moveX = 0;
	moveY = 0;
	startX = e.touches[0].pageX;
	startY = e.touches[0].pageY;
	text.style.display = 'none';
	hand.style.display = 'none';
	ball.className = '';
	canTouch=true,moveLeft = false,moveRight=false;
	
}
area.ontouchmove = function(e){
	e.preventDefault();
	if(canTouch){
		moveX = e.touches[0].pageX-startX;
		moveY = e.touches[0].pageY-startY;
	}
	
	
}

area.ontouchend = function(e){
	e.preventDefault();
	if(moveY<-80&&moveX<-5){
		ball.className = 'moveleft';
		setTimeout(showPop,1500);
	}else if(moveY<-80&&moveX>5){
		ball.className = 'moveright';
		setTimeout(showPop,1500);
	}else if(moveY<-80){
		var arr = ['moveleft','moveright']
		var randomNum = parseInt(Math.floor(Math.random()*2));
		ball.className = arr[randomNum];
		setTimeout(showPop,1500);
	}
	
	
}

function showPop(){
	document.querySelector('.popmark').style.display = 'block';
	document.querySelector('#succ').style.display = 'block';
}

document.querySelector('.popmark').onclick = function(){
	this.style.display = 'none';
	document.querySelector('#succ').style.display = 'none';
}
