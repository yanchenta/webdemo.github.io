var pdfs = [
            ['313D-1-1', '308E', '305_5E-1-7', '306E-1-4', '307E-1-5', '312D2Gc-1-3'],
            ['320D2', '320D2 GC', '323D2', '324D', '326DL', '329D'],
            ['336D2', '340D2', '349D', '374DL', '390D'],
            ['M315D2', 'M317D2', 'M318D', 'M322D', 'M318DMH', 'M322DMH'],
            ['950GC']
];
var _is1,_is2,_is3,_is4,_is5,_is_banner;
function resetPage() {
	var deviceWidth = document.documentElement.clientWidth,
	scale = deviceWidth/640;
	document.body.style.zoom = scale;
    
    $("#baidu_map").height('936px');
    //$(".menu").height((document.body.clientHeight-$(".copyright").height()*2));
    //$("#baidu_map").height((window.screen.availHeight-$(".copyright").height()*2));
    if(_is_menu){
        _is_menu.refresh();
    }
    
    if(_is_banner){
        _is_banner.refresh();
    }
    if(_is2){
        _is2.refresh();
    }
    if(_is3){
        _is3.refresh();
    }
    if(_is1){
        _is1.refresh();
    }
    if(_is4){
        _is4.refresh();
    }
    if(_is5){
        _is5.refresh();
    }
}

window.onresize = function(){
	resetPage();
}
function $$(id){
    return document.getElementById(id);   
}
function _(className){
    return document.getElementsByClassName(className);
}

var tap_id,tap_move = false;
function tap(el,func,className){
    if(!el)return;
    function tap_start(){
        tap_move = false;
        tap_id = el.id;
        if(className && !el.classList.contains(className)){
            el.classList.add(className);
        }
    }
    function tap_move(){
        tap_move = true;
        if(className && el.classList.contains(className)){
            el.classList.remove(className);
        }
    }
    function tap_end(){
        if(className && el.classList.contains(className)){
            el.classList.remove(className);
        }
        if(tap_id == el.id && !tap_move){
            if(func){
                func(el);
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        return false;
    }
    el.addEventListener("touchstart",tap_start);
    el.addEventListener("touchmove",tap_move);
    el.addEventListener("touchend",tap_end);
}
function tap_one(el,func,className){
    if(!el)return;
    function tap_start(){
        tap_move = false;
        tap_id = el.id;
        if(className && !el.classList.contains(className)){
            el.classList.add(className);
        }
    }
    function tap_move(){
        tap_move = true;
        if(className && el.classList.contains(className)){
            el.classList.remove(className);
        }
    }
    function tap_one_end(){
        if(className && el.classList.contains(className)){
            el.classList.remove(className);
        }
        if(tap_id == el.id && !tap_move){
            if(func){
                func(el);
            }
            event.preventDefault();
            event.stopPropagation();
            el.removeEventListener("touchstart",tap_start);
            el.removeEventListener("touchmove",tap_move);
            el.removeEventListener("touchend",tap_one_end);
            return false;
        }
        return false;
    }
    el.addEventListener("touchstart",tap_start);
    el.addEventListener("touchmove",tap_move);
    el.addEventListener("touchend",tap_one_end);
}
function taps(els,func,className){
    for(var i=0;i<els.length;i++){
        tap(els[i],func,className);
    }
}


function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
	return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
	return str.replace(/(\s*$)/g,"");
}

function matchUserName(val){
	var valnew = trim(val);
	var re1=/^[~!@#$%^&*()-+={}|;:<>?.,~！@#￥……&*（）+=｛｝【】|、：；"'《》、？，。]/i;
	if(valnew == ""){
		return false;
	}
	if(re1.test(valnew)){
		return false;
	}
	if(valnew.length<2||valnew.length>20){
		return false;
	}
}

function matchEmail(val){
	var valnew = trim(val);
	if(valnew.match( /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)){
		return true;
	}else{
		return false;
	}
}

function matchMobile(val){
	var valnew = trim(val);
	if(valnew.match(/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/)){
		return true;
	}else{
		return false;
	}
}
function showMsg(msg){
	alert(msg);
}
var isSubmit = false;
//ajax提交车主认证的表单
function submitForm(){
	if(isSubmit){
		showMsg("正在提交，请稍等一下吧~");
		return;
	}
	isSubmit = true;
	//track(1,4321);
	var name = trim($("#realname").val()),
		mobile = trim($("#mobile").val()),
		prov = trim($("#prov").val()),
		city = trim($("#city").val()),
		buytime = $("#buytime").val(),
		cartype = $("[name=cartype]:checked").val(),
		sex = $("[name=sex]:checked").val(),
		alertInfo = '';
		
		
		
	
    
	if(trim(buytime) == ""){
		alertInfo = "请选择预约时间！\n";
	}
	if(trim(jxs) == ""){
		alertInfo = "请选择经销商！\n";
	}
	
	if(email == ""){
		alertInfo = "请输入正确的邮箱格式！\n";
	}else if(matchEmail(email)==false ){
		alertInfo = "请输入正确的邮箱格式！\n";
	}
	
	if(mobile == ""){
		alertInfo = "请输入正确的手机格式！\n";
	}else if(matchMobile(mobile)==false ){
		alertInfo = "请输入正确的手机格式！\n";
	}
	if(name == ""){
		alertInfo = "请输入您的姓名！\n";
	}

	if(alertInfo){
		alertMsg(alertInfo);
		isSubmit = false;
		return false;
	}else{
		
		
		var userInfo = {		
			advid:"30026",		            
			realname: name,
			sex:sex,
			mobile : mobile,
			email : email,
            expand1:buytime,
			expand2:jxs
		};
		$.ajax({
				url : 'http://ama.adwo.com/advmessage/adv/addResultJsonP.action',
				cache : false,
				dataType : 'jsonp',
				jsonpCallback : "eventcallback",
				data : userInfo,
				success : function(json) {
					if (json[0].success == 1) {
                        alertMsg("提交成功");
                        location.reload();
					} else {
						alertMsg(json[0].info);
						isSubmit = false;
					}
				}
			});
			
		
	}
}
function alertMsg(msg){
    alert(msg);
}


function showCover(){
	document.getElementsByClassName('cover').item(0).style.display = "block";
	document.getElementsByClassName('cover').item(0).style.height = (document.height?document.height:document.documentElement.clientHeight)*2+"px";
	
	
}
function closeCover(){
	document.getElementsByClassName('cover').item(0).style.display = "none";
}
function preventDefault(event){
    //showAlert('preventDefault');
	event.preventDefault();
	event.stopPropagation();
}
var _is_menu;
var isShowMenu = false;
$(document).ready(function(){
    var deviceWidth = document.documentElement.clientWidth,
	scale = deviceWidth/640;
	document.body.style.zoom = scale;
    
   taps($(".menu_one"),function(el){
        $(".menu_two[data-id="+el.dataset.id+"],.menu_item[data-id="+el.dataset.id+"]").show();
        $(el).hide();
        if(_is_menu){
            _is_menu.refresh();
        }
    });
    taps($(".menu_two"),function(el){
        $(".menu_one[data-id="+el.dataset.id+"]").show();
        $(".menu_two[data-id="+el.dataset.id+"],.menu_item[data-id="+el.dataset.id+"]").hide();
        if(_is_menu){
            _is_menu.refresh();
        }
    });
    
    taps($("[data-url]"),function(el){
        setTimeout(function(){location = el.dataset.url;} , 100);
        
    });
    taps($("[data-tap]"),function(el){
        setTimeout(el.dataset.tap,0);
    });
    taps($("[data-ga]"),function(el){
        setTimeout(el.dataset.ga,0);
    });
    taps($(".menu ul li a"),function(el){
        location = 'tel:4001115187';
        return false;
    });
    taps($("[data-urllogin]"),function(el){
        var url = el.dataset.urllogin;
        var user = getUser();
        if(user){
            url += "?mobile=" + user.mobile;
        }
        setTimeout(function(){location = url;} , 100);
        
    });
    taps($("[data-urlforlogin]"),function(el){
        var url = el.dataset.urlforlogin;
        var user = getUser();
        if(user){
            setTimeout(function(){location = url;} , 100);
        }else{
            showReg();
        }
    });
    taps($("[data-urlforzhuce]"),function(el){
        var url = el.dataset.urlforzhuce;
        var user = getUser();
        if(!user){
            showZhuce();
        }else if(user.isvip != '1'){
            showJihuo();
        }else{
            setTimeout(function(){location = url;} , 100);
        }
    });
    taps($(".menuLoginForm"),function(el){
        showLogin();
        closeMenu();
    });
    taps($(".xunjiaForm .btnDenglu"),function(el){
        showLogin();
        dataLayer.push({'event':'event','category':'全网','action':'浮层点击登录','label':'注册询价浮层'});

    });
    taps($(".menuWeixin"),function(el){
        $('.weixinForm').show();showCover();closeMenu();window.scrollTo(0,0);
        dataLayer.push({'event':'page','category':'全网','action':'微信浮层','label':'微信浮层'});

    });
    taps($(".btoWeixin"),function(el){
        $('.weixinForm').show();showCover();closeMenu();window.scrollTo(0,0);
       dataLayer.push({'event':'event','category':'首页','action':'关注微信','label':'下导航'});

    });
    
    
    taps($(".weixinForm .close"),function(el){
        $('.weixinForm').show();showCover();closeMenu();
        dataLayer.push({'event':'event','category':'全网','action':'浮层叉号','label':'微信浮层'});
dataLayer.push({'event':'event','category':'首页','action':'关注微信','label':'下导航'});
    });
    
    
    taps($(".loginForm .btnReg,.btoZhuce"),function(el){
        showReg();
        dataLayer.push({'event':'event','category':'全网','action':'浮层点击注册','label':'登录浮层'});


    });
    taps($(".search .btoZhuce"),function(el){
        dataLayer.push({'event':'event','category':'首页','action':'注册','label':'下导航'});

    });
    
    taps($(".regForm .btnLogin"),function(el){
        showLogin();
    });
    
    
    taps($(".menu_left"),function(el){
        isShowMenu = !isShowMenu;
        var menuHieght = (document.body.clientHeight-$(".copyright").height()*2);
        if(menuHieght > 1000){
            menuHieght = 1000;
        }menuHieght = 1200;
        $(".menu").height(menuHieght);
        
        if(isShowMenu){
            _("content")[0].addEventListener("touchstart",closeMenu);
            $(".menu").addClass("menu_open");
            $(".menu_left,.search,.content,.header_two,.searchArea,.content_title").addClass("content_right");
        }else{
            _("content")[0].removeEventListener("touchstart",closeMenu);
            $(".menu").removeClass("menu_open");
            $(".menu_left,.search,.content,.header_two,.searchArea,.content_title").removeClass("content_right");
        }
        
        if(_is_menu){
            _is_menu.refresh();
        }
    }); 
    
    
    _is_menu = new iScroll('menu',{vScrollbar : false,hScrollbar : false});
    _is_menu.refresh();
    
    var user = getUser();
    if(user){
        $("#username").text(user.name);
        $("#title_login,.menuLoginForm").hide();
        $("#loginD1,.menuLogoutForm").show();
    }
    
    if($('.xunjiaForm,.zhuceForm,.jihuoForm').length > 0){
        loadProv();
        loadCity(22);
    }
    
    if($('#big_img').length > 0){
        $('#big_img').click(function(){
            showBigImg(this.src);
        });
    }
    
    //$(".menu").height((document.body.clientHeight-$(".copyright").height()*2));
    document.getElementsByClassName('cover').item(0).addEventListener('touchstart',preventDefault,false);
    taps($(".close"),function(){$(".cover,.popupAlert").hide();});
    taps($(".loginForm .close"),function(){
        $(".cover,.popupAlert").hide();
        dataLayer.push({'event':'event','category':'全网','action':'浮层叉号','label':'登录浮层'});
    });
    taps($(".xunjiaTel"),function(){
        dataLayer.push({'event':'event','category':'全网','action':'浮层拨打销售热线','label':'注册询价浮层'});
    });
    taps($(".xunjiaForm .close"),function(){
        $(".cover,.popupAlert").hide();
        dataLayer.push({'event':'event','category':'全网','action':'浮层叉号','label':'注册询价浮层'});

    });
    taps($(".xunjiaokForm .close"),function(){
        $(".cover,.popupAlert").hide();
        dataLayer.push({'event':'event','category':'全网','action':'浮层叉号','label':'询价成功浮层'});

    });
    taps($(".xunjiaokForm .btnJixu"),function(){
        $(".cover,.popupAlert").hide();
        dataLayer.push({'event':'event','category':'全网','action':'继续浏览本站','label':'询价成功浮层'});

    });
    taps($(".xunjiaokForm .btnWaJi"),function(){
        dataLayer.push({'event':'event','category':'全网','action':'查看挖机产品','label':'询价成功浮层'});
        location='index.html';
    });
    taps($(".xunjiaokForm .btnBangmang"),function(){
        dataLayer.push({'event':'event','category':'全网','action':'查看卡特帮帮忙','label':'询价成功浮层'});
        location='p_help.html';
    });
    taps($("#hotel"),function(){
        dataLayer.push({'event':'event','category':'全网','action':'销售热线','label':'上导航'});

    });
    taps($("#title_login"),function(){
        dataLayer.push({'event':'event','category':'全网','action':'登录','label':'上导航'});

    });
    
    if($('.down-sure').length > 0){
        //下载模块
        document.getElementsByClassName("down-sure")[0].onclick = function(){//下载
            
            var size = this.tag;
            
            //window.location.href = size.fileName;
            downPDF2(size.i, size.j, size.k);
            document.getElementsByClassName("div-down")[0].style.display = "none";
        };
        document.getElementById("a_downcancel").onclick = function(){//取消
            document.getElementsByClassName("div-down")[0].style.display = "none";
        };
    }
    if (request("source") == "cat_hero") {
        //缓存传来数据
        localStorage.setItem("t_mobile", request("mobile"));
        localStorage.setItem("t_username", decodeURIComponent(request("username")));
        //开始登录
        login(true, true);
    } else {
        if (request("mobile")) {
            $('#loginMobile').val(request("mobile"));
            login(true, false);
        }
    }
    $('body').append('<div class="cover2"></div>');
    document.getElementsByClassName('cover2').item(0).style.height = (document.height?document.height:document.documentElement.clientHeight)*2+"px";
    
    $('input').bind('focus',function(){
       $('.cover2').hide(); 
    });
    $('input').bind('blur',function(){
       $('.cover2').show(); 
    });
      
    
    if(request('utm_source') || request('utm_medium')|| request('utm_term')|| request('utm_campaign')){
        localStorage.setItem('mediasource',request('utm_source')+','+request('utm_medium')+','+request('utm_campaign')+','+request('utm_term'));
    }
    if(request('hmsr') || request('hmmd')|| request('hmpl')|| request('hmkw')){
        localStorage.setItem('mediasource',request('hmsr')+','+request('hmmd')+','+request('hmpl')+','+request('hmkw'));
    }
});

function closeMenu(){
    _("content")[0].removeEventListener("touchstart",closeMenu);
    $(".menu").removeClass("menu_open");
    $(".menu_left,.search,.content,.header_two,.searchArea,.content_title").removeClass("content_right");
    
    isShowMenu = false;
    return false;   
}

function showXunjia(i,j,k){
    try{
        if(location.pathname.lastIndexOf('/pro') > -1 && location.pathname.substring(location.pathname.lastIndexOf('/pro'),location.pathname.length) > 10){
            i = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+4,location.pathname.lastIndexOf('.html')-2))-1;
            j = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+6,location.pathname.lastIndexOf('.html')))-1;
            dataLayer.push({'event':'event','category':typeList[i]+'产品详情页','action':'我要询价','label':CarNames[i][j]});

        }
    }catch(ex){}
    
    if(k == 1){
        dataLayer.push({'event':'event','category':typeList[i]+'列表页','action':'即刻询价','label':CarNames[i][j]});
   
    }else{
        dataLayer.push({'event':'page','category':'全网','action':'注册询价浮层','label':'注册询价浮层'});
    }
    
    
    var user = getUser();
    if(!user){
        $('.xunjiaForm').show();
        showCover();
        //window.scrollTo(0,0);
    }else{
        showLoadding();
        $.ajax('http://test.zhangkuo.net/advmessage/adv/addResultJsonP.action?advid=20057&expand2=enquire',{
           type:"post",dataType:'jsonp',
                eventcallback:'callback3',
            data:{mobile:user.mobile,uid:user.userid,realname:user.name,sex:'',provinceid:'',cityid:''},
            success:function(res){
                if(res[0].success == 1){
                    hideLoadding();
                    if(true){ //res[0].ServiceReturn.flag
                        $(".cover,.popupAlert").hide();

                        //alertMsg('询价成功');
                        showXunjiaOK();
                        dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});

                    }else{
                        alertMsg('提交失败');
                        //alertMsg(res[0].ServiceReturn.errmessage);
                    }
                }
            }
        });
    }
    
}
function showXunjiaOK(){
    if($('.xunjiaokForm').length == 0){
        var html = '<div class="popupAlert xunjiaokForm">'+
                        '<div class="close"></div>'+
                        '<div class="btnJixu fly"></div>'+
                        '<div class="btnWaJi fly"></div>'+
                        '<div class="btnBangmang fly"></div>'+
                    '</div>';
        $('body').append(html);
        taps($(".xunjiaokForm .close"),function(){
        $(".cover,.popupAlert").hide();
            dataLayer.push({'event':'event','category':'全网','action':'浮层叉号','label':'询价成功浮层'});
    
        });
        taps($(".xunjiaokForm .btnJixu"),function(){
            $(".cover,.popupAlert").hide();
            dataLayer.push({'event':'event','category':'全网','action':'继续浏览本站','label':'询价成功浮层'});
    
        });
        taps($(".xunjiaokForm .btnWaJi"),function(){
            dataLayer.push({'event':'event','category':'全网','action':'查看挖机产品','label':'询价成功浮层'});
            location='index.html';
        });
        taps($(".xunjiaokForm .btnBangmang"),function(){
            dataLayer.push({'event':'event','category':'全网','action':'查看卡特帮帮忙','label':'询价成功浮层'});
            location='p_help.html';
        });
    }
    $('.xunjiaokForm').show();
    showCover();
    window.scrollTo(0,0);
}

function showZhuce(){
    $('.zhuceForm').show();
    showCover();
    window.scrollTo(0,0);
}
function showJihuo(){
    $('.jihuoForm').show();
    showCover();
    window.scrollTo(0,0);
}
function showLogin(){
    $(".popupAlert").hide();
    $('.loginForm').show();
    showCover();
    window.scrollTo(0,0);
    
    dataLayer.push({'event':'page','category':'全网','action':'登录浮层','label':'登录浮层'});

}
function showReg(){
    $(".cover,.popupAlert").hide();
    $(".cover,.regForm").show();
    closeMenu();
    showCover();
    dataLayer.push({'event':'page','category':'全网','action':'注册询价浮层','label':'注册询价浮层'});
}

function loadProv(){
    var provHtml = '',cityHtml = '';
    for(var i=0;i<dealers.length;i++){
        provHtml += '<option value="'+dealers[i].v+'">' + dealers[i].t + '</option>';
        for(var j=0;j<dealers[i].s.length;j++){
            cityHtml += '<option value="'+dealers[i].s[j].v+'">' + dealers[i].s[j].t + '</option>';
        }
    }
    if($('#xunjiaProv').length > 0){
        $("#xunjiaProv").html(provHtml);
    }
    if($('#zhuceProv').length > 0){
        $("#zhuceProv").html(provHtml);
    }
    if($('#jihuoProv').length > 0){
        $("#jihuoProv").html(provHtml);
    }
}
function loadCity(prov){
    var provHtml = '',cityHtml = '';
    for(var i=0;i<dealers.length;i++){
        if(dealers[i].v == prov){
            for(var j=0;j<dealers[i].s.length;j++){
                cityHtml += '<option value="'+dealers[i].s[j].v+'">' + dealers[i].s[j].t + '</option>';
            }
        }
    }
    if($('#xunjiaCity').length > 0){
        $("#xunjiaCity").html(cityHtml);
    }
    if($('#zhuceCity').length > 0){
        $("#zhuceCity").html(cityHtml);
    }
    if($('#jihuoCity').length > 0){
        $("#jihuoCity").html(cityHtml);
    }
}
var _iss;
function downPDF(i,j,k){
    
    if(k == 1){
        dataLayer.push({'event':'event','category':typeList[i]+'列表页','action':'产品手册','label':CarNames[i][j]});

    }else if(k == 2){
        dataLayer.push({'event':'event','category':typeList[i]+'产品详情页','action':'产品手册','label':CarNames[i][j]});

    }else{
        dataLayer.push({'event':'event','category':'首页','action':'产品手册','label':typeList[i]});
    }
    
    
    
    var user = getUser();
    if(!user){
        showReg();
        return;
    }
    
	//...
	var curPDF = "";
    if(j || j ==0){
    }else{
        j = _iss[i].currPageX;
    }
    
    curPDF = "pdf/" + pdfs[i][j] + '.pdf';
    //alert(i+"/"+j);
	//alert(curPDF);
	//...
	var curSize = { fileName: curPDF, size: sizes[i][j].size };
	//alert(curSize.fileName + "/" + curSize.size);
    /*
	for(var ii = 0; ii < sizes.length; ii++){
		if(sizes[ii].fileName == curPDF){
			curSize = sizes[ii];
			break;
		}
	}
    */
	if(!curSize){
		alert("没有对应的产品手册[" + curPDF + "]");
		return;
	}
	
	curSize.i = i;
	curSize.j = j;
	curSize.k = k;
	
    
    if($('.div-down').length == 0){
        var html = '<div class="div-down" style="display:none;">'+
                   '     <div class="markpop"></div>'+
                   '     <div class="popcon">'+
                   '                 <a href="javascript:closeDown();"></a>'+
                   '                 <p>该产品手册大小为<b id="b_fileSize">4.1M</b>,<br />需要一定的下载时间，请耐心等待</p>'+
                   '                 <p class="lastp">'+
                   '                     <a class="down-sure"><b></b>确 认</a>'+
                   '                     <a class="down-sure down-cancel" id="a_downcancel"><b></b>取 消</a>'+
                   '                 </p>'+
                   '             </div>'+
                    '</div>';
        $('body').append(html);
        //下载模块
        document.getElementsByClassName("down-sure")[0].onclick = function(){//下载
            
            var size = this.tag;
            
            //window.location.href = size.fileName;
            downPDF2(size.i, size.j, size.k);
            document.getElementsByClassName("div-down")[0].style.display = "none";
        };
        document.getElementById("a_downcancel").onclick = function(){//取消
            document.getElementsByClassName("div-down")[0].style.display = "none";
        };
    }
	//显示down div
	document.getElementsByClassName("div-down")[0].style.display = "block";
	
	document.getElementById("b_fileSize").innerHTML = curSize.size;
	
	document.getElementsByClassName("down-sure")[0].tag = curSize;//保存附加信息
	
}
function closeDown(){
	document.getElementsByClassName("div-down")[0].style.display = "none";
}

function downPDF2(i,j,k){
    var user = getUser();
    if(!user){
        showReg();
        return;
    }
    
	
	//...
	if(j || j ==0){
        //location = "pdf/" + pdfs[i][j] + '.pdf';
		window.location.href = "pdf/" + pdfs[i][j] + '.pdf';
    }else{
        //location = "pdf/" + pdfs[i][_iss[i].currPageX] + '.pdf';
		window.location.href = "pdf/" + pdfs[i][_iss[i].currPageX] + '.pdf';
    }
}

var typeList = ['小型机', '中型机', '大型机', '轮挖', '装载机'];
var sizes = [
             [{ fileName: 'pdf/313D-1-1.pdf', size: '2.71 MB' },
	{ fileName: 'pdf/308E.pdf', size: '1.43 MB' },
	{ fileName: 'pdf/305_5E-1-7.pdf', size: '561KB' },
	{ fileName: 'pdf/306E-1-4.pdf', size: '2.81 MB' },
	{ fileName: 'pdf/307E-1-5.pdf', size: '4.00 MB' },
	{ fileName: 'pdf/312D2Gc-1-3.pdf', size: '3.41 MB' }],
             [{ fileName: 'pdf/320D2.pdf', size: '14 MB' },
	{ fileName: 'pdf/320D2 GC.pdf', size: '6.28 MB' },
	{ fileName: 'pdf/323D2.pdf', size: '16.4 MB' },
	{ fileName: 'pdf/324D.pdf', size: '4.44 MB' },
	{ fileName: 'pdf/326DL.pdf', size: '8.36 MB' },
	{ fileName: 'pdf/329D.pdf', size: '3.21 MB' }],
             [{ fileName: 'pdf/336D2.pdf', size: '10.7 MB' },
	{ fileName: 'pdf/340D2.pdf', size: '5.70 MB' },
	{ fileName: 'pdf/349D.pdf', size: '4.33 MB' },
	{ fileName: 'pdf/374DL.pdf', size: '3.93 MB' },
	{ fileName: 'pdf/390D.pdf', size: '4.04 MB' }],
             [{ fileName: 'pdf/M315D2.pdf', size: '1.36MB' },
	{ fileName: 'pdf/M317D2.pdf', size: '1.23 MB' },
	{ fileName: 'pdf/M318D.pdf', size: '10.7 MB' },
	{ fileName: 'pdf/M322D.pdf', size: '10.4 MB' },
	{ fileName: 'pdf/M318DMH.pdf', size: '6.50 MB' },
	{ fileName: 'pdf/M322DMH.pdf', size: '6.84 MB' }],
             [{ fileName: 'pdf/950GC.pdf', size: '3.78 MB' }]];
var CarNames = [
	['313D系列2液压挖掘机',
	'308E 小型挖掘机',
	'305.5E 小型液压挖掘机',
	'306E 小型挖掘机',
	'307E 小型挖掘机',
	'312D GC 系列2 液压挖掘机'],
	['320D系列2液压挖掘机',
	'320D GC系列2液压挖掘机',
	'323DL 系列2 液压挖掘机',
	'324D液压挖掘机',
	'326DL液压挖掘机',
	'329D/329DL液压挖掘机'],
	['336D 系列 2液压挖掘机',
	'340DL 系列2 液压挖掘机',
	'349D/349DL液压挖掘机',
	'374DL液压挖掘机',
	'390D/390DL液压挖掘机'],
	['M315D2 轮式挖掘机',
	'M317D2 轮式挖掘机',
	'M318D 轮式挖掘机',
	'M322D 轮式挖掘机',
	'M318D MH 物料搬运机',
	'M322D MH 物料搬运机'], ['950GC']];

function viewDetails(x, y, z) {
    //alert(x+"/"+y+"/"+z);
    if(z){
        dataLayer.push({'event':'event','category':typeList[x-1]+'列表页','action':'查看详情','label':CarNames[x-1][y-1]});
    }else{
        dataLayer.push({'event':'event','category':'首页','action':'查看详情','label':typeList[x-1]});
    }
    
	var user = getUser();
    if(!user){
        showReg();
        return;
    }
   window.location = 'pro' + x + '_' + y + '.html';
}
function request(paras)
{ 
	var url = location.href; 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i=0; j=paraString[i]; i++){ 
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[paras.toLowerCase()]; 
	if(typeof(returnValue)=="undefined"){ 
		return ""; 
	}else{ 
		return returnValue; 
	} 
}

function showLoadding(){
    if($('.coverLoadding').length == 0){
        $('body').append('<div class="coverLoadding"></div><div class="popupAlert loaddingForm"></div>');
    }
    document.getElementsByClassName('coverLoadding').item(0).style.display = "block";
	document.getElementsByClassName('coverLoadding').item(0).style.height = (document.height?document.height:document.documentElement.clientHeight)*2+"px";
	
    $('.coverLoadding,.loaddingForm').show();
}
function hideLoadding(){
    $('.coverLoadding,.loaddingForm').hide();
}
function showBigImg(src){
    if($('.formBigImg').length == 0){
        $('body').append('<div class="popupAlert formBigImg"></div>');
    }
    document.getElementsByClassName('cover').item(0).style.display = "block";
	document.getElementsByClassName('cover').item(0).style.height = (document.height?document.height:document.documentElement.clientHeight)*2+"px";
	
    $('.formBigImg').css("background-image",'url('+src+')');
    $('.cover,.formBigImg').click(hideBigImg);
    $('.cover,.formBigImg').show();
}
function hideBigImg(){
    $('.cover,.formBigImg').hide();
}




