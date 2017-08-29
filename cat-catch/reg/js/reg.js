	//实现全屏
	function resetPage() {
		var deviceWidth = document.documentElement.clientWidth;
		var scale = deviceWidth / 640;
		document.body.style.zoom = scale;
	};

	window.onresize = function() {
		resetPage();
	};

	window.onload = function() {
		resetPage();
		/*var s = "";
		for(var attr in window.codeConsts){
			s += "window.codeConsts[" + attr + "]:" + window.codeConsts[attr] + ";";
		}
		alert(s);*/
		if(!!isChinese){
			track2(window.codeConsts.channelId, window.codeConsts.Codes.reg_cn_page_pv);
		}
		else{
			track2(window.codeConsts.channelId, window.codeConsts.Codes.reg_en_page_pv);
		}
	};
	
	var cn_checkbox = document.getElementById("checkbox-cn");
	if(!!cn_checkbox){
		if("checkbox-select" == cn_checkbox.className) {//cn-true
			cn_checkbox.isSelected = true;
		}
		else{
			cn_checkbox.isSelected = false;
		}
		
		cn_checkbox.onclick = function(){
			var en_checkbox = document.getElementById("checkbox-en");
			if(!this.isSelected){
				this.isSelected = true;
				this.className = "checkbox-select";
				en_checkbox.isSelected = false;
				en_checkbox.className = "checkbox-unselect";
			}
			else{
				this.isSelected = false;
				this.className = "checkbox-unselect";
				en_checkbox.isSelected = true;
				en_checkbox.className = "checkbox-select";
			}
		};
	}
	
	var en_checkbox = document.getElementById("checkbox-en");
	if(!!en_checkbox){
		if("checkbox-select" == en_checkbox.className) 
		{		
			en_checkbox.isSelected = true;
		}
		else{
			en_checkbox.isSelected = false;
		}
		en_checkbox.onclick = function(){
			var cn_checkbox = document.getElementById("checkbox-cn");
			if(!this.isSelected){
				this.isSelected = true;
				this.className = "checkbox-select";
				cn_checkbox.isSelected = false;
				cn_checkbox.className = "checkbox-unselect";
			}
			else{
				this.className = "checkbox-unselect";
				cn_checkbox.isSelected = true;
				cn_checkbox.className = "checkbox-select";
			}
		};
	}
	var notice_help = document.getElementsByClassName("notice-help")[0];
	if(!!notice_help){
		notice_help.onclick = function(){
			this.style.display = "none";
		};
	}
	
	var char_ques = document.getElementsByClassName("char-ques")[0];
	if(!!char_ques){
	char_ques.onclick = function(){
		var notice_help = document.getElementsByClassName("notice-help")[0];
		notice_help.style.display = "block";
	};
	}
	
	var notice_help = document.getElementsByClassName("notice-success")[0];
	if(!!notice_help){
		notice_help.onclick = function(){
			this.style.display = "none";
		};
	}
	
	var btn_cn_page = document.getElementsByClassName("en-lang-unselect-tab")[0];
	if(!!btn_cn_page){
		btn_cn_page.onclick = function(){
			window.location.href = "index-en.html";
		};
	}
	var btn_en_page = document.getElementsByClassName("cn-lang-unselect-tab")[0];
	if(!!btn_en_page){
		btn_en_page.onclick = function(){
			window.location.href = "index.html";
		};
	}
	
	var btn_submit = document.getElementsByClassName("btn-submit-cn")[0];
	if(!btn_submit) {
		btn_submit = document.getElementsByClassName("btn-submit-en")[0];
	}
	
	var isChinese = !!document.getElementsByClassName("cn-lang-select-tab")[0];
	
	if(!!btn_submit){
		btn_submit.onclick = function(){
			
			if(isChinese){
				track2(window.codeConsts.channelId ,window.codeConsts.Codes.reg_cn_page_submit);
			}
			else{
				track2(window.codeConsts.channelId ,window.codeConsts.Codes.	reg_en_page_submit);
			}
		
			var url = "";
			var param = "";
			var text_wechatno = document.getElementsByClassName("text-wechatno")[0].value;
			var text_nickname = document.getElementsByClassName("text-nickname")[0].value;
			var text_realname = document.getElementsByClassName("text-realname")[0].value;
			var text_email = document.getElementsByClassName("text-email")[0].value;
			var text_mobile = document.getElementsByClassName("text-mobile")[0].value;
			var is_lang_CN = document.getElementById("checkbox-cn").isSelected;
			var is_lang_EN = document.getElementById("checkbox-en").isSelected;
			//alert(text_wechatno + "," + text_nickname + "," + text_realname + "," + text_email + "," + text_mobile + "," + is_lang_CN + "," + is_lang_EN);
			
			if("" === text_wechatno){
				if(isChinese){
					alert("请您填写微博号");
				}
				else{
					alert("Please input 'WebChatID'");
				}
				return;
			}
			if("" === text_nickname){
				if(isChinese){
					alert("请您填写昵称");
				}
				else{
					alert("Please input 'Nickname'");
				}
				return;
			}
			if("" === text_realname){
				if(isChinese){
					alert("请您填写名字");
				}
				else{
					alert("Please input 'Name'");
				}
				return;
			}
			if("" === text_email){
				if(isChinese){
					alert("请您填写公司邮箱");
				}
				else{
					alert("Please input 'Company Mail'");
				}
				return;
			}
			var lang = "";
			if(is_lang_CN){
				lang = 1;
			}
			else if(is_lang_EN){
				lang = 2;
			}
			
			var data = "wenchatno=" + text_wechatno + "&nickname=" + text_nickname+ "&realname=" + text_realname + "&email="+ text_email  + "&mobile=" + text_mobile +"&lang="+ lang;
			alert(data);
	
			/*	
			//ajax提交后
			//notice-success => show
			ajax("POST", url, data, function(response){
				if(!!response){
					var objRlt = window.eval(response);
					if(1 === objRlt.success){
						alert("提交成功");
						//清空界面数据
					}
					else{
						alert(objRlt.info);
					}
				}
			});*/
		};
	}