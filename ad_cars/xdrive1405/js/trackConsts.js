window.codeConsts = { 
		channelId:20,
		codes:{
			page_index_pv:10038,
			page_index_click_toregistration:10039,
			page_index_click_playvideo:10040,
			page_index_click_tojoymarket:10041,
			
			page_joymarket_pv:10042,
			
			page_registration_pv:10043,
			page_registration_submit:10044
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