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
    var uploader=document.createElement('input');
    uploader.type='file';
    uploader.id='upload-img';
    uploader.accept='image/*';
    var  uploaderContainer=document.createElement('div');
    uploaderContainer.style.display='none';
    uploaderContainer.appendChild(uploader);
    document.body.appendChild(uploaderContainer);
    this.reader={};
    this.uploader=uploader;
    this.base64Data='';
    this.state='onprogress';
    this.newAdwoPS=adwoPS;
    this.init();
	
}
adwoImgUpload.prototype.init=function(func,obj){
    var t=this;
        t.uploader.addEventListener("change",function(){
            var file=t.uploader .files[0];
            var mpImg = new MegaPixImage(file);
            $('div#load').show();
            var canv =document.createElement('canvas');

			
			mpImg.render(canv,{ maxWidth:260, maxHeight:374});
			
            

            t.state="success";
            setTimeout(setImgCallback,500);
            function setImgCallback(){
                t.newAdwoPS.setImage(canv);

					t.newAdwoPS.setCover();

               
                
            }
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
	this.orientation=0.5;
	this.width = w;
	this.height = h;

}
adwoPhotoShop.prototype.setImage=function(opts){
    var t=this;
    if(typeof opts!=="undefined"){
       t.img= opts;
    }
        t.ctx.clearRect(0,0, t.options.canvasW, t.options.canvasH);
        t.ctx.save();

        switch (t.orientation){
            case 0.5:t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(0, -t.height);
                t.ctx.drawImage(t.img,0,80,t.width+90,t.height);
				
                break;
            case 1:t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(-t.width, -t.height);
                t.ctx.drawImage(t.img,0,0,t.width,t.height);
                break;
            case 1.5:t.ctx.rotate(t.orientation * Math.PI);
                t.ctx.translate(-t.height,0);
                t.ctx.drawImage(t.img,0,0,t.width,t.height);
                break;
            default :t.ctx.drawImage(t.img,0,0,t.width,t.height);
        }

    t.ctx.restore();
	

    

}
adwoPhotoShop.prototype.setCover=function(coverIndex){
    var t=this;
   
    t.setImage();
    var coverImg= new Image();
	var w,h;
	
	
	w = 260,h = 374;
   coverImg.onload=function(){
       t.ctx.drawImage(coverImg,0,0,w,h);
		   
    }
     
    setTimeout(function(){
		newAdwoPS.getData();
		var imgData=newAdwoPS.completedData;
		uploadImgToServer(imgData);
	},800);
	
	
}
adwoPhotoShop.prototype.rotate=function(){
	
    var t= this;
    t.orientation=t.orientation==1.5?0:t.orientation+0.5;
    t.setImage();
    setTimeout(function(){
		t.setCover();
	},500);
}
adwoPhotoShop.prototype.getData=function(){
    var t=this;
    t.completedData=t.canvas.toDataURL();
//    t.ctx.clearRect(0,0, t.options.canvasW, t.options.canvasH);
//    t.setImage();
    
}



var orient=0.5;

 var newAdwoPS,newAdwoPSBig,canClick=true;
 var bigWidth,bigHeight,obj,objBig;
$(function(){
    if(uid&&mid){
		$('#backImg').html('<img src="http://newcms.mobile1.com.cn/advmessage/upload/2013images/20043/'+imageUrl+'" alt="" />');
		$('.banner,.navcon').hide();
		$('.vc3').show();	
	}
	
    var zx = document.querySelector('#upbutt');
	newAdwoPS=new adwoPhotoShop({ containerId:'upimg',canvasW:260,canvasH:374},260,374);
	
    zx.addEventListener('click',function(){
			
			
			var newAdwoUL= new adwoImgUpload(newAdwoPS,true);
			
			newAdwoUL.uploader.click();
		
    });
	
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

function uploadImgToServer(data){
	$('.img').html('<img id="userImg" onload="getImgColor()" src="'+data+'" alt="" />');
	/*$.ajax({
		type:'POST',
		url:'http://test.zhangkuo.net/advmessage/advimage/saveImgJsonP.action?advid=20043',
		cache: false,
		timeout:60000,
		dataType : 'jsonp',
		data:{
			imagebase64:data,
			remark:1
		},
		jsonpCallback: "eventcallback1",
		success:function(d){
			
			if(d.success=='1'){

				shareImgUrl=d.imageurl;

				$('.img').html('<img id="userImg" style="border:2px solid #fff;" onload="getImgColor()" src="'+shareImgUrl+'" alt="" />');
				
					
				
				
			}else{
				alert('非常抱歉，上传失败。');
			}
		},
		error:function(d){
			$('div#load').hide();
			alert('抱歉，由于网络原因上传失败，请检查网络');
			
		}
	});*/
}

function getImgColor(){
	var colorThief = new ColorThief();
	var c = colorThief.getColor($('#userImg')[0]);
	var r = c[0];
	var g = c[1];
	var b = c[2];
	
	
	$('.imgColor').css({'background-color':'rgba('+r+','+g+ ','+b+', 1)','color':'#fff'}).html(r+'_'+g+'_'+b);
	calulateColor(r,g,b);
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
	var myCanvas = document.getElementById('mergeImg');
	var ctx = myCanvas.getContext('2d');
	ctx.beginPath();

	
	var img = new Image();
	img.src = $('#userImg').attr('src');
	img.onload = function() { 
		ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
		ctx.rotate(-5 * Math.PI / 180); 
		ctx.drawImage(img, 0, 20,160,230);
		ctx.stroke(); 	 
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#fff";
		ctx.strokeRect(0,20,160,214);
		ctx.stroke(); 
		getCarImg(num);
	} 
	
}

function getImgData(){
	return document.getElementById('mergeImg').toDataURL();
}

function getCarImg(num){
	var myCanvas = document.getElementById('mergeImg');
	var ctx = myCanvas.getContext('2d');
	ctx.beginPath();
	//ctx.rotate(0 * Math.PI / 180); 
	var img = new Image();
	var url = window.location.href;
	url = url.split('/20043/')[0];
	img.src = "http://smarttimesfashion.mobile1.com.cn/images/c/c"+num+".png";			//正式地址
	//img.src = "http://test.zhangkuo.net/ms/fjj/3/benz2/images/c/c"+num+".png";				//测试地址
	img.onload = function() { 		
		ctx.rotate(5 * Math.PI / 180); 
		ctx.drawImage(img, 30, 64,210,226);
		ctx.stroke(); 
		$('.banner,.navcon').hide();
		$('div#load').hide();
		$('.vc2,#tip').show();

		window.addEventListener('shake', setanimation, false);
	} 
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
