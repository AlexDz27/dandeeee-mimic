import * as React from 'react'
import {Component} from "react";

import {TodoFilter} from "../App"

interface IFooterProps {
    todosData: Array<any>,
    filter: TodoFilter
}

export default class Footer extends Component<IFooterProps, any> {
    constructor(props: IFooterProps) {
        super(props);

        this.state = {
            filter: TodoFilter.ALL
        }
    }

    render() {
        const {todosData, filter} = this.props;
        const completedTodos = todosData.filter(todo => todo.isDone);

        return (<div>
            <span>{completedTodos.length}/{todosData.length}</span>&nbsp;
            <a href='#' style={filter === TodoFilter.ALL ? styles.activeFilter : {}}>All</a>&nbsp;
            <a href='#' style={filter === TodoFilter.DONE ? styles.activeFilter : {}}>Done</a>&nbsp;
            <a href='#' style={filter === TodoFilter.TODO ? styles.activeFilter : {}}>Todo</a>&nbsp;
        </div>)
    }
}

const styles = {
    activeFilter: {
        color: "green"
    }
}