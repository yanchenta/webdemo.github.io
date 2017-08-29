
(function(){
	
	this.TransMatrix = function(a, b, c, d, e, f){
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
	
	this.multiplyTransform = function(transMatrix1, transMatrix2){
		var rlt = new TransMatrix();
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
	
	this.setTranformandDrawImage2 = function(){
		
		this.ctx.save();
		
		//初始伸缩比为1，无偏移，无旋转
		var forTransMarix = new TransMatrix(1, 0, 0, 0, 1, 0);
		
		//create translate Matrix
		var tTransMatrix = new TransMatrix(1, 0, this.text_transX2.value, 0, 1, this.text_transY2.value);
		//...........
		forTransMarix = multiplyTransform(forTransMarix, tTransMatrix);
		
		
		//create rotate matrix
		var rTransMatrix = new TransMatrix(1* Math.cos(this.text_rotateThy.value), -1*Math.sin(this.text_rotateThy.value), 0, Math.sin(this.text_rotateThy.value), 1* Math.cos(this.text_rotateThy.value), 0);
		//......
		forTransMarix = multiplyTransform(tTransMatrix, rTransMatrix);
		
		
		
		//create scaleX matrix
		//var sxTransMatrix = new TransMatrix(1*scaleX, 0, 0, 0, 1, 0);
		var sxTransMatrix = new TransMatrix(1 * this.text_scaleX2.value, 0, 0, 0, 1 * this.text_scaleX2.value, 0);
		//正确的做法是对 rotateThy 进行分向量分解
		forTransMarix = multiplyTransform(forTransMarix, sxTransMatrix);
		
		
		
		
		
		
		var targetCenterY = this.img.offsetHeight/2;
		var targetCenterX = this.img.offsetWidth/2;
		var initThy = Math.atan(targetCenterY/targetCenterX);
		var len = Math.sqrt(Math.pow(targetCenterY, 2) + Math.pow(targetCenterX, 2));
		var nowCenterX = len * Math.cos(initThy - this.text_rotateThy.value);
		var nowCenterY = len * Math.sin(initThy - this.text_rotateThy.value);
		//中心位移偏移
		var resetT_TransMatrix = new TransMatrix(1, 0, (targetCenterX - nowCenterX), 0, 1, (targetCenterY - nowCenterY));
		
		forTransMarix = multiplyTransform(forTransMarix, resetT_TransMatrix);
		
		
		
		
		
		
		this.canvas.width = this.img.offsetWidth;
		this.canvas.height = this.img.offsetHeight;
		
		this.ctx.clearRect(0, 0, this.img.offsetWidth, this.img.offsetHeight);
		
		//alert(forTransMarix.X11 + "," + forTransMarix.X12 + "," + forTransMarix.X21 + "," + forTransMarix.X22 + "," + forTransMarix.X13 + "," + forTransMarix.X23);
		this.ctx.setTransform(forTransMarix.X11, forTransMarix.X12, forTransMarix.X21, forTransMarix.X22, forTransMarix.X13, forTransMarix.X23);
		this.ctx.drawImage(this.img, 0, 0);
		this.ctx.restore();
		
	}
	
	
	
	window.conp = this;
	window.conp.initParams = function(text_transX, text_transY, text_scaleX, text_scaleY, tipX, tipY, img, canvas, text_transX2, text_transY2, text_scaleX2, text_scaleY2, text_rotateOffX, text_rotateOffY, text_rotateThy, input1, input2){
		this.text_transX = text_transX;
		this.transX = this.text_transX.value;
		this.text_transY = text_transY;
		this.transY = this.text_transY.value;
		
		this.text_scaleX = text_scaleX;
		this.scaleX = this.text_scaleX.value;
		this.text_scaleY = text_scaleY;
		this.scaleY = this.text_scaleY.value;
		
		this.tipX = tipX;
		this.tipY = tipY;
		
		this.img = img;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		
		this.text_transX2 = text_transX2;
		this.transX2 = this.text_transX2.value;
		this.text_transY2 = text_transY2;
		this.transY2 = this.text_transY2.value;
		
		this.text_scaleX2 = text_scaleX2;
		this.scaleX2 = this.text_scaleX2.value;
		this.text_scaleY2 = text_scaleY2;
		this.scaleY2 = this.text_scaleY2.value;
		
		this.text_rotateOffX = text_rotateOffX;
		this.text_rotateOffY = text_rotateOffY;
		this.text_rotateThy = text_rotateThy;
		this.rotateThy = this.text_rotateThy.value;
		
		this.input1 = input1;
		this.input2 = input2;
		
		
		
		//................................................
		this.text_rotateOffX.onkeydown = this.keyDownToChangeNum3;
		this.text_rotateOffY.onkeydown = this.keyDownToChangeNum3;
		this.text_rotateThy.onkeydown = this.keyDownToChangeNum3;
	
		this.touchParams = {};
		this.touchParams.lastTouchX = -1;
		this.touchParams.lastTouchY = -1;
		
		var isIE = (document.all && window.ActiveXObject && !window.opera) ? true : false;
		if(isIE){
			this.canvas.attachEvent("touchdown", function(e){
				
			});
		}
		else {
			this.canvas.addEventListener("touchdown", function(e){
				
			});
		}
		var tmpFunc = function(e){
			e.preventDefault();
			if(1 !== e.touches.length) return;
			if(-1 === this.touchParams.lastTouchX || -1 === this.touchParams.lastTouchY){
			
				//alert("first touchmove");
			}
			else{
			
			}
		
			this.touchParams.lastTouchX = e.touches[0].pageX;
			this.touchParams.lastTouchY = e.touches[0].pageY;
		};
		
		if(isIE){
			this.canvas.attachEvent("touchmove", tmpFunc);
		}
		else{
			this.canvas.addEventListener("touchmove", tmpFunc);
		}
		
		if(isIE){
			this.canvas.attachEvent("touchup", function(e){
				this.touchParams.lastTouchX = -1;
				this.touchParams.lastTouchY = -1;
			});
		}
		else{
			this.canvas.addEventListener("touchup", function(e){
				this.touchParams.lastTouchX = -1;
				this.touchParams.lastTouchY = -1;
			});
		}
		this.text_transX.onkeydown = keyDownToChangeNum;
		this.text_transY.onkeydown = keyDownToChangeNum;
		this.text_transX2.onkeydown = keyDownToChangeNum;
		this.text_transY2.onkeydown = keyDownToChangeNum;
	
		this.text_scaleX.onkeydown = keyDownToChangeNum2;
		this.text_scaleY.onkeydown = keyDownToChangeNum2;
	
		this.text_scaleX2.onkeydown = keyDownToChangeNum2;
		this.text_scaleY2.onkeydown = keyDownToChangeNum2;
	}
})();