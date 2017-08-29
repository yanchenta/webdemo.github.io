window.codeConsts = { 
		channelId:20,
		codes:{
			page_index_pv:10322,
			page_index_click_xunjia:10323,
			page_index_click_download:10324,
			page_index_click_xunjiasubmit:10325
		}
	};
	
	
function track2(channel, code, url){
	if(!channel || !code) return;
	
	//alert("channel:" + channel + ', code:' + code);
	//alert("channel:" + channel + ', codeKey:[' + getCodeKeyByValue(code) + "], url:" + url);
	//return;
	
	if(!!url){
		track(channel, code, url);
	}
	else{
		track(channel, code);
	}
}

function getCodeKeyByValue(value){
	for(var key in window.codeConsts.codes){
		if(value === window.codeConsts.codes[key]){
			return key;
		}
	}
}