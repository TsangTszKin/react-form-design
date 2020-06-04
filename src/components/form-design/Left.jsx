/*
 * @Author: your name
 * @Date: 2020-06-01 11:41:44
 * @LastEditTime: 2020-06-03 11:35:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-form-design\src\container\column.js
 */

import React, { Component } from 'react'
import Seed from './Seed'
import { Droppable } from 'react-beautiful-dnd'


class Left extends Component {
    render() {
        return (
            <div className="left" >
                {
                    this.props.items.map(((el, i) =>
                        <React.Fragment key={i}>
                            <h3 className="title">{el.title}</h3>
                            <Droppable droppableId={el.id}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className="shell"
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            isDraggingOver={snapshot.isDraggingOver}
                                        >
                                            {el.items.map((el, index) => (
                                                <Seed key={el.id} data={el} index={index} />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </React.Fragment>
                    ))
                }


            </div >
        )
    }
}

export default Left