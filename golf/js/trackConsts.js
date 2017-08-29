var channelCodes = {
	channel_id:1,
	track_codes:{
		page_pv:6062,//p1
		see_acti_detail:6063,//p1
		see_acti_intro_pv:6064,//p2
		see_acti_intro_click:6065,//p1, p2, p3-1, p3-2, p4
		friend_num_pv:6067,//p3-1
		friend_num_click:6066,//p1, p2, p3-1, p3-2, p4
		friend_num_submit_pv:6068,//p3-1
		kaopu_num_less_25:6069,//p3-2
		kaopu_num_25_50:6070,//p3-2
		kaopu_num_50_75:6071,//p3-2
		kaopu_num_75_100:6072,//p3-2
		date_drive_submit:6073////p4
	}
};
function track2(channelId, operCode){
	if(channelId < 0) return;
	//alert("channelId:" + channelId + "; operCode:" + operCode);
	track(channelId, operCode);
}

//p1:
//track2(channelCodes.channel_id, channelCodes.track_codes.page_pv);
//track2(channelCodes.channel_id, channelCodes.track_codes.see_acti_detail);
//track2(channelCodes.channel_id, channelCodes.track_codes.see_acti_intro_click);
//track2(channelCodes.channel_id, channelCodes.track_codes.friend_num_click);

//p2:
//track2(channelCodes.channel_id, channelCodes.track_codes.see_acti_intro_pv);
//track2(channelCodes.channel_id, channelCodes.track_codes.see_acti_intro_click);
//track2(channelCodes.channel_id, channelCodes.track_codes.friend_num_click);

//p3-1
//track2(channelCodes.channel_id, channelCodes.track_codes.friend_num_pv);
//track2(channelCodes.channel_id, channelCodes.track_codes.see_acti_intro_click);
//track2(channelCodes.channel_id, channelCodes.track_codes.friend_num_click);
//track2(channelCodes.channel_id, channelCodes.track_codes.friend_num_submit_pv);

//p3-2
//track2(channelCodes.channel_id, channelCodes.track_codes.kaopu_num_less_25);
//track2(channelCodes.channel_id, channelCodes.track_codes.kaopu_num_25_50);
//track2(channelCodes.channel_id, channelCodes.track_codes.kaopu_num_50_75);
//track2(channelCodes.channel_id, channelCodes.track_codes.kaopu_num_75_100);
//track2(channelCodes.channel_id, channelCodes.track_codes.see_acti_intro_click);
//track2(channelCodes.channel_id, channelCodes.track_codes.friend_num_click);

//p4
//track2(channelCodes.channel_id, channelCodes.track_codes.see_acti_intro_click);
//track2(channelCodes.channel_id, channelCodes.track_codes.friend_num_click);
//track2(channelCodes.channel_id, channelCodes.track_codes.date_drive_submit);
