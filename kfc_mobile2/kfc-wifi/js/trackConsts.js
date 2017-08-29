
window.codeConsts = { 
		channel:{
			iphone:201,
			android:202,
			ipad:203,
			unknown:-1
		},
		iphoneCodes:{
			iphone_page_pv:10087,
			iphone_lunbo_pv:10088,
			iphone_lunbo_click:10089,
			iphone_zoumadeng_pv:10090,
			iphone_zoumadeng_click:10091,
			iphone_guanfang_downloadnow:10092,
			iphone_dingcan_downloadnow:10093,
			iphone_attention_weixinclick:10094,
			iphone_attention_weiboclick:10095,
			iphone_kendeji_guanfang_click:10096
		},
		androidCodes:{
			android_page_pv:10087,
			andriod_lunbo_pv:10088,
			android_lunbo_click:10089,
			android_zoumadeng_pv:10090,
			android_zoumadeng_click:10091,
			android_guanfang_downloadnow:10092,
			android_dingcan_downloadnow:10093,
			android_attention_weixinclick:10094,
			android_attention_weiboclick:10095,
			android_kendeji_guanfang_click:10096
		},
		ipadCodes:{
			ipad_page_pv:10087,
			ipad_lunbo_pv:10088,
			ipad_lunbo_click:10089,
			ipad_zoumadeng_pv:10090,
			ipad_zoumadeng_click:10091,
			ipad_guanfang_downloadnow:10092,
			ipad_dingcan_downloadnow:10093,
			ipad_attention_weixinclick:10094,
			ipad_attention_weiboclick:10095,
			ipad_kendeji_guanfang_click:10096
		}
	};
	
	
function track2(channel, code){
	if(channel == window.codeConsts.channel.unknown) return;
	//alert("channel:" + channel + ', code:' + code);
	track(channel, code);
}