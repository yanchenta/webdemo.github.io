
$(document).ready(function() {

    //返回首页
    $(".backBut6-1").click(function() {
        window.location.href = "m_6.html";
    });

    //刷新特点弹框=>拨打电话
    $(".backBut2").click(function() {
        $(".tank").show();
        //$(".tank").display = "block";
    });

    $(".hujiao").click(function() {
		lbReload("hotlinemiddle", "", "", "");
		
        window.location.href = "tel:400-821-5757";
    });
    $(".quxiao").click(function() {
        $(".tank").hide();
    });

    //返回首页3
    $(".backBut3").click(function() {
        window.location.href = "m_3.html";
    });

    //返回主页5
    $(".backBut5_1").click(function() {
        window.location.href = "m_5.html";
    });

    //首页分页index-1 
    //图片的左右轮播
    jq = jQuery;
    function pics_show(emId, delay) {
        var obj = jq("#" + emId),
        con = obj.find("div.image"),
        len = con.length - 1,
        lis = obj.find("div.change>i"),
        curr = 0,
        old = -1,
        timer = null;
        var begin = false;
        function roll(curr_) {
            con.css("display", "none");
            if (curr_ == old) {
                return;
            }
            begin = true;
            curr = curr_;
            lis.removeClass("cur");
            jq(lis[curr]).addClass("cur");
            if (old > -1) {
                jq(con[old]).css("z-index", "0").find(">span").css("display", "none");
            }
            jq(con[curr_]).find(">span").css("display", "block");
            jq(con[curr_]).css({
                "display": "block",
                "z-index": "9999"
            }).find("img").fadeIn(600,
            function() {
                if (old > -1) {
                    jq(con[old]).find("img").fadeOut("fast");
                    jq(con[old]).css("display", "none");
                }
                //alert(old+"|"+curr);
                old = curr;
                begin = false;
            });
        }
        function fnNext(curr_) {
            var index = curr_;
            index += 1;
            if (index > len) index = 0;
            return index;
        }
        function fnGo() {
            roll(fnNext(curr));
        }
        function fnPlay() {
            timer = setInterval(fnGo, delay);
        }
        function fnPause() {
            clearInterval(timer);
        }
        roll(curr);
        fnPlay();
        lis.each(function(i, li) {
            jq(li).click(function() {
                if (begin) {
                    return;
                }
                fnPause();
                curr = i;
                roll(curr);
                fnPlay();
            })
        });
    }
    new pics_show("pics_show", 3000);

    new pics_show("hide3_pic", 3000);

    new pics_show("hide4_pic", 3000);

    Paging1();
	if (ismobile){
		Paging22();
		}else{
		  Paging2();
			}
	
	Paging3();
	
	//track:
	if(!!document.getElementsByClassName("refresh-ted")[0]){
		document.getElementsByClassName("refresh-ted")[0].onclick = function(){
			//track-tedian
			var url = "index-1.html";
			track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_click_tedian, url);
			
			//window.location.href = "index-1.html";
		};
	};
	
	if(!!document.getElementsByClassName("refresh-lc")[0]){
		document.getElementsByClassName("refresh-lc")[0].onclick = function(){
			//track-liucheng
			var url = "m_2.html";
			track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_click_liucheng, url);
			
			//window.location.href = "m_2.html";
		};
	};
	
	if(!!document.getElementsByClassName("refresh-al")[0]){
		document.getElementsByClassName("refresh-al")[0].onclick = function(){
			//track-anli
			var url = "m_3.html";
			track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_click_anli, url);
			
			//window.location.href = "m_3.html";
		};
	}
	
	if(!!document.getElementsByClassName("online-bm")[0]){
		document.getElementsByClassName("online-bm")[0].onclick = function(){
			//track-baoming
			var url = "m_4.html";
			track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_click_baoming, url);
			
			//window.location.href = "m_4.html";
		};
	}
	
	if(!!document.getElementsByClassName("fwpeo")[0]){
		document.getElementsByClassName("fwpeo")[0].onclick = function(){
			//track-fuwurenyuan
			var url = "m_5.html";
			track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_click_fuwu, url);
			
			//window.location.href = "m_5.html";
		};
	}
	
	if(!!document.getElementsByClassName("cpcx")[0]){
		document.getElementsByClassName("cpcx")[0].onclick = function(){
			//track-chanpingchaxun
			var url = "m_6.html";
			track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_click_chanping, url);
			
			//window.location.href = "m_6.html";
		};
	}
	
	if(!!document.getElementsByClassName("index-tel-div")[0]){
		document.getElementsByClassName("index-tel-div")[0].onclick = function(){
			//track-电话
			track2(window.codeConsts.channelId, window.codeConsts.codes.click_to_tel);
			
			lbReload("hotlinetop", "", "", "");
			
			$(".tank").show();
		}
	}
	
	//刷新特点弹框=>拨打电话
	$(".backBut2").click(function(){
		//track-tel
		track2(window.codeConsts.channelId, window.codeConsts.codes.click_to_tel);
		
		lbReload("hotlinetop", "", "", "");
		
		$(".tank").show();
	});
	
	
    if(!!document.getElementsByClassName("backBut")[0]){
		document.getElementsByClassName("backBut")[0].onclick = function() {
			//返回首页
			var url = "index.html";
			track2(window.codeConsts.channelId, window.codeConsts.codes.click_to_index, url);
			
			//window.location.href = "index.html";
		};
    };
	
	//track-pv
	if(window.location.href.indexOf("index.html") >= 0){//首页PV
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_index_pv);
	}
	else if(window.location.href.indexOf("index-1.html") >= 0){//刷新特点PV
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_tedian_pv);
	}
	else if(window.location.href.indexOf("m_2.html") >= 0){//刷新流程
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_pv);
	}
	else if(window.location.href.indexOf("m_3.html") >= 0){//刷新案例
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_anli_pv);
	}
	else if(window.location.href.indexOf("m_4.html") >= 0){//在线报名
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_baoming_pv);
	}
	else if(window.location.href.indexOf("m_5.html") >= 0){//服务人员
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_fuwu_pv);
	}
	else if(window.location.href.indexOf("m_6.html") >= 0){//产品查询
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_chanping_pv);
	}
});

//刷新特点
function Paging1() {

    $(".show1").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_tedian_click_womenhehunidejia);
	
        $(".midd-cont > div").hide();
        $(".hide1,.show2,.show3,.show4").show();
        $(".pics_show").show();

    });

    $(".show2").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_tedian_click_shigongwuyidijiaoshui);
		
        $(".midd-cont > div,.hide1").hide();
        $(".hide2,.show1,.show3,.show4").show();
        $(".hide2-pic").show();

    });

    $(".show3").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_tedian_click_damojiaju);
	
        $(".midd-cont > div,.hide1").hide();
        $(".hide3,.show1,.show2,.show4").show();
        $(".hide3_pic").show();

    });

    $(".show4").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_tedian_click_yinianzhibao);
		
        $(".midd-cont > div,.hide1").hide();
        $(".hide4,.show1,.show2,.show3").show();
        $(".hide4_pic").show();

    });
}

function Paging2() {
	//服务流程
    //六宫格
    $(".list").find("li").click(function() {
        $(this).css({
            "margin-top": "0",
            "margin-left": "0"
        }).children(".box").addClass("cur");
        $(this).siblings("li").css({
            "float": "left",
            "margin-top": "0",
            "margin-left": "0",
            "margin-bottom": "5px",
            "margin-right": "6px"
        }).children(".box").removeClass("cur");
        if ($(".list li:eq(1)").children(".box").hasClass("cur")) {
            $(".list li:eq(1)").css({
                "float": "right"
            });
        };
        if ($(".list li:eq(4)").children(".box").hasClass("cur")) {
            $(".list li:eq(4)").css({
                "float": "right"
            })
        }
        if ($(".list li:eq(2)").children(".box").hasClass("cur")) {
            $(".list li:eq(2)").css({
                "float": "left"
            });
			$(".list li:eq(1)").css({
                "float": "right",
                "margin-top": "104px",
                "margin-right": "-99px"
            });
			$(".list li:eq(0)").css({
                "float": "right",
                "margin-bottom": "111px"
            });
			$(".list li:eq(1)").click(function() {
                $(".list li:eq(1)").css({
                    "margin-right": "6px"
                });
            });
        } else {
            $(".list li:eq(0)").css({
                "float": "left",
                "margin-bottom": "5px"
            });
        }
        if ($(".list li:eq(5)").children(".box").hasClass("cur")) {
            $(".list li:eq(5)").css({
                "float": "left"
            });
			$(".list li:eq(4)").css({
                "margin-top": "107px",
                "margin-left": "-105px"
            });
        }
    });
	
	$(".list-a").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_mianfeijiance);
	});
	$(".list-b").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_zhidingfangan);
	});
	$(".list-c").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_banyibaohu);
	});
	$(".list-d").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_wuchendamo);
	});
	$(".list-e").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_qingjieguiwei);
	});
	$(".list-f").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_yinianzhibao);
	});
}

function Paging22() {
	//服务流程
    //六宫格
    $(".list").find("li").click(function() {
        $(this).css({
            "margin-top": "0",
            "margin-left": "0"
        }).children(".box").addClass("cur");
        $(this).siblings("li").css({
            "float": "left",
            "margin-top": "0",
            "margin-left": "0",
            "margin-bottom": "6px",
            "margin-right": "6px"
        }).children(".box").removeClass("cur");
        if ($(".list li:eq(1)").children(".box").hasClass("cur")) {
            $(".list li:eq(1)").css({
                "float": "right"
            });
        };
        if ($(".list li:eq(4)").children(".box").hasClass("cur")) {
            $(".list li:eq(4)").css({
                "float": "right"
            })
        }
        if ($(".list li:eq(2)").children(".box").hasClass("cur")) {
            $(".list li:eq(2)").css({
                "float": "left"
            });
		

				$(".list li:eq(1)").css({
                "float": "right",
                "margin-top": "142px",
                "margin-right": "-99px"
            });
		
			$(".list li:eq(0)").css({
                "float": "right",
                "margin-bottom": "111px"
            });
			$(".list li:eq(1)").click(function() {
                $(".list li:eq(1)").css({
                    "margin-right": "6px"
                });
            });
        } else {
            $(".list li:eq(0)").css({
                "float": "left",
                "margin-bottom": "6px"
            });
        }
        if ($(".list li:eq(5)").children(".box").hasClass("cur")) {
            $(".list li:eq(5)").css({
                "float": "left"
            });
	
				$(".list li:eq(4)").css({
					"margin-top": "142px",
					"margin-left": "-105px"
			});
		
        }
    });
	
	$(".list-a").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_mianfeijiance);
	});
	$(".list-b").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_zhidingfangan);
	});
	$(".list-c").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_banyibaohu);
	});
	$(".list-d").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_wuchendamo);
	});
	$(".list-e").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_qingjieguiwei);
	});
	$(".list-f").click(function() {
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_liucheng_click_yinianzhibao);
	});
}


function Paging3() {
	$(".pic3-1").click(function() {
		var url = "m_3-1.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_anli_click_keting_beijing1, url);
		
		//window.location.href = "m_3-1.html";
	});
	$(".pic3-2").click(function() {
		var url = "m_3-2.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_anli_click_keting_beijing2, url);
		
		//window.location.href = "m_3-2.html";
	});
	$(".pic3-3").click(function() {
		var url = "m_3-3.html";
		track2(window.codeConsts.channelId, window.codeConsts.codes.page_anli_click_woshi_beijing1, url);
		
		//window.location.href = "m_3-3.html";
	});
}

//实现全屏
function resetPage() {
    var deviceWidth = document.documentElement.clientWidth,
    scale = deviceWidth / 320;
    document.body.style.zoom = scale;
}

window.onresize = function() {
    resetPage();
}

window.onload = function() {
   resetPage();
}


//首页index轮播效//果
var delay = 2000;
var n = 0;
var timer = setInterval(function() {
    if (n == $(".boxi").length - 1) {
        n = 0;
        $(".boxi").eq(n).fadeIn(0).siblings(".boxi").fadeOut(0);
        //clearInterval(timer)
    } else {
        n++;
        $(".boxi").eq(n).fadeIn(0).siblings(".boxi").fadeOut(0);
    }

},
delay);

//判断跳转路径是不是iPhone5访问
    function ismobile() {
		return true;
	 var u = navigator.userAgent.toLowerCase();
	 var h =window.screen.availHeight ;
	// var w= window.screen.availWidth;

	if (u.indexOf('iphone') > -1&&h>500) {
		return true;
	}	
	return false;
}
$(document).ready(function() {
 if (ismobile()) {	
    //  $("link").attr("href","css5/index.css");
	$("img").each(function(){
		var url = this.src;
		if (url.indexOf('images') > -1) {
				url=url.replace("images","images/iphone5");
				this.src=url;
		}
	})
} 			
  })