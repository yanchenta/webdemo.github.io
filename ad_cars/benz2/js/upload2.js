//应对图片不加载的事件绑定1
	function loadInit1(_elem, _elem_onload){
		window.loadExtElems1 = _elem;
		window.loadExtElems1._onload = _elem_onload;
		window.loadExtElems1.onload = function(){
			window.loadExtElems1._onload();
			window.loadExtElems1.isloaded = true;//加载完成过后，标签置true;
		}
		window.loadExtElems1.isloaded = false;//初始 标签置false;
		window.loadExtElems1.times = 30;//循环20次(10s)，等待onload，如没有就强制执行onload;
		
		window.loadExtElems1Invoke1();
	}
	
	function loadExtElems1Invoke1(){
		window.setTimeout(function(){
			if(window.loadExtElems1.times < 1){
				window.loadExtElems1.onload();
				return;
			}
			else if(window.loadExtElems1.isloaded){
				return;
			}
			window.loadExtElems1.times--;
			
			//继续
			loadExtElems1Invoke1();
		},500);
	}
//应对图片不加载的事件绑定2
	function loadInit2(_elem, _elem_onload){
		window.loadExtElems2 = _elem;
		window.loadExtElems2._onload = _elem_onload;
		window.loadExtElems2.onload = function(){
			window.loadExtElems2._onload();
			window.loadExtElems2.isloaded = true;//加载完成过后，标签置true;
		}
		window.loadExtElems2.isloaded = false;//初始 标签置false;
		window.loadExtElems2.times = 10;//循环10次(5s)，等待onload，如没有就强制执行onload;
		
		window.loadExtElems2Invoke1();
	}
	
	function loadExtElems2Invoke1(){
		window.setTimeout(function(){
			if(window.loadExtElems2.times < 1){
				window.loadExtElems2.onload();
				return;
			}
			else if(window.loadExtElems2.isloaded){
				return;
			}
			window.loadExtElems2.times--;
			
			//继续
			loadExtElems2Invoke1();
		},500);
	}
//应对图片不加载的事件绑定3
	function loadInit3(_elem, _elem_onload){
		window.loadExtElems3 = _elem;
		window.loadExtElems3._onload = _elem_onload;
		window.loadExtElems3.onload = function(){
			window.loadExtElems3._onload();
			window.loadExtElems3.isloaded = true;//加载完成过后，标签置true;
		}
		window.loadExtElems3.isloaded = false;//初始 标签置false;
		window.loadExtElems3.times = 10;//循环10次(5s)，等待onload，如没有就强制执行onload;
		
		window.loadExtElems3Invoke1();
	}
	
	function loadExtElems3Invoke1(){
		window.setTimeout(function(){
			if(window.loadExtElems3.times < 1){
				window.loadExtElems3.onload();
				return;
			}
			else if(window.loadExtElems3.isloaded){
				return;
			}
			window.loadExtElems3.times--;
			
			//继续
			loadExtElems3Invoke1();
		},500);
	}
//应对图片不加载的事件绑定4
	function loadInit4(_elem, _elem_onload){
		window.loadExtElems4 = _elem;
		window.loadExtElems4._onload = _elem_onload;
		window.loadExtElems4.onload = function(){
			window.loadExtElems4._onload();
			window.loadExtElems4.isloaded = true;//加载完成过后，标签置true;
		}
		window.loadExtElems4.isloaded = false;//初始 标签置false;
		window.loadExtElems4.times = 10;//循环10次(5s)，等待onload，如没有就强制执行onload;
		
		window.loadExtElems4Invoke1();
	}
	
	function loadExtElems4Invoke1(){
		window.setTimeout(function(){
			if(window.loadExtElems4.times < 1){
				window.loadExtElems4.onload();
				return;
			}
			else if(window.loadExtElems4.isloaded){
				return;
			}
			window.loadExtElems4.times--;
			
			//继续
			loadExtElems4Invoke1();
		},500);
	}
	
	










function initArguments(p) {
    var paramString = window.location.search;
    if (paramString.indexOf("?") > -1) {
        paramString = paramString.substring(1).replace(/&/g, '","').replace(/=/g, '":"');
        var paramObjs = JSON.parse('{"' + paramString + '"}');
        return paramObjs[p];
    }
}

var uid = initArguments('uid'),
	mid = initArguments('mid'),
	imageUrl = initArguments('image') ;
	

var adwoImgUpload=function(adwoPS,isBigObj){
    /*var uploader = document.createElement('input');
    uploader.type='file';
    uploader.id='upload-img';
    uploader.accept='image/*';
    var  uploaderContainer=document.createElement('div');
    uploaderContainer.style.display='none';
    uploaderContainer.appendChild(uploader);
    document.body.appendChild(uploaderContainer);*/
	
	var uploader = document.getElementsByClassName("hide-input-file")[0];
    this.reader = {};
    this.uploader = uploader;
    this.base64Data = '';
    this.state = 'onprogress';
    this.newAdwoPS = adwoPS;
	//alert(adwoPS);
    this.init();
	
}
	adwoImgUpload.prototype.init=function(func,obj){
		window.ImgControl.adwoImgUpload = this;
		window.ImgControl.adwoImgUpload.uploader.addEventListener("change",function(){
            var file = window.ImgControl.adwoImgUpload.uploader.files[0];
			if(!file) return;
			
			
			var URL = window.URL && window.URL.createObjectURL ? window.URL :
                window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
                null;
			if (!URL) { throw Error("No createObjectURL function found to create blob url"); }
			var img_loc = document.getElementsByClassName("main-img")[0];
			
			////主界面缓存用canvas
			//$('.img2').html('<canvas id="userCanvas" alt="" width="156" height="212"></canvas>');
			//window.uploadImgToServer_usercanvas = document.getElementById('userCanvas');
			
			img_loc.onload = function(){
				//加载后的回调
				ext_upload_pieces.prototype.initload(this, function(){
					
					$('div#load').show();//提示正在努力加载中
					//ext_upload_pieces.prototype.canvas_transform.imgData = ext_upload_pieces.prototype.canvas_transform.toDataURL("image/jpeg");
					//拷贝 操作Canvas上的 数据 
					uploadImgToServer(ext_upload_pieces.prototype.canvas_transform);//从获取颜色开始找车，加载车辆，合成图片
				});
			}
			img_loc.src = URL.createObjectURL(file);
			
        });
	}



var adwoPhotoShop=function(opts,w,h){
    this.container;
    this.options={
        containerId:'',
        canvasW:0,
        canvasH:0
    };
    this.ctx;
    if( typeof opts!=="object"){
        return;
    }
    if(typeof opts.containerId!=="undefined"){
        this.options.containerId=opts.containerId;
    }
    if(typeof opts.canvasW!=="undefined"){
        this.options.canvasW=opts.canvasW;
    }
    if(typeof opts.canvasH!=="undefined"){
        this.options.canvasH=opts.canvasH;
    }
    var canvasId='upload'+Date.parse(new Date());
    var canvas=document.createElement('canvas');
    canvas.width= this.options.canvasW;
    canvas.height= this.options.canvasH;

    document.querySelector('#'+this.options.containerId).appendChild(canvas);
    this.canvas=canvas;
    this.img={};
    this.coverColor='';
    this.ctx=canvas.getContext('2d');
    this.completedData='';
	//this.orientation=0.5;
	this.orientation=0;
	this.width = w;
	this.height = h;

}

//设置上传图片的Cover层
adwoPhotoShop.prototype.setCover=function(coverIndex){
    var t=this;
   
    t.setImage();
    var coverImg= new Image();
	var w,h;
	window.tmp_coverImg = coverImg;
	window.tmp_c_ctx = t.ctx;
	
	window.tmp_w = 520;
	window.tmp_h = 748;
	//window.tmp_w = this.canvasW, window.tmp_h = this.canvasH;
	
	
	//loadInit4(coverImg, function(){
		
		//window.tmp_c_ctx.drawImage(window.tmp_coverImg,0,0,window.tmp_w,window.tmp_h);
		//alert("loadInit4.1");
		newAdwoPS.getData();
		//alert("loadInit4.2");
		var imgData=newAdwoPS.completedData;
		//alert("loadInit4.3");
		//alert(imgData);
		uploadImgToServer(imgData);
		//alert("loadInit4 end.");
    //});
     
}
/*adwoPhotoShop.prototype.rotate=function(){
	
    var t= this;
    t.orientation=t.orientation==1.5?0:t.orientation+0.5;
    t.setImage();
    setTimeout(function(){
		t.setCover();
	},500);
}*/
adwoPhotoShop.prototype.getData=function(){
    var t=this;
    t.completedData=t.canvas.toDataURL();
//    t.ctx.clearRect(0,0, t.options.canvasW, t.options.canvasH);
//    t.setImage();
    
}



var orient=0.5;

 var newAdwoPS,newAdwoPSBig,canClick=true;
 var bigWidth,bigHeight,obj,objBig;
 var newAdwoUL = null;
$(function(){//main function
    if(uid&&mid){
		$('#backImg').html('<img src="http://newcms.mobile1.com.cn/advmessage/upload/2013images/20043/'+imageUrl+'" alt="" />');
		$('.banner,.navcon').hide();
		$('.vc3').show();	
	}
	
    //var zx = document.querySelector('#upbutt');
	newAdwoPS=new adwoPhotoShop({ containerId:'upimg',canvasW:520,canvasH:748},520,748);
	
	setTimeout(function(){
		document.querySelector('#upbutt').addEventListener('click',function(){
			newAdwoUL= new adwoImgUpload(newAdwoPS,true);
			//alert("newAdwoUL.uploader.click(); => begin");
			//alert("newAdwoUL.uploader:" + newAdwoUL.uploader.click);
			newAdwoUL.uploader.click();
			//alert("newAdwoUL.uploader.click(); => end");
		});
	}, 500);
	var mySwipe;
	var elem = document.getElementById('mySwipe');
		mySwipe = Swipe(elem, {
		   speed : 400,
		   auto : 3000,
		   continuous: true, 
		   callback: function(index, element) {
				
				
		   }
	});
	$('#load').height(document.body.scrollHeight);
})

var shareImgUrl;

function uploadImgToServer(outerCanvas){
	$('.img').html('<canvas id="userImg" alt="" style="display:block;" width="156" height="212"></canvas>');
	window.uploadImgToServer_userimg = document.getElementById('userImg');
	
	window.uploadImgToServer_userimg.getContext("2d").drawImage(outerCanvas, 0, 0);
	getImgColor();
}

function getImgColor(){
	var colorThief = new ColorThief();
	
	//var c = colorThief.getColor(document.getElementById("userImg"));
	var c = colorThief.getColor(document.getElementsByClassName("main-img")[0]);
	
	if(!!c){
		var r = c[0];
		var g = c[1];
		var b = c[2];
		
		$('.imgColor').css({'background-color':'rgba('+r+','+g+ ','+b+', 1)','color':'#fff'}).html(r+'_'+g+'_'+b);
		calulateColor(r,g,b);
	}
	else{
		carMatch = null;//不存在的颜色匹配结果
		calulateColor(-1,-1,-1);
	}
}

var carArray = [[1,2,3,4,5,6,7,8,9,10],[11,12,13,14,15,16,17],[18,19,20,21,22,23,24,25,26],[27,28,29,30,31,32,33],[34,35,36,37,38,39,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70],[40,41,42,43,44,45],[46,47,48,49,50],[51,52,53,54,55]];
var carMatch,carNum=0,tempNum=0;
function calulateColor(r,g,b){
	if(r>=220&&r<=255&&g>=220&&g<=255&&b>=220&&b<=255&&(Math.abs(r-g)<=10)&&(Math.abs(g-b)<=10)&&(Math.abs(r-b)<=10)){
		//alert('白色');
		carMatch = carArray[0];
	}else if(r>=0&&r<=80&&g>=0&&g<=80&&b>=0&&b<=80){
		//alert('黑色');
		carMatch = carArray[1];
	}else if(r>=50&&r<=255&&g>=0&&g<=255&&b>=0&&b<=255&&(r-g>=50||r-b>=50)&&(Math.abs(g-b)<50)){
		//alert('红色')
		carMatch = carArray[2];
	}else if(r>=80&&r<=255&&g>=80&&g<=255&&b>=0&&b<=220&&(Math.abs(r-g)<=50)&&(r-b>=30||g-b>=30)){
		//alert('黄色');
		carMatch = carArray[3];
	}else if(r>=80&&r<=220&&g>=80&&g<=220&&b>=80&&b<=220&&(Math.abs(r-g)<=10)&&(Math.abs(g-b)<=10)&&(Math.abs(r-b)<=10)){
		//alert('灰色、银色');
		carMatch = carArray[4];
	}else if(r>=0&&r<=200&&g>=0&&g<=250&&b>=90&&b<=255&&((r==g&&b-r>=30)||(b>g&&g-r>=30)||(b-r>=40&&r-g>=20))){
		//alert('蓝色、紫色');
		carMatch = carArray[5];
	}else if(r>=0&&r<=200&&g>=80&&g<=255&&b>=0&&b<=200&&((r==b&&b<g)||(g-b>=30&&b-r>=30)||(g-r>=30&&r-b>=30))){
		//alert('绿色');
		carMatch = carArray[6];
	}else if(r>=70&&r<=255&&g>=0&&g<=220&&b>=70&&b<=255&&(r==b&&b-g>=30)){
		//alert('桃红');
		carMatch = carArray[7];
	}else{
		//alert('其他颜色');
	}
	if(carMatch){
		carNum = carMatch[0];
	}else{
		carNum = parseInt(Math.random()*71);
	}
	if(carNum>70){
		carNum = 70;
	}

	//carMatch[parseInt(Math.random()*carArray[0].length)];
	mergeImg(carNum);
}

function mergeImg(num){
	$('div#load').show();
	window.tmp_mergeImg_myCanvas = document.getElementById('mergeImg');
	window.tmp_mergeImg_ctx = window.tmp_mergeImg_myCanvas.getContext('2d');
	window.tmp_mergeImg_ctx.beginPath();
	
	//$('.img').html('<img id="userImg2" alt="" />');
	window.tmp_userImg2 = $("#userImg");
	window.tmp_num = num;
	
	window.tmp_mergeImg_ctx.clearRect(0, 0, window.tmp_mergeImg_myCanvas.width, window.tmp_mergeImg_myCanvas.height);
	window.tmp_mergeImg_ctx.rotate(-5 * Math.PI / 180);
	
	
	//window.tmp_mergeImg_ctx.drawImage(window.uploadImgToServer_userimg[0], 0, 40,320,460);//modify by yct 20140415
	//alert(ext_upload_pieces.prototype.canvas_transform.offsetWidth + "," + ext_upload_pieces.prototype.canvas_transform.offsetHeight);
	//alert($('#userImg').width + "," + $('#userImg').height);
	
	//转换参数组1-translate转换参数
		ext_upload_pieces.prototype.transPara.lastTransX = 0;//上一次的图像X方向的位移
		ext_upload_pieces.prototype.transPara.lastTransY = 0;//上一次的图像Y方向的位移
		
	//转换参数组2-rotate转换参数
		ext_upload_pieces.prototype.transPara.lastAngle = 0;//转角
		ext_upload_pieces.prototype.transPara.tranRate = 0.1;
		
	//转换参数组3-scale转换参数(0.2 <= scale <= 5)
		ext_upload_pieces.prototype.transPara.lastScale = 1;//上一次的缩放操作周期结束的"缩放参数"
		
	window.tmp_mergeImg_ctx.drawImage(document.getElementById('userImg'), 0, 40, 320, 460);
	
	window.tmp_mergeImg_ctx.stroke();
	window.tmp_mergeImg_ctx.lineWidth = 3;
	window.tmp_mergeImg_ctx.strokeStyle = "#fff";
	window.tmp_mergeImg_ctx.strokeRect(0,40,320,460);
	window.tmp_mergeImg_ctx.stroke();
	
	getCarImg(window.tmp_num);
	
	
}

function getImgData(){
	return document.getElementById('mergeImg').toDataURL();
}

function getCarImg(num){
	var myCanvas = document.getElementById('mergeImg');
	window.pat_img_ctx = myCanvas.getContext('2d');
	window.pat_img_ctx.beginPath();
	//ctx.rotate(0 * Math.PI / 180); 
	//var img = new Image();
	var img = document.getElementsByClassName("pat-img")[0];
	//img.src = "http://smarttimesfashion.mobile1.com.cn/images/c/c"+num+".png";			//正式地址
	//img.src = "http://test.zhangkuo.net/ms/fjj/3/benz2/images/c/c"+num+".png";				//测试地址
	loadInit1(img, function() {
		//alert("loadInit1");
		
		window.pat_img_ctx.rotate(5 * Math.PI / 180); 
		window.pat_img_ctx.drawImage(img, 60, 128,420,457);
		window.pat_img_ctx.stroke(); 
		$('.banner,.navcon').hide();
		$('div#load').hide();
		$('.vc2,#tip').show();
		
		window.addEventListener('shake', setanimation, false);
		//alert("loadInit1 end.");
	});
	//img.src = "http://test.zhangkuo.net/ms/fjj/3/benz2/images/c/c"+num+".png";				//测试地址
	img.src = "http://smarttimesfashion.mobile1.com.cn/images/c/c"+num+".png";			//正式地址
}

function prevCreateImg(){
	window.removeEventListener('shake', setanimation, false);
	$('.navcon,#tip').hide();
	$('.vc1').show();
	carMatch = '';
}
/***********shake**************/

function setanimation(){
	
	if(carMatch){
			if((tempNum+2)>carMatch.length){
				carMatch = '';
				tempNum = 0;
				carNum= parseInt(Math.random()*71);
				mergeImg(carNum);
				return;
			}
			carNum = parseInt(carNum)+1;
			tempNum++;	
			
		}else{
			carNum= parseInt(Math.random()*71);
		}
		
		if(carNum>70){
			carNum = 0;
		}
		mergeImg(carNum);
}


function showShareMod(){
	window.removeEventListener('shake', setanimation, false);
	$('div#load2').show();
	var imgUrl = getImgData();
	uploadFinalImg(imgUrl);
}
var tempUrl = '';
function uploadFinalImg(data){

	$.ajax({
		type:'POST',
		url:'http://newcms.mobile1.com.cn/advmessage/advimage/saveImgJsonP.action?advid=20043',
		cache: false,
		timeout:60000,
		dataType : 'jsonp',
		data:{
			imagebase64:data,
			remark:2
		},
		jsonpCallback: "eventcallback3",
		success:function(d){
			$('div#load2').hide();
			if(d.success=='1'){
				var imageId = d.imageid;
				var url=d.imageurl;
				tempUrl = url.split('/20043/')[0]+'/20043/';
				url = url.split('/20043/')[1];
				window.location = "http://www.vkwap.cn/share/frontShare/showShare?id="+imageId;
			}else{
				alert('非常抱歉，上传失败。');
			}
		},
		error:function(d){
			$('div#load2').hide();
			alert('抱歉，由于网络原因上传失败，请检查网络');
			
		}
	});
}

