
window.codeConsts = { 
		channelId:20,
		codes:{
			page_index_pv:10140,
			page_index_click_tedian:10141,
			page_index_click_liucheng:10142,
			page_index_click_anli:10143,
			page_index_click_baoming:10144,
			page_index_click_fuwu:10145,
			page_index_click_chanping:10146,
			
			page_tedian_click_womenhehunidejia:10147,
			page_tedian_click_shigongwuyidijiaoshui:10148,
			page_tedian_click_damojiaju:10149,
			page_tedian_click_yinianzhibao:10150,
			page_tedian_pv:10151,
			
			page_liucheng_pv:10152,
			page_liucheng_click_mianfeijiance:10153,
			page_liucheng_click_zhidingfangan:10154,
			page_liucheng_click_banyibaohu:10155,
			page_liucheng_click_wuchendamo:10156,
			page_liucheng_click_qingjieguiwei:10157,
			page_liucheng_click_yinianzhibao:10158,
			
			page_anli_pv:10159,
			page_anli_click_keting_beijing1:10160,
			page_anli_click_keting_beijing2:10161,
			page_anli_click_woshi_beijing1:10162,
			
			page_baoming_pv:10163,
			page_baoming_click_submit:10164,
			
			page_fuwu_pv:10165,
			page_fuwu_click_shaixuan:10166,
			
			page_chanping_pv:10167,
			page_chanping_click_neiqiangrujiaoqi:10168,
			page_chanping_click_waiqiangrujiaoqi:10169,
			page_chanping_click_muqiqi:10170,
			page_chanping_click_yishuqi:10171,
			
			click_to_tel:10172,
			
			click_to_index:10173
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