var dataIP = 'http://192.168.161.152:8011';

/**
 * 包装起来的通过接口获取数据的方法
 * @param option {
        url: undefined,
        type: string,
        timeout: number,
        async: boolean,
        cache: boolean,
        data: {},
        dataType: string, 
        beforeSend: function, 
        complete: function, 
        success: function, 
        error: function
    }
 */
var getData = function (option) {
    //默认参数
    var defaults = {
        popIndex: 0,
        url: undefined,
        type: 'get',
        timeout: 1000 * 30,// 超时限制
        async: true,//是否异步
        cache: false,//是否用缓存
        data: {},//请求参数
        dataType: 'json',
        beforeSend: function (xhr) {
            if (top.layer != undefined)
                this.popIndex = top.layer.load(2, { shade: 0 });
        },
        complete: function (xhr, status) {
            if (top.layer != undefined)
                top.layer.close(this.popIndex);
        },
        success: function (data) {
            console.log(data);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        },
    };
    var opt = $.extend(defaults, option || {});

    if (opt.url.indexOf('http') != 0)
        opt.url = dataIP + opt.url;

    $.ajax({
        type: opt.type,
        async: opt.async,
        url: opt.url,
        data: opt.data,
        dataType: opt.dataType,
        success: function (data) {
            opt.success(data);
        },
        error: function (xhr, status, error) {
            opt.error(xhr, status, error);
        },
        beforeSend: function (xhr) {
            opt.beforeSend(xhr);
        },
        complete: function (xhr, status) {
            opt.complete(xhr, status);
        },
    });
}

//时间格式化
//调用方式new Date().Format("yyyy-MM-dd  hh:mm:ss");  
//参数既是时间格式
Date.prototype.Format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    //年月日匹配
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    var month = this.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    //分隔符匹配
    str = str.replace(/w|W/g, Week[this.getDay()]);
    //时分秒匹配
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}
/*
 * 时间加减计算
 * 参数： 
 *      type：加减类型 1（加）  2（减）
 *      value：按时间毫秒数传递的时间加减数值
 *            毫秒：num
 *            秒：num*1000
 *            分：num*1000*60
 *            时：num*1000*60*60
 *            天：num*1000*60*60*24
 *      classValue：特殊的值处理，月：M/m   年：Y/y
 *            value：传入加减的月数或年数，加正减负 
 * 返回值：计算后的时间毫秒数
 */
Date.prototype.Calculation = function (type, value, classValue) {
    type = type || 1;
    var msecTime = this.getTime();    //时间毫秒
    var calculationTime = null;
    if (!classValue) {
        calculationTime = type == 2 ? msecTime - value : msecTime + value; //1加 2减
    } else if (classValue.toString.toLocaleUpperCase() == "M") { //月   classValue.toString.toLocaleLowerCase() == "m" || 
        calculationTime = this.addMonths(value);
    } else if (classValue.toString.toLocaleLowerCase() == "y" || classValue.toString.toLocaleUpperCase() == "Y") { //年
        calculationTime = this.addYears(value);
    }
    return calculationTime;
}
//月计算
Date.prototype.addMonths = function (m) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};
//年计算
Date.prototype.addYears = function (y) {
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    if (m < this.getMonth()) {
        this.setDate(0);
    }
};

/*
 * String 对象 formatter 方法定义
 */
String.prototype.format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

/*
 * 阿拉伯数字转汉字
 */
function TransformToChinese(num) {
    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    var chnUnitChar = ["", "十", "百", "千"];

    var numToChn = function (num) {
        var index = num.toString().indexOf(".");
        if (index != -1) {
            var str = num.toString().slice(index);
            var a = "点";
            for (var i = 1; i < str.length; i++) {
                a += chnNumChar[parseInt(str[i])];
            }
            return a;
        } else {
            return '';
        }
    }

    //定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
    function sectionToChinese(section) {
        var str = '', chnstr = '', zero = false, count = 0;   //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
        while (section > 0) {
            var v = section % 10;  //对数字取余10，得到的数即为个位数
            if (v == 0) {                    //如果数字为零，则对字符串进行补零
                if (zero) {
                    zero = false;        //如果遇到连续多次取余都是0，那么只需补一个零即可
                    chnstr = chnNumChar[v] + chnstr;
                }
            } else {
                zero = true;           //第一次取余之后，如果再次取余为零，则需要补零
                str = chnNumChar[v];
                str += chnUnitChar[count];
                chnstr = str + chnstr;
            }
            count++;
            section = Math.floor(section / 10);
        }
        return chnstr;
    }

    var a = numToChn(num);
    num = Math.floor(num);
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;

    if (num === 0) {
        return chnNumChar[0];
    }
    while (num > 0) {
        var section = num % 10000;
        if (needZero) {
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = sectionToChinese(section);
        strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }
    return chnStr + a;
}

/*
*给表单元素赋值
*formTag:js元素Dom,form表单元素，若是jQuery获取Dom的则是$("#layform")[0]的形式
*data:后台获取到的数据，格式是[{kay:value},{kay:value}]
*需要保证form下的item的name与数据的key对应
*/
function formItemPushValue(formTag, data) {
    if (data instanceof Array) { //若接口传过来的数据是数组
        for (var i = 0; i < data.length; i++) {
            var arrItemData = data[i];
            eachFormData(formTag, arrItemData);
        }
    } else {    //若接口传过来的数据是对象
        eachFormData(formTag, data);
    }
}
function eachFormData(formTag, data) {
    for (var key in data) {
        var dataItem = data[key];
        if (typeof dataItem == 'string' || typeof dataItem == 'number' || typeof dataItem == 'boolean' || typeof dataItem == 'undefined' || dataItem == null) {
            dataItem = unescape(dataItem);//解码
        } else {
            //递归调用 callee--arguments.callee()
            arguments.callee(dataItem);
        }
        if (dataItem == "null") {
            dataItem = "";
        }
        var eleFormItem = document.getElementsByName(key)[0]; //每一项的ele
        //判断不是当前form下的节点的跳过
        if (!formTag || (!formTag.contains(eleFormItem))) {
            continue;
        }
        if (eleFormItem.tagName == "select") {
            eleFormItem.value = dataItem;
            eleFormItem.setAttribute("title", dataItem);
        } else if (eleFormItem.tagName == "button") {
            eleFormItem.value = dataItem;
            eleFormItem.setAttribute("title", dataItem);
        } else if (eleFormItem.tagName == "input") {
            eleFormItem.value = dataItem;
            eleFormItem.setAttribute("title", dataItem);
            //var type = eleFormItem.getAttribute("type");
            //if (type == "checkbox") {  //复选框
            //} else if (type == "radio") {//单选框
            //} else if (type == "button" || type == "submit") { //按钮
            //} else {
            //}
        } else if (eleFormItem.tagName == "textarea") {
            eleFormItem.innerHtml = dataItem;
            eleFormItem.setAttribute("title", dataItem);
        } else {
            eleFormItem.innerText = dataItem;
            eleFormItem.setAttribute("title", dataItem);
        }
    }
}

/*
通过方法名调用函数
*/
function call() {
    if (arguments.length <= 0) return;
    if (typeof (arguments[0]) != 'string') return;
    var params = [];
    for (var i = 1; i < arguments.length; i++)
        params.push(arguments[i]);
    return this[arguments[0]].apply(null, params);
}

/*
通浏览器全屏的处理方法
*/
function launchFullScreen(element) { //开启全屏
    if (element.requestFullscreen) {                //W3C 
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {      //FireFox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {   //Chrome等
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {       //IE11
        element.msRequestFullscreen();
    }
}
//launchFullScreen(document.documentElement); // 整个网页
//launchFullScreen(document.getElementById("videoElement")); // 某个页面元素
function exitFullScreen() {  //退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    window.close();
}
//判断是否全屏
//var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
//var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
function fullscreenchange() { //切换全屏
    var isFull = window.fullScreen || document.webkitIsFullScreen || document.mozFullScreenEnabled || document.msFullscreenEnabled;     //document.fullscreenEnabled ||  Chrome浏览器更新到最新的版本后默认值为true
    if (isFull === undefined) {
        isFull = false;
    }
    if (!isFull) {
        launchFullScreen(document.documentElement);
    } else {
        exitFullScreen();
    }
}

/*
*获取地址栏参数
*/
function GetUrlParametes(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*
*获取浏览器类型和版本
*/
function getBrowserInfo() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var re = /(msie|trident|firefox|chrome|opera|version).*?([\d.]+)/;
    var m = ua.match(re);
    Sys.browser = m[1].replace(/version/, "'safari");
    Sys.ver = m[2];
    return Sys;
}

/*
*深度克隆
*/
function deepClone(obj) {
    var result, oClass = isClass(obj);
    //确定result的类型
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy);//递归调用
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

//返回传递给他的任意对象的类
function isClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    //引用类型："[object Array]"、"[object Object]"、"[object RegExp]"、"[object Date]"、"[object Function]"
    //基本类型："[object String]"、"[object Number]"--（包括NaN）、"[object Null]"、"[object Undefined]"
    return Object.prototype.toString.call(o).slice(8, -1);  //返回数据类型的字符串
}