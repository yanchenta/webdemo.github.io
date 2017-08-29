var interfaceUri = 'http://static.adwo.com/callback/qqcallback?';
var netEasyInterfaceUri = 'http://go.163.com/2014/0609/redbull/expinterface.php?act=';
var sinaUri = 'http://static.adwo.com/callback/sinacallback?';
/*var callbackUrl = 'http%3A%2F%2Ftest.mhttt.com%2FRedBull%2Fwebhtml%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';
var callbackUrl2 = 'http%3A%2F%2Ftest.mhttt.com%2FRedBull%2Fwebhtml%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';
var callbackUrl3 = 'http%3A%2F%2Ftest.mhttt.com%2FRedBull%2Fwebhtml%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';
var callbackUrl4 = 'http%3A%2F%2Ftest.mhttt.com%2FRedBull%2Fwebhtml%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';*/

var callbackUrl2 = 'http%3A%2F%2Fstatic.adwo.com%2Fad%2F201406%2Fredbull%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';
var callbackUrl3= 'http%3A%2F%2Fstatic.adwo.com%2Fad%2F201406%2Fredbull%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';
var callbackUrl4 = 'http%3A%2F%2Fstatic.adwo.com%2Fad%2F201406%2Fredbull%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';
var callbackUrl = 'http%3A%2F%2Fstatic.adwo.com%2Fad%2F201406%2Fredbull%2Findex.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';

var shareCallbackUrl = 'http%3A%2F%2Fstatic.adwo.com%2Fad%2F201406%2Fredbull%2Fshare.html%3Fuid%3D%25s%26name%3D%25s%26head%3D%25s';

var pageNow = 1;
var pageCnt = 1;
var friendJsonData = null;
var friends = '';
var pagebegin = 1;
var texts = '';
var groupData = [];
var selectFriend = [];
//var pageend=1;
function qqlogin() {
    $.cookie('logintag', '');
    //alert($.cookie('jq'));
    if ($.cookie('jq') == 1) {		alert(1);
        if ($.cookie("nowPage") == 1) {			alert(2.1);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl;
        }else if ($.cookie("nowPage") == 2) {			alert(2.2);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl2;
        }else if ($.cookie("nowPage") == 3) {			alert(2.3);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl3;
        }else if ($.cookie("nowPage") == 4) {			alert(2.4);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl4;
        }else {			alert(2.5);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + shareCallbackUrl + encodeURIComponent(location.search.replace('?','&'));
        }
    } else {		alert(3);
       
        if ($.cookie("nowPage") == 1) {			alert(4.1);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl;
        }else if ($.cookie("nowPage") == 2) {			alert(4.2);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl2;
        }else if ($.cookie("nowPage") == 3) {			alert(4.3);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl3;
        }else {			alert(4.4);
            var url = interfaceUri + 'ad=redbull&tag=login&k=redbull_root_qq&callback=' + callbackUrl4;
        }
    }
	//alert(url);
    window.location.href = url;
}
//sina登陆
function sinalogin() {
	//alert($.cookie("nowPage"));
    $.cookie('logintag', 1);

    if ($.cookie('jq') == 1) {
        //var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + shareCallbackUrl;
        if ($.cookie("nowPage") == 1) {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl;
        }else if ($.cookie("nowPage") == 2) {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl2;
        }else if ($.cookie("nowPage") == 3) {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl3;
        }else if ($.cookie("nowPage") == 4) {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl4;
        }else {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + shareCallbackUrl + encodeURIComponent(location.search.replace('?','&'));
        }
    } else {
        //var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl;
        if ($.cookie("nowPage") == 1) {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl;
        }else if ($.cookie("nowPage") == 2) {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl2;
        }else if ($.cookie("nowPage") == 3) {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl3;
        }else {
            var url = sinaUri + 'ad=redbull&tag=login&k=redbull_root_sina&callback=' + callbackUrl4;
        }
    }
//alert(url);
    window.location.href = url;

}
function friendList(uid) {
    //alert(2);
    $.ajaxSettings.async = false;
    if ($.cookie('logintag') == 1 || $.cookie('logintag') == '1') {
        var url = sinaUri + 'ad=redbull&tag=getfriends&k=redbull_root_sina&uid=' + uid;
    }
    else {

        var url = interfaceUri + 'ad=redbull&tag=getfriends&k=redbull_root_qq&uid=' + uid;
    }

    $.getJSON(url, {}, function (data) {
      //  var data = '{"code":1,"info":[{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong1","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong2","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong3","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong4","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong5","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong6","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong7","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong8","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong9","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong10","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong11","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong12","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong513","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong515","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong514","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong516","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong517","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong518","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong519","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong520","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong521","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong522","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong523","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong524","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong525","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong526","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong527","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong528","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong529","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong1","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong2","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong3","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"285B72E6253C40BFF0B1CCE16779DCB5","name":"MHThudong4","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong5","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong6","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong7","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong8","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong9","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong10","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong11","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong12","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong513","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong515","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong514","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong516","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong517","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong518","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong519","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong520","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong521","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong522","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong523","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong524","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong525","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong526","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong527","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong528","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong529","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"},{"uid":"11","name":"MHThudong531","nick":"MHT%E4%BA%92%E5%8A%A8","head":"http://app.qlogo.cn/mbloghead/879c67adf30a2b29e2f4/50","sex":"m"}]}';

       // data = eval('('+data+')');

        $('.username').html(name);
        if (data.code == 1) {
            friendJsonData = data.info;
            pageCnt = Math.ceil(parseInt(friendJsonData.length) / 4);

            showPageList(1);
            showPageNumList(0, 1);
        }


        return false;
    });
}

$(function () {
    $('.arrow_l').click(function () {
        if (pageNow == 1)
            return false;
        showPageNumList(1, pageNow);
        $(".f_item").each(function () {
            $(this).click(function () {
                //alert($(this).find(".fselect").attr('class'));

                selectFriends($(this));
                // $(this).find(".fselect").toggleClass("fselected");
            });
        });
    });

    $('.arrow_r').click(function () {
        if (pageNow == pageCnt - 7 + 1)
            return false;
        showPageNumList(2, pageNow);
        $(".f_item").each(function () {
            $(this).click(function () {
                //alert($(this).find(".fselect").attr('class'));

                selectFriends($(this));

            });
        });
    });
});
function selectFriends(obj) {
    if (cId == '182' || cId == 'limei') {
        var oclick = "开始传球";

        limei("click", oclick);
    }
    var hasSelected = false;
    if (obj.find(".fselect").is(".fselected")) {
        hasSelected = true;
        obj.find(".fselect").removeClass('fselected');
        var rel = obj.find(".fselect").next().attr('rel');
        var replaceStr = '@' + obj.find(".fselect").next().attr('tag');
       
        if ($.inArray(rel.toString(), selectFriend) != -1) {
            selectFriend.splice($.inArray(rel.toString(), selectFriend), 1);
            selectFriend.sort();
            texts = texts.replace(replaceStr, '');
            texts = texts.replace(/\s+/g, ' ');
            //alert(rel+'?'+selectFriend.length);
            //alert(selectFriend);
        }
    } else {
        if (friends == '') {

            friends = obj.find(".fselect").next().attr('data') + '^' + obj.find(".fselect").next().html();
            if (selectFriend.length < 5 && !obj.find(".fselect").is(".fselected")) {
                selectFriend.push(obj.find(".fselect").next().attr('rel'));

                texts += texts ? ' @' + obj.find(".fselect").next().attr('tag') : ' @' + obj.find(".fselect").next().attr('tag');
                if (!hasSelected) obj.find(".fselect").toggleClass("fselected");
            }
            else if (!obj.find(".fselect").is(".fselected")) {
                alert("只能@五位好友");

            }
        } else {
            friends += '|' + obj.find(".fselect").next().attr('data') + '^' + obj.find(".fselect").next().html();

            if (selectFriend.length < 5 && !obj.find(".fselect").is(".fselected")) {

                selectFriend.push(obj.find(".fselect").next().attr('rel'));

                texts += texts ? ' @' + obj.find(".fselect").next().attr('tag') : ' @' + obj.find(".fselect").next().attr('tag');
                if (!hasSelected) obj.find(".fselect").toggleClass("fselected");
            } else if (!obj.find(".fselect").is(".fselected")) {
                alert("只能@五位好友");

            }

        }
    }
    if($.cookie('fw')==2)
    	{
    		alert(texts);
    		alert(friends);
    	}
    /*if($.cookie('logintag')!=1 || $.cookie('logintag')!='1')
    {
    	 texts = texts.replace('@',' ');
    }
    else{*/
    	texts = texts.replace('@', ' @');
   // }
    texts = $.trim(texts);
    
    $.cookie('texa', texts);
    //alert(friends);
    //alert(texts);
}
function showPageNumList(swa, page) {
    var data = friendJsonData;
    if (data == null) return false;
    if (swa == 1) {//L
        if (page > 1) {
            var showPage = parseInt($('.pageNumB').html());
            if (showPage > 1) showPage -= 1;

            var start = page - 1;
            pageNow = showPage;
            var end = 7 + start;
            if (end > pageCnt) end = pageCnt;
            //start=end-start;
            showPageList(showPage);
        }
    } else if (swa == 2) {//R
        if (page <= pageCnt) {
            var showPage = parseInt($('.pageNumB').html());
            if (showPage < pageCnt) showPage += 1;

            var start = page + 1;
            pageNow = showPage;
            var end = 7 + start;
            if (end > pageCnt) end = pageCnt;
            showPageList(showPage);
        }
    } else {//第1页
        var start = 1;
        pageNow = start;
        var end = 7;
        if (end > pageCnt) end = pageCnt;
        showPageList(start);
    }
    $('.pageNum').html('');
    var pageStr = '<table><tbody><tr>';
    for (var i = start; i <= end; i++) {
        if (i == pageNow) {
            pageStr += '<td valign="middle" align="center"><a href="javascript:;" onclick="selectPage(' + i + ')"><p class="num num' + i + ' pageNumB">' + i + '</p></a></td>';
        } else {
            pageStr += '<td valign="middle" align="center"><a href="javascript:;" onclick="selectPage(' + i + ')"><p class="num num' + i + ' pageNumR">' + i + '</p></a></td>';
        }
    }
    pageStr += '</tr></tbody></table>';
    $('.pageNum').html(pageStr);
}
function selectPage(page) {
    //pageNow = page;
    showPageList(page);
    $('.pageNum').find('.num').removeClass('pageNumB').addClass('pageNumR');
    $('.pageNum').find('.num' + page).removeClass('pageNumR').addClass('pageNumB');
    $(".f_item").each(function () {
        $(this).click(function () {
            //alert($(this).find(".fselect").attr('class'));

            selectFriends($(this));
            // $(this).find(".fselect").toggleClass("fselected");
        });
    });
}
function showPageList(page) {
    var data = friendJsonData;
    if (data == null) return false;
    var recordCnt = data.length;
    var start = (page - 1) * 4;
    var end = start + 4;
    if (end > recordCnt) {
        end = recordCnt;
    }
    $('.f_list').html('');
    for (var i = start; i < end; i++) {
        //alert(jQuery.inArray(i,selectFriend));return;
        if ($.inArray(i.toString(), selectFriend) != -1) {
            var charstxt = ' fselected';
        } else {
            var charstxt = '';
        }
        if ($.cookie('logintag') == 1 || $.cookie('logintag') == '1') {
            var str = ' <section class="f_item f1">' +
                '<section class="photo">' +
                '    <img src="' + data[i].head + '" alt="" width="100%" height="100%"/>' +
                '</section>' +
                '<section class="fselect' + charstxt + '"></section>' +
                '<section class="fname" data="' + data[i].uid + '" rel="' + i + '" tag="'+decodeURIComponent(data[i].name)+'">' + decodeURIComponent(data[i].name) + '</section>' +
                '</section>';

        } else {

            var str = ' <section class="f_item f1">' +
                '<section class="photo">' +
                '    <img src="' + data[i].head + '" alt="" width="100%" height="100%"/>' +
                '</section>' +
                '<section class="fselect' + charstxt + '"></section>' +
                '<section class="fname" data="' + data[i].uid + '" rel="' + i + '" tag="'+decodeURIComponent(data[i].name)+'">' + decodeURIComponent(data[i].nick) + '</section>' +
                '</section>';
        }
        $('.f_list').append(str);
    }
}

function qqshare(txt, nk) {
    //alert(interfaceUri + 'ad=redbull&tag=share&k=redbull_root_qq&content=' + encodeURI(txt) + '&log=');
    //return ;
    $.ajaxSettings.async = false;
    if ($.cookie('logintag') == 1 || $.cookie('logintag') == '1') {
        var url = sinaUri + 'ad=redbull&tag=share&k=redbull_root_sina&content=' + encodeURIComponent(txt) + nk + '&log=';
    }
    else {

        var url = interfaceUri + 'ad=redbull&tag=share&k=redbull_root_qq&content=' + encodeURIComponent(txt) + nk + '&log=';

    }
    $.get(url, {}, function (data) {
        data = eval('(' + data + ')');
        if (data.code != '1' && data.code != 1) {
            //alert("分享失败");
        }
        if ($.cookie('fw') == 2) {
            alert('code' + data.code);
        }
        // return false;
    });
}

function netEasyLogin(uid, name, photo, plant) {
    var url = netEasyInterfaceUri + 'waplogin';
    photo = photo == '' ? 'http://test.mhttt.com/RedBull/webhtml/img/f_userP.png' : photo;
    var postData = 'nickname=' + encodeURI(name) + '&name=' + encodeURI(name) + '&openid=' + uid + '&photo=' + encodeURI(photo) + '&source=' + $.cookie('cId') + '&auth=' + plant;
    $.ajax({
        type: "get",
        async: false,
        url: url,
        data: postData,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (data) {
            if (data.retCode == 200) {
                openid = data.retData;
                $.cookie('openid', openid);

            }
            return false;
        }
    });
}

function getallcountry() {
    //alert('222');
    var url = netEasyInterfaceUri + 'getallcountry';
    $.ajax({
        type: "get",
        async: true,
        url: url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (data) {
            // alert(data);
//			for(var i=0; i<data.length; i++) { 
//				alert(data[i].name);return;
//			}
            groupData = data;
            getCountryGroup(0);
        }
    });
}

function getCountryGroup(index) {
    if (groupData.length == 0) return false;
    data = groupData;
    if (index == 0 || index == 1 || index == 2 || index == 3 || index == 4 || index == 5 || index == 6 || index == 7) {
        for (var j = 0; j < 4; j++) {
            //alert('dsf');
            //return false;
            $(".c" + (j + 1)).find(".name").html(data[j + 4 * index].name);
            $(".c" + (j + 1)).find(".num").html(data[j + 4 * index].num);
        }
    }
}
function selectFriendPage() {
    $("#GifFriend").attr("src", $("#teamGif").attr("src"));

    $(".team").animate({opacity: 0}, 500, function () {
        $(this).addClass("Dn");
        $(".friend").removeClass("Dn").animate({opacity: 1});
    });

}
function addteam(teamID, uid) {
    if ($.cookie('cIdid') == '182' || $.cookie('cIdid') == 'limei') {
//        var form = teamID;
        var submit = teamID+","+uid;

        limei("submit", submit);
    }
    var url = netEasyInterfaceUri + 'addteam';
    // alert('teamID=' + teamID + '&uid=' + $.cookie('openid') + '&openid=' + uid + '&source=adwo');
    //return;
    $.ajax({
        type: "get",
        async: false,
        url: url,
        data: 'teamID=' + teamID + '&uid=' + $.cookie('openid') + '&openid=' + uid + '&source=' + $.cookie('cId'),
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (data) {
            //alert(data.retCode+"code");
            // alert(data.retData.tid);
            if (data.retCode == 200) {
                $.cookie('tid', data.retData.tid);
                $.cookie('teamid', data.retData.teamID);
                $.cookie('wid', data.retData.wid);
               // positioning(data.retData.wid, data.retData.tid);
                selectFriendPage();
            }
            else if (data.retCode == 301) {
                $.cookie('tid', data.retData.tid);
                $.cookie('wid', data.retData.wid);
                $.cookie('teamid', data.retData.teamID);
                selectFriendPage();
                //positioning(data.retData.wid,data.retData.tid);
            }
            else if (data.retCode == 401) {
                alert('你已经创建了一支球队！\n并发起了第一脚球！');

                //$(".team .passBtn").unbind();
                //return false;
                //$.cookie('type','1');
                //$.cookie('wid',data.retData.wid);
                //positioning(data.retData.wid,data.retData.tid);
            }
            else {
                //		selectFriendPage();
            }
        }
    });
}
//fw的定位接口球队创建后调用传入球队的tid即可
function positioning(id, tid) {
    //alert($.cookie('lng'));
    //return;
    var url = 'http://go.163.com/2014/0609/redbull/expinterface.php?act=addlocation';
    // photo = photo == '' ? 'http://test.mhttt.com/RedBull/webhtml/img/f_userP.png' : photo;
    var postData = 'tid=' + tid + '&wid=' + id + '&longitude=' + $.cookie('lng') + '&latitude=' + $.cookie('lat');
    if($.cookie('fw')==2)
    	{
    		alert('addlocation'+postData);
    	}
    //alert(postData);
    // return;
    $.ajax({
        type: "get",
        async: false,
        url: url,
        data: postData,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (data) {
            if (data.retCode == '200') {
                //alert('定位成功');
            }
            if($.cookie('fw')==2)
        	{
        		alert(data.retCode);
        	}
            // if (data.retCode == '403') {
            //    alert('定位失败请稍后重试');
            //    return false;
            //  }
            // return false;
        }
    });
}
//fw的排行榜接口点击球员通过取得的球队ID获取当前球员的位置信息需要传入排行榜第一个接口取得的TID来获取

function paihang(tid) {
    if (cId == '182' || cId == 'limei') {
        var oclick = tid;

        limei("click", oclick);
    }
    var url = 'http://go.163.com/2014/0609/redbull/expinterface.php?act= getrankdata';
    // photo = photo == '' ? 'http://test.mhttt.com/RedBull/webhtml/img/f_userP.png' : photo;
    var postData = 'tid=' + tid;
    $.ajax({
        type: "get",
        async: false,
        url: url,
        data: postData,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (data) {
            $.cookie("latp", data[0].latitude);
            $.cookie("lngp", data[0].longitude);
            //if (data.retCode == '200') {
            //    openid = data.retData;
            // }
            //return false;
            $.cookie("tids", tid);
            window.location.href = 'myborder.html';
        }
    });
}
function playball() {
    if (cId == '182' || cId == 'limei') {
        var oclick = "开始传球";

        limei("click", oclick);
    }
    if ($.cookie('jq') == 1 || $.cookie('jq') == '1') {
        var playInfo = eval('(' + $.cookie('playInfo') + ')');
        tid = playInfo.tid;
        fwid = playInfo.fwid;
        teamid = playInfo.teamid;
        info = playInfo.info;
        /*if($.cookie('line')!='' && $.cookie('line')!=undefined) 
         {
         var line = $.cookie('line')+'|'+friends;
         } else {
         var line = friends;
         }*/
        line = friends;
        //line=$.base64.btoa(line,true);
        //line=line.replace(/\+/g,'!');
        //line=line.replace(/\\/g,'*');
        //line=line.replace(/=/g,'');
        if ($.cookie('fw') == 2) {
            alert(tid + fwid + teamid + line);
        }
        getball(tid, fwid, teamid, line);
        return;
    }
    positioning($.cookie('wid'),$.cookie('tid'));
    var url = netEasyInterfaceUri + 'playball';
    // photo = photo == '' ? 'http://test.mhttt.com/RedBull/webhtml/img/f_userP.png' : photo;
    //alert(friends);
    /* if($.cookie('line')!='' && $.cookie('line')!=undefined) {
     var line = $.cookie('line')+'|'+friends;
     } else {
     var line = friends;
     }*/
    var line = friends;
    var lng = $.cookie('lng').toString();
    var lat = $.cookie('lat').toString();
    var postData = 'tid=' + $.cookie('tid') + '&wid=' + $.cookie('wid') + '&teamID=' + $.cookie('teamid') + '&userinfo=' + line + '&uid=' + $.cookie('openid') + '&openid=' + uid + '&source=' + $.cookie('cId') + '&longitude=' + lng + '&latitude=' + lat;
    if ($.cookie('fw') == 2) {
        alert('playball' + postData);
        alert(lng);
        alert(lat);
    }
    //var line += uid+'~'+name;


    // alert(postData);
    //return;
    $.ajax({
        type: "get",
        async: false,
        url: url,
        data: postData,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",

        success: function (data) {
            //alert(data.retCode);
            //return;
            //$.cookie("latp", data[0].latitude);
            //$.cookie("lngp", data[0].longitude);
        	if($.cookie('fw')==2)
        		{
        			alert(data.retCode);
        		}
            //if (data.retCode == '200' || data.retCode == 200) {
                // if($.cookie('infoname')!='' && $.cookie('infoname')!=undefined)
                //	{
                //alert('和红牛一起#挑战无止境边界由我定#长传突破后凌空传球给你！帮TA传球，并继续邀请你的好友一起来玩儿，扩大传球队伍，还有机会获得能量大礼！还等什么？传起来吧！ http://go.163.com/2014/0609/redbull/friendsapi.php?time='+Date.parse(new Date())+'&tid='+$.cookie('tid')+'&fwid='+$.cookie('wid')+'&teamid='+$.cookie('teamid')+'&info='+$.base64.btoa(line,true));
                var des = Date.parse(new Date());
                var des = des.toString();
                var qtid = $.cookie('tid').toString();
                var qfwids = data.retData.userinfo[0][2];
                var qfwid=qfwids.toString();
                var qteamid = $.cookie('teamid').toString();
               var jqplant=$.cookie('logintag');
                if($.cookie('logintag')!=1)
                	{
                	 jqplant=2;
                	}
                jqplant=jqplant.toString();
                var linkss = 'http://go.163.com/2014/0609/redbull/friendsapi.php?time=' + des + '&tid=' + qtid + '&fwid=' + qfwid + '&teamid=' + qteamid + '&jqplant='+jqplant+'&info=';
                if ($.cookie('fw') == 2) {
                    alert('paly和红牛一起#挑战无止境 边界由我定#进攻的号角已经吹响了！这个世界杯谁是冠军？快来组建自己的团队，邀请好友，接球，传球，只要你有能量，冠军非你莫属！ ' + $.cookie('texa') + ' ' + linkss + line);
                }
                var userInfo = eval('(' + $.cookie('userInfo') + ')');
                uid = userInfo.uid;
                name = userInfo.name;
                head = userInfo.head;
                var lines=uid+'^'+name;
                var hehe = $.base64.btoa(lines, true);
                hehe = hehe.replace(/\+/g, '!');
                hehe = hehe.replace(/\//g, '*');
                hehe = hehe.replace(/\=/g, '');
                
                if ($.cookie('logintag') == 1 || $.cookie('logintag') == '1') {
                    qqshare('和红牛一起#挑战无止境 边界由我定#进攻的号角已经吹响了！这个世界杯谁是冠军？快来组建自己的团队，邀请好友，接球，传球，只要你有能量，冠军非你莫属！ ' + $.cookie('texa') + ' ' + linkss, hehe);
                } else {
                    qqshare('和红牛一起#挑战无止境 边界由我定#长传突破后凌空传球给你！帮TA传球，并继续邀请你的好友一起来玩儿，扩大传球队伍，还有机会获得能量大礼！还等什么？传起来吧！ ' + $.cookie('texa') + ' ' + linkss, hehe);
                }
                /*var playInfo = eval('('+$.cookie('playInfo')+')');
                 tid = playInfo.tid;
                 fwid = playInfo.fwid;
                 teamid = playInfo.teamid;
                 info = playInfo.info;*/

                //getball(tid,fwid,teamid,info);
                //	}

           // }

            // $.cookie('fqid',2);
            //return false;
            //$.cookie("tids", tid);
            //window.location.href = 'myborder.html';
        }
    });
}

function getball(tid, fwid, teamid, info) {
    //alert("1");
    var url = netEasyInterfaceUri + 'getball';
    var userInfo = eval('(' + $.cookie('userInfo') + ')');
    uid = userInfo.uid;
    name = userInfo.name;
    head = userInfo.head;
    //info =$.base64.btoa(uid+'^'+name,true)
    var lng = $.cookie('lng').toString();
    var lat = $.cookie('lat').toString();
    var text = 'tid=' + tid + '&wid=' + fwid + '&fwid=' + fwid + '&teamID=' + teamid + '&openid=' + uid + '&userinfo=' + info + '&source=' + $.cookie('cId') + '&longitude=' + lng + '&latitude=' + lat;
    //var text='tid='+tid+'&wid='+fwid+'&fwid='+fwid+'&teamID='+teamid+'&openid='+uid+'&userinfo='+info+'&source=adwo&longitude=&latitude=';
    if ($.cookie('fw') == 2) {
        alert('getball' + text);
    }
    $.ajax({
        type: "get",
        async: false,
        url: url,
        data: text,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",

        success: function (data) {
        	if($.cookie('fw')==2)
        		{
        		alert(data.retCode);
        		}
            if (data.retCode == '200' || data.retCode == 200) 
            {
                alert('传球成功');
                $.cookie('jq', '');
                var des = Date.parse(new Date());
                var des = des.toString();
                //var qtid=$.cookie('tid').toString();
                var qfwids = data.retData.userinfo[0][2];
                var qfwid=qfwids.toString();
                //var qteamid=$.cookie('teamid').toString();
                var jqplant=$.cookie('logintag');
                if($.cookie('logintag')!=1)
                	{
                	  jqplant=2;
                	}
                jqplant=jqplant.toString();
                var linkss = 'http://go.163.com/2014/0609/redbull/friendsapi.php?time=' + des + '&tid=' + tid + '&fwid=' + qfwid + '&teamid=' + teamid + '&jqplant='+jqplant+'&info=';
                if ($.cookie('fw') == 2) {
                    alert('ball和红牛一起#挑战无止境 边界由我定#进攻的号角已经吹响了！这个世界杯谁是冠军？快来组建自己的团队，邀请好友，接球，传球，只要你有能量，冠军非你莫属！ ' + $.cookie('texa') + ' ' + linkss + info);
                }
               
                var lines=uid+'^'+name;
                var hehe = $.base64.btoa(lines, true);
                hehe = hehe.replace(/\+/g, '!');
                hehe = hehe.replace(/\//g, '*');
                hehe = hehe.replace(/\=/g, '');
                //alert($.cookie('texa'));
                if ($.cookie('logintag') == 1 || $.cookie('logintag') == '1') {
                    qqshare('和红牛一起#挑战无止境 边界由我定#进攻的号角已经吹响了！这个世界杯谁是冠军？快来组建自己的团队，邀请好友，接球，传球，只要你有能量，冠军非你莫属! ' + $.cookie('texa') + ' ' + linkss, hehe);
                } else {
                    qqshare('和红牛一起#挑战无止境 边界由我定#长传突破后凌空传球给你！帮TA传球，并继续邀请你的好友一起来玩儿，扩大传球队伍，还有机会获得能量大礼！还等什么？传起来吧！ ' + $.cookie('texa') + ' ' + linkss, hehe);
                }

            }
        }
    });
    /*$.getJSON(url+'&callback=?',text,function(data){
     if(data.retCode=='200') 
     alert('传球成功');
     $.cookie('jq','');
     return false;
     });*/
}
