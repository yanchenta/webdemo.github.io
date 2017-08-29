	var isNavShow = false;
	$(function(){
		$('#shaix').click(function(e){//show selection
			e.stopPropagation();
			isNavShow = true;
			$('.mark').fadeIn();
			$('.cont5').css('-webkit-transform','translate(-270px,0)');
			$('.province').css('-webkit-transform','translate(-230px,0)');
			
			//筛选-click
			track2(window.codeConsts.channelId, window.codeConsts.codes.page_fuwu_click_shaixuan);
		});
		
		$('.mark').click(function(){
			if(isNavShow){
				$('.mark').fadeOut();
				$('.cont5').css('-webkit-transform','translate(0,0)');
				$('.province').css('-webkit-transform','translate(0,0)');
			}
		});

		$(".wanjie").click(function(){//hide selection
			
			$('.mark').fadeOut();
			$('.cont5').css('-webkit-transform','translate(0,0)');
			$('.province').css('-webkit-transform','translate(0,0)');
			
			//当前查询信息
			$('.pro-cont')[0].province = $('.province')[0].tag;
			$('.pro-cont')[0].city = $('.qu')[0].tag;
			$('.pro-cont')[0].type = $('.peo')[0].tag;
			
			var txtBox = "";
			if(null != $('.pro-cont')[0].province)
			{
				txtBox += $('.pro-cont')[0].province;
				if(null != $('.pro-cont')[0].city)
				{
					txtBox = txtBox + "  " + $('.pro-cont')[0].city;
					if(null != $('.pro-cont')[0].type)
					{
						txtBox = txtBox + "  " + $('.pro-cont')[0].type
					}
				}
			}
			$('.gjz')[0].value = txtBox;
			loadServers($('.pro-cont')[0].province, $('.pro-cont')[0].city, $('.pro-cont')[0].type);
			
			////清理临时信息
			//$('.sheng')[0].tag = "";
			//$('.qu')[0].tag = "";
			//$('.peo')[0].tag = "";
			
		});
		
		loadProvinces();//add province
		loadProfessions();
	});

	function jsonStrFormat(jsonStr)
	{
		for(var i = 0; i < 30; i++)
		{
			jsonStr = jsonStr.replace('\"', '"');
		}
		return jsonStr;
	}
	
	function loadProvinces()
	{
		//provinces list: ajax获取=>http://shuaxinfuwu.nipponpaint.com.cn/getProvincesForJson.action
		//ajax("http://shuaxinfuwu.nipponpaint.com.cn/getProvincesForJson.action");
		var _url = "http://shuaxinfuwu.nipponpaint.com.cn/getProvincesForJson.action";
		ajax(_url,function(response){
			    	//alert(typeof response);
					var returnStr_Province = response;
					returnStr_Province = jsonStrFormat(returnStr_Province);
		
					var provinces = eval('(' + returnStr_Province + ')').result.provinces;
					var divSheng = $(".sheng")[0];
					for(var i = 0; i < provinces.length; i++)
					{
						var elem = document.createElement("a");
						elem.innerHTML = provinces[i].province;
			
						elem.onclick = function()
						{
							$('.province')[0].tag = this.innerHTML;//save selected data
							$('.province')[0].tagText = this.innerHTML;//save selected data
				
							loadCities(this.innerHTML);
				
							var parent = this.parentNode;//变色反应
							for(var j = 0; j < parent.childNodes.length; j++)
							{
								if(parent.childNodes[j] != this)
								{
									parent.childNodes[j].style = {};
									parent.childNodes[j].style.color = "#000000";
								}
								else
								{
									parent.childNodes[j].style = {};
									parent.childNodes[j].style.color = "red";
								}
							}
						}
						divSheng.appendChild(elem);
			
					}
		});
		$.ajax();

	//"{\"result\":{\"status\":\"OK\",\"provinces\":[{\"province\":\"上海市\"},{\"province\":\"北京市\"},{\"province\":\"天津市\"},{\"province\":\"广东省\"},{\"province\":\"江苏省\"},{\"province\":\"浙江省\"},{\"province\":\"四川省\"},{\"province\":\"湖北省\"},{\"province\":\"福建省\"},{\"province\":\"山东省\"}]}}";
		
	}
	
	function loadCities(province)
	{
		//cities list: ajax => "http://shuaxinfuwu.nipponpaint.com.cn/getCitiesForJson.action?user.province=" + province;
		//var returnStr_City = "{\"result\":{\"cities\":[{\"city\":\"杭州\"},{\"city\":\"宁波\"},{\"city\":\"温州\"}],\"status\":\"OK\"}}";
		//ajax("http://shuaxinfuwu.nipponpaint.com.cn/getProvincesForJson.action");
		var _url = "http://shuaxinfuwu.nipponpaint.com.cn/getCitiesForJson.action?user.province=" + province;
		ajax(_url,function(response){
			var returnStr_City = jsonStrFormat(response);
		
			var cities = eval('(' + returnStr_City + ')').result.cities;
			var divQu = $(".qu")[0];
		
			//clear all children;
			for(var i = divQu.childNodes.length - 1; i >= 0; i--)
			{
				divQu.removeChild(divQu.childNodes[i]);
			}
		
		
			//add 不限
			var elem = document.createElement("a");
			elem.tag = null;
			elem.innerHTML = "不限";
		
			elem.onclick = function()
			{
				$('.qu')[0].tag = this.tag;//save selected data
				$('.qu')[0].tagText = this.innerHTML;//save selected data
			
				var parent = this.parentNode;//变色反应
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					if(parent.childNodes[j] != this)
					{
						parent.childNodes[j].style = {};
						parent.childNodes[j].style.color = "#000000";
					}
					else
					{
						parent.childNodes[j].style = {};
						parent.childNodes[j].style.color = "red";
					}
				}
			}
			divQu.appendChild(elem);
		
		
			//add cities
			for(var i = 0; i < cities.length; i++)
			{
				var elem = document.createElement("a");
				elem.innerHTML = cities[i].city;
				elem.tag = cities[i].city;
				elem.onclick = function()
				{
					$('.qu')[0].tag = this.tag;//save selected data
					$('.qu')[0].tagText = this.innerHTML;
				
					var parent = this.parentNode;//变色反应
					for(var j = 0; j < parent.childNodes.length; j++)
					{
						if(parent.childNodes[j] != this)
						{
							parent.childNodes[j].style = {};
							parent.childNodes[j].style.color = "#000000";
						}
						else
						{
							parent.childNodes[j].style = {};
							parent.childNodes[j].style.color = "red";
						}
					}
				}
			
				divQu.appendChild(elem);
			}
		});
	}
	
	function loadProfessions()
	{
		//static server type
		var professions = [{
				text:"不限", 
				value:null
			},{
				text:"客户专员",
				value:"客户专员"
			},{
				text:"施工",
				value:"施工人员"
			}];
		var divPeo = $(".peo")[0];
		
		for(var i = 0; i < professions.length; i++)
		{
			var elem = document.createElement("a");
			elem.innerHTML = professions[i].text;
			elem.tag = professions[i].value;
			elem.onclick = function()
			{
				$('.peo')[0].tag = this.tag;
				$('.peo')[0].tagText = this.innerHTML;
				
				var parent = this.parentNode;//变色反应
				for(var j = 0; j < parent.childNodes.length; j++)
				{
					if(parent.childNodes[j] != this)
					{
						parent.childNodes[j].style = {};
						parent.childNodes[j].style.color = "#000000";
					}
					else
					{
						parent.childNodes[j].style = {};
						parent.childNodes[j].style.color = "red";
					}
				}
			}
			divPeo.appendChild(elem);
		}
		
	}
	
	function loadServers(province, city, profession)
	{
		//var returnStr_Servers = "{\"result\":{\"users\":[{\"uid\":\"1245\",\"dimission\":\"0\",\"sex\":\"1\",\"userPhoto\":\"findImg.action?type=5&user.uid=1245\",\"type\":\"客户专员\",\"city\":\"宁波\",\"startTime\":\"1997-01-01\",\"province\":\"浙江省\",\"userName\":\"蔡长清\",\"siteDescrption3\":\"\",\"honour\":\"\",\"siteDescrption2\":\"\",\"siteDescrption4\":\"\",\"star\":\"8\",\"extra1\":\"0\",\"extra2\":\"60\",\"extra3\":\"\",\"extra4\":\"\",\"siteDescrption1\":\"\",\"sitePhoto2\":\"\",\"sitePhoto1\":\"\",\"unspell\":\"CCQ\",\"specialty\":\"\",\"sitePhoto4\":\"\",\"sitePhoto3\":\"\"},{\"uid\":\"719\",\"dimission\":\"0\",\"sex\":\"1\",\"userPhoto\":\"findImg.action?type=5&user.uid=719\",\"type\":\"客户专员\",\"city\":\"宁波\",\"startTime\":\"2009-01-01\",\"province\":\"浙江省\",\"userName\":\"刘绍雄\",\"siteDescrption3\":\"\",\"honour\":\"2013上半年立邦刷新服务最佳顾客满意奖 冠军\",\"siteDescrption2\":\"\",\"siteDescrption4\":\"\",\"star\":\"10\",\"extra1\":\"0\",\"extra2\":\"103\",\"extra3\":\"\",\"extra4\":\"\",\"siteDescrption1\":\"\",\"sitePhoto2\":\"\",\"sitePhoto1\":\"\",\"unspell\":\"LSX\",\"specialty\":\"\",\"sitePhoto4\":\"\",\"sitePhoto3\":\"\"},{\"uid\":\"406\",\"dimission\":\"0\",\"sex\":\"1\",\"userPhoto\":\"findImg.action?type=5&user.uid=406\",\"type\":\"客户专员\",\"city\":\"宁波\",\"startTime\":\"2000-01-01\",\"province\":\"浙江省\",\"userName\":\"吴碧景\",\"siteDescrption3\":\"\",\"honour\":\"\",\"siteDescrption2\":\"\",\"siteDescrption4\":\"\",\"star\":\"8\",\"extra1\":\"0\",\"extra2\":\"158\",\"extra3\":\"\",\"extra4\":\"\",\"siteDescrption1\":\"\",\"sitePhoto2\":\"\",\"sitePhoto1\":\"\",\"unspell\":\"WBJ\",\"specialty\":\"\",\"sitePhoto4\":\"\",\"sitePhoto3\":\"\"},{\"uid\":\"1612\",\"dimission\":\"0\",\"sex\":\"1\",\"userPhoto\":\"findImg.action?type=5&user.uid=1612\",\"type\":\"客户专员\",\"city\":\"宁波\",\"startTime\":\"2007-01-01\",\"province\":\"浙江省\",\"userName\":\"吴都\",\"siteDescrption3\":\"\",\"honour\":\"\",\"siteDescrption2\":\"\",\"siteDescrption4\":\"\",\"star\":\"10\",\"extra1\":\"0\",\"extra2\":\"4\",\"extra3\":\"\",\"extra4\":\"\",\"siteDescrption1\":\"\",\"sitePhoto2\":\"\",\"sitePhoto1\":\"\",\"unspell\":\"WD\",\"specialty\":\"\",\"sitePhoto4\":\"\",\"sitePhoto3\":\"\"},{\"uid\":\"720\",\"dimission\":\"0\",\"sex\":\"1\",\"userPhoto\":\"findImg.action?type=5&user.uid=720\",\"type\":\"客户专员\",\"city\":\"宁波\",\"startTime\":\"2009-01-01\",\"province\":\"浙江省\",\"userName\":\"吴育坤\",\"siteDescrption3\":\"\",\"honour\":\"\",\"siteDescrption2\":\"\",\"siteDescrption4\":\"\",\"star\":\"10\",\"extra1\":\"0\",\"extra2\":\"131\",\"extra3\":\"\",\"extra4\":\"\",\"siteDescrption1\":\"\",\"sitePhoto2\":\"\",\"sitePhoto1\":\"\",\"unspell\":\"WYK\",\"specialty\":\"\",\"sitePhoto4\":\"\",\"sitePhoto3\":\"\"}],\"page\":{\"prePage\":\"1\",\"nextPage\":\"1\",\"curPage\":\"1\",\"pageSize\":\"15\",\"sum\":\"5\",\"countPage\":\"1\"},\"status\":\"OK\"}}";
		
		var paraPart = "";
		if(null != province && "" != province) 
		{	
			if(0 == paraPart.length) 
				paraPart += "?user.province=" + province;
			else 
				paraPart += "&user.province=" + province;
		}
		
		if(null != city && "" != city)
		{
			if(0 == paraPart.length) 
				paraPart += "?user.city=" + city;
			else
				paraPart += "&user.city=" + city;
		}
		
		if(null != profession && "" != profession) 
		{
			if(0 == paraPart.length) 
				paraPart += "?user.type=" + profession;
			else
				paraPart += "&user.type=" + profession;
		}
		//http://shuaxinfuwu.nipponpaint.com.cn/searchForJson.action?user.province=四川省&user.city=成都&user.type=客户专员
		var _url = "http://shuaxinfuwu.nipponpaint.com.cn/searchForJson.action" + paraPart;
		//alert(_url);
		ajax(_url, function(response){
			returnStr_Servers = jsonStrFormat(response);
			var servers = eval('(' + returnStr_Servers + ')').result.users;
			var divServer = $(".shuju")[0];
		
			var columnNames = ["userName", "province", "city", "type", "no"];
			var columnTexts = ["姓名", "省份", "城市", "人员类型", "证书编号"];
			var columnWidths = ["50px", "50px", "50px", "60px", "80px"];
			clearTable(divServer);
			createTable(divServer, columnNames, columnWidths, columnTexts, servers);
		});
	}
	
	function clearTable(parent)
	{
		for(var i = parent.childNodes.length - 1; i >= 0; i--)
		{
			if(0 != parent.childNodes[i].childNodes.length)
			{
				//alert(parent.childNodes[i].childNodes.length);
				for(var j = parent.childNodes[i].childNodes.length - 1; j >= 0; j--)
				{
					//alert(parent.childNodes[i].childNodes.length);
					parent.childNodes[i].removeChild(parent.childNodes[i].childNodes[j]);
				}
			}
			parent.removeChild(parent.childNodes[i]);
		}
	}
	
	function createTable(parent, columnNames, columnWidths, columnTexts, jsonArr)
	{
		//create header: titles and their style...
		var colHeaderRow = document.createElement("div");
		colHeaderRow.style.width = "100%";
		colHeaderRow.style.height = "30px";
		colHeaderRow.style.backgroundColor = "#A0A0A0";
		for(var i = 0; i < columnTexts.length; i++)
		{
			var tdElem = document.createElement("span");
			tdElem.innerHTML = columnTexts[i];
			tdElem.style.display = "inline-block";
			tdElem.style.textAlign = "center";
			tdElem.style.width = columnWidths[i];
			tdElem.style.marginTop = "5px";
			tdElem.style.color = "white";
			colHeaderRow.appendChild(tdElem); //row elements add ts element
		}
		parent.appendChild(colHeaderRow); //add row elements
		
		//create rows: td style...
		//var colWidth_Avr = (100 / columnNames.length) + "%";
		for(var i = 0; i < jsonArr.length; i++)
		{
			var rowElem = document.createElement("div");
			rowElem.style.width = "100%";
			rowElem.style.height = "30px";
			rowElem.itemInfo = JSON.stringify(jsonArr[i]);
			rowElem.onclick = function()
			{
				var jsonStr = this.itemInfo;
				window.location.href = "m_5_1.html?serverInfo=" + jsonStr;
			}
			
			//是否能被整除 => 隔行背景色设置
			if(Math.floor(i / 2) * 2 < i) //1, 3, 5, 7, 9
			{
				rowElem.style.backgroundColor = "white";
			}
			else  //2, 4, 6, 8, 10
			{
				rowElem.style.backgroundColor = "#DDDDDD";
			}
			
			for(var j = 0; j < columnNames.length; j++)
			{
				var attrName = columnNames[j];
			    var tdElem = document.createElement("span");
				//alert(jsonArr[i][attrName]);
				if(!!jsonArr[i][attrName])
				{
					tdElem.innerHTML = jsonArr[i][attrName];
				}
				else
				{
					tdElem.innerHTML = "无数据";
				}
				tdElem.style.color = "#727272";
				tdElem.style.display = "inline-block";
				tdElem.style.marginTop = "5px";
				tdElem.style.paddingLeft = "3px";
				tdElem.style.width = columnWidths[j];
				rowElem.appendChild(tdElem); //row elements add ts element
			}
			parent.appendChild(rowElem);//add row elements
		}
	}