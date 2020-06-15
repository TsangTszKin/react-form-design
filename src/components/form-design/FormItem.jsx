/*
 * @Author: your name
 * @Date: 2020-06-01 17:36:39
 * @LastEditTime: 2020-06-15 11:00:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\container\FormItem.js
 */
import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
    Form,
    Input,
    Radio,
    Checkbox,
    DatePicker,
    Select,
    Switch
} from 'antd'
import { inject, observer } from 'mobx-react';
import common from '@/utils/common'

@inject('store')
@observer
class FormItem extends Component {
    getKey = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    render() {
        const { data, form, seedList } = this.props

        const formItemLayout =
            this.props.layout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        // console.warn('this.props.store.activeId.get, data.id', this.props.store.activeId.get, data.id)
        const isActive = this.props.store.activeId.get === data.id
        const { defaultValue, required, placeholder } = data.options
        const content = this.props.store.content.get
        return (
            <Draggable
                draggableId={data.id}
                index={this.props.index}
                direction="vertical"
            // isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <div
                        className={`cell ${isActive ? 'cell-active' : ''}`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        onClick={() => {
                            this.props.store.activeId.set(data.id)
                        }}

                    >
                        {
                            (() => {
                                switch (data.type) {
                                    case 'input':
                                        return (
                                            <div className="form-item">
                                                <Form.Item label={data.label}  {...formItemLayout} labelAlign={this.props.labelAlign}>

                                                    {form.getFieldDecorator(data.code, {
                                                        rules: [
                                                            {
                                                                type: data.options.dataType,
                                                                message: '',
                                                            },
                                                            {
                                                                required: required,
                                                                message: '不能为空',
                                                            },
                                                        ],
                                                    })(<Input style={{ width: data.options.width }} size={this.props.size} placeholder={placeholder} value={defaultValue} />)}

                                                </Form.Item>
                                            </div>
                                        )
                                    case 'textarea':
                                        return (
                                            <div className="form-item">
                                                <Form.Item label={data.label}  {...formItemLayout} labelAlign={this.props.labelAlign}>

                                                    {form.getFieldDecorator(data.code, {
                                                        rules: [
                                                            {
                                                                required: required,
                                                                message: '不能为空',
                                                            },
                                                        ],
                                                    })(<Input.TextArea style={{ width: data.options.width }} rows={4} size={this.props.size} placeholder={placeholder} value={defaultValue} />)}

                                                </Form.Item>
                                            </div>
                                        )
                                    case 'radio':
                                        return (
                                            <div className="form-item">
                                                <Form.Item label={data.label}  {...formItemLayout} labelAlign={this.props.labelAlign}>

                                                    {form.getFieldDecorator(data.code, {
                                                        rules: [
                                                            {
                                                                required: required,
                                                                message: '不能为空',
                                                            },
                                                        ],
                                                    })(
                                                        <Radio.Group value={defaultValue}>
                                                            {
                                                                data.options.options.map((el, i) =>
                                                                    <Radio value={el.value} key={i} size={this.props.size} >{el.label}</Radio>
                                                                )
                                                            }
                                                        </Radio.Group>
                                                    )}

                                                </Form.Item>
                                            </div>
                                        )
                                    case 'checkbox':
                                        return (
                                            <div className="form-item">
                                                <Form.Item label={data.label}  {...formItemLayout} labelAlign={this.props.labelAlign}>

                                                    {form.getFieldDecorator(data.code, {
                                                        rules: [
                                                            {
                                                                required: required,
                                                                message: '不能为空',
                                                            },
                                                        ],
                                                    })(
                                                        <Checkbox.Group options={data.options.options} size={this.props.size} value={defaultValue} />
                                                    )}

                                                </Form.Item>
                                            </div>
                                        )
                                    case 'select':
                                        return (
                                            <div className="form-item">
                                                <Form.Item label={data.label}  {...formItemLayout} labelAlign={this.props.labelAlign}>

                                                    {form.getFieldDecorator(data.code, {
                                                        rules: [
                                                            {
                                                                required: required,
                                                                message: '不能为空',
                                                            },
                                                        ],
                                                    })(
                                                        <Select style={{ width: data.options.width, minWidth: '180px' }} size={this.props.size} placeholder={placeholder} value={common.isEmpty(defaultValue) ? undefined : defaultValue}>
                                                            {
                                                                data.options.options.map((el, i) =>
                                                                    <Select.Option value={el.value} key={i}>{el.label}</Select.Option>
                                                                )
                                                            }

                                                        </Select>
                                                    )}

                                                </Form.Item>
                                            </div>
                                        )
                                    case 'date':
                                        return (
                                            <div className="form-item">
                                                <Form.Item label={data.label}  {...formItemLayout} labelAlign={this.props.labelAlign}>
                                                    {form.getFieldDecorator(data.code, {
                                                        rules: [
                                                            {
                                                                required: required,
                                                                message: '不能为空',
                                                            },
                                                        ],
                                                    })(
                                                        <DatePicker style={{ width: data.options.width }} size={this.props.size} showTime={data.options.format === 'YYYY-MM-DD HH:mm'} format={data.options.format} />
                                                    )}

                                                </Form.Item>
                                            </div>
                                        )
                                    case 'switch':
                                        return (
                                            <div className="form-item">
                                                <Form.Item label={data.label}  {...formItemLayout} labelAlign={this.props.labelAlign}>
                                                    {form.getFieldDecorator(data.code, {
                                                        rules: [
                                                            {
                                                                required: required,
                                                                message: '不能为空',
                                                            },
                                                        ],
                                                    })(
                                                        <Switch checked={defaultValue} size={this.props.size} />
                                                    )}

                                                </Form.Item>
                                            </div>
                                        )
                                    case 'title':
                                        return (
                                            <div className="form-item">
                                                <p style={{fontSize: data.options.fontSize, color: data.options.color, textAlign: data.options.textAlign, fontWeight: data.options.fontWeight}}>{data.label}</p>
                                            </div>
                                        )
                                    default:
                                        break;
                                }
                            })()
                        }
                        {
                            isActive && <div style={{ position: 'absolute', right: '0', bottom: '0' }}>
                                <span className="iconfont icon-fuzhi" title="复制" style={{ fontSize: '20px', cursor: 'pointer', marginRight: '5px' }}
                                    onClick={() => {
                                        let newFormItem = common.deepClone(data)
                                        newFormItem.id = `content-${this.getKey()}---${content.length}`
                                        newFormItem.code = `code_${this.getKey()}${this.getKey()}`
                                        delete newFormItem.icon
                                        content.splice(this.props.index + 1, 0, newFormItem)
                                        this.props.store.activeId.set(newFormItem.id)
                                        this.props.store.content.set(content)
                                    }}
                                ></span>
                                <span className="iconfont icon-shanchu" title="删除" style={{ fontSize: '20px', cursor: 'pointer' }}
                                    onClick={() => {
                                        if (content.length > 1) {
                                            this.props.store.activeId.set(content[this.props.index - 1].id)
                                        }
                                        content.splice(this.props.index, 1)
                                        this.props.store.content.set(content)
                                    }}
                                ></span>
                            </div>
                        }
                    </div>
                )}
            </Draggable>
        )
    }
}
export default FormItem