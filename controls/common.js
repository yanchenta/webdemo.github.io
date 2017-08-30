//日期格式化与转换
//1.1: new Date().format("")
Date.prototype.format=function(formatStr){
	var year = ((1900 + this.getYear()) + "").leftSupply('0', 4);
	var month = ((this.getMonth()+1) + "").leftSupply('0', 2);
	var date = (this.getDate()+"").leftSupply('0', 2);
	
	var rlt = formatStr.replace(/yyyy/gi, year);
	rlt = rlt.replace(/yy/gi, year);
	rlt = rlt.replace(/MM/gi, month);
	rlt = rlt.replace(/dd/gi, date);
	rlt = rlt.replace(/dd/gi, date);
}
Date.prototype.getWeekDay(stDate, endDate){
	var stNumber = stDate;
	var endNumber = endDate;
	if(stDate instanceof String) { stDate = new Date(stDate); }
	if(endDate instanceof String) { endDate = new Date(endDate); }
	if(stDate instanceof Date) { stNumber = stDate.getTime(); }
	if(endDate instanceof Date) { endNumber = endDate.getTime(); }
	
	var disTime = endNumber - stNumber;
}

//1.2 到year/month/day hour/minute/second week/day


//数字格式化与大小写转换
//2.1 编号转变为大写

//2.2 数字转变为大写

//字符串操作
String.prototype.leftSupply(sChar, len){
	var newS = newS;
	var suLen = len - newS.length;
	for(var i = 0; i < suLen; i++){
		newS = (sChar + newS);
	}
	return newS;
}

