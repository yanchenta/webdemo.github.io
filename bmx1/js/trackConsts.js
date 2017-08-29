var channelCodes = {
	channel_id:1,
	track_codes:{
		page_pv:6097,//首页PV
		link_guanwang:6098,//链接官网-Click
		submit_form:6099//提交表单-Click
	}
};
function track2(channelId, operCode){
	if(channelId < 0) return;
	//alert("channelId:" + channelId + "; operCode:" + operCode);
	track(channelId, operCode);
}

