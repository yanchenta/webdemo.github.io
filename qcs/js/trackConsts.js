
window.codeConsts = { 
		channelId:20,
		codes:{
			page_index_pv:10282,
			page_index_zhijie_download:10283,
			page_index_xiaomi_download:10284,
			page_index_360_download:10285,
			page_index_91_download:10286,
			page_index_anzhi_download:10287,
			page_index_yingyonghui_download:10288
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