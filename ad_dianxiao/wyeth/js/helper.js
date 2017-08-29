Helper = function () {
    this.localStorage;
    function getlocalStorage(obj) {
        if (typeof (obj) === "undefined") {
            if (window.localStorage || window.usedata)
                this.localStorage = window.localStorage
            else
                alert("您的浏览器不支持前台存储");
        }
    }
    getlocalStorage();
     
};
Helper.prototype = {
    isSurportNavgation: function () {
        var h = this;
        var result = true;
        if (!window.navigator) result = false;
        return result;
    },
    isSurportLocalStorage: function () {
         var h = this; 
        var result = true;
        if (!window.localStorage || !window.usedata) result = false;
        return result;
    },

    store: function (key, value) {
        var h = this;
        if (typeof (value) === "object") {
            var h = this;
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value);
    },
    search: function (key, type) {
        var h = this;
        if (typeof (type) === "undefined") {
            type = "object";
        }
        var result = window.localStorage.getItem(key);
        if (typeof (result) === "undefined") return undefined;
        switch (type) {
            case "string": break;
            case "object": result = JSON.parse(result);
        }

        return result;
    }
};
var helper = new Helper();
