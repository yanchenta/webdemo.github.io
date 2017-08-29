function changePage(e, delta){
				var pageNum = parseInt($('body').attr('data-id'));
				var canChangePage = parseInt($('body').attr('data-scroll'));
				var scrollHeight = $('.container').height();
				$('.logo').html(delta);
				//alert(1);
				if(scrollBar){
					if(delta >0){	//向上
						if(canChangePage){		//判断是否可以切换到上一个页面
							$('body').attr('data-scroll','0');
							switch(pageNum){
								case 1 :
									$('#scroll').css("-webkit-transform","translate(0, 0)");
									break;
								case 2 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-2)*scrollHeight+"px)");
									$('body').attr('data-id',pageNum-1);
									break;
								case 3 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-2)*scrollHeight+"px)");
									$('body').attr('data-id',pageNum-1);
									break;
								case 4 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-2)*scrollHeight+"px)");
									$('body').attr('data-id',pageNum-1);
									break;	
							}
						}else{
							$('body').attr('data-scroll','1');
							switch(pageNum){
								case 1 :
									$('#scroll').css("-webkit-transform","translate(0, 0);");
									break;
								case 2 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-1)*scrollHeight+"px)");
									break;
								case 3 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-1)*scrollHeight+"px)");
									break;
								case 4 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-1)*scrollHeight+"px)");
									break;	
							}
						}
						
					}else{			//向下
						if(canChangePage){		//判断是否可以切换到下一个页面
							$('body').attr('data-scroll','0');
							switch(pageNum){
								case 1 :
									$('#scroll').css("-webkit-transform","translate(0, -"+pageNum*scrollHeight+"px)");
									$('body').attr('data-id',pageNum+1);
									break;
								case 2 :
									$('#scroll').css("-webkit-transform","translate(0, -"+pageNum*scrollHeight+"px)");
									$('body').attr('data-id',pageNum+1); 
									break;
								/*case 3 :
									$('#scroll').css("-webkit-transform","translate(0,[kl -"+pageNum*scrollHeight+"px)");
									$('body').attr('data-id',pageNum+1);
									break;
								case 4 :
									$('#scroll').css("-webkit-transform","translate(0, -"+pageNum*scrollHeight+"px)");
									$('body').attr('data-id',pageNum+1);
									break;	*/
							}
						}else{
							$('body').attr('data-scroll','1');
							switch(pageNum){ 
								case 1 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-1)*scrollHeight+scrollNum+"px)");
									break;
								case 2 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-1)*scrollHeight+scrollNum+"px)");
									break;
								/*case 3 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-1)*scrollHeight+scrollNum+"px)");
									break;
								case 4 :
									$('#scroll').css("-webkit-transform","translate(0, -"+(pageNum-1)*scrollHeight+scrollNum+"px)");
									break;	*/
							}
						}
					}
				}else{
					
				}
			}