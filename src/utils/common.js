/*
 * @Author: zengzijian
 * @Date: 2018-09-08 10:28:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-04 14:06:34
 * @Description: 常用工具方法
 */
export default {
    /**
     * 深度拷贝，适用于任何类型，针对于引用类型如数组，对象，函数（其实函数和数据也属于object，这里描述易于理解和区分）
     * PS:对象的简易克隆小技巧：var tmpObj = JSON.parse(JSON.stringify(传入对象)); 把应用类型序列化之后，变成了基本类型，基本类型不具有引用类型的地址引用特性，再把序列化猴的字符串反序列化为对象即可
     * @param {*} obj
     * @returns
     */
    deepClone(obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(this.deepClone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = this.deepClone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    loading: {
        show() {
            if (window.layer) {
                layer.load(2, {
                    shade: [0.2, '#fff']
                });
            }
        },
        hide() {
            if (window.layer) {
                layer.closeAll('loading');
            }
        }
    },
    /**
     * 下拉选择增加无选项，并列为第一项
     * @param {Array} selectData
     * @returns
     */
    appendSelectData(selectData) {
        if (selectData instanceof Array) {
            if (selectData.length === 0) {
                return [{ code: '', value: '无' }]
            } else {
                console.log('bingo')
                console.log(selectData)
                let tempArray = [];
                selectData.forEach(element => {
                    if (selectData.code != '') tempArray.push(element);
                })
                console.log(tempArray.splice(0, 0, { code: '', value: '无' }))
                // return tempArray.splice(0, 0, { code: '', value: '无' })
            }
        } else {
            return [{ code: '', value: '无' }]
        }

    },
    getGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    },
    /**
     * 空判断
     * @param {*} value
     * @returns
     */
    isEmpty(value) {
        let result = false;
        if (value == null || value == undefined) {
            result = true;
        }
        if (typeof value == 'string' && (value.replace(/\s+/g, "") == "" || value == "")) {
            result = true;
        }
        if (typeof value == "object" && value instanceof Array && value.length === 0) {
            result = true;
        }
        return result;
    },
    /**
     * code暂支持：GB2312，GBK，GB18030，ISO-8859-1，UTF-8，ASCII，Unicode
     * 根据当前编码和字符串，返回字符串对应的字节长度
     * @param {*} code
     */
    getByteLength(str, code) {
        let chineseSeize;
        let length;
        code = 'UTF-8';
        switch (code) {
            case 'GB2312':
                chineseSeize = 'aa'
                length = str.replace(/[^\u0000-\u00ff]/g, chineseSeize).length;
                break;
            case 'GBK':
                chineseSeize = 'aa'
                length = str.replace(/[^\u0000-\u00ff]/g, chineseSeize).length;
                break;
            case 'GB18030':
                chineseSeize = 'aa'
                length = str.replace(/[^\u0000-\u00ff]/g, chineseSeize).length;
                break;
            case 'ISO-8859-1':
                chineseSeize = 'a'
                length = str.replace(/[^\u0000-\u00ff]/g, chineseSeize).length;
                break;
            case 'UTF-8':
                chineseSeize = 'aaa'
                length = str.replace(/[^\u0000-\u00ff]/g, chineseSeize).length;
                break;
            case 'ASCII':
                chineseSeize = 'aa'
                length = str.replace(/[^\u0000-\u00ff]/g, chineseSeize).length;
                break;
            case 'Unicode':
                chineseSeize = 'a'
                length = str.replace(/[^\u0000-\u00ff]/g, chineseSeize).length * 2;
                break;

            default:
                break;
        }
        return length
    },
    /**
     * 过滤特殊字符
     * @param {*} s
     * @returns
     */
    stripscript(s) {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    },
    /**
     * 字符串转数组
     * @param {*} value
     * @returns
     */
    stringToArray(value) {
        if (this.isEmpty(value)) return []
        if (typeof value !== 'string') return []
        if (value.indexOf(",") < 0) return [value]
        let array = value.split(",");
        return array
    },
    /**
     * 数组转字符串
     * @param {*} value
     * @returns
     */
    arrayToString(value) {
        if (typeof value == "object" && value instanceof Array) {
            if (value.length == 0) return ""
            let str = '';
            value.forEach(element => {
                str += element + ',';
            })
            return str.substr(0, str.length - 1);
        } else {
            return ""
        }
    },
    /**
     * 格式化时间 时间戳 转 yyyy-MM-dd hh:mm:ss
     * @param {*} time
     * @returns
     */
    formatTime(time) {
        //   格式：yyyy-MM-dd hh:mm:ss
        let date = new Date(Number(time));
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
    format(txt, compress) {
        var indentChar = '    ';
        if (/^\s*$/.test(txt)) {
            console.log('数据为空,无法格式化! ');
            return;
        }
        try {
            var data = eval('(' + txt + ')');
        } catch (e) {
            console.log('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
            return;
        }
        var draw = [],
            last = false,
            This = this,
            line = compress ? '' : '\n',
            nodeCount = 0,
            maxDepth = 0;

        var notify = function (name, value, isLast, indent, formObj) {
            nodeCount++; /*节点计数*/
            for (var i = 0, tab = ''; i < indent; i++)
                tab += indentChar; /* 缩进HTML */
            tab = compress ? '' : tab; /*压缩模式忽略缩进*/
            maxDepth = ++indent; /*缩进递增并记录*/
            if (value && value.constructor == Array) {
                /*处理数组*/
                draw.push(
                    tab + (formObj ? '"' + name + '":' : '') + '[' + line
                ); /*缩进'[' 然后换行*/
                for (var i = 0; i < value.length; i++)
                    notify(i, value[i], i == value.length - 1, indent, false);
                draw.push(
                    tab + ']' + (isLast ? line : ',' + line)
                ); /*缩进']'换行,若非尾元素则添加逗号*/
            } else if (value && typeof value == 'object') {
                /*处理对象*/
                draw.push(
                    tab + (formObj ? '"' + name + '":' : '') + '{' + line
                ); /*缩进'{' 然后换行*/
                var len = 0,
                    i = 0;
                for (var key in value)
                    len++;
                for (var key in value)
                    notify(key, value[key], ++i == len, indent, true);
                draw.push(
                    tab + '}' + (isLast ? line : ',' + line)
                ); /*缩进'}'换行,若非尾元素则添加逗号*/
            } else {
                if (typeof value == 'string') value = '"' + value + '"';
                draw.push(
                    tab +
                    (formObj ? '"' + name + '":' : '') +
                    value +
                    (isLast ? '' : ',') +
                    line
                );
            }
        };
        var isLast = true,
            indent = 0;
        notify('', data, isLast, indent, false);
        return draw.join('');
    }
}