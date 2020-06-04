import $ from 'jquery'
import { Modal } from 'antd'
import axios from 'axios'
import http from '@/config/http'
const errorHandler = error => {
    // message.error("出错了，请稍候再试");
    Modal.error({
        title: '系统提示',
        content: error,
    });
    console.log("出错信息如下");
    console.log(error);
}
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';  //此处是增加的代码，设置请求头的类型
export default {
    test() {
        console.log(http);
    },
    login(params) {
        return
        $.ajax({
            type: 'get',
            // data: params,
            dataType: 'jsonp',
            url: "http://www.layui.com/demo/table/user/?page=1&limit=30",
            async: false,
            success: function (result) {
                alert(111);
                console.log(result);
            }
        });
    },
    getData() {
        return axios.get(`http://www.layui.com/demo/table/user/?page=1&limit=30`).catch(errorHandler);
    },
    getData2() {
        return axios.get(`http://121.8.157.140:18211/api/zsapi/dict/datacache/loadDict/ZS_DIFFICULTY`).catch(errorHandler);
    }
}