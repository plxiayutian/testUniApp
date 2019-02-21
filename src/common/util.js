var dataIP = 'http://192.168.161.152:8011';

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
        calculationTime = this.AddMonths(value);
    } else if (classValue.toString.toLocaleLowerCase() == "y" || classValue.toString.toLocaleUpperCase() == "Y") { //年
        calculationTime = this.AddYears(value);
    }
    return calculationTime;
}
//月计算
Date.prototype.AddMonths = function (m) {
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
};
//年计算
Date.prototype.AddYears = function (y) {
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    if (m < this.getMonth()) {
        this.setDate(0);
    }
};

/*
 * String 对象 formatter 方法定义
 */
String.prototype.Format = function () {
    if (arguments.length == 0) return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

//*****************************************************************************************//
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
通过方法名调用函数
*/
function MyCall() {
    if (arguments.length <= 0) return;
    if (typeof (arguments[0]) != 'string') return;
    var params = [];
    for (var i = 1; i < arguments.length; i++)
        params.push(arguments[i]);
    return this[arguments[0]].apply(null, params);
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
*数组或对象深度克隆
*/
function DeepClone(obj) {
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
function ReturnClass(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    //引用类型："[object Array]"、"[object Object]"、"[object RegExp]"、"[object Date]"、"[object Function]"
    //基本类型："[object String]"、"[object Number]"--（包括NaN）、"[object Null]"、"[object Undefined]"
    return Object.prototype.toString.call(o).slice(8, -1);  //返回数据类型的字符串
}

//日期格式化处理
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'日': 86400000,
		'时': 3600000,
		'分': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['日']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDay()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};
//时间格式化（时分秒 00：00：00）
function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}
//地理位置格式化  {longitude: 经度，latitude:维度}   保留两位小数
function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

module.exports = {
	dataIP:dataIP,    //IP
	TransformToChinese:TransformToChinese,   //阿拉伯数字转汉字
	MyCall:MyCall,  	 			//通过方法名调用函数
	GetUrlParametes:GetUrlParametes,	//获取地址栏参数
	DeepClone:DeepClone,			//数组或对象深度克隆
	ReturnClass:ReturnClass,		//返回传递给他的任意对象的类
	DateUtils: dateUtils,			//日期格式化	
	FormatTime: formatTime,		//时间格式化（时分秒 00：00：00）
	FormatLocation: formatLocation  //地理位置格式化  {longitude: 经度，latitude:维度}   保留两位小数
}
