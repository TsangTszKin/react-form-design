import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-beautiful-dnd'
import initialData from './initialData'
import Left from './Left'
import Right from './Right'
import Mid from './Mid'
import common from '@/utils/common'
import '@/styles/form-design'
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class Panel extends Component {
    state = initialData
    _index = 0
    getKey = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    onDragEnd = result => {
        const { destination, source, draggableId } = result
        let content = this.props.store.content.get

        console.warn('destination, source, draggableId', destination, source, draggableId)

        let start
        if (source.droppableId.indexOf('seeds') !== -1) {
            start = common.deepClone(this.state.seeds[0].items[source.index])
        }
        if (source.droppableId.indexOf('content') !== -1) {
            start = common.deepClone(content[source.index])
        }

        if (!destination) { // 表单原先为空
            start.id = `content-${this.getKey()}---${content.length}`
            start.code = `code_${this.getKey()}${this.getKey()}`
            delete start.icon
            content.splice(0, 0, start)
        } else {
            if (destination.droppableId.indexOf('seeds') !== -1) return // 任何地方拖放到菜单，不处理

            const finish = common.deepClone(content[destination.index]) // 结束地必是表单面板
            const startIndex = source.index
            const finishIndex = destination.index
            console.warn('finishIndex', finishIndex)

            if (finish && start.id === finish.id) return // 无拖动

            if (source.droppableId.indexOf('content') !== -1) {// 起点在表单面板
                console.warn('start', start)
                content.splice(startIndex, 1)
                content.splice(finishIndex, 0, start)
            } else if (source.droppableId.indexOf('seeds') !== -1) {// 起点在菜单
                start.id = `content-${this.getKey()}---${content.length}`
                start.code = `code_${this.getKey()}${this.getKey()}`
                delete start.icon
                content.splice(finishIndex, 0, start)
            }
        }
        console.warn('最新content', content)
        this.props.store.activeId.set(start.id)
        this.props.store.content.set(content)
    }

    updateConfig = (type, key, value) => {
        console.log('type, key, value', type, key, value)
        if (type === '2') {// 更新表单配置
            let { config } = this.state
            config[key] = value
            this.setState({ config })
        }
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="form-design-panel">
                    <Left items={this.state.seeds} />
                    <Mid config={this.state.config} />
                    <Right callback={this.updateConfig} />
                </div>
            </DragDropContext>
        );
    }
}

Panel.propTypes = {
    content: PropTypes.array,
    callback: PropTypes.func
};
Panel.defaultProps = {
    content: [],
    callback: () => { }
}

export default Panel;