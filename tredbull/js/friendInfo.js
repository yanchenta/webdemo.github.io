/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 14-6-12
 * Time: 上午4:35
 * To change this template use File | Settings | File Templates.
 */
/*var info="Njc0NTRGNzdBRkIxQkFGMjJDMjg3QjhFQzY1MkE1QURev7/yz/v7/";
info=info.replace(/\+/g,'!');
info=info.replace(/\\/g,'*');
info = $.base64.atob(info, true);
alert(info);*/

var uid = null;
var name = null;
var head = null;

$(function(){
	var reqObj = GetRequest();
	
	if($.cookie('userInfo')!=''  && $.cookie('userInfo')!=undefined) {
        var userInfo = eval('('+$.cookie('userInfo')+')');
        uid = userInfo.uid;
        name = userInfo.name;
		head = userInfo.head;
	}
	
	if(reqObj.tid!='' && reqObj.fwid!='' && reqObj.teamid!='' && reqObj.tid!=undefined && reqObj.fwid!=undefined && reqObj.teamid!=undefined)
	{
		
		
		//var info = decodeURI(reqObj.info);
		var info= reqObj.info;
		

			info=info.replace(/\+/g,'!');
			info=info.replace(/\//g,'*');
						
			info = $.base64.atob(info, true);
			
			var TID = reqObj.teamid;
			var TID1 = parseInt(TID[1])+1;
			TID = TID[0]+''+TID1;
			$.cookie('playInfo', '{"tid":"'+reqObj.tid+'","fwid":"'+reqObj.fwid+'","teamid":"'+reqObj.teamid+'","info":"'+info+'"}');
			$('.countryImg').children().attr('src','img/country/'+TID.toUpperCase()+'.png');
			//$.cookie('line',info);
			$.cookie('getballUserInfo',info);
			//$.cookie('infoname',infoar[1]);
			
			$.cookie('qds',TID.toUpperCase());
			//var userinfo=$.cookie('userInfo');
			//userinfo=eval('('+userinfo+')');
			//getball(reqObj.tid,reqObj.fwid,reqObj.teamid,$.base64.btoa(userinfo.uid+'~'+userinfo.name,true));
			//getball();
			//alert(infoar[0]);
		//window.location.href='friendInfo.html';
			//var info = decodeURI(reqObj.info);
			//info = $.base64.atob(info, true);
			//getball(reqObj.tid,reqObj.fwid,reqObj.teamid,info);
	}
	//alert($.cookie('getballUserInfo'));
	if($.cookie('getballUserInfo')!='' && $.cookie('getballUserInfo')!=undefined) {
    	var uif = $.cookie('getballUserInfo').toString().split('|');
	    var uifArr = uif[0].split('^');
		$('#infoname').text(uifArr[1]);
		return false;
    	/*for(var i=0; i<uif.length; i++){
    		var uifArr = uif[i].split('^');
    		if(uid!='' && uid!=undefined && uifArr[0].toString()==uid.toString()) {
    			if($.cookie('fw')==2)
        		{
    				alert($.cookie('getballUserInfo'));
        			alert('openid'+uifArr[0]);
        			alert('name'+uifArr[1]);
					alert('uid'+uid);
        		}
    			$('#infoname').text(uifArr[1]);
    			return false;
    		}
    	}*/
    }
	if($.cookie('fw')==2)
		{
		alert('info'+info);
		}
	/**/
	//$('#infoname').text($.cookie('infoname'));
});
function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
		//alert(url);   
		//?time=1403501194000&tid=1510&fwid=3884&teamid=g0&info=MTUyNjg1MTQwMF5IUuW6t!W6t3wxMDczNDAxMjAxXuW5veW5veeBrOiTneWEv3wxMzQ4NjUyNjQzXm1odHR055qEVFQ
   url = decodeURI(url);
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
	  var str = url.substr(1);
	  strs = str.split("&");
	  for(var i = 0; i < strs.length; i ++) {
		 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	  }
   }
   return theRequest;
}









/*$(function(){

 $(".firendInfo .passBtn").click(function(){
	 alert('sdf');
     window.location.href = "index.html";
 });

});*/