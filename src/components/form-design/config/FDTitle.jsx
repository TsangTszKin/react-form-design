import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Radio, Switch } from 'antd'
import { SketchPicker } from 'react-color';

class FDInput extends Component {
    render() {
        const { label, code, options } = this.props.item
        const { fontSize, color, textAlign, fontWeight } = options
        return (
            <React.Fragment>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>标题：</p>
                    <Input placeholder="请输入" size="small" value={label} onChange={e => this.props.callback('label', e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>字体大小：</p>
                    <Input placeholder="请输入" size="small" value={fontSize} onChange={e => this.props.callback('fontSize', e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>颜色：</p>
                    <SketchPicker  color={ color } onChangeComplete={ color => {
                        console.log(color)
                        this.props.callback('color', color.hex)
                    } } />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>对齐方式：</p>
                    <Radio.Group value={textAlign} buttonStyle="solid" size="small" onChange={e => this.props.callback('textAlign', e.target.value)}>
                        <Radio.Button value="left">左对齐</Radio.Button>
                        <Radio.Button value="center">居中</Radio.Button>
                        <Radio.Button value="right">右对齐</Radio.Button>
                    </Radio.Group>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>是否加粗：</p>
                    <Switch  size="small" checked={fontWeight === 'bold'} onChange={checked => this.props.callback('fontWeight', checked ? 'bold': 'normal')} />
                </div>
            </React.Fragment>
        );
    }
}

FDInput.propTypes = {
    item: PropTypes.object,
    callback: PropTypes.func
};

export default FDInput;