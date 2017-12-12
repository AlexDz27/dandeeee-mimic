import * as React from 'react'
import {Component} from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import AllTodos from "./AllTodos";
import Footer from "./Footer";
import {TodoFilter} from "../App";
import Header from "./Header";
import TodosPane from "./TodosPane";

export default class TodosPage extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            newTodo: ""
        }
    }

    render() {
        const {todosData, filter, handleAddTodo, handleTodoToggle, handleFilterChange} = this.props;

        if (todosData.length !== 0) {

            return(
                <div>
                <Header/>
                <TodosPane>
                    <AddTodo onAddTodo={(newTodo: any) => handleAddTodo(newTodo)} />
                    <AllTodos todosData={todosData} filter={filter} onTodoToggle={(todoItem: TodoItem) => handleTodoToggle(todoItem)} />
                    <Footer todosData={todosData} filter={filter} onFilterChange={(newFilter: TodoFilter) => handleFilterChange(newFilter)} />
                </TodosPane>
                </div>
            )

        } else {
            return <h1>Loading...</h1>
        }
    }
}