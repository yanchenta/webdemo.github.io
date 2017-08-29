
window.codeConsts = { 
		channelId:207,
		codes:{
			page_index_pv:10181,
			page_index_click_buy1:10182,
			page_index_click_share1:10183,
			page_index_click_introduction:10184,
			
			page_introduction_pv:10185,
			page_introduction_toindex:10186,
			
			page_buy1_pv:10187,
			page_buy1_click_submit:10188,
			
			page_share1_pv:10189,
			page_share1_click_sinaweibo:10190,
			page_share1_click_tencentweibo:10191,
			page_share1_click_qqzone:10192,
			page_share1_click_renren:10193,
			
			page_share2_click:10194,
			
			page_share3_pv:10195,
			page_share3_submit:10196,
			
			page_share4_pv:10197,
			page_buy2_pv:10198
		}
	};
	
	
function track2(channel, code, url){
	if(!channel || !code) return;
	//alert("channel:" + channel + ', code:' + code);
	//alert("channel:" + channel + ', codeKey:[' + getCodeKeyByValue(code) + "], url:" + url);
	
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