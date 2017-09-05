/**
*为蒙版准备的代码
*输入1:".btn-turnleft"元素(左转90度)
*输入2:".btn-turnright"(右转90度)
*输入3:".btn-save-transfrom"(关闭此蒙版)
*输入4:".main-img"(原图img标签)
*输入5:".canvas-tranform"(可拖动的Canvas图片区域)
*输入6:".img-transfrom-Layer"(显示此蒙版, 或关闭此蒙版)

*输出1:".canvas-tranform"
*输出2: initload();
*/
	var ext_upload_pieces = function(){};
	ext_upload_pieces.prototype.maskDiv = null;
	//可拖动的图片(图片transform区域内)
	ext_upload_pieces.prototype.canvas_transform = null;
	ext_upload_pieces.prototype.endFunc = null;
	ext_upload_pieces.prototype.img_loc = null;
	
	ext_upload_pieces.prototype.turnLeftBtn = null;
	ext_upload_pieces.prototype.turnRightBtn = null;
	
	
	
	ext_upload_pieces.prototype.initload = function(canvasTrans, imgData, maskDiv, turnLeftBtn, turnRightBtn, saveTransformBtn, endFunc){
		ext_upload_pieces.prototype.resetPara2();//重置参数
		
		ext_upload_pieces.prototype.endFunc = endFunc;//记录蒙版的关闭回调
		
		ext_upload_pieces.prototype.maskDiv = maskDiv;
		ext_upload_pieces.prototype.maskDiv.style.display = "block";//显示蒙版
		
		//记录操作canvas的宽高
		ext_upload_pieces.prototype.canvas_transform = canvasTrans;
		ext_upload_pieces.prototype.yct_w = ext_upload_pieces.prototype.canvas_transform.offsetWidth;//520
		ext_upload_pieces.prototype.yct_h = ext_upload_pieces.prototype.canvas_transform.offsetHeight;//748
		
		//记录-左转/右转-按钮
		ext_upload_pieces.prototype.turnLeftBtn = turnLeftBtn;
		ext_upload_pieces.prototype.turnRightBtn = turnRightBtn;
		ext_upload_pieces.prototype.saveTransformBtn = saveTransformBtn;
		
		ext_upload_pieces.prototype.img_loc = imgData;
		
		//------------------------------------------------------------------------------------------------------------------------
		//elem operation binding:-------------------------------------------------------------------------------------------------
		//------------------------------------------------------------------------------------------------------------------------
		ext_upload_pieces.prototype.turnLeftBtn.onclick = function(){
			//左转90度
			//alert("左转开始");
			ext_upload_pieces.prototype.transPara.lastAngle += 3 * Math.PI / 2;
		
			var _curCanvas = ext_upload_pieces.prototype.canvas_transform;
			var _image = ext_upload_pieces.prototype.img_loc;
		
			var _translX = ext_upload_pieces.prototype.transPara.lastTransX;
			var _translY = ext_upload_pieces.prototype.transPara.lastTransY;
			var _scale = ext_upload_pieces.prototype.transPara.lastScale;
			var _angle = ext_upload_pieces.prototype.transPara.lastAngle;
			//alert("左转2:" + _curCanvas + "," + _image + "," + _translX + "," + _translY + "," + _scale + "," + _angle);
			ext_upload_pieces.prototype.setImage2(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
			//alert("左转结束");
		};
		ext_upload_pieces.prototype.turnRightBtn.onclick = function(){
			//右转90度
			ext_upload_pieces.prototype.transPara.lastAngle += Math.PI / 2;
		
			var _curCanvas = ext_upload_pieces.prototype.canvas_transform;
			var _image = ext_upload_pieces.prototype.img_loc;
		
			var _translX = ext_upload_pieces.prototype.transPara.lastTransX;
			var _translY = ext_upload_pieces.prototype.transPara.lastTransY;
			var _scale = ext_upload_pieces.prototype.transPara.lastScale;
			var _angle = ext_upload_pieces.prototype.transPara.lastAngle;
			ext_upload_pieces.prototype.setImage2(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
			//alert("右转结束");
		};
		ext_upload_pieces.prototype.saveTransformBtn.onclick = function(){
			//关闭时，重新绘制一次，并保存像素到canvas
			var _curCanvas = ext_upload_pieces.prototype.canvas_transform;
			var _image = ext_upload_pieces.prototype.img_loc;
			var _translX = ext_upload_pieces.prototype.transPara.lastTransX;
			var _translY = ext_upload_pieces.prototype.transPara.lastTransY;
			var _scale = ext_upload_pieces.prototype.transPara.lastScale;
			var _angle = ext_upload_pieces.prototype.transPara.lastAngle;
			ext_upload_pieces.prototype.setImage2(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
		
			ext_upload_pieces.prototype.endFunc();
		
			setTimeout(function(){
				//最后关闭此界面
				//alert("drawing end, prepare to hide it!");
				ext_upload_pieces.prototype.maskDiv.style.display = "none";
			
				ext_upload_pieces.prototype.resetPara2();//重置参数
			},500);
		};
	
	
		//触点按下事件
		ext_upload_pieces.prototype.canvas_transform.addEventListener("touchstart", function(e){
			if(!e.touches) return;
			e.preventDefault();
		
			if(2 === e.touches.length){
				//判断为两个触点，可以进行缩放了
				ext_upload_pieces.prototype.transPara.canScaleNow = true;
				ext_upload_pieces.prototype.transPara.canTranslateNow = false;
			}
			else if(1 === e.touches.length){//判断为一个触点，可以进行拖放了
				ext_upload_pieces.prototype.transPara.canScaleNow = false;
				ext_upload_pieces.prototype.transPara.canTranslateNow = true;
			
				ext_upload_pieces.prototype.transPara.fisrtTouchX = e.touches[0].pageX;
				ext_upload_pieces.prototype.transPara.fisrtTouchY = e.touches[0].pageY;
			}
		});
	
		//触点移动事件
		ext_upload_pieces.prototype.canvas_transform.addEventListener("touchmove", function(e){
			if(!e.touches) return;
			//e.preventDefault();
		
			if(ext_upload_pieces.prototype.transPara.canScaleNow){
			
				if(0 === ext_upload_pieces.prototype.transPara.fisrtScaleDis){//第一次，记录初始距离
				
					var disX = e.touches[0].pageX - e.touches[1].pageX;
					var disY = e.touches[0].pageY - e.touches[1].pageY;
					ext_upload_pieces.prototype.transPara.fisrtScaleDis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
				}
				else{//可以开始进行伸缩变换啦
				
					var curDisX = (e.touches[0].pageX - e.touches[1].pageX);
					var curDisY = (e.touches[0].pageY - e.touches[1].pageY);
					var curDis = Math.sqrt(Math.pow(curDisX, 2) + Math.pow(curDisY, 2));
				
					//按照当前两点距离与初始距离的比值，进行图片伸缩
					//var angle = "";//转角
					var scale = curDis / ext_upload_pieces.prototype.transPara.fisrtScaleDis;// +  ext_upload_pieces.prototype.transPara.lastScale;
				
					scale = scale * ext_upload_pieces.prototype.transPara.lastScale;
					if(scale > ext_upload_pieces.prototype.transPara.maxScale //[minscale, maxScale] => go
						|| scale < ext_upload_pieces.prototype.transPara.minScale){
						return;
					}
				
					ext_upload_pieces.prototype.transPara.curScale = scale;
				
					var _curCanvas = ext_upload_pieces.prototype.canvas_transform;
					//var _image = img_loc_resized;
					var _image = ext_upload_pieces.prototype.img_loc;
					var _translX = ext_upload_pieces.prototype.transPara.curTransX;
					var _translY = ext_upload_pieces.prototype.transPara.curTransY;
					var _scale = ext_upload_pieces.prototype.transPara.curScale;
					var _angle = ext_upload_pieces.prototype.transPara.lastAngle;
					ext_upload_pieces.prototype.setImage2(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
				
					//打印操作信息
					//document.getElementsByClassName("span-scroll-info")[0].innerHTML = "lastTransX:" + ext_upload_pieces.prototype.transPara.lastTransX + ", lastTransY:" +  ext_upload_pieces.prototype.transPara.lastTransY + ", lastScale:" + ext_upload_pieces.prototype.transPara.lastScale + ", lastAngle:" + ext_upload_pieces.prototype.transPara.lastAngle;
				}
			
			}
			else if(ext_upload_pieces.prototype.transPara.canTranslateNow){
				var rate = 1;
				{
					var transX = (e.touches[0].pageX - ext_upload_pieces.prototype.transPara.fisrtTouchX) * rate;
					var transY = (e.touches[0].pageY - ext_upload_pieces.prototype.transPara.fisrtTouchY) * rate;
				
					//第一次需要加上上一次的trans位移
					transX += ext_upload_pieces.prototype.transPara.lastTransX;
					transY += ext_upload_pieces.prototype.transPara.lastTransY;
				
					ext_upload_pieces.prototype.transPara.curTransX = transX;
					ext_upload_pieces.prototype.transPara.curTransY = transY;
				
					var _curCanvas = ext_upload_pieces.prototype.canvas_transform;
					//var _image = img_loc_resized;
					var _image = ext_upload_pieces.prototype.img_loc;
					var _translX = ext_upload_pieces.prototype.transPara.curTransX;
					var _translY = ext_upload_pieces.prototype.transPara.curTransY;
					var _scale = ext_upload_pieces.prototype.transPara.curScale;
					var _angle = ext_upload_pieces.prototype.transPara.lastAngle;
					ext_upload_pieces.prototype.setImage2(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
				
					//打印操作信息
					//document.getElementsByClassName("span-scroll-info")[0].innerHTML = "lastTransX:" + ext_upload_pieces.prototype.transPara.lastTransX + ", lastTransY:" +  ext_upload_pieces.prototype.transPara.lastTransY;
				}

			}
		});
		//触点拿起事件
		ext_upload_pieces.prototype.canvas_transform.addEventListener("touchend", function(e){
			if(!e.touches) return;
			e.preventDefault();
		
			{
				//停止伸缩
				ext_upload_pieces.prototype.transPara.canScaleNow = false;
				ext_upload_pieces.prototype.transPara.fisrtScaleDis = 0;
				ext_upload_pieces.prototype.transPara.lastScale = ext_upload_pieces.prototype.transPara.curScale;
			
				//停止移动
				ext_upload_pieces.prototype.transPara.canTranslateNow = false;
				ext_upload_pieces.prototype.transPara.fisrtTouchX = 0;//上次的单触点的X(为求"缩放参数"的X子参数)
				ext_upload_pieces.prototype.transPara.fisrtTouchY = 0;//上次的单触点的Y(为求"缩放参数"的Y子参数)
				//ext_upload_pieces.prototype.transPara.lastTransX = 0;
				//ext_upload_pieces.prototype.transPara.lastTransY = 0;
				ext_upload_pieces.prototype.transPara.lastTransX = ext_upload_pieces.prototype.transPara.curTransX;//记录上一次的图像X方向的位移
				ext_upload_pieces.prototype.transPara.lastTransY = ext_upload_pieces.prototype.transPara.curTransY;//记录上一次的图像Y方向的位移
			
			}
		
		});
		ext_upload_pieces.prototype._ctx = ext_upload_pieces.prototype.canvas_transform.getContext("2d");
	
		//------------------------------------------------------------------------------------------------------------------------
		//elem operation binding end:-------------------------------------------------------------------------------------------------
		//------------------------------------------------------------------------------------------------------------------------
	
		
		//第一次画图
		var _curCanvas = canvasTrans;
		
		var _image = ext_upload_pieces.prototype.img_loc;
		
		var _translX = ext_upload_pieces.prototype.transPara.lastTransX;
		var _translY = ext_upload_pieces.prototype.transPara.lastTransY;
		var _scale = ext_upload_pieces.prototype.transPara.lastScale;
		var _angle = ext_upload_pieces.prototype.transPara.lastAngle;
		ext_upload_pieces.prototype.setImage2(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
	};

	//........................start........................图片手动伸缩/转角/移动代码..........................
	
	//转换参数.................................................
	ext_upload_pieces.prototype.transPara = {maxScale:20,minScale:0.05};
	
	ext_upload_pieces.prototype.resetPara = function(){//重置参数
		//转换参数组1-translate转换参数
		ext_upload_pieces.prototype.transPara.canTranslateNow = false;
		ext_upload_pieces.prototype.transPara.fisrtTouchX = 0;//上次的单触点的X(为求"缩放参数"的X子参数)
		ext_upload_pieces.prototype.transPara.fisrtTouchY = 0;//上次的单触点的Y(为求"缩放参数"的Y子参数)
		ext_upload_pieces.prototype.transPara.lastTransX = 0;//上一次的图像X方向的位移
		ext_upload_pieces.prototype.transPara.lastTransY = 0;//上一次的图像Y方向的位移
		ext_upload_pieces.prototype.transPara.curTransX = 0;
		ext_upload_pieces.prototype.transPara.curTransY = 0;
		
		//转换参数组2-rotate转换参数
		ext_upload_pieces.prototype.transPara.canTranslateNow = false;
		ext_upload_pieces.prototype.transPara.lastAngle = 0;//转角
		
		//转换参数组3-scale转换参数(0.2 <= scale <= 5)
		ext_upload_pieces.prototype.transPara.canScaleNow = false;//是否已进行缩放操作了
		ext_upload_pieces.prototype.transPara.lastScale = 1;//上一次的缩放操作周期结束的"缩放参数"
		ext_upload_pieces.prototype.transPara.curScale = 1;
		ext_upload_pieces.prototype.transPara.fisrtScaleDis = 0;//上次的两触点的距离(为求"缩放参数"的子参数)
	}
	ext_upload_pieces.prototype.resetPara2 = function(){
		ext_upload_pieces.prototype.resetPara();
		//清空画布的像素
		var _curCanvas = ext_upload_pieces.prototype.canvas_transform;
		if(!!_curCanvas){
			_curCanvas.getContext("2d").clearRect(0, 0, _curCanvas.width, _curCanvas.height);
		}
	}
	
	ext_upload_pieces.prototype.detectVerticalSquash = function(img) {
		var iw = img.naturalWidth, ih = img.naturalHeight;
		var canvas = document.createElement('canvas');
		canvas.width = 1;
		canvas.height = ih;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);
		var data = ctx.getImageData(0, 0, 1, ih).data;
		// search image edge pixel position in case it is squashed vertically.
		var sy = 0;
		var ey = ih;
		var py = ih;
		while (py > sy) {
			var alpha = data[(py - 1) * 4 + 3];
			if (alpha === 0) {
				ey = py;
			} else {
				sy = py;
			}
			py = (ey + sy) >> 1;//除2取整  => 两头查找 startY (pointY) endY 折半查找算法, py == sy时; 到达边界
		}
		var ratio = (py / ih);
		return (ratio===0)?1:ratio;
	}
	
	ext_upload_pieces.prototype.setImage2 = function(_canvas, _image, _transX, _transY, _scale, _angle, doSave){
		ctx2 = _canvas.getContext("2d");
		
		//_canvas 旋转画图
		ctx2.clearRect(0, 0, _canvas.width, _canvas.height);
		ctx2.save();
		
		ctx2.beginPath();//中和偏移的实验
		var r = Math.sqrt( _image.width*_image.width + _image.height*_image.height );
		ctx2.arc(_canvas.width / 2 + _transX, _canvas.height / 2 + _transY, r, 0, 2 * Math.PI, true);
		ctx2.closePath();
		ctx2.stroke();
		
		ctx2.beginPath();
		var r2 = Math.sqrt( _image.width*_image.width + _image.height*_image.height ) / 2;
		ctx2.arc(_canvas.width / 2 + _transX, _canvas.height / 2 + _transY, r2, 0, 2 * Math.PI, true);
		ctx2.closePath();
		ctx2.stroke();
		
		
		var ua = navigator.userAgent.toLowerCase();
		var sRate = 1;
		if(ua.indexOf("iphone") > -1){//在iphone上要进行的特殊处理
			sRate = ext_upload_pieces.prototype.detectVerticalSquash(_image);
			
			//iphone5
			if(_image.width == 2448 && _image.height == 3264){//iphone5 - 纵向照片
				_angle += Math.PI / 2;
			}
			else if(_image.width == 3264 && _image.height == 2448){//iphone5 - 横向照片
				_angle += Math.PI;
			}
			
			//iphone4
		}
		
		var theta = Math.atan(_image.height / _image.width) + parseFloat(_angle);
		//document.getElementsByClassName("span-info2")[0].innerHTML = theta + "; " + _scale + "; translate(" + _transX + "," + _transY + ")";
		ctx2.translate(parseFloat(_transX) + _canvas.width/2 - r2*Math.cos(theta)*parseFloat(_scale), parseFloat(_transY) + _canvas.height/2 - r2*Math.sin(theta)*parseFloat(_scale));
		
		ctx2.rotate(_angle);
		ctx2.scale(parseFloat(_scale), parseFloat(_scale));
		
		/*//区域测试
		ctx2.beginPath();
		ctx2.rect( 0, 0, _image.width, _image.height);
		ctx2.fillStyle = 'white';
		ctx2.fill();
		ctx2.lineWidth = 3;
		ctx2.strokeStyle = 'red';
		ctx2.stroke();*/
		//alert(_image.width + "," + _image.height);
		
		if(ua.indexOf("iphone") == -1){
			ctx2.drawImage(_image, 0, 0, _image.width, _image.height, 0, 0, _image.width, _image.height);
		}
		else{
			if(_image.width <= _image.height 
				&& _image.width == 2448 && _image.height == 3264){//纵向照片的处理(iphone5-2448*3264)
				var offX = (_image.height - _image.width) / 2;
				var offY = (_image.height - _image.width) / 2;
				ctx2.drawImage(_image, 0, 0, _image.height*sRate, _image.width*sRate, -1*offX, offY, _image.height, _image.width);
			}
			else if(_image.width <= _image.height 
				&& _image.width == 1936 && _image.height == 2592){//纵向照片的处理(iphone4-1936*2592)
				var offX = (_image.height - _image.width) / 2;
				var offY = (_image.height - _image.width) / 2;
				ctx2.drawImage(_image, 0, 0, _image.height*sRate, _image.width*sRate, -1*offX, offY, _image.height, _image.width);
			}
			else if(_image.width <= _image.height 
				&& _image.width == 480 && _image.height == 640){//纵向照片的处理(iphone4-480*640) =>有高度方向的截断，但不知道为什么
				var offX = (_image.height - _image.width) / 2;
				var offY = (_image.height - _image.width) / 2;
				//ctx2.drawImage(_image, 0, 0, _image.height*sRate, _image.width*sRate, 0, 0, _image.height, _image.width);
				ctx2.drawImage(_image, 0, 0, _image.height*sRate, _image.height*sRate, -1*offX, 0, _image.height, _image.height);
			}
			else{//非3264的纵向照片的处理
				//ctx2.drawImage(_image, 0, 0, _image.width*sRate, _image.height*sRate, 0, 0, _image.width, _image.height);
				ctx2.drawImage(_image, 0, 0, _image.width, _image.height, 0, 0, _image.width, _image.height);
			}
		}
		//ctx2.drawImage(_image, 0, 0, _image.width, _image.height, 0, 0, _image.width, _image.height);
		// 1936 * 2592
		
		
		if(doSave){
			ctx2.save();
		}
		else{
			ctx2.restore();
		}
	}
	
	ext_upload_pieces.prototype.setImage = function(_canvas, _image, _transX, _transY, _scale, _angle, doSave){
		//document.getElementsByClassName("span-scroll-info")[0].innerHTML = "_transX:" + _transX + ", _transY:" +  _transY + "; _scale:" + _scale + "; _angle:" + _angle;
		//document.getElementsByClassName("span-scroll-info")[0].innerHTML += "</br>canvas' width:" + _canvas.width + ", height:" + _canvas.height;
		//document.getElementsByClassName("span-scroll-info")[0].innerHTML = "_image.offsetWidth:" + _image.offsetWidth + ", _image.offsetHeight:" + _image.offsetHeight;
		
		//计算tranlate
		var d = Math.sqrt(Math.pow(_canvas.offsetWidth/2, 2) + Math.pow(_canvas.offsetHeight/2, 2));
		var tmpAngle = Math.atan2(_canvas.offsetHeight/2, _canvas.offsetWidth/2);
		var xTrans = d * Math.cos(tmpAngle + _angle);
		var yTrans = d * Math.sin(tmpAngle + _angle);
		var xTransIni = d * Math.cos(tmpAngle);
		var yTransIni = d * Math.sin(tmpAngle);
		
		
		
		//1. 缩放
		ext_upload_pieces.prototype._ctx.save();
		var _maxScale = ext_upload_pieces.prototype.transPara.maxScale;
		ext_upload_pieces.prototype._ctx.clearRect(0, 0, _image.offsetWidth, _image.offsetHeight);
		
		//alert("开始缩放");
		var ua = window.navigator.userAgent.toLowerCase();
		var uaFoo = ua;
		if(ua.indexOf("iphone") >= 0 || uaFoo.indexOf("iphone") >= 0){//不是截图图片
			if(0 === _image.offsetWidth % 320 || 0 === _image.offsetHeight % 320){
				ext_upload_pieces.prototype._ctx.scale(_scale, _scale);
			}
			else if(_angle%Math.PI > -0.01 && _angle%Math.PI < 0.01){ 
				if(_image.offsetWidth < _image.offsetHeight && _image.offsetWidth > 320){
					ext_upload_pieces.prototype._ctx.scale(_scale, _scale * (_image.offsetHeight / _image.offsetWidth));
					//_ctx.scale(_scale, _scale);
				}
				else if(_image.offsetWidth > _image.offsetHeight && _image.offsetHeight > 320){
					ext_upload_pieces.prototype._ctx.scale(_scale, _scale * (_image.offsetWidth / _image.offsetHeight));
					//_ctx.scale(_scale, _scale);
				}
				else{
					ext_upload_pieces.prototype._ctx.scale(_scale, _scale);
				}
			}
			else{
				if(_image.offsetWidth < _image.offsetHeight && _image.offsetWidth > 320){
					ext_upload_pieces.prototype._ctx.scale(_scale * (_image.offsetHeight / _image.offsetWidth), _scale);
					//_ctx.scale(_scale, _scale);
				}
				else if(_image.offsetWidth > _image.offsetHeight && _image.offsetHeight > 320){
					ext_upload_pieces.prototype._ctx.scale(_scale * (_image.offsetWidth / _image.offsetHeight), _scale);
					//_ctx.scale(_scale, _scale);
				}
				else{
					ext_upload_pieces.prototype._ctx.scale(_scale, _scale);
				}
			}
		}
		else{
			ext_upload_pieces.prototype._ctx.scale(_scale, _scale);
		}
		
		
		var centerX = _canvas.width/2;
		var centerY = _canvas.height/2;
		
		
		//2. 移动与旋转
		//ext_upload_pieces.prototype._ctx.save();
		
		//alert("开始位移");
		var _new_translX = 0; 
		_new_translX = Math.floor( (_transX + (centerX - xTrans)) / _scale ); //中心调整到原点=>进行旋转
		var _new_translY = 0;
		_new_translY = Math.floor( (_transY + (centerY - yTrans)) / _scale ); //中心调整到原点=>进行旋转
		
		ext_upload_pieces.prototype._ctx.translate(_new_translX, _new_translY);
		
		
		var viewImgWidth = _image.offsetWidth;
		var viewImgHeight = _image.offsetHeight;
		
		//alert("开始旋转");
		if(ua.indexOf("iphone") >= 0 || uaFoo.indexOf("iphone") >= 0){
			ext_upload_pieces.prototype._ctx.rotate(_angle);
		}
		else{
			ext_upload_pieces.prototype._ctx.rotate(_angle);
		}
		
		//alert("开始画图")
		if(ua.indexOf("iphone") >= 0 || uaFoo.indexOf("iphone") >= 0){
			if(_angle%Math.PI > -0.01 && _angle%Math.PI < 0.01){
				if (_image.offsetWidth < _image.offsetHeight) {
					ext_upload_pieces.prototype._ctx.drawImage(_image, 0, 0);
				}
				else {
					ext_upload_pieces.prototype._ctx.drawImage(_image, 0, 0);
				}
			}
			else {
				if(_image.offsetWidth < _image.offsetHeight){
					ext_upload_pieces.prototype._ctx.drawImage(_image, 0, 0);
				}
				else{
					ext_upload_pieces.prototype._ctx.drawImage(_image, 0, 0);
				}
			}
		}
		else {
			ext_upload_pieces.prototype._ctx.drawImage(_image, 0, 0, viewImgHeight, viewImgHeight);
		}
		//alert("画图结束")
		
		//保存当前画图
		if(!doSave) {
			ext_upload_pieces.prototype._ctx.restore();
		}
		else{
			ext_upload_pieces.prototype._ctx.save();
		}
	};