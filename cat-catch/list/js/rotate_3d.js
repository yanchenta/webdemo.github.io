	/*.................start...............3d旋转的参数区域.............start...............*/
	//半径
	var radius = 247;//半径
	var perimeter = 2 * Math.PI * radius;//周长
	
	//各元素
	var img1 = document.getElementsByClassName("img-1")[0];
	var img2 = document.getElementsByClassName("img-2")[0];
	var img3 = document.getElementsByClassName("img-3")[0];
	var img4 = document.getElementsByClassName("img-4")[0];
	var img5 = document.getElementsByClassName("img-5")[0];
	var images = [img5, img4, img3, img2, img1];
	var img_cnt = images.length;
	window._elems = images;
	
	//相位 =>动画变量 弧度值
	var thy = 0;//旋转的全局相位偏移
	var lastPosX = -1;//上一个触点
	var speedRate = 10;//触屏移动的线速度与旋转角速度的转化比
	var isMoved = false;//防止单击而不触发touchmove的事件，导致touchend较位错误
	var list_images = document.getElementsByClassName("list-images")[0];//滑动区域
	var maxScale = 1.2;
	var yz_K = 0.5;
	/*..................end..............3d旋转的参数区域............end................*/
	
	function init3dRotateAnnimation(_touchArea, _radius){
		//各元素初始角度值
		//var theta1 = Math.PI / 2;
		//var theta2 = 1/img_cnt * 2 * Math.PI + Math.PI / 2;
		//var theta3 = 2/img_cnt * 2 * Math.PI + Math.PI / 2;
		//var theta4 = 3/img_cnt * 2 * Math.PI + Math.PI / 2;
		//var theta5 = 4/img_cnt * 2 * Math.PI + Math.PI / 2;
		//var imgThetas = [theta1, theta2, theta3, theta4, theta5];
		var imgThetas = [];
		var img_cnt = window._elems.length;
		for(var i = 0; i < img_cnt; i++){
			imgThetas.push( i / img_cnt * 2 * Math.PI + Math.PI / 2);
		}
		
		//设置元素定位与其他参数信息
		window.setElementStyle = function(_thy){
			//document.getElementById("debug").innerHTML = _thy;//window._elems[i].style.webkitTransform;
			
			for(var i = 0; i < window._elems.length; i++){
				//设置translate (X,Y)信息
				var xl = Math.floor(_radius * Math.cos(imgThetas[i] + _thy)) + 50;//怎么有个偏移？
				var zl = Math.floor(_radius * Math.sin(imgThetas[i] + _thy) * yz_K);
				//为elem创建translate-transform
				var tTranStr = 'translate(' + xl + 'px, ' + zl + 'px);';
				
				//设置scale信息
				//alert(imgThetas[i] + _thy);
				//var scale = Math.floor(1.2726/(1.283 - Math.sin(imgThetas[i] + _thy)));
				var sizeRate = 1 / (2 - Math.sin(imgThetas[i] + _thy));
				var scale = maxScale * sizeRate;
				scale = Math.floor(scale * 100) / 100;
				
				//为elem创建scale-transform
				var sTranStr = 'scale(' + scale + ')';
				//对Transform赋值;
				
				//alert((tTranStr + ' ' + sTranStr) + "\n translate(100px,-100px) scale(1.5)");
				//window._elems[i].style.webkitTransform = (tTranStr + ' ' + sTranStr);
				//window._elems[i].style.webkitTransform = 'translate(100px,-100px) scale(1.5)';
				//有一个从0状态变化到target状态的问题
				window._elems[i].style.webkitTransform = 'translate(' + xl + 'px,' + zl + 'px) scale(' + scale + ')';
				var _opacity = Math.floor(sizeRate * 100) / 100;
				_opacity = Math.log(_opacity) + 0.32 * _opacity + 0.808;
				
				if(_opacity < 0) {
					_opacity = 0;
				}
				else if(_opacity > 1) {
					_opacity = 1;
				}
				window._elems[i].style.opacity = _opacity;
				
				window._elems[i].selfThy = imgThetas[i] + _thy;
				
				//也许需要的opacity设置
				//alert("window._elems[i].style.webkitTransform = " + window._elems[i].style.webkitTransform);
				
				//对层的设置
			}
		}
		
		
		
		_touchArea.addEventListener("touchstart", function(e){
			e.preventDefault();
			//...
			//thy += Math.PI / 2;
		}, false);

		_touchArea.addEventListener("touchmove", function(e){
			e.preventDefault();
			//curPosX - lastPosX
			//alert(!!e + "&&" + !!e.touches + "&&" + e.touches.length);
			if(!!e && !!e.touches && 1 === e.touches.length){
				if(-1 !== lastPosX) {
					//获取移动距离，转化为弧度值的角速度
					var thyPlus = (lastPosX - e.touches[0].pageX) / perimeter;
					thyPlus = thyPlus * speedRate;
					thy += thyPlus;//计算相位thy
					window.setElementStyle(thy);
				}
				lastPosX = e.touches[0].pageX;
				
				//设置Title
				var maxOpacity = -1;
				for(var i = 0; i < window._elems.length; i++){
					if(window._elems[i].style.opacity > maxOpacity){
						maxOpacity = window._elems[i].style.opacity;
						curImgIdx = i;
					}
				}
				setTitle();
			
				isMoved = true;
			}
		}, false);
		_touchArea.addEventListener("touchend", function(e){
			e.preventDefault();
			
			if(!isMoved) return;
			isMoved = false;
			
			//在触摸结束时，按照opacity最大的那个进行前置处理
			var maxOpacity = -1, frontIdx = -1;
			for(var i = 0; i < window._elems.length; i++){
				if(window._elems[i].style.opacity > maxOpacity){
					maxOpacity = window._elems[i].style.opacity;
					frontIdx = i;
				}
			}
			if(maxOpacity < 0) return;
			
			//alert(frontIdx + ":" + maxOpacity);
			//alert(window._elems[frontIdx].selfThy);
			//计算 旋转结束后让最表面居中的校订角度
			var temp_var1 = Math.floor(window._elems[frontIdx].selfThy / (Math.PI * 2));
			var simpleThy = window._elems[frontIdx].selfThy - temp_var1 * (Math.PI * 2);
			var correctingThy = Math.PI / 2 - window._elems[frontIdx].selfThy;
			//alert(frontIdx + ":" + window._elems[frontIdx].selfThy);
			//alert()
			thy += correctingThy;
			setElementStyle(thy);
			//thy += Math.PI / 2;
			lastPosX = -1;//结束位移计算
		}, false);
		window.onload = function(){
			thy = Math.PI / 2 - 0.33;
			//thy = Math.PI / 2;
			window.setElementStyle(thy);
			resetPage();
					
			if(isChinese){
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_to_cn_page_click);
			}
			else{
				track2(window.codeConsts.channelId, window.codeConsts.Codes.list_to_en_page_click);
			}
		}
	}
	init3dRotateAnnimation(list_images, radius);