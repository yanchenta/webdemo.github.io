
$(document).ready(function() {
	$(".index-tel-div").click(function(){
		$(".tank").show();
	});
    //返回首页
    $(".backBut").click(function() {
        window.location.href = "index.html";
    });
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
        window.location.href = "tel:+14123815500";
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

    //首页分页index-1 
    //图片的左右轮播
    function pics_show(emId, delay, intervalCallback, nextCallback, lastCallback) {
		//this.jq = jQuery;
		this.obj = $("#" + emId);
		this.id = emId;
		this.imgDivs = this.obj.find("div.image");
		this.intervalCallback = intervalCallback;
		this.nextCallback = nextCallback;
		this.lastCallback = lastCallback;
		for(var i = 0; i < this.imgDivs.length; i++)
		{
			this.imgDivs[i].nextCallback = nextCallback;
			this.imgDivs[i].lastCallback = lastCallback;
			this.imgDivs[i].isMouseDown = false;
			this.imgDivs[i].startX = -1;
			this.imgDivs[i].startY = -1;
			//alert(this.imgDivs[0].innerHTML);
			this.imgDivs[i].onmousedown = function()
			{
				//alert("mouse down.");
				//...
				this.isMouseDown = true;
				
				var e = event || window.event;
				this.startX = e.screenX;
				this.startY = e.screenY;
			}
			this.imgDivs[i].onmouseout = function()
			{
				//alert(this + ":mouse out or up.");
				if(this.isMouseDown)
				{
					var e = event || window.event;
					var disX = e.screenX - this.startX;
					var disY = e.screenY - this.startY;
					if(Math.abs(disX) > Math.abs(disY))
					{
						if(disX > 100)
						{
							//添加左滑 => 上一张
							//(onmousedown + omouseup/onmouseover to compare)
							//abs(x-distance) > abs(y-distance) and x-distance > 100
							//this.nextCallback();
							alert("下一个");
						}
						else if(disX < -100)
						{
							//添加右滑 => 下一张
							//(onmousedown + omouseup/onmouseover to compare)
							//abs(x-distance) > abs(y-distance) and x-distance < -100
							//this.lastCallback();
							alert("上一个");
						}
					}
				}
				
				this.isMouseDown = false;
				this.startX = -1;
				this.startY = -1;
			}
			this.imgDivs[i].onmouseup = this.imgDivs[i].onmouseout;
			
		}
		this.maxIdx = this.imgDivs.length - 1;
		this.lis = this.obj.find("div.change>i");
		
		this.curIdx = 0;
		this.oldIdx = -1;
		this.timer = null;
		this.begin = false;
		this.roll = function(_inputObj, _curIdx) {
			//alert(_inputObj._inputObj.imgDivs);
			$("#" + _inputObj.id).find("div.image").css("display", "none");
			//var tmpCon = imgDivs;
			if (_curIdx == _inputObj.oldIdx) {
				return;
			}
			_inputObj.begin = true;
			_inputObj.curIdx = _curIdx;
			_inputObj.lis.removeClass("cur");
			$(_inputObj.lis[_inputObj.curIdx]).addClass("cur");
			if (_inputObj.oldIdx > -1) {
				$(_inputObj.imgDivs[_inputObj.oldIdx]).css("z-index", "0").find(">span").css("display", "none");
			}
			$(_inputObj.imgDivs[_curIdx]).find(">span").css("display", "block");
			$(_inputObj.imgDivs[_curIdx]).css({
				"display": "block",
				"z-index": "9999"
			}).find("img").fadeIn(600, function() {
				if (_inputObj.oldIdx > -1) {
					$(_inputObj.imgDivs[_inputObj.oldIdx]).find("img").fadeOut("fast");//这句话有问题
					$(_inputObj.imgDivs[_inputObj.oldIdx]).css("display", "none");
				}
				_inputObj.oldIdx = _inputObj.curIdx;
				_inputObj.begin = false;
			});
		};
		this.fnNext = function(_maxIdx, _curr) {
			var index = _curr;
			index += 1;
			if (index > _maxIdx) index = 0;
			return index;
		}
		//this.fnNext_FuncStr = this.fnNext.ToString();
		
		this.fnLast = function(curr_){
			var index = curr_;
			index -= 1;
			if (index < 0) index = 0;
			return index;
		}
		//this.fnLast_FuncStr = this.fnLast.ToString();
		
		//setInterval导致 包含this错误的代码
		this.fnPlay = function (_timer, _intervalCallback) {
			_timer = setInterval(function(){ _intervalCallback();}, delay);
		};
		this.fnPause = function (_intervalCallback, _timer, timeOut_Delay) {
			window.clearInterval(_timer);
			setTimeout(function(){ 
				_timer = setInterval(function(){ _intervalCallback();}, delay);
			}, timeOut_Delay);
		};
		this.roll(this, 0);
		this.fnPlay(this.timer, this.intervalCallback);
		var obj = this;
		this.lis.each(function(i, li, obj) {
			var obj = {};
			//alert(obj);
			$(li).click(function() {
				var obj = {};
				//alert(obj);
				
				if (obj.begin) {
					return;
				}
				
				obj.fnPause(3000);
				obj.curr = i;
				obj.roll(obj.curr);
				obj.fnPlay();
			});
		}, obj);
		
		return this;
    }
    window.picPlay1 = new pics_show("pics_show", 3000, function(){
		var idx = window.picPlay1.fnNext(window.picPlay1.maxIdx, window.picPlay1.curIdx);
		window.picPlay1.roll(window.picPlay1, idx);
	}, function(){
		var idx = window.picPlay1.fnNext(window.picPlay1.curIdx);
		window.picPlay1.roll(window.picPlay1, idx);
		window.picPlay1.fnPause(3000);
	}, function(){
		var idx = window.picPlay1.fnLast(window.picPlay1.curIdx);
		window.picPlay1.roll(window.picPlay1, idx);
		window.picPlay1.fnPause(3000);
	});
	
    window.picPlay2 = new pics_show("hide3_pic", 3000, function(){
		var idx = window.picPlay2.fnNext(window.picPlay1.maxIdx, window.picPlay2.curIdx);
		window.picPlay2.roll(window.picPlay2, idx);
	}, function(){
		var idx = window.picPlay2.fnNext(window.picPlay2.curIdx);
		window.picPlay2.roll(window.picPlay2, idx);
		window.picPlay2.fnPause(3000);
	}, function(){
		var idx = window.picPlay2.fnLast(window.picPlay2.curIdx);
		window.picPlay2.roll(window.picPlay2, idx);
		window.picPlay2.fnPause(3000);
	});

    window.picPlay3 = new pics_show("hide4_pic", 3000, function(){
		var idx = window.picPlay3.fnNext(window.picPlay1.maxIdx, window.picPlay3.curIdx);
		window.picPlay3.roll(window.picPlay3, idx);
	}, function(){
		var idx = window.picPlay3.fnNext(window.picPlay3.curIdx);
		window.picPlay3.roll(window.picPlay3, idx);
		window.picPlay3.fnPause(3000);
	}, function(){
		var idx = window.picPlay3.fnLast(window.picPlay3.curIdx);
		window.picPlay3.roll(window.picPlay3, idx);
		window.picPlay3.fnPause(3000);
	});

	pics_show.prototype.ToString = function()
	{
		var str = "{";
		for(var attr in this)
		{
			str += "\"" + attr + "\":" + this[attr] + ";";
		}
		str += "}";
	}
	
    Paging1();
})




//首页分页
function Paging1() {

    $(".show1").click(function() {
        $(".midd-cont > div").hide();
        $(".hide1,.show2,.show3,.show4").show();
        $(".pics_show").show();

    });

    $(".show2").click(function() {
        $(".midd-cont > div,.hide1").hide();
        $(".hide2,.show1,.show3,.show4").show();
        $(".hide2-pic").show();

    });

    $(".show3").click(function() {
        $(".midd-cont > div,.hide1").hide();
        $(".hide3,.show1,.show2,.show4").show();
        $(".hide3_pic").show();

    });

    $(".show4").click(function() {
        $(".midd-cont > div,.hide1").hide();
        $(".hide4,.show1,.show2,.show3").show();
        $(".hide4_pic").show();

    });
	
	var images = $(".pics_show")[0].getElementsByClassName("image");
	var imgsCount = images.length;
	for(var i = 0; i < imgsCount - 1; i++)
	{
		attachDragChangeimagePage(images[i], imgsCount);
	}
}

function attachDragChangeimagePage(curImgDiv, imgsCount){
	//...
	curImgDiv.isMouseDown = false;
	curImgDiv.startX = -1;
	curImgDiv.startY = -1;
	curImgDiv.imgsCount = imgsCount;
	
	curImgDiv.onmousedown = function(){
		this.isMouseDown = true;
		var e = event || window.event;
		this.startX = e.screenX;
		this.startY = e.screenY;
	}
	
	/*
	curImgDiv.onmousedown = function(){
		//...
		this.isMouseDown = true;
		
		var e = event || window.event;
		this.startX = e.screenX;
		this.startY = e.screenY;
		
		//document.write("down");
	}
	curImgDiv.onmouseup = function(){
		if(this.isMouseDown)
		{
			//...获取终点位置 => 计算移动距离
			var e = event || window.event;
			var disX = e.screenX - this.startX;
			var disY_abs = Math.abs(e.screenY - this.startY);
			
			if(Math.abs(disX) > disY_abs && disX > 100)
			{
				changeToImg(this.imgsCount, 1);
				//document.write("changeToImg(1)");
			}
			else if(Math.abs(disX) > disY_abs && disX < -100)
			{
				changeToImg(this.imgsCount, -1);
				//document.write("changeToImg(-1)");
			}
			
			//alert("down => disX:" + disX + "; disY_abs:" + disY_abs);
		}
		
		
		//...
		this.isMouseDown = false;
		this.startX = -1;
		this.startY = -1;

	}
	curImgDiv.onmouseout = function(){
		//if(this.isMouseDown)
		{
			//...获取终点位置 => 计算移动距离
			var e = event || window.event;
			var disX = e.screenX - this.startX;
			var disY_abs = Math.abs(e.screenY - this.startY);
			if(Math.abs(disX) > disY_abs && disX > 100)
			{
				changeToImg(this.imgsCount, 1);
				//document.write("changeToImg(1)");
			}
			else if(Math.abs(disX) > disY_abs && disX < -100)
			{
				changeToImg(this.imgsCount, -1);
				//document.write("changeToImg(-1)");
			}
			
			//alert("out => disX:" + disX + "; disY_abs:" + disY_abs);
		}
		
		//...
		this.isMouseDown = false;
		this.startX = -1;
		this.startY = -1;
	}*/
	
	curImgDiv.onmouseup = function(){
		if(this.isMouseDown)
		{
			
			//...获取终点位置 => 计算移动距离
			var e = event || window.event;
			var disX = e.screenX - this.startX;
			var disY_abs = Math.abs(e.screenY - this.startY);
			
			if(Math.abs(disX) > disY_abs && disX > 0)
			{
				changeToImg(this.imgsCount, 1);
				//document.write("changeToImg(1)");
			}
			else if(Math.abs(disX) > disY_abs && disX < 0)
			{
				changeToImg(this.imgsCount, -1);
				//document.write("changeToImg(-1)");
			}
			else
			{
				changeToImg(this.imgsCount, 1);
			}
			//alert("down => disX:" + disX + "; disY_abs:" + disY_abs);
			
		}
		
		
		//...
		this.isMouseDown = false;
		this.startX = -1;
		this.startY = -1;
		
	}
	
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

//实现全屏结束

//首页index轮播效果
var delay = 2000;
var curImgIdx = 0;
var timer = setInterval(function() {
    if (curImgIdx == $(".boxi").length - 1) {
        curImgIdx = 0;
        $(".boxi").eq(curImgIdx).fadeIn(0).siblings(".boxi").fadeOut(0);
        //clearInterval(timer)
    } else {
        curImgIdx++;
        $(".boxi").eq(curImgIdx).fadeIn(0).siblings(".boxi").fadeOut(0);
    }
},
delay);

function changeToImg(imgsCount, idxAddNum)
{
	//alert(curImgIdx + " + (" + idxAddNum + ") ? " + (imgsCount - 1));
	if(curImgIdx + idxAddNum >= 0 && curImgIdx + idxAddNum < imgsCount - 1)
	{
		//alert(curImgIdx + "] + [" + idxAddNum);
		curImgIdx += idxAddNum;
		//$(".boxi").eq(curImgIdx).fadeIn(0).siblings(".boxi").fadeOut(0);//这段代码没有起作用
		
		//alert("invoked");
	}
}