window.codeConsts = { 
		channelId:20,
		codes:{
			page_index_pv:10032,
			page_index_click_tdcode:10033,
			page_index_click_letusgo:10034,
			page_index_click_introduction:10035,
			
			page_letusgo_click:10036,
			
			page_introduction_pv:10037
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