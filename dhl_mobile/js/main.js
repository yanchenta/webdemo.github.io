var app = (function(app, $){

  var currentScene = 0;

  $cache = {
    scenes: $('.page'),
	canScroll: $('body').attr('data-scroll')
  }

  function _constructor(){
    _bindEvents();
  }

  function _bindEvents(){
    $('body').swipe({
      swipe: function(event,direction) {
        if(direction == 'up') {
          slideHandle('down');
        } else if(direction == 'down') {
          slideHandle('up');
        }
      }
    });
    
    $.browserSwipe({
      up: function(){
        slideHandle('up');
      },
      down: function(){
        slideHandle('down');
      }
    });
  }

  function slideHandle(direction) {
    switch(direction) {
      case 'up':
	  	
		if(parseInt($('body').attr('data-scroll'))){
			window.scrollTo(0,0);
			if(currentScene > 0) {
			  currentScene--;
			  sceneHandle();
			  $('body').attr('data-scroll','0');
			}
		}else{
			window.scrollTo(0,0);
			$('body').attr('data-scroll','1');
		}
	  	
        
      break;
      case 'down':
	  	if(parseInt($('body').attr('data-scroll'))){
			window.scrollTo(0,0);
			if(currentScene < ($cache.scenes.length - 1)) {
			  currentScene++;
			  sceneHandle();
			   $('body').attr('data-scroll','0');
			}
		}else{
			window.scrollTo(0,scrollNum);
			$('body').attr('data-scroll','1');
		}
        
      break;
    }
  }

  function sceneHandle(){
    $cache.scenes.each(function(){
      if($(this).index() == currentScene) {
        $(this).addClass('active').removeClass('after');
      } else if($(this).index() < currentScene){
        $(this).addClass('after').removeClass('active');
      } else {
        $(this).removeClass('after').removeClass('active');
      }
    });
  }

  return _constructor;

})(window.app || {}, jQuery)

$(document).ready(function(){
  app();
});