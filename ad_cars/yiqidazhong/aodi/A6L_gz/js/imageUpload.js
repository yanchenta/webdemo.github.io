/**
 * Created with JetBrains WebStorm.
 * User: Tosmon
 * Date: 13-1-23
 * Time: 上午10:53
 * To change this template use File | Settings | File Templates.
 */
var ImageUploader = function (elementId){
    this.browser_btn_id=elementId;
    this.file_loader=null;
    this.imageName="";
    this.base64Data="";
    this.reader=null
    this.init();
}
ImageUploader.prototype={
    init:function(){
        var that=this;
//        var loader = document.getElementById("that.browser_btn_id");
//        loader.type="file";
//        loader.accept="image/*";
//        that.file_loader=loader;
//        document.getElementById(that.browser_btn_id).addEventListener("click",function(){
//          return loader.click();
//        });
        that.file_loader=document.getElementById(that.browser_btn_id);
		if(typeof FileReader!=="undefined"){
        that.reader = new FileReader();
        that.file_loader.addEventListener("change",function(){
            that.reader.readAsDataURL(that.file_loader.files[0]);
            var nameArry=that.file_loader.value.split("\\");
            that.imageName=nameArry[nameArry.length-1];
        });
        that.reader.onload=function(){
            that.base64Data=this.result;
        }
        that.reader.onprogress=function(){

        }
        that.reader.onerror=function(){

        }
		}

    }
}
