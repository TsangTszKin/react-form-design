import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Switch } from 'antd'

class FDSwitch extends Component {
    render() {
        const { label, code, options } = this.props.item
        const { width, defaultValue, required, placeholder } = options
        return (
            <React.Fragment>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>标题：</p>
                    <Input placeholder="请输入" size="small" value={label} onChange={e => this.props.callback('label', e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>默认值：</p>
                    <Switch  size="small" checked={defaultValue} onChange={checked => this.props.callback('defaultValue', checked)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>编码值：</p>
                    <Input placeholder="请输入" size="small" value={code} onChange={e => this.props.callback('code', e.target.value)} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ marginBottom: '5px' }}>是否必填：</p>
                    <Switch  size="small" checked={required} onChange={checked => this.props.callback('required', checked)} />
                </div>
            </React.Fragment>
        );
    }
}

FDSwitch.propTypes = {
    item: PropTypes.object,
    callback: PropTypes.func
};

export default FDSwitch;