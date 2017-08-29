var api_url = 'http://catsite.ogilvy.com.cn/CatWajiWebService.asmx?op=';
var api_url_news = 'http://www.catwaji.com/club/';
var StrToken = 'a889810174804b9b-93511cde053f4586';

function api(url,data,success,error){
    showLoadding();
    $.ajax("http://newcms.mobile1.com.cn/advmessage/advthird/accessJsonP.action",
           {dataType:'jsonp',
            eventcallback:'callback1',
            data:({submitinfo:JSON.stringify({url:url,data:data}),submittype:'get',rettype:'json',callback:'callback1'}),
            success:function(res){hideLoadding();success(res,data)},error:function(err){hideLoadding();error(err);}
            });
    
}
var userName = '';

function login(refresh, source) {
    dataLayer.push({ 'event': 'event', 'category': '全网', 'action': '浮层登录', 'label': '登录浮层' });
    var mobile;
    //如果来源于外部
    if (source) {
        mobile = localStorage.getItem("t_mobile");
    }
    else {
        mobile = $('#loginMobile').val();
        if (!matchMobile(mobile)) {
            alertMsg('请输入正确的手机号');
            return;
        }
    }
    api(api_url_news + 'api/users/', { id: '2', Mobileno: mobile },
        function (res) {
            //处理服务器返回的值
            if (res.ErrorCode == 0) {
                userName = res.username;
                localStorage.setItem('usertype', res.usertype);
                localStorage.setItem('isvip', res.IsVip);
                localStorage.setItem('userid', res.uid);
                localStorage.setItem('userarea', res.userarea);
                localStorage.setItem('name', res.username);
                localStorage.setItem('mobile', mobile);

                $("#username").text(userName);
                $("#title_login").hide();
                $("#loginD1,.menuLogoutForm").show();
                $(".cover,.cover1,.popupAlert,.menuLoginForm").hide();

                dataLayer.push({ 'event': 'event', 'category': '全网', 'action': '浮层登录成功', 'label': '登录浮层' });
                if (!refresh) {
                    alertMsg('登录成功');
                    location.reload();
                }
            } else {
                if (source) {
                    //开始注册
                    t_reg();
                } else {
                    alertMsg('登录失败');
                }        
            }
        });
}

function t_reg() {
    var mobile = localStorage.getItem("t_mobile");
    var realname = localStorage.getItem("t_username");
    if (!matchMobile(mobile)) {
        //alertMsg('请输入正确的手机号');
        return;
    } else {
        if (realname != "") {
            $.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=regist', {
                type: "post", dataType: 'jsonp',
                eventcallback: 'callback3',
                data: { mobile: mobile, realname: encodeURIComponent(realname), description: (localStorage.getItem('mediasource') ? localStorage.getItem('mediasource') : '') },
                success: function (res) {
                    if (res[0].success == 1) {
                        if (res[0].ServiceReturn.flag) {
                            userName = realname;
                            localStorage.setItem('userid', res[0].ServiceReturn.userid);
                            localStorage.setItem('isvip', 0);
                            localStorage.setItem('name', decodeURIComponent(realname));
                            localStorage.setItem('mobile', mobile);
                            $("#username").text(decodeURIComponent(realname));
                            $("#title_login").hide();
                            $("#loginD1").show();
                            $(".cover,.popupAlert").hide();
                        }
                    }
                }
            });
        }
    }
}

function reg(){
    var realname = $('#regName').val();
    var mobile = $('#regMobile').val();
    if(realname == ""){
        alertMsg('请输入您的姓名');
        return;
    }
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    
    var para = {id:'0',mobileno:mobile,usertype:'机手',username:encodeURIComponent(realname),userarea:'北京|北京',regsource:'CATCLUB-WAP'};
    
    para.userarea = encodeURIComponent(para.userarea);
    para.usertype = encodeURIComponent(para.usertype);
    para.openid = para.mobileno;
    /*
    api(api_url_news + 'api/users/',para,
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
                
                localStorage.setItem('name',realname);
                localStorage.setItem('mobile',mobile);
                $("#username").text(realname);
                $("#title_login").hide();
                $("#loginD1").show();
                
                alertMsg('注册成功');
                location.reload()
                $(".cover,.popupAlert").hide();
            }else{
                alertMsg("提交失败");
            }
        });
    
    */
    
    $.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=regist',{
       type:"post",dataType:'jsonp',
            eventcallback:'callback3',
        data:{mobile:mobile,realname:encodeURIComponent(realname),description:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')},
        success:function(res){
            if(res[0].success == 1){
                if(res[0].ServiceReturn.flag){
                    userName = realname;
                    localStorage.setItem('userid',res[0].ServiceReturn.userid);
                    localStorage.setItem('isvip',0);
                    localStorage.setItem('name',realname);
                    localStorage.setItem('mobile',mobile);
                    $("#username").text(realname);
                    $("#title_login").hide();
                    $("#loginD1").show();
                    $(".cover,.popupAlert").hide();
                    
                    alertMsg('注册成功');
                    location.reload()
                }else{
                    alertMsg(res[0].ServiceReturn.errmessage);
                }
                
            }
        }
    });
}

function xunjia(){
    dataLayer.push({'event':'event','category':'全网','action':'浮层提交','label':'注册询价浮层'});

    var user = getUser();
	/*
    if(!user){
        $(".cover,.loginForm").show();
        closeMenu();
        showCover();
        return;
    }
    */
    var realname = $('#xunjiaName').val();
    var mobile = $('#xunjiaMobile').val();
    var sex = '';//$('[name=xunjiaSex]:checked').val();
    var prov = '';//$('#xunjiaProv').val();
    var city = '';//$('#xunjiaCity').val();
    if(realname == ""){
        alertMsg('请输入您的姓名');
        return;
    }
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    var para = {id:'0',mobileno:mobile,usertype:'有购机意向',username:encodeURIComponent(realname),userarea:'北京|北京',regsource:'CATCLUB-WAP',mediasource:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')};

    para.userarea = encodeURIComponent(para.userarea);
    para.usertype = encodeURIComponent(para.usertype);
    para.openid = para.mobileno;
    api(api_url_news + 'api/users/',para,
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
							localStorage.setItem('userid',res.uid);
							localStorage.setItem('isvip',1);
							localStorage.setItem('name',realname);
							localStorage.setItem('mobile',mobile);
							user.userid = res.uid;
							$("#username").text(realname);
							$("#title_login").hide();
							$("#loginD1,.menuLogoutForm").show();
							$(".cover,.cover1,.popupAlert,.menuLoginForm").hide();
							$.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=enquire',{
							   type:"post",dataType:'jsonp',
									eventcallback:'callback3',
								data:{mobile:mobile,uid:user.userid,realname:encodeURIComponent(realname),sex:sex,provinceid:prov,cityid:city,description:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')},
								success:function(res){
									if(res[0].success == 1){
										if(res[0].ServiceReturn.flag){
											$(".cover,.popupAlert").hide();
											
											//alertMsg('询价成功');
											showXunjiaOK();
											dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});

										}else{
										$(".cover,.popupAlert").hide();
										showXunjiaOK();
											dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});
											//alertMsg('提交失败');
											//alertMsg(res[0].ServiceReturn.errmessage);
										}
									}
								}
							});
            }else{
                api(api_url_news + 'api/users/',{id:'2',Mobileno:mobile},
					function(res){
						
						//处理服务器返回的值
						//if(res.ErrorCode == 0){
							userName = res.username;
							localStorage.setItem('usertype',res.usertype);
							localStorage.setItem('isvip',res.IsVip);
							localStorage.setItem('userid',res.uid);
							localStorage.setItem('userarea',res.userarea);
							localStorage.setItem('name',res.realname);
							localStorage.setItem('mobile',mobile);
							
							$("#username").text(realname);
							$("#title_login").hide();
							$("#loginD1,.menuLogoutForm").show();
							$(".cover,.cover1,.popupAlert,.menuLoginForm").hide();
							$.ajax('http://newcms.mobile1.com.cn/advmessage/adv/addResultJsonP.action?advid=20057&expand2=enquire',{
								   type:"post",dataType:'jsonp',
										eventcallback:'callback3',
									data:{mobile:mobile,uid:user.userid,realname:encodeURIComponent(realname),sex:sex,provinceid:prov,cityid:city,description:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')},
									success:function(res){
										if(res[0].success == 1){
											if(res[0].ServiceReturn.flag){
												$(".cover,.popupAlert").hide();
												
												//alertMsg('询价成功');
												showXunjiaOK();
												dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});

											}else{
											$(".cover,.popupAlert").hide();
											showXunjiaOK();
												dataLayer.push({'event':'event','category':'全网','action':'浮层询价成功','label':'注册询价浮层'});
												//alertMsg('提交失败');
												//alertMsg(res[0].ServiceReturn.errmessage);
											}
										}
									}
								});
						//}
					}
					);
            }
            
    
        });
    
    
    
}


function getUser(){
    if(localStorage.getItem('userid')){
        return {userid:localStorage.getItem('userid'),name:localStorage.getItem('name'),mobile:localStorage.getItem('mobile'),isvip:localStorage.getItem('isvip'),userarea:localStorage.getItem('userarea'),usertype:localStorage.getItem('usertype')};
    }
    return false;
}

function logout(){
    localStorage.removeItem('userid');
    localStorage.removeItem('name');
    localStorage.removeItem('mobile');
    localStorage.removeItem('isvip');
    localStorage.removeItem('usertype');
    localStorage.removeItem('userarea');
    $("#title_login,.menuLoginForm").show();
    $("#loginD1,.menuLogoutForm,.cover,.popupAlert").hide();
}

function addUser(isReg){
    
    var para = {id:'0',mobileno:'',usertype:'',username:'',userarea:'',regsource:'CATCLUB-WAP',mediasource:(localStorage.getItem('mediasource')?localStorage.getItem('mediasource'):'')};
    
    if(isReg){
        para.username = $("#zhuceName").val();
        para.usertype = $("[name=zhuceRole]:checked").val();
        para.userarea = $$("zhuceProv").selectedOptions[0].innerText + '|' + $$("zhuceCity").selectedOptions[0].innerText;
        para.mobileno = $("#zhuceMobile").val();
    }else{
        var user = getUser();
        
        para.username = user.name;
        para.usertype = $("[name=jihuoRole]:checked").val();
        para.userarea = $$("jihuoProv").selectedOptions[0].innerText + '|' + $$("zhuceCity").selectedOptions[0].innerText;
        para.mobileno = $("#jihuoMobile").val();
    }
    para.username = encodeURIComponent(para.username);
    para.userarea = encodeURIComponent(para.userarea);
    para.openid = para.mobileno;
    
    api(api_url_news + 'api/users/',para,
        function(res,para){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
                localStorage.setItem('name',decodeURIComponent(para.username));
                localStorage.setItem('mobile',para.mobileno);
                
                alertMsg("提交成功");
                $("#username").text(decodeURIComponent(para.username));
                $("#title_login").hide();
                $("#loginD1,.menuLogoutForm").show();
                $(".cover,.popupAlert,.menuLoginForm").hide();
            }else{
                alertMsg("提交失败");
            }
        });
}
function jihuoUser(isReg){
    
    var para = {id:'3',mobileno:'',usertype:'',userarea:''};
    
        var user = getUser();
        
        para.usertype = $("[name=jihuoRole]:checked").val();
        para.userarea = $$("jihuoProv").selectedOptions[0].innerText + '|' + $$("jihuoCity").selectedOptions[0].innerText;
        para.mobileno = $("#jihuoMobile").val();
    
    para.userarea = encodeURIComponent(para.userarea);
    para.openid = para.mobileno;
    
    api(api_url_news + 'api/users/',para,
        function(res,para){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('userid',res.uid);
                localStorage.setItem('isvip',1);
                localStorage.setItem('mobile',para.mobileno);
                
                alertMsg("激活成功");
                $("#title_login").hide();
                $("#loginD1,.menuLogoutForm").show();
                $(".cover,.popupAlert,.menuLoginForm").hide();
            }else{
                alertMsg("提交失败");
            }
        });
}
function verUser(){
    var user = getUser();
    var mobile = '';
    if(user && user.mobile){
        mobile = user.mobile;
    }else{
        
    }
    api(api_url_news + 'api/users/',{id:'2',Mobileno:mobile},
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                localStorage.setItem('usertype',res.usertype);
                localStorage.setItem('isvip',res.IsVip);
                localStorage.setItem('userarea',res.userarea);
            }else{
                alertMsg("提交失败");
            }
        });
}

function addQa(){
    var user = getUser();
    if(!user){
        $(".cover,.loginForm").show();
        closeMenu();
        showCover();
        return;
    }
    
    var biaoti = $('#biaoti').val();
    var fenlei = $('#fenlei').val();
    if(biaoti == ""){
        alertMsg('请输入问题标题');
        return;
    }
    
    
       //获取页面的值并判断不能为空。
    api(api_url_news + 'api/qa/',{id:'0',Qatype:encodeURIComponent(fenlei),machinetype:'',Qatitle:encodeURIComponent(biaoti),Qadesc:encodeURIComponent('无'),mobileno:user.mobile,sourceid:'1'},//将值传给服务器
        function(res){
            //处理服务器返回的值
            if(res.ErrorCode == 0){
                dataLayer.push({'event':'event','category':'卡特帮帮忙','action':'提交问题成功','label':'我要提问'});

                alertMsg("提交成功");
                $('#biaoti').val('');
            }else{
                alertMsg("提交失败");
            }
            
        },function(err){
            
        }
    );
}
var indexPage = 1;
function getQa(index){
    indexPage = index;
    api(api_url_news + 'api/qa/',{id:'1',pagenumber:'1',pagesize:''+(indexPage*10)+''},
        function(res){
            if(res.ErrorCode == 0){
                var user = getUser();
                var html = '';
                for(var i=0;i<res.qalist.length;i++){
                    html += '<div class="content_one4">'+
                                '<div class="content_one4_top">'+
                                    '<span>'+res.qalist[i].Qatitle+'</span>'+
                                '</div>'+
                                '<div class="p">'+res.qalist[i].Qadesc+'</div>'+
                            '</div>';
                    
                    if((!user || user.isvip != '1') && i == 2){
                        html += '<img src="images/viewmore.png" style="margin: 10px 0 10px 350px;" onclick="viewmore();track(channel,10352);" />';
                        break;
                    }
                    
                }
                if(user && user.isvip == '1'){
                    html += '<img src="images/viewmore.png" style="margin: 10px 0 10px 350px;" onclick="getQa(indexPage+1);track(channel,10352);" />';
                }
                $("#content_one4").html(html);
            }
        },function(err){
            
        }
    );
}
function viewmore(){
     var user = getUser();
    if(!user){
        showZhuce();
        return;
    }else if(user.isvip != '1'){
        showJihuo()
        return;
    }else{
        getQa();
    }
}
var qalist = [{Qatitle:'320D2挖掘机和之前的Cat 320D有什么区别？',Qadesc:'Cat 320D2挖掘机是卡特彼勒公司专门面向中国市场发布的机型，该系列是基于之前机型Cat 320D的稳健表现开发出来的。这是一款非常可靠而高效的机型，通过减少燃油消耗和简化日常维护，320D2系列能够降低用户的运营成本。Cat 320D2挖掘机系列配备全新的发动机、高效的液压系统、坚固耐用的主结构和改良的操作台。'},
              {Qatitle:'320D2挖掘机的发动机有什么样的改进？',Qadesc:'Cat 320D2机型采用了C7.1发动机，这款发动机符合美国环保署二级排放标准、欧盟第二阶段排放标准和中国非道路移动机械用柴油机排气污染物排放限值及测量方法（第二阶段）法规要求。经过现场验证的 C7.1 发动机的设计旨在方便维修，它能在高达 4000 米（13120\'）的海拔下高效工作。与其前代产品相比，新型发动机可降低约 3% - 5% 的油耗，具体节油情况视型号而定。'},
              {Qatitle:'320D2挖掘机的液压系统有什么样的特点？',Qadesc:'Cat 320D2机型采用的液压系统，其主安全阀压力为35,000千帕（5,076磅/平方英寸），最大燃油流量为2 x 202 升/分钟（53加仑/分钟），它能够提供高液压功率以满足挖掘、吊装以及重型液压动力工作工具使用的需求。让操作人员能够快速切换工装设备，实现任务间的顺利转换，最大限度提升了设备使用率。现场安装用辅助液压套件备有＊定制软管和管路，用户随时可以进行快速安装。先导型液压系统操作省力，控制精确，可最大限度地提高工作效率。动臂和斗杆油路再生系统能够在动臂下降和斗杆操作过程中节约能耗、减少循环时间并提升设备的整体燃油效率。'},
              {Qatitle:'320D2挖掘机的操作室有什么样的特点？',Qadesc:'Cat 320D2挖掘机的操作台设计符合人机工程学原理，运行安静而舒适。操作室配有一个全彩液晶显示器。标准悬浮座椅可进行多向调节以适合不同身材操作手的使用，操作舒适度得到了大幅提升。Cat 320D2挖掘机的大车窗设计确保了最佳的全方位视野，提升了作业的安全性。驾驶室的粘性橡胶座椅能够减少传输到操作台的振动和噪音，操作舒适度和生产效率得以进一步提升。另外，320D2还设置了一个可打开的大型金属天窗，驾驶室的视野与空气流通得到全面的保障。'},
             ];
function getQa1(){
    var html = '';
    for(var i=0;i<qalist.length;i++){
        html += '<div class="content_one4">'+
                    '<div class="content_one4_top">'+
                        '<span>'+qalist[i].Qatitle+'</span>'+
                    '</div>'+
                    '<div class="p">'+qalist[i].Qadesc+'</div>'+
                '</div>';
    }
    $("#content_one4").html(html);
    //$("#content_one4").html('<img src="images/111.jpg" />');
    
}
var ver;
function getver(){
    var mobile = $('#zhuceMobile').val();
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    $.ajax('http://newcms.mobile1.com.cn/advmessage/code/createcode.action?advid=20057&mobile='+mobile,
            {dataType:'json',
                success:function(data){
                if(data.success == 1){
                    ver = data.code;
                    alertMsg('发送成功');
                }else{
                    alertMsg('发送失败');
                }
            },error:function(){
                alertMsg('发送失败');
            }});
   
}
function getver1(){
    var mobile = $('#jihuoMobile').val();
    if(!matchMobile(mobile)){
        alertMsg('请输入正确的手机号');
        return;
    }
    $.ajax('http://newcms.mobile1.com.cn/advmessage/code/createcode.action?advid=20057&mobile='+mobile,
            {dataType:'json',
                success:function(data){
                if(data.success == 1){
                    ver = data.code;
                    alertMsg('发送成功');
                }else{
                    alertMsg('发送失败');
                }
            },error:function(){
                alertMsg('发送失败');
            }});
   
}
function zhuce(){
    if($('#zhuceVer').val() != ver){
        alertMsg('验证码错误');
        return;
    }
    addUser(true);
}
function jihuo(){
    if($('#jihuoVer').val() != ver){
        alertMsg('验证码错误');
        return;
    }
    jihuoUser(false);
}

function toDealerPage(){
    try{
        if(location.pathname.lastIndexOf('/pro') > -1){
            var i = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+4,location.pathname.lastIndexOf('.html')-2))-1;
            var j = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+6,location.pathname.lastIndexOf('.html')))-1;
            dataLayer.push({'event':'event','category':typeList[i]+'产品详情页','action':'经销商','label':CarNames[i][j]});

        }
    }catch(ex){}
    
    setTimeout(function(){
	   window.location.href = "map.html";
    },100);
}

