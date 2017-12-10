import * as React from 'react'
import {Component} from "react";
import {ITodoItemProps} from "./AllTodos";



export default class TodoItem extends Component<any, ITodoItemProps> {
    render() {
        const {todoTitle} = this.props;

        return(
            <div className="TodoItem">
                <input type="checkbox"/>
                <li>{todoTitle}</li>
            </div>
        )
    }
}