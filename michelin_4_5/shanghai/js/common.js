	function resetPage() {
		var deviceWidth = document.documentElement.clientWidth;
		var scale = 1;
		if(deviceWidth >= 720){
			scale = deviceWidth/720;
		}
		else{
			scale = deviceWidth/640;
		}
		document.body.style.zoom = scale;
	}

	window.onresize = function(){
		resetPage();
	};
	
	
	//初始进行缩放重置
	try{
		resetPage();
	}
	catch(ex){
		
	}