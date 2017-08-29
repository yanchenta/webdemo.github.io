/**
 * Created by apple on 14-6-16.
 */
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

function getPathArr(groupName,tid) {

    for(var i = 0 ; i<gif.length ; i++){
        if(gif[i].name == groupName){
           for(var j = 0 ; j<gif[i].value.length ; j++){
               if(j == tid){
                   gif[i].value[j].push('img/gif/'+(i+1)+'/'+(j+1)+'/'+1+'.png');
               }
           }
        }
    }
    return gif;
}
var GetPathArray = function () {
    this.a = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("a", i);
        }
    };
    this.b = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("b", i);
        }
    };
    this.c = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("c", i);
        }
    };
    this.d = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("d", i);
        }
    };
    this.e = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("e", i);
        }
    };
    this.f = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("f", i);
        }
    };
    this.g = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("g", i);
        }
    };
    this.h = function () {
        for(var i = 0 ; i < 4 ;i++){
            getPathArr("h", i);
        }
    };
};
var getPathArray = new GetPathArray();
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
function qqq(ii,jj){
    $("#teamGif").attr("src","img/gif/"+ii+"/"+jj+"/"+1+".png");
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
    qqq(groupIndex+1,countryIndex+1);
}
$(function(){
    for(var i = 0 ;i< 8 ;i++){
        isClickIndex(i);
    }

});