import * as React from 'react'
import {Component} from "react";

import './components-styles/TodosPane.css'

export default class TodosPane extends Component {
    render() {
        return <div className="TodosPane">{this.props.children}</div>
    }
}