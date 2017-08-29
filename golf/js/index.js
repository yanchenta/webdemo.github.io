






	function JsonToStr(o) {
            var r = [];
            if (typeof o == "string" || o == null) {
                return o;
            }
            if (typeof o == "object") {
                if (!o.sort) {
                    r[0] = "{"
                    for (var i in o) {
                        r[r.length] = i;
                        r[r.length] = ":";
                        r[r.length] = JsonToStr(o[i]);
                        r[r.length] = ",";
                    }
                    r[r.length - 1] = "}"
                } else {
                    r[0] = "["
                    for (var i = 0; i < o.length; i++) {
                        r[r.length] = JsonToStr(o[i]);
                        r[r.length] = ",";
                    }
                    r[r.length - 1] = "]"
                }
                return r.join("");
            }
            return o.toString();
    }

	function resetPage() {
		var deviceWidth = document.documentElement.clientWidth;
		var scale = deviceWidth / 640;
		document.body.style.zoom = scale;
	}

	window.onresize = function() {
		resetPage();
	}

	window.onload = function() {
		resetPage();
	}
	//...
	var testUrl = "http://test.zhangkuo.net/advmessage/qnnaire/commit.action?qnnaireid=4&commitinfo=10:71|11:74|12:79|13:81|14:85&realname=²Ü×Ó·½";