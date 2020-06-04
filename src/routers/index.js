/*
 * @Author: your name
 * @Date: 2020-06-01 09:22:41
 * @LastEditTime: 2020-06-04 11:16:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\routers\index.js
 */ 
/*
 * @Author: your name
 * @Date: 2020-06-01 09:22:41
 * @LastEditTime: 2020-06-01 10:41:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\routers\index.js
 */ 
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import FormDesign from './FormDesign'
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
// import "antd/dist/antd.less";   // 引入官方提供的 less 样式入口文件
import "@/styles/default.less";   // 用于覆盖上面定义的变量

@withRouter
class Routers extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <LocaleProvider locale={zh_CN}>
                    <Switch>
                        <Route path="/" component={FormDesign} />
                    </Switch>
                </LocaleProvider>
        )
    }
}

export default Routers