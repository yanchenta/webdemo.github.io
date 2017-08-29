
//创建视屏列表
function createVideoList_index(container, videoModels){
	//删除
	for(var i = container.childNodes.length - 1; i >= 0; i--){
		container.removeChild(container.childNodes[i]);
	}
	
	//添加
	for(var i = 0; i < videoModels.length; i++){
		
		var videoFrame = document.createElement("div");
		
		var nickName = videoModels[i].nickName;//昵称
		var posterUrl = videoModels[i].posterUrl;//缩略图url
		var videoUrl = videoModels[i].videoUrl;//视频url
		var zansNum = videoModels[i].zansNum;//赞数
		var commmentsNum = videoModels[i].commentsNum;//评论数
		videoFrame.innerHTML = "<h4>" + nickName + "</h4><video controls width=\"194\" height=\"145\" poster=\""+ posterUrl +"\"><source src=\"" + videoUrl + "\"></source>您的浏览器不支持video标签</video><span><em>" + zansNum + "</em><i>" + commmentsNum + "</i></span>";
		
		container.appendChild(videoFrame);
	}
}

//创建分页footer
function createPagingFooter(footerContainer, footerData, maxPageCountInView, onClickCallback){
	if(footerData.curIdx >= footerData.allPageCount || footerData.curIdx < 0) return;
	
	//footerData.allPageCount:10
	//maxPageCountInView = 3;
	var maxPageCountInView = maxPageCountInView - 1;
	// 删除
	for(var i = footerContainer.childNodes.length - 1; i >= 0; i--){
		footerContainer.removeChild(footerContainer.childNodes[i]);
	}
	

	//var stIdx = Math.floor(footerData.curIdx + 1 - maxPageCountInView / 2) < 0 ? 
	//										0 : Math.floor(footerData.curIdx + 1 - maxPageCountInView / 2);
	var stIdx = footerData.curIdx + 1 - Math.floor(maxPageCountInView / 2) < 0 ? 
											0 : footerData.curIdx + 1 - Math.floor(maxPageCountInView / 2);
	//var endIdx = Math.ceil(footerData.curIdx + 1 + maxPageCountInView / 2) > footerData.allPageCount - 1 ? 
	//										footerData.allPageCount - 1 : Math.ceil(footerData.curIdx + 1 + maxPageCountInView / 2);
	var endIdx = footerData.curIdx + 1 + Math.ceil(maxPageCountInView / 2) > footerData.allPageCount - 1 ? 
											footerData.allPageCount - 1 : footerData.curIdx + 1 + Math.ceil(maxPageCountInView / 2);
	
	if(endIdx == footerData.allPageCount - 1 && stIdx > 0){
		stIdx = (endIdx - maxPageCountInView < 0) ? 0 : (endIdx - maxPageCountInView);//保证stIdx >=0
	}
	/*else if(endIdx < footerData.allPageCount - 1 && stIdx > 0){
		endIdx = (stIdx + maxPageCountInView > footerData.allPageCount - 1) ? (stIdx + maxPageCountInView) : (footerData.allPageCount - 1);
	}*/
	
	// 添加
	//1. 向左
	var tolast = document.createElement("li");
	tolast.innerHTML = "<a href=\"javascript:;\">&lt;</a>";
	tolast.tag = footerData.curIdx - 1;
	if(footerData.curIdx != 0){
		tolast.onclick = onClickCallback;
	}
	tolast.style.width = "20px";
	tolast.style.cursor = "pointer";
	footerContainer.appendChild(tolast);
	
	
	if(stIdx <= 0) {
		//3. 页码...
		for(var i = stIdx; i <= endIdx; i++){
			var pageIdx = document.createElement("li");
			if(i == footerData.curIdx){//当前索引为红色
				pageIdx.innerHTML = "<a class=\"realpage\" style=\"color:red;\">" + (i + 1) + "</a>";
				//不刷新
			}
			else{
				pageIdx.innerHTML = "<a class=\"realpage\">" + (i + 1) + "</a>";
				pageIdx.onclick = onClickCallback;//...刷新
			}
			pageIdx.tag = i;
			pageIdx.style.width = "20px";
			pageIdx.style.cursor = "pointer";
			footerContainer.appendChild(pageIdx);
		}
		
		//判断是否需要加载 4. 右边的...
		if(endIdx < footerData.allPageCount - 1){
			var rightDot = document.createElement("li");
			rightDot.innerHTML = "...";
			footerContainer.appendChild(rightDot);
		}
	}
	else if(endIdx >= footerData.allPageCount - 1){
		//判断是否加载 2. 左边的...
		if(stIdx > 0){
			var leftDot = document.createElement("li");
			leftDot.innerHTML = "...";
			footerContainer.appendChild(leftDot);
		}
		
		//3.页码
		for(var i = stIdx; i <= endIdx; i++){
			var pageIdx = document.createElement("li");
			if(i == footerData.curIdx){//当前索引为红色
				pageIdx.innerHTML = "<a class=\"realpage\" style=\"color:red;\">" + (i + 1) + "</a>";
				//不刷新
			}
			else{
				pageIdx.innerHTML = "<a class=\"realpage\">" + (i + 1) + "</a>";
				pageIdx.onclick = onClickCallback;//...刷新
			}
			pageIdx.tag = i;
			pageIdx.style.width = "20px";
			pageIdx.style.cursor = "pointer";
			footerContainer.appendChild(pageIdx);
		}
	}
	else{
		//判断是否加载 2. 左边的...
		if(stIdx > 0){
			var leftDot = document.createElement("li");
			leftDot.innerHTML = "...";
			footerContainer.appendChild(leftDot);
		}
		
		//3. 页码
		for(var i = stIdx; i <= endIdx; i++){
			var pageIdx = document.createElement("li");
			if(i == footerData.curIdx){//当前索引为红色
				pageIdx.innerHTML = "<a class=\"realpage\" style=\"color:red;\">" + (i + 1) + "</a>";
				//不刷新
			}
			else{
				pageIdx.innerHTML = "<a class=\"realpage\">" + (i + 1) + "</a>";
				pageIdx.onclick = onClickCallback;//...刷新
			}
			pageIdx.tag = i;
			pageIdx.style.width = "20px";
			pageIdx.style.cursor = "pointer";
			footerContainer.appendChild(pageIdx);
		}
	
		//判断是否需要加载 4. 右边的...
		if(endIdx < footerData.allPageCount - 1){
			var rightDot = document.createElement("li");
			rightDot.innerHTML = "...";
			footerContainer.appendChild(rightDot);
		}
	}
	
	//5. 向右
	var tonext = document.createElement("li");
	tonext.innerHTML = "<a href=\"javascript:;\">&gt;</a>";
	tonext.tag = footerData.curIdx + 1;
	if(footerData.curIdx != footerData.allPageCount - 1){
		tonext.onclick = onClickCallback;
	}
	tonext.style.width = "20px";
	tonext.style.cursor = "pointer";
	footerContainer.appendChild(tonext);
}

//创建评论列表
function createVideoCommentsList(videoComments, callback){
	
	/*videoModel.nickName;//昵称
	videoModel.posterUrl;//缩略图url
	videoModel.playUrl;//视频url
	videoModel.zansNum;//赞数
	videoModel.commentsNum;//评论数*/
	
	var list = document.createElement("div");
	for(var i = 0; i < videoComments.length; i++){
		videoComments[i].nickName;
		videoComments[i].content;
		videoComments[i].datetime;
	}
	return list;
}

function navEventBinding(){
	document.getElementById("toindex").onclick = function(){
		//window.location.href = "index.html";
	};
	document.getElementById("todetail").onclick = function(){
		window.location.href = "act_list.html";
	};
	document.getElementById("toalllist").onclick = function(){
		window.location.href = "all_wondeful.html";
	};
	document.getElementById("tomylist").onclick = function(){
		window.location.href = "my_wondful.html";
	};
	document.getElementById("totmall").onclick = function(){
		//window.location.href = "";
		alert("未给定天猫店铺链接");
	};
}