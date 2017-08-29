function _wt() {
	//if url is "http", arrive https://dt.yum.com.cn/dcsoye69k00000w4dihnwa22c_7u5p/dcs.gif?WT.branch=kfc_mwos
	//else arrive http://dt.yum.com.cn/dcsoye69k00000w4dihnwa22c_7u5p/dcs.gif?WT.branch=kfc_mwos
	//this.u = "http" + (window.location.protocol.indexOf('https:') == 0 ? 's': '') + "://dt.yum.com.cn/dcsoye69k00000w4dihnwa22c_7u5p/dcs.gif?WT.branch=kfc_mwos";
	var clsid = "dcs8y70ep100004n0nh3g4ehd_8z6r";
	this.u = "http" + (window.location.protocol.indexOf('https:') == 0 ? 's': '') + "://dt.yum.com.cn/" + clsid + "/dcs.gif?WT.branch=kfc_mwos";
    this.p = "";
    this.t = "";
    this.WT = {};
    this.z = true;
};
_wt.prototype.V = function() {
	//add params
    this.p += "&dcssip=" + window.location.hostname;
	this.p += "&dcsuri=" + encodeURIComponent(window.location.pathname);
	this.p += "&WT.es=" + encodeURIComponent(window.location.href);
	
    if (window.location.search) {
		this.p += "&dcsqry=" + encodeURIComponent(window.location.search);
	}
	
    if ((window.document.referrer != "") && (window.document.referrer != "-")) {
		this.p += "&dcsref=" + encodeURIComponent(window.document.referrer);
	}
	
    if (typeof(screen) == "object") {//大小参数
        this.p += "&WT.sr=" + screen.width + "x" + screen.height;
    };
};

//for rest addtions
_wt.prototype.M = function() {};


_wt.prototype.F = function() {
	//alert("F");
	
    var $t = "2";
    var $u = new Date();
    var $v = new Date($u.getTime() + 315360000000);
    var $w = new Date($u.getTime());
    if (document.cookie.indexOf("WT_FPC=") != -1) {
        $t = document.cookie.substring(document.cookie.indexOf("WT_FPC=") + 10);
        
		if ($t.indexOf(";") != -1) {
			$t = $t.substring(0, $t.indexOf(";"));
		}
		
        if ($u.getTime() < ((new Date(parseInt($t.substring($t.indexOf(":lv=") + 4, $t.indexOf(":ss="))))).getTime() + 1800000)) {
			$w.setTime((new Date(parseInt($t.substring($t.indexOf(":ss=") + 4)))).getTime());
		}
		
        $t = $t.substring(0, $t.indexOf(":lv="));
    };
    if ($t.length < 10) {
        var $x = $u.getTime().toString();
        for (var i = 2; i <= (32 - $x.length); i++) {
			$t += Math.floor(Math.random() * 16.0).toString(16);
		}
        $t += $x;
    };
    $t = encodeURIComponent($t);
    this.p += "&WT.co_f=" + $t;
    document.cookie = "WT_FPC=id=" + $t + ":lv=" + $u.getTime().toString() + ":ss=" + $w.getTime().toString() + "; expires=" + $v.toGMTString() + "; path=/; domain=.4008823823.com.cn";
};


_wt.prototype.G = function() {
	//image set src ... by (1)"this.u" and (2)"$d" which is created by "this.p";
    var $d = this.p + "&dcsdat=" + (new Date()).getTime() + this.t;
    var pt = {};
    var $e = $d.toLowerCase().split("&");
    $d = "";
    for (var i = 0; i < $e.length; i++) {
        if ($e[i].length > 0) pt[$e[i].split("=")[0]] = $e[i].split("=")[1];
    };
    for (N in pt) {
        $d += "&" + N + "=" + pt[N];
    };
    var $f = new Image();
    $f.onload = function() {
        try {
            document.body.appendChild($f);
        } catch(e) {}
    };
    $f.src = this.u + $d;
};
_wt.prototype.S = function() {
    if (this.z) {//关闭调用G函数的功能, 只调用一次;
        this.z = false;
		
        this.G();
    }
	//alert("s");
};

//...........................................

_wt.prototype.dcsMultiTrack = function() {
	//alert("no work! dcsMultiTrack");
	
    var $g = this.dcsMultiTrack.arguments ? this.dcsMultiTrack.arguments: arguments;
    if ($g.length % 2 == 0) for (var i = 0; i < $g.length; i += 2) this.t += "&" + $g[i] + "=" + encodeURIComponent($g[i + 1]);
    this.G();
    this.t = "";
};
_wt.prototype.E = function($h, $i) {
	//alert("no work! E");
	
    var e = $h.target || $h.srcElement;
    while (e.tagName && (e.tagName.toLowerCase() != $i.toLowerCase())) {
        e = e.parentElement || e.parentNode;
        e = e || {};
    };
    return e;
};
_wt.prototype.P = function($h) {
	//alert("no work! P");
	
    var x = $h.clientX;
    var y = $h.clientY;
    $j = (document.documentElement != undefined && document.documentElement.clientHeight != 0) ? document.documentElement: document.body;
    var $k = window.pageXOffset == undefined ? $j.scrollLeft: window.pageXOffset;
    var $l = window.pageYOffset == undefined ? $j.scrollTop: window.pageYOffset;
    return (x + $k) + "x" + (y + $l);
};
_wt.prototype.N = function($h) {
	//alert("no work! N");
	
    var id = "";
    var $m = "";
    var $c = ["div", "table"];
    var $n = $c.length;
    var i, e, $o;
    for (i = 0; i < $n; i++) {
        $o = $c[i];
        if ($o.length) {
            e = this.E($h, $o);
            id = (e.getAttribute && e.getAttribute("id")) ? e.getAttribute("id") : "";
            $m = e.className || "";
            if (id.length || $m.length) break;
        }
    };
    return id.length ? id: $m;
};
Function.prototype.wtbind = function($p) {
	//alert("no work! wtbind");
	
    var $q = this;
    var $r = function() {
        return $q.apply($p, arguments);
    };
    return $r;
};
_wt.prototype.K = function($h) {
	//alert("no work! K");

    $h = $h || (window.event || "");
    if ($h && ((typeof($h.which) != "number") || ($h.which == 1))) {
        var name = "";
        var $s = "";
        var e = this.E($h, "A");
        if (e.href) {
            name = e.href;
            $s = "Link";
        } else {
            e = this.E($h, "INPUT");
            $s = e.type || "";
            if ($s && (($s == "submit") || ($s == "button") || ($s == "reset") || ($s == "text") || ($s == "radio") || ($s == "checkbox"))) {
                name = e.name || e.id || "null";
            }
        }
        if (typeof(this.trackObj) == "undefined" || this.trackObj == "" || this.trackObj == ";;" || this.trackObj.indexOf(";" + name + ";") > -1) {
            if ($s && (($s == "radio") || ($s == "checkbox"))) {
                name = (e.name || e.id || "null") + "." + (e.value || "null");
            }
            if (e.form) name = (e.form.id || e.form.name || e.form.className || "frm") + "." + name;
            if (name && $s) this.dcsMultiTrack("WT.type", $s, "WT.event", name, "WT.nv", this.N($h), "WT.pos", this.P($h));
        };
    }
};

_wt.prototype.trackEvent = function() {
	//alert("no work! trackEvent");
	
    var e = (navigator.appVersion.indexOf("MSIE") != -1) ? "click": "mousedown";
    if (document.body.addEventListener) document.body.addEventListener(e, this.K.wtbind(this), true);
    else if (document.body.attachEvent) document.body.attachEvent("on" + e, this.K.wtbind(this));
};



//main function

//创建url 与 对象属性初始化
var _tag = new _wt();

//参数
try {
    _tag.V();
    _tag.M();
    _tag.F();
} catch(_te) {}

if (document.addEventListener) {//标准浏览器
    document.addEventListener("DOMContentLoaded",
    function() {
        _tag.S();
    },
    false);
} else {
    if (document.attachEvent) {//应对低版本浏览器策略
        var $z = function() {
            try {
                document.documentElement.doScroll('left');//判断DOM是否加载完成
            } catch(e) {
                setTimeout(arguments.callee, 5); //未成功加载完成, 则调用自身
                return;
            };
            _tag.S();
        };
        $z();
    } else {
        _tag.S();
    }
};
//v2014.1.13.Y
