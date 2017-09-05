	var ext_upload_pieces = function(){};
	ext_upload_pieces.prototype.getRotateAngle = function(transformStr){
		var stIdx = transformStr.indexOf("rotate(");
		stIdx += 7;
		var endIdx = transformStr.substring(stIdx, transformStr.length).indexOf("deg)") + stIdx;
		
		//alert("rotate angle:" + transformStr.substring(stIdx, endIdx));
		
		return transformStr.substring(stIdx, endIdx);
	}
	ext_upload_pieces.prototype.getScale = function(transformStr){
		var stIdx = transformStr.indexOf("scale(");
		stIdx += 6;
		var endIdx = transformStr.substring(stIdx, transformStr.length).indexOf(")") + stIdx;
		
		//alert("scale:" + transformStr.substring(stIdx, endIdx));
		
		return transformStr.substring(stIdx, endIdx);
	}
	ext_upload_pieces.prototype.currentDirection = 0;
	ext_upload_pieces.prototype.yct_w = 520;
	ext_upload_pieces.prototype.yct_h = 748;
	//var did_keep_verticalShow = false;
	//图片transform区域
	ext_upload_pieces.prototype.div_img_transarea = document.getElementsByClassName("div-img-transform")[0];
	
	//可拖动的图片(图片transform区域内)
	ext_upload_pieces.prototype.img_transform = document.getElementsByClassName("img-tranform")[0];
	ext_upload_pieces.prototype.img_trans_contaner = document.getElementsByClassName("img-tranform-contaner")[0];
		
	//按钮点击 => 打开图片transform区域
	ext_upload_pieces.prototype.btn_open_transarea = document.getElementsByClassName("btn-open-transarea")[0];
	ext_upload_pieces.prototype.btn_open_transarea.onclick = function(){
		//alert(img_loc.offsetHeight + "," + img_loc.offsetWidth);
		//图片伸缩控制 => 设置img_transform的最大宽度或最大高度
		if(img_loc.offsetWidth > img_loc.offsetHeight * (yct_w / yct_h)){
			//按照高度进行伸缩
			img_transform.style.width = "auto";
			img_transform.style.height = yct_h + "px";
			img_transform.iniOritation = 0.5;//初始方向为横向运动(按照高度缩放)
		}
		else{
			//按照宽度进行伸缩
			img_transform.style.width = yct_w + "px";
			img_transform.style.height = "auto";
			img_transform.iniOritation = 0;//初始方向为纵向运动(按照宽度缩放)
		}
		div_img_transarea.style.display = "block";
		img_transform.src = img_loc.src;
		img_transform.curOritation = 0;
		
		//img_transform.style.transform = "rotate(90deg)";
		img_transform.style.webkitTransform = "rotate(0deg) scale(1)";
	};
	ext_upload_pieces.prototype.btn_head_to_left = document.getElementsByClassName("btn-head-to-left")[0];
	ext_upload_pieces.prototype.btn_head_to_left.onclick = function(){
		//左转90
		img_transform.curOritation += 1.5;//转270度
		
		var scale = getScale(img_transform.style.webkitTransform);
		var angle = getRotateAngle(img_transform.style.webkitTransform);
		var centerX = yct_w / 2;
		var centerY = yct_h / 2;
		img_transform.style.webkitTransform = "translate(" + centerX + "px," + centerY + "px) rotate(" + 180 * img_transform.curOritation + "deg) scale(" + scale + ")";
	}
	ext_upload_pieces.prototype.btn_head_to_right = document.getElementsByClassName("btn-head-to-right")[0];
	ext_upload_pieces.prototype.btn_head_to_right.onclick = function(){
		//右转90
		img_transform.curOritation += 0.5;//转90度
		
		var scale = getScale(img_transform.style.webkitTransform);
		var centerX = yct_w / 2;
		var centerY = yct_h / 2;
		img_transform.style.webkitTransform = "translate(" + centerX + "px," + centerY + "px) rotate(" + 180 * img_transform.curOritation + "deg) scale(" + scale + ")";
	}
	
	//........................start........................图片伸缩代码..........................
	ext_upload_pieces.prototype.canScaleNow = false;
	ext_upload_pieces.prototype.lastScale = 1;
	ext_upload_pieces.prototype.fisrtDistVertor = {disX: 0, disY: 0, dis:0};
	ext_upload_pieces.prototype.img_transform.addEventListener("touchstart", function(e){
		if(!!e.touches && 2 === e.touches.length){
			//alert("还有" + e.touches.length + "个触点");
			//alert("可以开始伸缩啦!");
			ext_upload_pieces.prototype.canScaleNow = true;
			
			//document.getElementsByClassName("span-scroll-info")[0].innerHTML = "可以开始伸缩啦";
		}
	});
	ext_upload_pieces.prototype.img_transform.addEventListener("touchmove", function(e){
		if(ext_upload_pieces.prototype.canScaleNow){
			e.preventDefault();//伸缩时不可移动
			document.getElementsByClassName("span-scroll-info")[0].innerHTML = "正在进行伸缩:[" + fisrtDistVertor.disX + "," + fisrtDistVertor.disY + "]";
			if(0 === ext_upload_pieces.prototype.fisrtDistVertor.disX 
				&& 0 === ext_upload_pieces.prototype.fisrtDistVertor.disY){//第一次，记录初始距离
				fisrtDistVertor.disX = e.touches[0].pageX - e.touches[1].pageX;
				fisrtDistVertor.disY = e.touches[0].pageY - e.touches[1].pageY;
				fisrtDistVertor.dis = Math.sqrt(Math.pow(fisrtDistVertor.disX, 2) + Math.pow(fisrtDistVertor.disY, 2));
				//fisrtDistVertor.firstMove = true;
				fisrtDistVertor.lastScale = lastScale;
			}
			else{//可以开始进行伸缩变换啦
				var curDisX = (e.touches[0].pageX - e.touches[1].pageX);
				var curDisY = (e.touches[0].pageY - e.touches[1].pageY);
				var curDis = Math.sqrt(Math.pow(curDisX, 2) + Math.pow(curDisY, 2));
				
				var angle = getRotateAngle(img_transform.style.webkitTransform);
				//按照当前两点距离与初始距离的比值，进行图片伸缩
				var scale = curDis / fisrtDistVertor.dis * fisrtDistVertor.lastScale;
				
				lastScale = scale;//同一张照片，记录最后一次的zoom，
				img_transform.style.webkitTransform = "rotate(" + angle + "deg) scale(" + scale + ")";
				
				//document.getElementsByClassName("span-scroll-info")[0].innerHTML = "进行伸缩:" + curDis + "/" + fisrtDistVertor.dis + "=" + scale;
			}
		}
	});
	ext_upload_pieces.prototype.img_transform.addEventListener("touchend", function(e){
		if(!!e.touches && 2 !== e.touches.length){
			//alert("还有" + e.touches.length + "个触点");
			//alert("可以结束伸缩啦!");
			canScaleNow = false;
			fisrtDistVertor.disX = 0;
			//fisrtDistVertor.disY = 0;
			
			//document.getElementsByClassName("span-scroll-info")[0].innerHTML = "结束了zoom触控";
		}
	});
	//........................end........................图片伸缩代码..........................
	
	/*
	var btn_head_to_bottom = document.getElementsByClassName("btn-head-to-bottom")[0];
	btn_head_to_bottom.onclick = function(){
		//倒转180
		img_transform.curOritation += 1;//转180度
				
		var scale = getScale(img_transform.style.webkitTransform);
		img_transform.style.webkitTransform = "rotate(" + 180 * img_transform.curOritation + "deg) scale(" + scale + ")";
	}*/
	
	//目标区域canvas的展示:
	ext_upload_pieces.prototype.t_canvas = document.getElementsByClassName("target-canvas")[0];
	ext_upload_pieces.prototype.offsetTop = 0;
	ext_upload_pieces.prototype.offsetLeft = 0;
	
	//按钮点击 => 关闭图片transform区域
	ext_upload_pieces.prototype.btn_close_transarea = document.getElementsByClassName("btn-close-transarea")[0];
	ext_upload_pieces.prototype.btn_close_transarea.onclick = function(){
		//记录图片的宽高
		img_target_width = img_trans_contaner.offsetWidth;
		img_target_height = img_trans_contaner.offsetHeight;
		
		offsetTop = img_trans_contaner.scrollTop;
		offsetLeft = img_trans_contaner.scrollLeft;
		
		var tmp_canvas = t_canvas;
		//将图片写到我的临时canvas中
		tmp_canvas.width = img_trans_contaner.offsetWidth;//使用图片容器的高度记作截取区域高度
		tmp_canvas.height = img_trans_contaner.offsetHeight;//使用图片宽度记作截取区域宽度
		
		//alert(tmp_canvas.width + "," + tmp_canvas.height);
		
		var tmp_ctx = tmp_canvas.getContext("2d");
		//第一次从image到canvas的迁移，需要进行旋转处理
		//alert("iniOritation:" + img_transform.iniOritation + ", curOritation:" + img_transform.curOritation + ", offsetLeft" + offsetLeft + ", offsetTop:" + offsetTop + ", transform:" + img_transform.style.webkitTransform + ", lastScale:" + lastScale);
		tmp_ctx.drawImage(img_loc, -1*offsetLeft, -1*offsetTop, img_transform.offsetWidth, img_transform.offsetHeight);
		
		setTimeout(function(){
			//隐藏图层 ... 
			div_img_transarea.style.display = "none";
		}, 500);
	};