/**
 * Created with JetBrains WebStorm.
 * User: apple
 * Date: 14-6-12
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */

var n = 1;
var gifx = 0;
function qqq(ii,jj,xx){
    $("#teamGif").attr("src","");
	n = 1;
	gifx = jj;
	setTimeout(function(){
			qqq2(ii,jj,xx);		
		},16);
	//alert(i+"+"+j+"+"+x);
}
function qqq2(ii,jj,xx){
    $("#teamGif").attr("src","img/gif/"+ii+"/"+jj+"/"+n+".png");
    n++;
    if(n <= xx && gifx == jj){
    setTimeout(function(){
			qqq2(ii,jj,xx);		
		},15);
    }else{
		n = 1;
		$("#teamGif").attr("src","img/gif/"+ii+"/"+jj+"/"+n+".png");
	}
	
	//alert(i+"+"+j+"+"+x);
}
var GetPathArray = function () {
    this.a = function () {
        getPathArr("a", 0, 70);
        getPathArr("a", 1, 83);
        getPathArr("a", 2, 100);
        getPathArr("a", 3, 88);
    };
    this.b = function () {
        getPathArr("b", 0, 100);
        getPathArr("b", 1, 87);
        getPathArr("b", 2, 100);
        getPathArr("b", 3, 88);
    };
    this.c = function () {
        getPathArr("c", 0, 82);
        getPathArr("c", 1, 88);
        getPathArr("c", 2, 84);
        getPathArr("c", 3, 87);
    };
    this.d = function () {
        getPathArr("d", 0, 87);
        getPathArr("d", 1, 81);
        getPathArr("d", 2, 88);
        getPathArr("d", 3, 90);
    };
    this.e = function () {
        getPathArr("e", 0, 87);
        getPathArr("e", 1, 100);
        getPathArr("e", 2, 90);
        getPathArr("e", 3, 84);
    };
    this.f = function () {
        getPathArr("f", 0, 88);
        getPathArr("f", 1, 86);
        getPathArr("f", 2, 84);
        getPathArr("f", 3, 87);
    };
    this.g = function () {
        getPathArr("g", 0, 100);
        getPathArr("g", 1, 87);
        getPathArr("g", 2, 87);
        getPathArr("g", 3, 87);
    };
    this.h = function () {
        getPathArr("h", 0, 87);
        getPathArr("h", 1, 84);
        getPathArr("h", 2, 100);
        getPathArr("h", 3, 88);
    };
};
var gif = [
    {name:'a',value:[[],[],[],[]]},
    {name:'b',value:[[],[],[],[]]},
    {name:'c',value:[[],[],[],[]]},
    {name:'d',value:[[],[],[],[]]},
    {name:'e',value:[[],[],[],[]]},
    {name:'f',value:[[],[],[],[]]},
    {name:'g',value:[[],[],[],[]]},
    {name:'h',value:[[],[],[],[]]}
];
var arr = new Array();
var i, j,k;
var count;
var getPathArray = new GetPathArray();

function getPathArr(groupName,tid ,imgNum) {

    for(var i = 0 ; i<gif.length ; i++){
        if(gif[i].name == groupName){
            for(var j = 0 ; j<gif[i].value.length ; j++){
                if(j == tid){
                    for(var k = 1 ; k< imgNum+1 ; k++){
                        gif[i].value[j].push('img/gif/'+(i+1)+'/'+(j+1)+'/'+k+'.png');
                    }
                }
            }
        }
    }
    return gif;
}

function isClickIndex(index) {
    if (index == 0) {
        getPathArray.a()
    }
    if (index == 1) {
        getPathArray.b()
    }
    if (index == 2) {
        getPathArray.c()
    }
    if (index == 3) {
        getPathArray.d()
    }
    if (index == 4) {
        getPathArray.e()
    }
    if (index == 5) {
        getPathArray.f()
    }
    if (index == 6) {
        getPathArray.g()
    }
    if (index == 7) {
        getPathArray.h()
    }
}
function loadImage(url, callback) {
    var img = new Image();
    img.onload = function(){
      //  img.onload = null;
        callback(img);
    }
    img.src = url;
}

function preLoadGroupImg(groupIndex,countryIndex){
        for(var j = 0 ; j< gif[groupIndex].value[0].length;j++){
				if($("#imgWrap1").html().indexOf('<img src="img/gif/'+(groupIndex+1)+'/1/'+(j+1)+'.png">') == -1){
					loadImage(gif[groupIndex].value[0][j],function(img){
							$("#imgWrap1").append($(img));
					});
				}
        }
        for(var j = 0 ; j< gif[groupIndex].value[1].length;j++){
                if($("#imgWrap2").html().indexOf('<img src="img/gif/'+(groupIndex+1)+'/2/'+(j+1)+'.png">') == -1){
					loadImage(gif[groupIndex].value[1][j],function(img){
							$("#imgWrap2").append($(img));
					});
				}
        }
        for(var j = 0 ; j< gif[groupIndex].value[2].length;j++){
                if($("#imgWrap3").html().indexOf('<img src="img/gif/'+(groupIndex+1)+'/3/'+(j+1)+'.png">') == -1){
					loadImage(gif[groupIndex].value[2][j],function(img){
							$("#imgWrap3").append($(img));
					});
				}
        }
        for(var j = 0 ; j< gif[groupIndex].value[3].length;j++){
                if($("#imgWrap4").html().indexOf('<img src="img/gif/'+(groupIndex+1)+'/4/'+(j+1)+'.png">') == -1){
					loadImage(gif[groupIndex].value[3][j],function(img){
							$("#imgWrap4").append($(img));
					});
				}
        }
		
		qqq(groupIndex+1,countryIndex+1,gif[groupIndex].value[0].length);
}


$(function(){
    for(i = 0 ;i< 8 ;i++){
        isClickIndex(i);
    }

});