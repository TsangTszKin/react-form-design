/*
 * @Author: zengzijian
 * @Date: 2018-07-24 15:45:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-02 10:43:55
 * @Description: 根节点入口
 */
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Routers from './routers';
import "babel-polyfill";

class App extends React.Component {

    state = {
        isLoading: false,
        loadingIndex: 0
    }

    componentWillMount() {
        console.log('navigator', navigator)
        // console.log('app component will mount');
        // console.log("process.env.type ------ =", process.env.type);
        let self = this;
        var timer = setInterval(function () {
            if (window.layui) {
                window.layer = window.layui.layer
                stop();
            };
        }, 100);
        function stop() {
            window.clearInterval(timer);
        }
    }

    componentDidMount() {
        console.log('app component did mount');
        let self = this;
        React.Component.prototype.$loading = {
            show: function () {
                self.setState({
                    loadingIndex: layer.load(2, { shade: [0.1, '#fff'] })
                })
                let $this = this;
                setTimeout(function () {
                    $this.hide();
                }, 10000)
            },
            hide: function () {
                layer.closeAll('loading'); //关闭加载层
            }
        }

    }

    render() {
        return (
            <HashRouter>
                <Routers />
            </HashRouter>
        )
    }
}


render(<App />, document.getElementById('root'))
console.log("module.hot", module.hot);
if (module.hot) {
    module.hot.accept();
}
console.log("module", module);