var content_three_div1,content_three_div2,content_three_div3;
$(document).ready(function(){
    content_three_div1 = new iScroll('content_three_div1',{vScrollbar : false,hScrollbar : false});
    content_three_div2 = new iScroll('content_three_div2',{vScrollbar : false,hScrollbar : false});
    content_three_div3 = new iScroll('content_three_div3',{vScrollbar : false,hScrollbar : false});
    content_three_div1.refresh();
    
    taps($('.content_two a'),function(el){
        $('.content_two a').removeClass('selected');
        $(el).addClass('selected');
        $('.content_small_pic').hide();
        $('#' + el.dataset.id).show();
        
        content_three_div1.refresh();
        content_three_div2.refresh();
        content_three_div3.refresh();
        
        var i = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+4,location.pathname.lastIndexOf('.html')-2));
        var j = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+6,location.pathname.lastIndexOf('.html')));
        dataLayer.push({'event':'event','category':'小型机产品详情页','action':el.innerText.substring(0,2),'label':CarNames[i][j]});

    },'selected');
    
    taps($('.content_small_pic li'),function(el){
        $('.content_small_pic li').removeClass('selected');
        el.classList.add('selected'); 
        //$('#big_img').attr('src',el.dataset.img);
        $('#big_img').attr('src',$(el).find('img').attr('src'));
    });
    
    
    var user = getUser();
    if(!user){
        showReg();
        taps($('.regForm .close,.loginForm .close'),function(el){
            var i = parseInt( location.pathname.substring(location.pathname.lastIndexOf('/pro')+4,location.pathname.lastIndexOf('.html')-2));
            location = "pro" + i + ".html";
        });
        
    }
});
        