var date = new Date();
date.setDate(360);
$(document).ready(function(){
	if(isIos()){
		if(window.localStorage){
			if(!localStorage.isFrist){
				$('#bookmark').show();
			}
		}else{
			if (!getCookie("login")) {
				$('#bookmark').show();
				setCookie('login','yes',date);
			}
		}
		window.localStorage ? localStorage.isFrist="yes" : getCookie("login");
		
	}
	showNext();
	$('#bookmark').click(function(){
		$('#bookmark').hide();
	});
	hideBookMark();
});

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
function hideBookMark(){
	setTimeout(function(){
		$('#bookmark').hide();
	},20000);
}


function isIos() {
	var u = navigator.userAgent.toLowerCase();

	if (u.indexOf('iphone') > -1 || u.indexOf('ipod') > -1 ) {
		return true;
	}
	return false;
}