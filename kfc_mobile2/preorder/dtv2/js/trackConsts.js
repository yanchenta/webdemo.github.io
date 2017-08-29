var channelCodes = {
	channel:{
		_163:108,//1. 163
		_banner:113,//2. Banner常规
		_dtv:174,//3. dtv
		_dtv2:175,//4. dtv2
		_ooh:176,//5. ooh
		_wifi:177,//6. wifi
		_store:178,//7. store
		_toutiao:179//8. toutiao
	},
	track_codes:{
		_163_pv:10019,//163 中间页PV
		_163_andriod_download:10020,//163 中间页-安卓下载Button
		_163_ios_download:10021,//163 中间页-IOS下载Button
		
		_banner_pv:10019,//中间页PV
		_banner_android_download:10020,//中间页-安卓下载Button
		_banner_ios_download:10021,//中间页-IOS下载Button
		
		_dtv_pv:10019,//中间页PV
		_dtv_android_download:10020,//中间页-安卓下载Button
		_dtv_ios_download:10021,//中间页-IOS下载Button
		
		_dtv2_pv:10019,//中间页PV
		_dtv2_andriod_download:10020,//中间页-安卓下载Button
		_dtv2_ios_download:10021,//中间页-IOS下载Button
		
		_ooh_pv:10019,//中间页PV
		_ooh_andriod_download:10020,//中间页-安卓下载Button
		_ooh_ios_download:10021,//中间页-IOS下载Button
		
		_wifi_pv:10019,//中间页PV
		_wifi_andriod_download:10020,//中间页-安卓下载Button
		_wifi_ios_download:10021,//中间页-IOS下载Button
		
		_store_pv:10019,//中间页PV
		_store_andriod_download:10020,//中间页-安卓下载Button
		_store_ios_download:10021,//中间页-IOS下载Button
		
		_toutiao_pv:10019,//中间页PV
		_toutiao_andriod_download:10020,//中间页-安卓下载Button
		_toutiao_ios_download:10021//中间页-IOS下载Button
	}
};
function track2(channel, code, url){
	if(!channel || !code) return;
	//alert("channel:" + channel + ', code:' + code);
	//alert("channel:" + channel + ', codeKey:[' + getCodeKeyByValue(code) + "]");
	//return;
	if(!!url){
		track(channel, code, url);
	}
	else{
		track(channel, code);
	}
}

function getCodeKeyByValue(value){
	for(var key in window.channelCodes.track_codes){
		if(value === window.channelCodes.track_codes[key]){
			return key;
		}
	}
}