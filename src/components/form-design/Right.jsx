/*
 * @Author: your name
 * @Date: 2020-06-01 11:41:44
 * @LastEditTime: 2020-06-04 16:00:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\container\column.js
 */

import React, { Component } from 'react'
import { Tabs, Radio } from 'antd'
import PropTypes from 'prop-types'
import { FDInput, FDTextArea, FDRadio, FDCheckbox, FDSelect, FDSwitch, FDDate } from '@/components/form-design/config/Index'
import common from '@/utils/common'
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Right extends Component {

    updateConfig = (key, value) => {
        this.props.store.config.update(key, value)
    }

    updateItem = (key, value) => {
        const activeId = this.props.store.activeId.get
        let content = this.props.store.content.get
        let target = content.find(el => el.id === activeId)
        if (key === 'label') {
            target.label = value
        } else {
            target.options[key] = value
        }
        this.props.store.content.set(content)
    }

    render() {

        const config = this.props.store.config.get
        const content = this.props.store.content.get
        const activeId = this.props.store.activeId.get
        console.warn('activeId, content', activeId, content)
        return (
            <div className="right" >
                <h3 className="title">表单配置</h3>
                <Tabs defaultActiveKey="2" style={{ padding: '8px' }}>
                    <Tabs.TabPane tab="字段属性" key="1">
                        {
                            (() => {
                                if (common.isEmpty(activeId)) return
                                const target = content.find(el => el.id === activeId)
                                if (target)
                                    switch (target.type) {
                                        case 'input':
                                            return <FDInput item={target} callback={this.updateItem} />
                                        case 'textarea':
                                            return <FDTextArea item={target} callback={this.updateItem} />
                                        case 'radio':
                                            return <FDRadio item={target} callback={this.updateItem} />
                                        case 'checkbox':
                                            return <FDCheckbox item={target} callback={this.updateItem} />
                                        case 'select':
                                            return <FDSelect item={target} callback={this.updateItem} />
                                        case 'switch':
                                            return <FDSwitch item={target} callback={this.updateItem} />
                                        case 'date':
                                            return <FDDate item={target} callback={this.updateItem} />
                                        default:
                                            break;
                                    }
                            })()
                        }
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="表单属性" key="2">
                        <div style={{ marginBottom: '15px' }}>
                            <p style={{ marginBottom: '5px' }}>表单布局：</p>
                            <Radio.Group value={config.layout} buttonStyle="solid" size="small" onChange={e => this.updateConfig('layout', e.target.value)}>
                                <Radio.Button value="horizontal">水平</Radio.Button>
                                <Radio.Button value="vertical">垂直</Radio.Button>
                                <Radio.Button value="inline">行内</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <p style={{ marginBottom: '5px' }}>标签对齐方式：</p>
                            <Radio.Group value={config.labelAlign} buttonStyle="solid" size="small" onChange={e => this.updateConfig('labelAlign', e.target.value)}>
                                <Radio.Button value="left">左对齐</Radio.Button>
                                <Radio.Button value="right">右对齐</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <p style={{ marginBottom: '5px' }}>控件大小：</p>
                            <Radio.Group value={config.size} buttonStyle="solid" size="small" onChange={e => this.updateConfig('size', e.target.value)}>
                                <Radio.Button value="large">大</Radio.Button>
                                <Radio.Button value="default">中</Radio.Button>
                                <Radio.Button value="small">小</Radio.Button>
                            </Radio.Group>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div >
        )
    }
}

export default Right
Right.propTypes = {
    layout: PropTypes.string,
    labelAlign: PropTypes.string,
    size: PropTypes.string,
    callback: PropTypes.func,
    activeId: PropTypes.string,
    formItems: PropTypes.array
}