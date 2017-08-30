var dateutil={};
dateutil.build = function(year,month,day){
	var newY = year;
	if(year>0 && year<1000){
		newY = 1900+year;
	}
	var newM = month;
	if((month+"").length==1){
		newM = "0"+month;
	}
	var newD = day;
	if((day+"").length==1){
		newD = "0"+day;
	}
	return newY+"-"+newM+"-"+newD;
}
dateutil.getNow = function(){
	var date = new Date();
	var y = date.getYear();
	var m = 1 + date.getMonth();
	var d = date.getDate();
	
	return dateutil.build(y, m, d);
}
dateutil.formNum = function(numStr, figCnt){
	var s = numStr + "";
	while(s.length<figCnt){
		s = ('0'+s);
	}
	return s;
}
dateutil.format = function(dt, type){
	//从ymd中获取元素: yyyy,yy,MM,dd,hh,mm,ss,cnWD,enWD,enDate
	var y = 1900 + dt.getYear();
	var y1 = (y + "").substr(2);
	var month = dateutil.formNum(1 + dt.getMonth(), 2);
	var d = dateutil.formNum(dt.getDate(), 2);
	var h = dateutil.formNum(dt.getHours(), 2);
	var minute = dateutil.formNum(dt.getMinutes(), 2);
	var s = dateutil.formNum(dt.getSeconds(), 2);
	var wd = dt.getDay();
	var cnWD = "";
	var enWD = "";
	switch(wd){
		case 1:
			cnWD = "星期一";
			enWD = "Mon";
			break;
		case 2:
			cnWD = "星期二";
			enWD = "Tues";
			break;
		case 3:
			cnWD = "星期三";
			enWD = "Wed";
			break;
		case 4:
			cnWD = "星期四";
			enWD = "Thur";
			break;
		case 5:
			cnWD = "星期五";
			enWD = "Fri";
			break;
		case 6:
			cnWD = "星期六";
			enWD = "Sat";
			break;
		case 7:
			cnWD = "星期日";
			enWD = "Sun";
			break;
		default:
			break;
	}
	
	var tmpStr = type?type:'';
	if(tmpStr.indexOf("yyyy")>-1){
		tmpStr = tmpStr.replace("yyyy", y);
	}
	else if(tmpStr.indexOf("yy")>-1){
		tmpStr = tmpStr.replace("yy", y1);
	}
	if(tmpStr.indexOf("MM")>-1){
		tmpStr = tmpStr.replace("MM", month);
	}
	if(tmpStr.indexOf("dd")>-1){
		tmpStr = tmpStr.replace("dd", d);
	}
	if(tmpStr.indexOf("hh")>-1){
		tmpStr = tmpStr.replace("hh", h);
	}
	if(tmpStr.indexOf("mm")>-1){
		tmpStr = tmpStr.replace("mm", minute);
	}
	if(tmpStr.indexOf("ss")>-1){
		tmpStr = tmpStr.replace("ss", s);
	}
	if(tmpStr.indexOf("cnWD")>-1){
		tmpStr = tmpStr.replace("cnWD", cnWD);
	}
	if(tmpStr.indexOf("enWD")>-1){
		tmpStr = tmpStr.replace("enWD", enWD);
	}
	if(tmpStr.indexOf("enDate")>-1){
		var parts = dt.toString().split(' ');
		tmpStr = tmpStr.replace("enDate", parts[1] +" " + parts[2] + " " + parts[3]);
	}
	if(tmpStr==type || tmpStr==''){
		return dateutil.build(dt.getYear(), dt.getMonth(), dt.getDate());
	}
	else{
		return tmpStr;
	}
}
dateutil.add = function(dt, addNum, addType){
	var y = 1900+dt.getYear()+(addType=='y'?addNum:0);
	var m = dt.getMonth()+(addType=='M'?addNum:0);
	var d = dt.getDate()+(addType=='d'?addNum:0);
	var h = dt.getHours()+(addType=='h'?addNum:0);
	var minute = dt.getMinutes()+(addType=='m'?addNum:0);
	var s = dt.getSeconds()+(addType=='s'?addNum:0);
	var ms = dt.getMilliseconds()+(addType=='ms'?addNum:0);
	return new Date(y, m, d, h, minute, s, ms);
}
dateutil.addMonths = function(dt, addM){
	var y = 1900+dt.getYear();
	var m = dt.getMonth();
	var d = dt.getDate();
	var h = dt.getHours();
	var minute = dt.getMinutes();
	var s = dt.getSeconds();
	var ms = dt.getMilliseconds();
	var monthDays = {
		"1":31,
		"2":(y%400>0 && y%4==0)?29:28,
		"3":31,
		"4":30,
		"5":31,
		"6":30,
		"7":31,
		"8":31,
		"9":30,
		"10":31,
		"11":30,
		"12":31
	};
	var tmpDT = dateutil.add(dt, addM, 'M')
	while(tmpDT.getDate() > monthDays["" + tmpDT.getMonth()] || tmpDT.getMonth() != (m+addM)%12){
		var day = tmpDT.getDate();
		tmpDT = dateutil.add(tmpDT,-1,"d");
	}
	return tmpDT;
}
dateutil.getLastMonthday = function(dt){
	var y = 1900+dt.getYear();
	var m = dt.getMonth();
	var d = 0;
	var h = dt.getHours();
	var minute = dt.getMinutes();
	var s = dt.getSeconds();
	var ms = dt.getMilliseconds();
	return new Date(y, m, d, h, minute, s, ms);
}