import * as React from 'react'
import {Component} from "react";
import {ITodoItemProps} from "./AllTodos";

export interface ITodoItemStates {
    isDone: boolean
}


export default class TodoItem extends Component<ITodoItemProps, ITodoItemStates> {
    constructor(props: ITodoItemProps) {
        super(props);

        this.state = {
            isDone: false
        }
    }

    toggleTodoItem() {
        const {todoIsDone, onTodoToggle} = this.props;
        onTodoToggle(todoIsDone)
    }

    render() {
        const {todoTitle} = this.props;

        return(
            <div className="TodoItem">
                <input onClick={() => this.toggleTodoItem()} type="checkbox"/>
                <li>{todoTitle}</li>
            </div>
        )
    }
}