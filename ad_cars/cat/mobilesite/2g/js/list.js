$(document).ready(function(){
    
    /*
    $('.content li.li .content_p2 .block a:first-child').click(function(){
        var href = this.href;
        var user = getUser();
        if(!user){
            location = 'p_2g06.html';
            return false;
        }else{
            location = href;
        }
        return false;
    });
    */
    //$('.content li.li .content_p2 .block a:nth-child(3)').click(autoXunjia);
});

var k_url;
function tiaoz(i,j,k){
    k_url= k;
     try{
    dataLayer.push({'event':'event','category':typeList[i-1]+'列表页','action':'即刻询价','label':CarNames[i-1][j-1]});
    }catch(a){}
    
    var user = getUser();
    if(!user){
        location = 'p_2g06.html';
        return false;
    }
    
    
    setTimeout(function(){
        location = k_url;
    },200);
    
    
    
}