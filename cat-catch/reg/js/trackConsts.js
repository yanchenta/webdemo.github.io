
window.codeConsts = { 
		channelId:20,
		Codes:{
			help_cn_page_pv:10108,
			help_en_page_pv:10110,
			help_to_cn_page_click:10112,
			help_to_en_page_click:10113,
			
			list_to_cn_page_click:10114,
			list_to_en_page_click:10115,
			
			list_cn_page_to_cn_2013january_click:10116,
			list_cn_page_to_en_2013january_click:10117,
			list_cn_page_to_cn_2013april_click:10118,
			list_cn_page_to_en_2013april_click:10119,
			list_cn_page_to_cn_2013june_click:10120,
			list_cn_page_to_en_2013june_click:10121,
			list_cn_page_to_cn_2013BICES_click:10122,
			list_cn_page_to_en_2013BICES_click:10123,
			list_cn_page_to_cn_2013award_click:10124,
			list_cn_page_to_en_2013award_click:10125,
			
			list_en_page_to_cn_2013january_click:10126,
			list_en_page_to_en_2013january_click:10127,
			list_en_page_to_cn_2013april_click:10128,
			list_en_page_to_en_2013april_click:10129,
			list_en_page_to_cn_2013june_click:10130,
			list_en_page_to_en_2013june_click:10131,
			list_en_page_to_cn_2013BICES_click:10132,
			list_en_page_to_en_2013BICES_click:10133,
			list_en_page_to_cn_2013award_click:10134,
			list_en_page_to_en_2013award_click:10135,
			
			reg_cn_page_pv:10136,
			reg_cn_page_submit:10137,
			reg_en_page_pv:10138,
			reg_en_page_submit:10139
		}
	};
	
	//alert(window.codeConsts.Codes.list_cn_page_to_cn_2013award_click);
function track2(channel, code){
	if(!channel) return;
	//alert("channel:" + channel + ', code:' + code);
	track(channel, code);
}