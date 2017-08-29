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
		
		if(!!maskDiv){
			ext_upload_pieces.prototype.maskDiv = maskDiv;
			ext_upload_pieces.prototype.maskDiv.style.display = "block";//显示蒙版
		}
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
			ext_upload_pieces.prototype.setImage(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
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
			ext_upload_pieces.prototype.setImage(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
			//alert("右转结束");
		};
		if(null != ext_upload_pieces.prototype.saveTransformBtn){
			ext_upload_pieces.prototype.saveTransformBtn.onclick = function(){
				//关闭时，重新绘制一次，并保存像素到canvas
				var _curCanvas = ext_upload_pieces.prototype.canvas_transform;
				var _image = ext_upload_pieces.prototype.img_loc;
				var _translX = ext_upload_pieces.prototype.transPara.lastTransX;
				var _translY = ext_upload_pieces.prototype.transPara.lastTransY;
				var _scale = ext_upload_pieces.prototype.transPara.lastScale;
				var _angle = ext_upload_pieces.prototype.transPara.lastAngle;
				ext_upload_pieces.prototype.setImage(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
		
				ext_upload_pieces.prototype.endFunc();
		
				setTimeout(function(){
					//最后关闭此界面
					//alert("drawing end, prepare to hide it!");
					if(!!maskDiv){
						ext_upload_pieces.prototype.maskDiv.style.display = "none";
					}
					ext_upload_pieces.prototype.resetPara2();//重置参数
				},500);
			};
		}
	
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
			e.preventDefault();
		
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
					ext_upload_pieces.prototype.setImage(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
				
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
					ext_upload_pieces.prototype.setImage(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
				
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
		ext_upload_pieces.prototype.setImage(_curCanvas, _image, _translX, _translY, _scale, _angle, false);
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
	
	
	ext_upload_pieces.prototype.TransMatrix = function(a, b, c, d, e, f){
		this.X11 = a;
		this.X12 = b;
		this.X13 = c;
		this.X21 = d;
		this.X22 = e;
		this.X23 = f;
		this.X31 = 0;
		this.X32 = 0;
		this.X33 = 1;
	}
	
	ext_upload_pieces.prototype.multiplyTransform = function(transMatrix1, transMatrix2){
		var rlt = new ext_upload_pieces.prototype.TransMatrix();
		rlt.X11 = transMatrix1.X11*transMatrix2.X11 + transMatrix1.X12*transMatrix2.X21 + transMatrix1.X13*transMatrix2.X31;
		rlt.X12 = transMatrix1.X11*transMatrix2.X12 + transMatrix1.X12*transMatrix2.X22 + transMatrix1.X13*transMatrix2.X32;
		rlt.X13 = transMatrix1.X11*transMatrix2.X13 + transMatrix1.X12*transMatrix2.X23 + transMatrix1.X13*transMatrix2.X33;
		
		rlt.X21 = transMatrix1.X21*transMatrix2.X11 + transMatrix1.X22*transMatrix2.X21 + transMatrix1.X23*transMatrix2.X31;
		rlt.X22 = transMatrix1.X21*transMatrix2.X12 + transMatrix1.X22*transMatrix2.X22 + transMatrix1.X23*transMatrix2.X32;
		rlt.X23 = transMatrix1.X21*transMatrix2.X13 + transMatrix1.X22*transMatrix2.X23 + transMatrix1.X23*transMatrix2.X33;
		
		rlt.X31 = 0;
		rlt.X32 = 0;
		rlt.X33 = 1;
		
		return rlt;
	}
	
	/**
	* Detecting vertical squash in loaded image.
	* Fixes a bug which squash image vertically while drawing into canvas for some images.
	*/
	ext_upload_pieces.prototype.detectVerticalSquash = function (img, ih) {
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
			py = (ey + sy) >> 1;
		}
		var ratio = (py / ih);
		return (ratio===0)?1:ratio;
	}
	
	ext_upload_pieces.prototype.setImage = function(_canvas, _image, _transX, _transY, _scale, _angle, doSave){
		ext_upload_pieces.prototype._ctx.save();
		
		//计算tranlate
		var d = Math.sqrt(Math.pow(_canvas.offsetWidth/2, 2) + Math.pow(_canvas.offsetHeight/2, 2));
		var tmpAngle = Math.atan2(_canvas.offsetHeight/2, _canvas.offsetWidth/2);
		var xTrans = d * Math.cos(tmpAngle + _angle);
		var yTrans = d * Math.sin(tmpAngle + _angle);
		var xTransIni = d * Math.cos(tmpAngle);
		var yTransIni = d * Math.sin(tmpAngle);
		
		//初始矩阵
		var forTransMarix = new ext_upload_pieces.prototype.TransMatrix(1, 0, 0, 0, 1, 0);
		
		//alert("(" + _image.offsetWidth + ", " + _image.offsetHeight + ")");
		
		//1. 缩放
		_scale = _scale * (_canvas.offsetWidth / _image.offsetWidth);
		var _scaleX = _scale;
		var _scaleY = _scale / ext_upload_pieces.prototype.detectVerticalSquash(_image, _canvas.offsetHeight);
		ext_upload_pieces.prototype._ctx.clearRect(0, 0, _canvas.offsetWidth, _canvas.offsetHeight);
		var sxTransMatrix = new ext_upload_pieces.prototype.TransMatrix(_scaleX, 0, 0, 0, _scaleY, 0);
		forTransMarix = ext_upload_pieces.prototype.multiplyTransform(forTransMarix, sxTransMatrix);
		
		
		//2. 移动
		var centerX = _canvas.width/2;
		var centerY = _canvas.height/2;
		
		var _new_translX = 0; 
		_new_translX = Math.floor( (_transX + (centerX - xTrans)) / _scaleX ); //中心调整到原点=>进行旋转
		var _new_translY = 0;
		_new_translY = Math.floor( (_transY + (centerY - yTrans)) / _scaleY ); //中心调整到原点=>进行旋转
		//添加并合并translate矩阵的效果
		var tTransMatrix = new ext_upload_pieces.prototype.TransMatrix(1, 0, _new_translX, 0, 1, _new_translY);
		forTransMarix = ext_upload_pieces.prototype.multiplyTransform(forTransMarix, tTransMatrix);
		
		
		//3. 旋转
		//create rotate matrix
		var rTransMatrix = new ext_upload_pieces.prototype.TransMatrix(1* Math.cos(_angle), -1*Math.sin(_angle), 0, Math.sin(_angle), 1* Math.cos(_angle), 0);
		forTransMarix = ext_upload_pieces.prototype.multiplyTransform(forTransMarix, rTransMatrix);
		
		//4. 中心位移偏移
		var targetCenterY = _image.offsetHeight/2;
		var targetCenterX = _image.offsetWidth/2;
		var initThy = Math.atan(targetCenterY/targetCenterX);
		var len = Math.sqrt(Math.pow(targetCenterY, 2) + Math.pow(targetCenterX, 2));
		var nowCenterX = len * Math.cos(initThy - _angle);
		var nowCenterY = len * Math.sin(initThy - _angle);
		var resetT_TransMatrix = new ext_upload_pieces.prototype.TransMatrix(1, 0, (targetCenterX - nowCenterX), 0, 1, (targetCenterY - nowCenterY));
		
		forTransMarix = ext_upload_pieces.prototype.multiplyTransform(forTransMarix, resetT_TransMatrix);
		
		//5. 开始画图
		ext_upload_pieces.prototype._ctx.clearRect(0, 0, _canvas.offsetWidth, _canvas.offsetHeight);
		ext_upload_pieces.prototype._ctx.setTransform(forTransMarix.X11, forTransMarix.X12, forTransMarix.X21, forTransMarix.X22, forTransMarix.X13, forTransMarix.X23);
		ext_upload_pieces.prototype._ctx.drawImage(_image, 0, 0);
		
		
		
		//保存当前画图
		if(!doSave) {
			ext_upload_pieces.prototype._ctx.restore();
		}
		else{
			ext_upload_pieces.prototype._ctx.save();
		}
	};