import * as React from 'react'
import {Component} from "react";
import {ITodoItemProps} from "./AllTodos";
import {Link} from "react-router-dom";

export interface ITodoItemStates {
    isDone: boolean
}


export default class TodoItem extends Component<ITodoItemProps, ITodoItemStates> {
    toggleTodoItem() {
        const {oneTodoData, onTodoToggle} = this.props;
        onTodoToggle(oneTodoData)
    }

    render() {
        const {oneTodoData} = this.props;

        return(
            <div className="TodoItem">
                <input onChange={() => this.toggleTodoItem()} checked={oneTodoData.isDone} type="checkbox"/>
                <li><Link to={`todos/${oneTodoData._id}`}>{oneTodoData.title}</Link></li>
            </div>
        )
    }
}