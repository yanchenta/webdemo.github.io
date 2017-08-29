/**
 * Created with JetBrains WebStorm.
 * User: tomson
 * Date: 12-12-25
 * Time: 上午11:30
 * To change this template use File | Settings | File Templates.
 */
var MyCanvas = function (cid,imageurl){
    this.x=[];//记录鼠标移动是的X坐标
    this.y=[];//记录鼠标移动是的Y坐标
    this.clickDrag=[];
    this.lock=false;//鼠标移动前，判断鼠标是否按下
    this.isEraser=false;
    this.Timer=null;//橡皮擦启动计时器
    this.storageColor="#000000";
    this.eraserRadius=60;//擦除半径值
    this.color="#8b0008";//,"#FF0000","#80FF00","#00FFFF","#808080","#FF8000","#408080","#8000FF","#CCCC00"];//画笔颜色值
    this.fontWeight=5;
    this.scalingFactor=1;
    if(typeof(cid)==="undefined"){
        return;
    }
    this.canvas=document.getElementById(cid);
    if (this.canvas.getContext) {
    } else {
        alert("您的浏览器不支持 canvas 标签");
        return;
    }
    this.cxt=this.canvas.getContext('2d');
    this.cxt.lineJoin = "round";//context.lineJoin - 指定两条线段的连接方式
    this.cxt.lineWidth = 5;//线条的宽度

    this.w=this.canvas.width;//取画布的宽
    this.h=this.canvas.height;//取画布的高
    this.image=null;
    if(typeof(imageurl)==="string"){
        this.image=new Image();
        this.image.src=imageurl;
        this.canvas.style.backgroundImage="url("+imageurl+")";
        this.canvas.style.backgroundSize=this.w+"px "+this.h+"px";
        this.canvas.style.backgroundRepeat="no-repeat";   }
//    }else {
//        alert("模板添加失败请刷新页面。");
//        return;
//    }
    this.touch =("createTouch" in document);//判定是否为手持设备
    this.StartEvent = this.touch ? "touchstart" : "mousedown";//支持触摸式使用相应的事件替代
    this.MoveEvent = this.touch ? "touchmove" : "mousemove";
    this.EndEvent = this.touch ? "touchend" : "mouseup";
    this.init();
};
MyCanvas.prototype={
    init:function(){
        var that=this;
        that.clearAll();
        that.bind();
        that.changeColor();
    },
	remove:function(){
		document.removeEventListener("touchstart",onTouchActive,false);
        document.removeEventListener("touchmove",onTouchActive,false);
	},
    bind:function()
    {
        var that=this;

        /*鼠标按下事件，记录鼠标位置，并绘制，解锁lock，打开mousemove事件*/
        document.addEventListener("touchstart",onTouchActive,false);
        document.addEventListener("touchmove",onTouchActive,false);

        that.canvas['on'+that.StartEvent]=function(e)

        {
            var touch=that.touch ? e.touches[0] : e
            var touchX=that.touch ? e.touches[0].clientX : e.offsetX;
            var touchY=that.touch ? e.touches[0].clientY : e.offsetY;
            var _x=touchX - touch.target.offsetLeft;//鼠标在画布上的x坐标，以画布左上角为起点
            var _y=touchY - touch.target.offsetTop;//鼠标在画布上的y坐标，以画布左上角为起点
            if(that.isEraser)
            {
                that.resetEraser(_x,_y,touch);
            }else
            {
                that.movePoint(_x,_y);//记录鼠标位置
                that.drawPoint();//绘制路线
            }
            that.lock=true;
        };
        /*鼠标移动事件*/
        that.canvas['on'+that.MoveEvent]=function(e)
        {

            var touch=that.touch ? e.touches[0] : e
            var touchX=that.touch ? e.touches[0].clientX : e.offsetX;
            var touchY=that.touch ? e.touches[0].clientY : e.offsetY;
            if(that.lock)//that.lock为true则执行
            {
                var _x=touchX - touch.target.offsetLeft;//鼠标在画布上的x坐标，以画布左上角为起点
                var _y=touchY - touch.target.offsetTop;//鼠标在画布上的y坐标，以画布左上角为起点
                if(that.isEraser)
                {
                    that.resetEraser(_x,_y,touch);
                }
                else
                {
                    that.movePoint(_x,_y,true);//记录鼠标位置
                    that.drawPoint();//绘制路线
                }
            }
        };
        this.canvas['on'+that.EndEvent]=function(e)
        {

            /*重置数据*/
            that.lock=false;
            that.x=[];
            that.y=[];
            that.clickDrag=[];
            clearInterval(that.Timer);
            that.Timer=null;

        };
    },
    clearAll:function(){
        var that=this;
        that.cxt.clearRect(0, 0, this.w, this.h);
    },
    movePoint:function(x,y,dragging)
    {
        var that=this;
        /*将鼠标坐标添加到各自对应的数组里*/
        that.x.push(x);
        that.y.push(y);
        that.clickDrag.push(y);
    },
    drawPoint:function()
    {
        var that=this;
        for(var i=0; i < this.x.length; i++)//循环数组
        {
            that.cxt.beginPath();//context.beginPath() , 准备绘制一条路径

            if(that.clickDrag[i] && i){//当是拖动而且i!=0时，从上一个点开始画线。
                that.cxt.moveTo(that.x[i-1], that.y[i-1]);//context.moveTo(x, y) , 新开一个路径，并指定路径的起点
            }else{
                that.cxt.moveTo(that.x[i]-1, that.y[i]);
            }
            that.cxt.lineTo(that.x[i], that.y[i]);//context.lineTo(x, y) , 将当前点与指定的点用一条笔直的路径连接起来
            that.cxt.closePath();//context.closePath() , 如果当前路径是打开的则关闭它
            that.cxt.stroke();//context.stroke() , 绘制当前路径
        }
    },
    changeColor:function()
    {
        /*为按钮添加事件*/
        var that=this;
        that.cxt.save();
        that.cxt.strokeStyle = that.color;
        that.storageColor=that.color;
        that.cxt.strokeStyle = that.storageColor;
        that.isEraser=false;

    },
    resetEraser:function(_x,_y,touch)
    {
        /*使用橡皮擦-提醒*/
        var that=this;
        //this.cxt.lineWidth = 30;
        /*source-over 默认,相交部分由后绘制图形的填充(颜色,渐变,纹理)覆盖,全部浏览器通过*/
        that.cxt.globalCompositeOperation = "destination-out";
        that.cxt.beginPath();
		//alert();
        that.cxt.arc(_x-($("body").width()-$(".btn1").width()), 80+(_y-$(".btn1").height()*0.46), that.eraserRadius, 0, Math.PI * 2);
        that.cxt.strokeStyle = "rgba(250,250,250,0)";
        that.cxt.fill();
        that.cxt.globalCompositeOperation = "source-over";
    },
    drawImage:function(imgurl){
        var that=this;
        var img = new Image();
        img.src=imgurl;
        img.onload=function(){
            that.cxt.drawImage(img,0,0,img.width,img.height,0,0,that.w,that.h);
        }
    },
    checkCleared:function(){
        var that=this;
        var r=false,q=0;
        var as=that.cxt.getImageData(0,0,that.w,that.h).data;
        for(var i=3;i<as.length;i+=4){
            if(as[i]==0)
                q++;
        }
        if(q/as.length*4>3/10)
             r=true ;

        return r;
    },
    getImage:function(func)
    {
        var that=this;
        var c= document.createElement("canvas");
        c.width=that.w/that.scalingFactor;
        c.height=that.h/that.scalingFactor;
        var ima=new Image();
        ima.src=that.canvas.toDataURL();
        ima.width=c.width+"px";
        ima.height=c.height+"px";
        that.image.width=c.width+"px";
        that.image.height=c.height+"px";
        var ccxt = c.getContext("2d");
        ccxt.drawImage(that.image,0,0);
        ima.onload=function(){
            ccxt.drawImage(ima,0,0);
            var data= c.toDataURL();
            func(data);
        }



    }
};
function onTouchActive(e){
	var begin = $(".btn1").height()*0.46;
	var end = begin + $("#canvas").height()*1.5;
     //alert(e.touches[0].clientY + "=" + begin + "=" + end);
	 
            if(e.touches[0].clientY>begin && e.touches[0].clientY<end){
                e.preventDefault();}
 }
		