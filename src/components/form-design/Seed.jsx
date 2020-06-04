/*
 * @Author: your name
 * @Date: 2020-06-01 11:42:36
 * @LastEditTime: 2020-06-03 10:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\container\Seed.js
 */
import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'


export default class Seed extends Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.data.id}
                index={this.props.index}
            // isDragDisabled={isDragDisabled}
            >
                {(provided, snapshot) => (
                    <div
                        className="cell"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}

                    >
                        <div className="seed">
                            <span className={`iconfont ${this.props.data.icon}`} ></span>
                            {this.props.data.label}
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}