	//实现全屏
	function resetPage() {
		var deviceWidth = document.documentElement.clientWidth,
		scale = deviceWidth / 640;
		document.body.style.zoom = scale;
	}

	window.onresize = function() {
		resetPage();
	}
	
	try{
		resetPage();
	}
	catch(ex){}