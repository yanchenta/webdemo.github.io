window.codeConsts = { 
		channelId:1,
		codes:{
			page_index_pv:10024,
			page_index_click_tdcode:10025,
			page_index_click_letusgo:10026,
			page_index_click_introduction:10027,
			page_index_bigtdcode_close:10031,
			
			page_letusgo_click:10028,
			
			page_introduction_pv:10029,
			page_introduction_toindex:10030
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