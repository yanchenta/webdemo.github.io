		function loadData(json){
			json = formatJson(json);
			
				$('#td_name')[0].innerHTML	= json.userName;
				$('#td_sex')[0].innerHTML = json.sex;
				
				$('#td_province')[0].innerHTML = json.province;
				$('#td_city')[0].innerHTML = json.city;
				$('#td_ensuredCode')[0].innerHTML = json.no;
				$('#td_stTime')[0].innerHTML = json.startTime;
				$('#td_serviceNum')[0].innerHTML = json.extra2;
				appendCrown($('#td_honorLevel')[0], json.extra1);
				$('#td_reward')[0].innerHTML = json.honour;
				$('#img_portrait')[0].src = "http://shuaxinfuwu.nipponpaint.com.cn/" + json.userPhoto;
				appendStar($('#imgs_stars')[0], json.star);
		}
		
		//create no of server
		function createNo(preFix, no)
		{
			var numLen = 6;
			var newNum = "" + no;
			while(newNum.length < numLen)
			{
				newNum = '0' + newNum;
			}
			
			return preFix + '-' + newNum;
		}
		
		//add stars
		function appendStar(panel,score)
		{
			if(score < 0) score = 0;
			if(score > 10) score = 10;
			var divider =  Math.floor(score/2);
			var rest = score - divider*2;
			for(var i = 0; i < divider; i++)  //add blue stars
			{
				var elem = document.createElement("img");
				elem.src = "images/5app-star-1.png";
				elem.style.height = "22px";
				panel.appendChild(elem);
			}
			
			if(1 == rest)  //add half star;
			{
				var elem = document.createElement("img");
				elem.src = "images/5app-star-2.png";
				elem.style.height = "22px";
				panel.appendChild(elem);
			}
			
			if(divider + rest < 5)  //add white stars;
			{
				var whiteStarCnt = 5 - (divider + rest);
				for(var i = 0; i < whiteStarCnt; i++)
				{
					var elem = document.createElement("img");
					elem.src = "images/5app-star-3.png";
					elem.style.height = "22px";
					panel.appendChild(elem);
				}
			}
		}
		
		// add crown
		function appendCrown(panel,num)
		{
			if(num < 0) num = 0;
			if(num > 5) num = 5;
			for(var i = 0; i < num; i++)
			{
				var elem = document.createElement("img");
				elem.src = "images/5app-king.png";
				elem.style.marginTop = "6px";
				elem.style.height = "12px";
				panel.appendChild(elem);
			}
		}
		
		function formatJson(json)
		{
			if(!json.userName) json.userName = "";
			if(!json.sex) json.sex = "";
			else if("1" == json.sex) json.sex = "男";
			else json.sex = "女";
			if(!json.province) json.province = "";
			if(!json.city) json.city = "";
			if(!json.no) json.no = ""; //json.no = createNo(json.unspell, json.uid);
			if(!json.startTime) json.startTime = "";
			if(!json.extra2) json.extra2 = "";
			if(!json.extra1) json.extra1 = 0;//crown
			if(!json.honour) json.honour = "";
			if(!json.userPhoto) json.userPhoto = "";
			if(!json.star) json.star = 0;//star
			return json;
		}
		/*
		var json={
			uid:"719",
			dimission:"0",
			sex:"1",
			userPhoto:"findImg.action?type=5&user.uid=719",
			type:"客户专员",
			city:"宁波",
			startTime:"2009-01-01",
			province:"浙江省",
			userName:"刘绍雄",
			siteDescrption3:"",
			honour:"2013上半年立邦刷新服务最佳顾客满意奖 冠军",
			siteDescrption2:"",
			siteDescrption4:"",
			star:"7",
			extra1:"2",
			extra2:"103",
			extra3:"",
			extra4:"",
			siteDescrption1:"",
			sitePhoto2:"",
			sitePhoto1:"",
			unspell:"LSX",
			specialty:"",
			sitePhoto4:"",
			sitePhoto3:""
		};*/
		var markStr = "?serverInfo=";
		var stIdx = window.location.href.indexOf(markStr);
		if(stIdx > 0)
		{
			var jsonStr = decodeURI(window.location.href.substring(stIdx + markStr.length));
			var json = eval('(' + jsonStr + ')');
			loadData(json);
		}