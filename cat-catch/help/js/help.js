	//实现全屏
	function resetPage() {
		var deviceWidth = document.documentElement.clientWidth;
		var scale = deviceWidth / 640;
		document.body.style.zoom = scale;
	};
	
	window.onresize = function() {
		resetPage();
	};

	window.onload = function() {
		resetPage();
		
		if(isChinese){
			track2(window.codeConsts.channelId, window.codeConsts.Codes.help_cn_page_pv);
		}
		else{
			track2(window.codeConsts.channelId, window.codeConsts.Codes.help_en_page_pv);
		}
	};
	
	var main_body = document.getElementsByClassName("main-body")[0];
	main_body.addEventListener("touchstart", function(e){
		//e.preventDefault();
		main_body.prepareInvoke = true;
	});
	main_body.onmousedown = function(){
		main_body.prepareInvoke = true;
	}
	main_body.addEventListener("touchmove", function(e){
		//e.preventDefault();
	});
	main_body.addEventListener("touchend", function(e){
		if(!main_body.prepareInvoke) return;
		//e.preventDefault();
		main_body.startX = 0;
		if(main_body.scrollLeft < 280){//靠左停下
			//alert("to left");
			btns_bottom_step1[0].onclick(); //触发方式1
		}
		else{//靠右停下
			//alert("to right");
			btns_bottom_step2[0].onclick(); //触发方式1
		}
		main_body.prepareInvoke = false;
	});
	main_body.onclick = function(){
		if(!main_body.prepareInvoke) return;
		if(main_body.scrollLeft < 280){//靠左停下
			//alert("to left");
			btns_bottom_step1[0].onclick(); //触发方式1
		}
		else{//靠右停下
			//alert("to right");
			btns_bottom_step2[0].onclick(); //触发方式1
		}
	}
	main_body.onmouseup = function(){
		if(!main_body.prepareInvoke) return;
		if(main_body.scrollLeft < 280){//靠左停下
			//alert("to left");
			btns_bottom_step1[0].onclick(); //触发方式1
		}
		else{//靠右停下
			//alert("to right");
			btns_bottom_step2[0].onclick(); //触发方式1
		}
	}
	//top button to step2(hide button to step1)
	var btns_bottom_step2 = document.getElementsByClassName("btn-bottom-step2");
	for(var i = 0; i < btns_bottom_step2.length; i++){
		btns_bottom_step2[i].onclick = function(){//触发方式2
			main_body.scrollLeft = 640;
			document.getElementById("top-buttons").className = "top-buttons-step2";
			//document.getElementById("top-buttons").onresize();
			setTimeout(function(){
				document.getElementById("bottom-buttons").style = {};
				document.getElementById("bottom-buttons").className = "bottom-buttons-step2";
			//document.getElementById("bottom-buttons").onresize();
			}, 500);
			document.body.className = "body2";
		}
	}
	var btns_top_step2 = document.getElementsByClassName("btn-top-step2");
	for(var i = 0; i < btns_top_step2.length; i++){
		btns_top_step2[i].onclick = function(){//触发方式3
			btns_bottom_step2[0].onclick();
		}
	}
	
	//top button to step1(hide button to step2)
	var btns_bottom_step1 = document.getElementsByClassName("btn-bottom-step1");
	for(var i = 0; i < btns_bottom_step1.length; i++){
		btns_bottom_step1[i].onclick = function(){//触发方式2
			main_body.scrollLeft = 0;
			document.getElementById("top-buttons").className = "top-buttons-step1";
			//document.getElementById("top-buttons").onresize();
			setTimeout(function(){
				document.getElementById("bottom-buttons").style = {};
				document.getElementById("bottom-buttons").className = "bottom-buttons-step1";
				//document.getElementById("bottom-buttons").onresize();
			}, 500);
			document.body.className = "body1";
		}
	}
	var btns_top_step1 = document.getElementsByClassName("btn-top-step1");
	for(var i = 0; i < btns_top_step1.length; i++){
		btns_top_step1[i].onclick = function(){//触发方式3
			btns_bottom_step1[0].onclick();
		}
	}
	var isChinese = !!document.getElementsByClassName("cn-lang-select-tab")[0];
	var btn_cn = document.getElementById("btn-cn-lang");
	if(!!btn_cn){
		btn_cn.onclick = function(){
			//...
			if(window.location.href.indexOf("index.html") < 0){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.help_to_cn_page_click);
				
				window.location.href = "index.html";
			}
		}
	}
	
	var btn_en = document.getElementById("btn-en-lang");
	if(!!btn_en){
		btn_en.onclick = function(){
			//...
			if(window.location.href.indexOf("index-en.html") < 0){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.help_to_en_page_click);
				
				window.location.href = "index-en.html";
			}
		}
	}