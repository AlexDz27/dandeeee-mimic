import * as React from 'react'
import {Component} from "react";
import TodoItem from "./TodoItem";

import './components-styles/AllTodos.css'

import {TodoFilter} from "../App";

interface IAllTodosProps {
    todosData: Array<any>,
    filter: TodoFilter
}

export interface ITodoItemProps {
    todoTitle: string
}

export default class AllTodos extends Component<any, IAllTodosProps> {
    constructor(props: IAllTodosProps) {
        super(props)
    }

    render() {
        const {todosData, filter = TodoFilter.ALL} = this.props;

        const filtered = todosData.filter((item: any) => {
            return(
                filter === TodoFilter.ALL ||
                (filter === TodoFilter.TODO && item.isDone == false) ||
                (filter === TodoFilter.DONE && item.isDone == true)
            )
        })
        const TodoItemTemplate = filtered.map((item: any, index: number) => <TodoItem key={index} todoTitle={item.title}/>)

        // const TodoItemTemplate = todosData.map((item: any, index: number) => <TodoItem key={index} todoTitle={item.title} />)
        return(<ul className="AllTodos">
            {TodoItemTemplate}
            </ul>)

    }
}