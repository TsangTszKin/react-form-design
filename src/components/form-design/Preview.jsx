import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input,
    Radio,
    Checkbox,
    DatePicker,
    Select,
    Switch
} from 'antd'
import common from '@/utils/common'

@Form.create()
class Preview extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        const { config, content } = this.props
        const { form } = this.props

        const formItemLayout =
            config.layout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;
        return (
            <Form style={{ backgroundColor: '#FFF' }} layout={config.layout} labelAlign={config.labelAlign} onSubmit={this.handleSubmit}>
                {
                    content.map((el, i) =>
                        el.type === 'title' ?
                            <p style={{ fontSize: el.options.fontSize, color: el.options.color, textAlign: el.options.textAlign, fontWeight: el.options.fontWeight }}>{el.label}</p>
                            :
                            <Form.Item label={el.label}  {...formItemLayout} labelAlign={config.labelAlign}>

                                {form.getFieldDecorator(el.code, {
                                    rules: [
                                        {
                                            required: el.options.required,
                                            message: '不能为空',
                                        },
                                    ],
                                })(
                                    (() => {

                                        const { defaultValue, placeholder } = el.options
                                        switch (el.type) {
                                            case 'input':
                                                return <Input style={{ width: el.options.width }} size={config.size} placeholder={placeholder} defaultValue={defaultValue} />
                                            case 'textarea':
                                                return <Input.TextArea style={{ width: el.options.width }} rows={4} size={config.size} placeholder={placeholder} defaultValue={defaultValue} />
                                            case 'radio':
                                                return (
                                                    <Radio.Group defaultValue={defaultValue}>
                                                        {
                                                            el.options.options.map((el2, j) =>
                                                                <Radio value={el2.value} key={j} size={config.size} >{el2.label}</Radio>
                                                            )
                                                        }
                                                    </Radio.Group>
                                                )
                                            case 'checkbox':
                                                return <Checkbox.Group options={el.options.options} size={config.size} defaultValue={defaultValue} />
                                            case 'select':
                                                return (
                                                    <Select style={{ width: el.options.width, minWidth: '180px' }} size={config.size} placeholder={placeholder} defaultValue={common.isEmpty(defaultValue) ? undefined : defaultValue}>
                                                        {
                                                            el.options.options.map((el2, j) =>
                                                                <Select.Option value={el2.value} key={j}>{el2.label}</Select.Option>
                                                            )
                                                        }

                                                    </Select>
                                                )
                                            case 'date':
                                                return <DatePicker style={{ width: el.options.width }} size={config.size} showTime={el.options.format === 'YYYY-MM-DD HH:mm'} format={el.options.format} />
                                            case 'switch':
                                                return <Switch defaultChecked={defaultValue} size={config.size} />

                                            default:
                                                break;
                                        }
                                    })()
                                )}

                            </Form.Item>
                    )
                }
            </Form>
        );
    }
}

Preview.propTypes = {
    config: PropTypes.object,
    content: PropTypes.array
};

export default Preview;