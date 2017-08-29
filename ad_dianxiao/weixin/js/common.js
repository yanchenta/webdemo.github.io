var mySwipe,myScroll1,myScroll2;
$(function(){
	
	var elem = document.getElementById('mySwipe');
		mySwipe = Swipe(elem, {
		   continuous: false, 
		   callback: function(index) {
				var i = bullets.length;
			    while (i--) {
					bullets[i].className = ' ';
			    }
			    bullets[index].className = 'on';
		
			}
		   
	});
	var proCount = mySwipe.getNumSlides();
	var bullets = document.getElementById('mypoint').getElementsByTagName('li');
	
	myScroll1 = new iScroll('warpper1',{vScrollbar : false,hScrollbar : false,});
	myScroll2 = new iScroll('warpper2',{vScrollbar : false,hScrollbar : false,});
	
	$('.intro-con > h3').click(function(e){
		$(".intro-con > h3").removeClass('show');
		$(".intro-con > div").hide();
		$(this).addClass('show');
		var $t = $(this).siblings("div");
		$t.show();
		myScroll1.refresh();
		myScroll2.refresh();
	});
	
});

