import React, { Component } from 'react'
import Panel from '@/components/form-design/Panel'
import { Provider, observer } from 'mobx-react';
import store from '@/store/FormDesign'

@observer
class ReactBeautifulTodo extends Component {
    constructor(props) {
        super(props)
        this.store = new store()
    }

    render() {
        return (
            <Provider store={this.store}>
                <Panel />
            </Provider>
        )
    }
}
export default ReactBeautifulTodo