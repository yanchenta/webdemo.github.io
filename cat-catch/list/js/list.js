	//实现全屏
	function resetPage() {
		var deviceWidth = document.documentElement.clientWidth;
		var scale = deviceWidth / 640;
		document.body.style.zoom = scale;
	};
	
	window.onresize = function() {
		resetPage();
	};
	
	//顶部文字 行高50, 字体大小34
	var curImgIdx = 0;
	var details = [{
			term:5,
			title_cn:"2013获奖专利",
			title_en:"Special edition for award announcement",
			cn_src:"BIG_CATCH_2013Award_CN.jpg",
			en_src:"BIG_CATCH_2013Award_EN.jpg"
		},{
			term:4,
			title_cn:"2013BICES展出特刊",
			title_en:"BICES Special Issue",
			cn_src:"BIG_CATCH_2013BICES_CN.jpg",
			en_src:"BIG_CATCH_2013BICES_EN.jpg"
		},{
			term:3,
			title_cn:"2013年六月刊",
			title_en:"June issue of 2013",
			cn_src:"BIG_CATCH_201306_CN.jpg",
			en_src:"BIG_CATCH_201306_EN.jpg"
		},{
			term:2,
			title_cn:"2013年四月刊",
			title_en:"April issue of 2013",
			cn_src:"BIG_CATCH_201304_CN.jpg",
			en_src:"BIG_CATCH_201304_EN.jpg"
		},{
			term:1,
			title_cn:"2013年一月刊",
			title_en:"January issue of 2013",
			cn_src:"BIG_CATCH_201301_CN.jpg",
			en_src:"BIG_CATCH_201301_EN.jpg"
		}];
	
	var btn_down_cn = document.getElementsByClassName("btn-down-cn")[0];
	btn_down_cn.onclick = function(){
		if(isChinese){
			if(0 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_cn_2013award_click);
			}
			else if(1 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_cn_2013BICES_click);
			}
			else if(2 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_cn_2013june_click);
			}
			else if(3 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_cn_2013april_click);
			}
			else if(4 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_cn_2013january_click);
			}
		}
		else{
			if(0 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_cn_2013award_click);
			}
			else if(1 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_cn_2013BICES_click);
			}
			else if(2 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_cn_2013june_click);
			}
			else if(3 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_cn_2013april_click);
			}
			else if(4 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_cn_2013january_click);
			}
		}
	
		//alert("中文下载");
		var param = details[curImgIdx].cn_src;
		param = encodeURIComponent(param);
		window.location.href = "probation.html?value=" + param;
	}
	
	
	var btn_down_en = document.getElementsByClassName("btn-down-en")[0];
	btn_down_en.onclick = function(){
		if(isChinese){
			if(0 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_en_2013award_click);
			}
			else if(1 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_en_2013BICES_click);
			}
			else if(2 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_en_2013june_click);
			}
			else if(3 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_en_2013april_click);
			}
			else if(4 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_cn_page_to_en_2013january_click);
			}
			
		}
		else{
			
			if(0 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_en_2013award_click);
			}
			else if(1 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_en_2013BICES_click);
			}
			else if(2 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_en_2013june_click);
			}
			else if(3 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_en_2013april_click);
			}
			else if(4 === curImgIdx){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_en_page_to_en_2013january_click);
			}
		}
	
		//alert("en-download");
		var param = details[curImgIdx].en_src;
		param = encodeURIComponent(encodeURIComponent(param));
		window.location.href = "probation.html?value=" + param;
	}
	
	//是否为中文
	var isChinese = true;
	if("cn-lang-select-tab" === document.getElementById("btn-cn-lang").className){
		isChinese = true;
	}
	else{
		isChinese = false;
	}
	
	window.setTitle = function(){
		
		if(isChinese){
			document.getElementsByClassName("front-title")[0].innerHTML = details[curImgIdx].title_cn;
		}
		else{
			document.getElementsByClassName("front-title")[0].innerHTML = details[curImgIdx].title_en;
		}
		//alert(document.getElementsByClassName("front-title")[0].innerHTML);
	}
	//document.getElementsByClassName("front-title")[0].innerHTML = "aaaa";
	curImgIdx = 4;
	window.setTitle();
	var btn_cn = document.getElementById("btn-cn-lang");
	var btn_en = document.getElementById("btn-en-lang");
	if(isChinese){
		btn_en.onclick = function(){
			if(window.location.href.indexOf("index-en.html") < 0){
				window.location.href = "index-en.html";
			}
		}
	}
	else{
		btn_cn.onclick = function(){
			if(window.location.href.indexOf("index.html") < 0){
				window.location.href = "index.html";
			}
		}
	}