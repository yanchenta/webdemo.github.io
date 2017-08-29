function _wt() {
	//var channelId = "dcswwq8kj100000g85ypm2f1i_5g5r";
	var channelId = "dcsgkuqhj100000k7fgz7hvvs_1p7x";
	var branch = "kfc_wifi";
    this.u = "http" + (window.location.protocol.indexOf('https:') == 0 ? 's': '') + "://dt.yum.com.cn/" + channelId + "/dcs.gif?WT.branch=Mob";
    this.p = "";
    this.t = "";
    this.WT = {};
    this.z = true;
};
_wt.prototype.V = function() {
    this.p += "&dcssip=" + window.location.hostname + "&WT.host=" + window.location.hostname + "&dcsuri=" + encodeURIComponent(window.location.pathname) + "&WT.es=" + encodeURIComponent(window.location.href);
    if (window.location.search) this.p += "&dcsqry=" + encodeURIComponent(window.location.search);
    if ((window.document.referrer != "") && (window.document.referrer != "-")) this.p += "&dcsref=" + encodeURIComponent(window.document.referrer) + "&WT.referrer=" + encodeURIComponent(window.document.referrer);
    if (typeof(screen) == "object") {
        this.p += "&WT.sr=" + screen.width + "x" + screen.height;
    }
};
_wt.prototype.M = function() {
    var $a;
    if (document.all) $a = document.all.tags("meta");
    else if (document.documentElement) $a = document.getElementsByTagName("meta");
    if (typeof($a) != "undefined") {
        var length = $a.length;
        for (var i = 0; i < length; i++) {
            var name = $a.item(i).name;
            if (name.length > 0) {
                if (name.toUpperCase().indexOf("WT.") == 0) this.p += "&" + name + "=" + $a.item(i).content;
            }
        }
    };
    for (N in this.WT) {
        this.p += "&WT." + N + "=" + this.WT[N];
    }
};
_wt.prototype.G = function() {
    var $b = this.p + "&dcsdat=" + (new Date()).getTime() + this.t;
    var pt = {};
    var $c = $b.split("&");
    $b = "";
    for (var i = 0; i < $c.length; i++) {
        if ($c[i].length > 0) pt[$c[i].split("=")[0]] = $c[i].split("=")[1];
    };
    for (N in pt) {
        $b += "&" + N + "=" + pt[N];
    };
    var $d = new Image();
    $d.style.display = "none";
    $d.onload = function() {
        try {
            document.body.appendChild($d);
        } catch(e) {}
    };
    $d.src = this.u + $b;
};
_wt.prototype.S = function() {
    if (this.z) {
        this.z = false;
        this.V();
        this.M();
        this.F();
        this.G();
    }
};
_wt.prototype.dcsMultiTrack = function() {
    var $e = this.dcsMultiTrack.arguments ? this.dcsMultiTrack.arguments: arguments;
    if ($e.length % 2 == 0) for (var i = 0; i < $e.length; i += 2) this.t += "&" + $e[i] + "=" + encodeURIComponent($e[i + 1]);
    this.G();
    this.t = "";
};
_wt.prototype.E = function($f, $g) {
    var e = $f.target || $f.srcElement;
    while (e.tagName && (e.tagName.toLowerCase() != $g.toLowerCase())) {
        e = e.parentElement || e.parentNode;
        e = e || {};
    };
    return e;
};
_wt.prototype.P = function($f) {
    var x = $f.clientX;
    var y = $f.clientY;
    $h = (document.documentElement != undefined && document.documentElement.clientHeight != 0) ? document.documentElement: document.body;
    var $i = window.pageXOffset == undefined ? $h.scrollLeft: window.pageXOffset;
    var $j = window.pageYOffset == undefined ? $h.scrollTop: window.pageYOffset;
    return (x + $i) + "x" + (y + $j);
};
_wt.prototype.N = function($f) {
    var id = "";
    var $k = "";
    var $a = ["div", "table"];
    var $l = $a.length;
    var i, e, $m;
    for (i = 0; i < $l; i++) {
        $m = $a[i];
        if ($m.length) {
            e = this.E($f, $m);
            id = (e.getAttribute && e.getAttribute("id")) ? e.getAttribute("id") : "";
            $k = e.className || "";
            if (id.length || $k.length) break;
        }
    };
    return id.length ? id: $k;
};
Function.prototype.wtbind = function($n) {
    var $o = this;
    var $p = function() {
        return $o.apply($n, arguments);
    };
    return $p;
};
_wt.prototype.K = function($f) {
    $f = $f || (window.event || "");
    if ($f && ((typeof($f.which) != "number") || ($f.which == 1))) {
        var name = "";
        var $q = "";
        var e = this.E($f, "A");
        if (e.href) {
            name = e.href;
            $q = "Link";
        } else {
            e = this.E($f, "INPUT");
            $q = e.type || "";
            if ($q && (($q == "submit") || ($q == "button") || ($q == "reset") || ($q == "text") || ($q == "radio") || ($q == "checkbox"))) {
                name = e.name || e.id || "null";
            }
        };
        if (typeof(this.trackObj) == "undefined" || this.trackObj == "" || this.trackObj.indexOf(";" + name + ";") > -1) {
            if ($q && (($q == "radio") || ($q == "checkbox"))) {
                name = (e.name || e.id || "null") + "." + (e.value || "null");
            };
            if (e.form) name = (e.form.id || e.form.name || e.form.className || "frm") + "." + name;
            if (name && $q) this.dcsMultiTrack("WT.type", $q, "WT.event", name, "WT.nv", this.N($f), "WT.pos", this.P($f));
        };
    }
};
_wt.prototype.trackEvent = function() {
    var e = (navigator.appVersion.indexOf("MSIE") != -1) ? "click": "mousedown";
    if (document.body.addEventListener) document.body.addEventListener(e, this.K.wtbind(this), true);
    else if (document.body.attachEvent) document.body.attachEvent("on" + e, this.K.wtbind(this));
};
_wt.prototype.F = function() {
    var $r = "2";
    var $s = new Date();
    var $t = new Date($s.getTime() + 315360000000);
    var $u = new Date($s.getTime());
    if (document.cookie.indexOf("WT_FPC=") != -1) {
        $r = document.cookie.substring(document.cookie.indexOf("WT_FPC=") + 10);
        if ($r.indexOf(";") != -1) $r = $r.substring(0, $r.indexOf(";"));
        if ($s.getTime() < ((new Date(parseInt($r.substring($r.indexOf(":lv=") + 4, $r.indexOf(":ss="))))).getTime() + 1800000)) $u.setTime((new Date(parseInt($r.substring($r.indexOf(":ss=") + 4)))).getTime());
        $r = $r.substring(0, $r.indexOf(":lv="));
    };
    if ($r.length < 10) {
        var $v = $s.getTime().toString();
        for (var i = 2; i <= (32 - $v.length); i++) $r += Math.floor(Math.random() * 16.0).toString(16);
        $r += $v;
    };
    $r = encodeURIComponent($r);
    this.p += "&WT.co_f=" + $r;
    document.cookie = "WT_FPC=id=" + $r + ":lv=" + $s.getTime().toString() + ":ss=" + $u.getTime().toString() + "; expires=" + $t.toGMTString() + "; path=/; domain=.qq.com";
};


var _tag = new _wt();
_tag.V();
_tag.M();
_tag.F();
_tag.S();


//
function yumTrack(event, msg, url){
	try{
		//alert(event + "," + msg + "," + url);
		_tag.dcsMultiTrack('wt.event', event, 'wt.msg', msg);//图片访问, 应该是跨域的 ... 
	}
	catch(ex){
		//alert(ex.message);
	}
	
	setTimeout(function(){
		//...
		if(!!url) {
			//alert(url);
			window.location.href = url;
		}
	}, 500);
}