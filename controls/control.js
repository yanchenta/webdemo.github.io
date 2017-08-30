		//冻结表格
		function buildFrozenTbl(tblData, id, leftFrozenColCnt, colWidScale){
			
			/*var tblData = {
				thDatas:["列1","列2","列3","列4","列5","列6","列7","列8","列9"],
				tdDatas:[
					["a11","a12","a13","a14","a15","a16","a17","a18","a19"]
				]
			};*/
			tblData.letterMaxCnts = [];
			for(var i = 0; i < tblData.thDatas.length; i++){
				var letterMaxCnt = 0;
				for(var j = 0; j < tblData.tdDatas.length; j++){
					var len = (tblData.tdDatas[j][i]+"").length;
					if(len > letterMaxCnt) letterMaxCnt = len;
				}
				tblData.letterMaxCnts[i] = letterMaxCnt;
			}
			var perLetterWidth = 0.5;//rem
			if(!!colWidScale) perLetterWidth*=colWidScale;
			
			var maxLeftColsWidth = 0;
			for(var i = 0; i < leftFrozenColCnt; i++){
				maxLeftColsWidth += tblData.letterMaxCnts[i];
			}
			maxLeftColsWidth = (maxLeftColsWidth*perLetterWidth + 3)+"rem";
			
			document.querySelector("#"+id+".frozen-tbl-con .frozen-left").style.width=maxLeftColsWidth;
			document.querySelector("#"+id+".frozen-tbl-con .right").style.marginLeft=maxLeftColsWidth;
			
			//第1-2列
			var left = document.querySelector("#"+id+".frozen-tbl-con .frozen-left");
			var rowCon = document.createElement("div");
			rowCon.className="tbl-row1";
			for(var i = 0; i < leftFrozenColCnt; i++){
				var elem = document.createElement("span");
				elem.innerHTML=tblData.thDatas[i];
				$(elem).css("width", tblData.letterMaxCnts[i]*perLetterWidth + "rem");
				rowCon.appendChild(elem);
			}
			var nobr = document.createElement("nobr");
			nobr.appendChild(rowCon);
			left.appendChild(nobr);
			for(var i=0; i<tblData.tdDatas.length; i++){
				var row = tblData.tdDatas[i];
				var rowCon = document.createElement("div");
				if(i%2==1) rowCon.className="tbl-row2";
				else rowCon.className="tbl-row3";
				for(var j = 0; j < leftFrozenColCnt; j++){
					var elem = document.createElement("span");
					elem.innerHTML=row[j];
					$(elem).css("width", tblData.letterMaxCnts[j]*perLetterWidth + "rem");
					rowCon.appendChild(elem);
				}
				var nobr = document.createElement("nobr");
				nobr.appendChild(rowCon);
				left.appendChild(nobr);
			}
			
			//3-n列
			var right = document.querySelector("#"+id+".frozen-tbl-con .right-in");
			var rowCon = document.createElement("div");
			rowCon.className="tbl-row1";
			for(var i = leftFrozenColCnt; i < tblData.thDatas.length;i++){
				var elem = document.createElement("span");
				elem.innerHTML=tblData.thDatas[i];
				$(elem).css("width", tblData.letterMaxCnts[i]*perLetterWidth + "rem");
				rowCon.appendChild(elem);
			}
			var nobr = document.createElement("nobr");
			nobr.appendChild(rowCon);
			right.appendChild(nobr);
			
			for(var i=0; i<tblData.tdDatas.length; i++){
				var row = tblData.tdDatas[i];
				var rowCon = document.createElement("div");
				if(i%2==1) rowCon.className="tbl-row2";
				else rowCon.className="tbl-row3";
				for(var j = leftFrozenColCnt; j < tblData.thDatas.length;j++){
					var elem = document.createElement("span");
					elem.innerHTML=row[j];
					$(elem).css("width", tblData.letterMaxCnts[j]*perLetterWidth + "rem");
					rowCon.appendChild(elem);
				}
				var nobr = document.createElement("nobr");
				nobr.appendChild(rowCon);
				right.appendChild(nobr);
			}
		}
		
		//单选
		function buildSelectByRadioList(selObjs, conSelector){
			//var selObjs = [{id:"id1",name:"name1",value:"value1",onclick:"alert(1)",checked:true,text:"text1"}];
            var inhtml = "";
			
            var span = document.createElement("span");
            span.className = "radio";
			
            //input hidden映射select属性
            var s = "";
            var checkedValue = "";
            for (var i = 0; i < selObjs.length; i++) {
				var selObj = selObjs[i];
                //label 映射option属性
                if (!!selObj.checked) {
                    checkedValue = selObj.value;
                    s += "<label value=\"" + selObj.value + "\" onclick=\"" + selObj.onclick + ";toselect(this);\" class=\"selected\">" + selObj.text + "</label>";
                }
                else {
                    s += "<label value=\"" + selObj.value + "\" onclick=\"" + selObj.onclick + ";toselect(this);\">" + selObj.text + "</label>";
                }
            }
            s = "<input type=\"hidden\" name=\"" + selObj.name + "\" value=\"" + checkedValue + "\"/>" + s;
            span.innerHTML = s;
            document.querySelector(conSelector).innerHTML = span.outerHTML;
        }
        function toselect(objElem) {
			//选择事件
            var nodes = objElem.parentNode.childNodes;
			
            //$(objElem.parentNode.parentNode).find("input[type='hidden']")
            for (var i = 0; i < nodes.length; i++) {
				if(!nodes[i].tagName || nodes[i].tagName=="#text") continue;
				
                if ((nodes[i].tagName+"").toLowerCase() == "input" && (nodes[i].type+"").toLowerCase() == "hidden") {
                    nodes[i].value = objElem.getAttribute("value");
                }
                else if (nodes[i].getAttribute("value") == objElem.getAttribute("value")) {
                    nodes[i].setAttribute("class", "selected");
                }
                else {
                    nodes[i].className = "";
                }
            }
        }
		
		//自定义tabcontrol选择
		function tabSelect(elem, tabContentId){
			//tabheader change
			$(".tabheader").removeClass("selected");			
			$(elem).removeClass("selected").addClass("selected");
			
			$(".tabcontent").removeClass("hidden").addClass("hidden");
			$("#" + tabContentId).removeClass("hidden");
		}
		
	//自定义li-select级联
	function coverSelect(elem, subselect, liId){
		var parent = $(elem).parent();
		parent.find(".option").removeClass("selected");
		$(elem).removeClass("selected").addClass("selected");
		$(".float-cover").removeClass("hidden").addClass("hidden");
		
		var valueId = parent.attr("data-valueid");
		$("#"+valueId).val($(elem).attr("data-value"));
		
		var textId = parent.attr("data-textid");
		$("#"+textId).html($(elem).html());
		
		if(!!subselect){//添加下一个属性
			var subData = $(elem).attr("data-data");
			if(!!subData){
				removeAfterSelectLis("#"+liId);
				appendAfter("#"+liId);
			}
			else{
				if(!ajaxs[subselect]) return;
				getAjaxRlt(ajaxs[subselect].url, function(data){
					//删除下边的, 添加一个
					//data=>options
					var options = data;
					//属性存储和更新UI
					$("#"+liId).attr("data-data", JSON.stringify(escape(options)));
					
					removeAfterSelectLis("#"+liId);
					appendAfter("#"+liId);
				});
			}
		}
	}
	function getAjaxRlt(url, callback){
		//ajax: data => select options
		var selOpts = [{value:"value1",text:"选择1"},{value:"value2",text:"选择2"},{value:"value3",text:"选择3"}];
		callback(selOpts);
	}
	function buildCoverSelect(options, elem){
		var text_id = $(elem).find(".select-text").attr("id");
		var value_id = $(elem).find(".select-value").attr("id");
		
		var selInHtml = "<div data-valueid='"+value_id+"' data-textid='"+text_id+"' class='select' data-data='"+escape(JSON.stringify(options))+"'>";
		var val = $(elem).find(".select-value").val();
		
		for(var i = 0; i < options.length;i++){
			if(options[i].value==val){
				selInHtml += "<div class='option selected' onclick='coverSelect(this, \""+$(elem).attr('data-subselect')+"\", \""+$(elem).attr("id")+"\")' data-value='"+options[i].value+"'>"+options[i].text+"</div>";
			}
			else{
				selInHtml += "<div class='option' onclick='coverSelect(this, \""+$(elem).attr('data-subselect')+"\", \""+$(elem).attr("id")+"\")' data-value='"+options[i].value+"'>"+options[i].text+"</div>";
			}
		}
		selInHtml += "</div>";
		$(".float-cover .float-content").html(selInHtml);
	}
	function showSelectCover(elem){
		if(!!$(elem).attr("data-select")){//ajax请求访问
			var url = $(elem).attr("data-select");
			var selectObj = getAjaxRlt(url, function(data){
				//data=>options
				var options = data;
				buildCoverSelect(options, elem);
			});
		}
		else{//非ajax请求访问
			buildCoverSelect([{value:"value1",text:"选择1"},{value:"value2",text:"选择2"},{value:"value3",text:"选择3"}], elem);
		}
		
		$(".cover").height(document.documentElement.scrollHeight+"px");
		$(".float-cover").removeClass("hidden");
	}
	function appendAfter(elem){//添加兄弟li-select
		var data = unescape($(elem).attr("data-data"));
		var nextUrlKey = $(elem).attr("data-subselect");
		var nextNextUrlKey = ajaxs[nextUrlKey].next;
		var newLiId = $(elem).attr("id") + "_1";
		var newTxtId = $(elem).find(".select-text").attr("id") + "_1";
		var newValId = $(elem).find(".select-value").attr("id") + "_1";
		var html = '<li class="li-select" onclick="showSelectCover(this);" id="'+newLiId+'" data-select="'+nextUrlKey+'" data-subselect="'+nextNextUrlKey+'">';
		html += '<span class="caption">部位</span>';
		html += '<span class="content">';
		html += '<span class="select-text" id="'+newTxtId+'">请选择</span>';
		html += '<input class="select-value" id="'+newValId+'" type="hidden"/>&nbsp;&gt;';
		html += '</span>';
		html += '</li>';
		
		$(html).insertAfter(elem);
	}
	function removeAfterSelectLis(elem){//删除下方所有的li-select
		var next = $(elem).next();
		while(!!next && next.attr("class") == "li-select"){
			next.remove();
			next = $(elem).next();
		}
	}
	
	//处理打开表格进行单选的情况
	function buildCoverSelectByTableList(tblItems, elem){
		var text_id = $(elem).find(".select-text").attr("id");
		var value_id = $(elem).find(".select-value").attr("id");
		
		var selInHtml = "<table data-valueid='"+value_id+"' data-textid='"+text_id+"' class='select' data-data='"+escape(JSON.stringify(tblItems))+"'>";
		var val = $(elem).find(".select-value").val();
		
		selInHtml+="<thead><tr>";
		for(var i = 0; i < tblItems.ths.length; i++){
			selInHtml += ("<th>" + tblItems.ths[i] + "</th>");
		}
		selInHtml += "</tr></thead>"
		
		selInHtml+="<tbody>";
		for(var i = 0; i < tblItems.items.length;i++){
			var row = tblItems.items[i];
			if(row.value==val){
				selInHtml += "<tr class='option selected' onclick='coverSelectTableList(this)' data-value='"+row.value+"' data-text='"+row.text+"'>";
				for(var j = 0; j < row.colTxts.length; j++){
					selInHtml += "<td class='option-td'>" + row.colTxts[j]+ "</td>";
				}
				selInHtml += "</tr>";
			}
			else{
				selInHtml += "<tr class='option' onclick='coverSelectTableList(this)' data-value='"+row.value+"' data-text='"+row.text+"'>";
				for(var j = 0; j < row.colTxts.length; j++){
					selInHtml += "<td class='option-td'>" + row.colTxts[j]+ "</td>";
				}
				selInHtml += "</tr>";
			}
		}
		selInHtml+="</tbody></table>";
		$(".float-cover .float-content").html(selInHtml);
	}
	function coverSelectTableList(optElem){
		var tbl = $(optElem).parents("table")[0];
		var valId = $(tbl).attr("data-valueid");
		var txtId = $(tbl).attr("data-textid");
		
		$("#"+valId).val($(optElem).attr("data-value"));
		$("#"+txtId).html($(optElem).attr("data-text"));
		
		$(".float-cover").removeClass("hidden").addClass("hidden");
	}
	
	$(document).ready(function(){
		//select的逻辑与级联的逻辑
		$(".float-cover").off().on("click", function(e){
			if((e.target.getAttribute("class")+"").indexOf('option')==-1){
				$(".float-cover").removeClass("hidden").addClass("hidden");
			}
		});
	});
	
	
	//冻结表格2
	function buildFrozenTbl2(tblData, selector, leftFrozenColCnt, colWidScale){
			/*var tblData = {
				thDatas:["列1","列2","列3","列4","列5","列6","列7","列8","列9"],
				tdDatas:[
					["a11","a12","a13","a14","a15","a16","a17","a18","a19"]
				]
			};*/
			//左边
			var lefTblHtml = "<thead><tr>";
			for(var i = 0; i < leftFrozenColCnt; i++){
				lefTblHtml += ("<th><nobr>" + tblData.thDatas[i] + "</nobr></th>");
			}
			lefTblHtml += "</tr></thead><tbody>";
			for(var i = 0; i < tblData.tdDatas.length; i++){
				var row = tblData.tdDatas[i];
				lefTblHtml+="<tr>";
				for(var j = 0; j < leftFrozenColCnt; j++){
					lefTblHtml += ("<td><nobr>" + row[j] + "</nobr></td>");
				}
				lefTblHtml+="</tr>";
			}
			lefTblHtml += "</tbody>";
			$(selector + " .frozen-left table").html(lefTblHtml);
			
			//右边
			var lefTblHtml = "<thead><tr>";
			for(var i = leftFrozenColCnt; i < tblData.thDatas.length; i++){
				lefTblHtml += ("<th><nobr>" + tblData.thDatas[i] + "</nobr></th>");
			}
			lefTblHtml += "</tr></thead><tbody>";
			for(var i = 0; i < tblData.tdDatas.length; i++){
				var row = tblData.tdDatas[i];
				lefTblHtml+="<tr>";
				for(var j = leftFrozenColCnt; j < row.length; j++){
					lefTblHtml += ("<td><nobr>" + row[j] + "</nobr></td>");
				}
				lefTblHtml+="</tr>";
			}
			lefTblHtml += "</tbody>";
			$(selector + " .frozen-right table").html(lefTblHtml);
	}
	//冻结表格2
	function buildFrozenTbl3(tblData, selector, leftFrozenColCnt, colWidScale){
			/*var tblData = {
				thDatas:["列1","列2","列3","列4","列5","列6","列7","列8","列9"],
				tdDatas:[
					{rData:["a11","a12","a13","a14","a15","a16","a17","a18","a19"],rClick:"alert(1);",ckClick:"console.log(1);"}
				]
			};*/
			//左边
			var lefTblHtml = "<thead><tr>";
			if(!!tblData.tdDatas[0] && !!tblData.tdDatas[0].ckClick) lefTblHtml += ("<th><nobr>选择</nobr></th>");
			for(var i = 0; i < leftFrozenColCnt; i++){
				lefTblHtml += ("<th><nobr>" + tblData.thDatas[i] + "</nobr></th>");
			}
			lefTblHtml += "</tr></thead><tbody>";
			for(var i = 0; i < tblData.tdDatas.length; i++){
				var row = tblData.tdDatas[i];
				lefTblHtml+="<tr onclick='"+row.rClick+"'>";
				if(!!row.ckClick) lefTblHtml += ("<td><nobr><input type='checkbox' data-change='"+encodeURIComponent(row.ckClick)+"'/></nobr></td>");
				for(var j = 0; j < leftFrozenColCnt; j++){
					lefTblHtml += ("<td><nobr>" + row.rData[j] + "</nobr></td>");
				}
				lefTblHtml+="</tr>";
			}
			lefTblHtml += "</tbody>";
			$(selector + " .frozen-left table").html(lefTblHtml);
			
			//右边
			var lefTblHtml = "<thead><tr>";
			for(var i = leftFrozenColCnt; i < tblData.thDatas.length; i++){
				lefTblHtml += ("<th><nobr>" + tblData.thDatas[i] + "</nobr></th>");
			}
			lefTblHtml += "</tr></thead><tbody>";
			for(var i = 0; i < tblData.tdDatas.length; i++){
				var row = tblData.tdDatas[i];
				lefTblHtml+="<tr onclick='"+row.rClick+"'>";
				for(var j = leftFrozenColCnt; j < row.rData.length; j++){
					lefTblHtml += ("<td><nobr>" + row.rData[j] + "</nobr></td>");
				}
				lefTblHtml+="</tr>";
			}
			lefTblHtml += "</tbody>";
			$(selector + " .frozen-right table").html(lefTblHtml);
			
			var cbks = $(selector + " .frozen-left table input[type='checkbox']");
			console.log("cbks.length:" + cbks.length);
			for(var i = 0; i < cbks.length; i++){
				cbks[i].onclick = function(e){
					e.stopPropagation();
				};
				cbks[i].onchange = function(e){
					eval(decodeURIComponent($(this).attr("data-change")));
				};
			}
	}
	//frozenTbl左侧宽度调整
	function frozenTblResize(){
		var frozeLefts = $(".frozen-tbl-con2 .frozen-left");
		var frozeRights = $(".frozen-tbl-con2 .frozen-right");
		var frozeTbls = $(".frozen-tbl-con2 .frozen-left table");
		var cWidth = document.documentElement.offsetWidth;
		
		for(var i = 0; i < frozeTbls.length; i++){
			var width = frozeTbls[i].offsetWidth;
			$(frozeLefts[i]).width((width+1)+"px");
			$(frozeRights[i]).css("margin-left", (width+4)+"px");
			
			var curLeftWidth = $(frozeLefts[i]).find("table")[0].offsetWidth;
			var curRightWidth = $(frozeRights[i]).find("table")[0].scrollWidth;
			
			//console.log(curLeftWidth+"+"+curRightWidth+"<"+cWidth);
			if(curLeftWidth + curRightWidth < cWidth){
				var ths = $(frozeRights[i], "th");
				var moreWidth = ths.length*4;//border-width,margin-left
				
				$(frozeRights[i]).find("table").css("width", (cWidth - curLeftWidth - moreWidth) + "px");
				/*var rate = (cWidth - curLeftWidth)/curRightWidth;
				var ths = $(frozeRights[i], "th");
				for(var j = 0; j < ths.length; j++){
					var newThW = ths[i].offsetWidth*rate;
					$(ths[i]).css("width", newThW+"px");
				}*/
			}
		}
	}
	$(window).resize(function() {
		frozenTblResize();
	});
	$(document).ready(function(){
		frozenTblResize();
	});
	function InitPageFooter(footerData, pageSelector){
		var curIdx=parseInt(footerData.pageNo);
		var maxIdx=Math.ceil(parseInt(footerData.allItemsCnt)/parseInt(footerData.pageSize));
		
		$(pageSelector+" .curPage").html(curIdx);
		$(pageSelector+" .maxPage").html(maxIdx);
		
		var btnLastPage = $(pageSelector + " .btn-lastPage");
		if(curIdx<=1){
			btnLastPage.attr("onclick", "");
			btnLastPage.removeClass("disabled").addClass("disabled");
		}
		else{
			btnLastPage.attr("onclick", "pageLoad('"+pageSelector+"','"+(curIdx-1)+"')");
			btnLastPage.removeClass("disabled");
		}
		var btnNextPage = $(pageSelector + " .btn-nextPage");
		if(curIdx>=maxIdx){
			btnNextPage.attr("onclick", "");
			btnNextPage.removeClass("disabled").addClass("disabled");
		}
		else{
			btnNextPage.attr("onclick", "pageLoad('"+pageSelector+"','"+(curIdx+1)+"')");
			btnNextPage.removeClass("disabled");
		}
	}