	runtime = {};
	runtime.diydate2 = {};
	runtime.diydate2.showdate=function(elem, date){
		//elem
		var val = date;
		if(!new RegExp(/[1-9][0-9]{3}-[01]{0,1}[0-9]-[1-3]{0,1}[0-9]/).test(val)){
			var curDate = new Date();
			var y = 1900 + curDate.getYear();
			var m = curDate.getMonth()+1;
			var d = curDate.getDate();
			val = y + "-" + m + '-' + d;
		}
		
		//date str
		var ymd = val.split('-');
		var y = parseInt(ymd[0]);
		var m = parseInt(ymd[1]);
		var d = parseInt(ymd[2]);
		
		$(".dateui .year-top").html(y);
		$(".dateui .month-top").html(m);
		$(".dateui .day-top").html(d);
		runtime.diydate2.resetWeekDay();
		
		$(".layermbox.dateui").removeClass("hidden");
		$(".layermbox.dateui").attr("from", "#"+$(elem).attr('id'));
	}
	runtime.diydate2.resetWeekDay=function(){
		//date weekday
		var y = $(".dateui .year-top").html();
		var m = $(".dateui .month-top").html();
		var d = $(".dateui .day-top").html();
		
		var date = new Date(y + "-" + m + "-" + d);
		var curWDay = date.getDay();
		var s="";
		switch(curWDay){
			case 1:
				s = "周一";
				break;
			case 2:
				s = "周二";
				break;
			case 3:
				s = "周三";
				break;
			case 4:
				s = "周四";
				break;
			case 5:
				s = "周五";
				break;
			case 6:
				s = "周六";
				break;
			case 0:
				s = "周日";
				break;
			default:
				break;
		}
		$(".layermbox.dateui .weekday-top").html(s);
	}
	runtime.diydate2.showSelect=function(elem, type){
		var parent = $(elem);
		var optsCon = parent.find('.diyselect-options');
		if(optsCon.attr("class").indexOf("hidden") == -1){
			optsCon.removeClass('hidden').addClass('hidden');
			return;
		}
		else{
			$(".diyselect-options").removeClass('hidden').addClass('hidden');
			optsCon.removeClass('hidden');
		}
		//date-data
		var y = parseInt($(".dateui .year-top").html());
		var m = parseInt($(".dateui .month-top").html());
		var d = parseInt($(".dateui .day-top").html());
		var list = [];
		
		var curIdx = 0;
		if(type == "year"){
			var k = 0;
			for(var i = y - 49; i < y + 51; i++){
				if(i==y){ curIdx = k; }
				list.push(i);
				k++;
			}
		}
		else if(type=="month"){
			var k = 0;
			for(var i = 1; i < 13; i++){
				if(i==m){ curIdx = k; }
				list.push(i);
				k++;
			}
		}
		else if(type=="day"){
			var maxDate = 0;
			if(m != 12){
				maxDate = new Date((new Date(y+"-"+(m+1)+"-1")).valueOf()-24*60*60*1000).getDate();
			}
			else{
				maxDate = new Date((new Date((y+1)+"-1-1")).valueOf()-24*60*60*1000).getDate();
			}
			var k = 0;
			for(var i = 1; i <= maxDate; i++){
				if(i==d){ curIdx = k; }
				list.push(i);
				k++;
			}
		}
		
		//date-ui
		var optsHtml = "";
		for(var i = 0; i < list.length; i++){
			optsHtml += ("<div class=\"diyselect-comp diyselect-option\" onclick=\"runtime.diydate2.setDate(this, '"+type+"')\">"+list[i]+"</div>");
		}
		optsCon.html(optsHtml);
		optsCon.removeClass("hidden");
		
		var offset=optsCon[0].scrollHeight*curIdx/list.length;
		optsCon.scrollTop(offset);
	}
	runtime.diydate2.setDate=function(elem, type){
		$(elem).parents('.date-surface').find('.'+type+'-top').html($(elem).html());
		
		if(type == "month"){
			var dayList = $(".date-surface").find('.dayList')[0];
			setTimeout(function(){ //日期越界，重订为1
				runtime.diydate2.showSelect(dayList, 'day');
				var dayTopElems = $(".date-surface").find(".day-top");
				var dayTopVal = dayTopElems.html();
				var dayOpts = $(dayList).find(".diyselect-option");
				var isContained = false;
				for(var i = 0; i < dayOpts.length; i++){
					if(dayOpts[i].innerHTML==dayTopVal){
						isContained = true;
					}
				}
				if(!isContained){
					dayTopElems.html(dayOpts[0].innerHTML);
				}
				runtime.diydate2.resetWeekDay();
			}, 200);
		}
		else{
			runtime.diydate2.resetWeekDay();
		}
	}
	runtime.diydate2.dateBtnClick=function(elem, callback){
		var txt = $(elem).html();
		var field = $($(".layermbox.dateui").attr("from")).data("field");
		if(txt=="清除"){
			var date='';
			var weekday='';
			callback(date, weekday);
		}
		else if(txt=="设置"){
			var y = $(".year-top").html();
			var m = $(".month-top").html();
			var d = $(".day-top").html();
			var v = y + "-" + runtime.diydate2.dateAddZero(m, 'month') + "-" + runtime.diydate2.dateAddZero(d, 'day');
			
			var weekday=$(".date-surface .weekday-top").html();
			callback(v, weekday);
		}
		$(".year-top").html('');
		$(".month-top").html('');
		$(".day-top").html('');
		
		$(elem).parents('.layermbox').removeClass('hidden').addClass('hidden');
	}
	runtime.diydate2.dateAddZero=function(s, type){
		if(type=='month' || type=="day"){
			if((s+"").length==1){
				s = '0' + s;
			}
		}
		return s;
	}
	document.body.onclick = function(event){//select冒泡处理 关闭
		if(event.target instanceof HTMLDivElement){
			var tarClass = $(event.target).attr("class")+"";
            if(tarClass.indexOf("diyselect-comp") > -1){
				return;
            }
        }
        $('.diyselect-options').removeClass('hidden').addClass('hidden');
    };