import * as React from 'react';
import './App.css';
import Header from "./components/Header";
import TodosPane from "./components/TodosPane";
import Footer from "./components/Footer";
import AddTodo from "./components/AddTodo";
import AllTodos from "./components/AllTodos";

import axios from 'axios';

export enum TodoFilter {ALL, DONE, TODO}

class TodoItem {
    title: string
    isDone?: boolean = false

    constructor(todoName: string) {
        this.title = todoName
    }
}

interface IAppStates {
    todosData: Array<TodoItem>,
    filter: TodoFilter,
    newTodo: string
}

export default class App extends React.Component<any, IAppStates> {
    constructor(props: Array<any>) {
        super(props);

        this.state = {
            todosData: [],
            filter: TodoFilter.ALL,
            newTodo: ""
        };

        this.loadTodosDataFromServer = this.loadTodosDataFromServer.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }
 
    // handleChange(e: any) {
    //     this.setState({
    //         newTodo: e.target.value
    //     })
    // }

    handleAddTodo(newTodo: any) {
        axios.post(this.props.url, newTodo)
            .then((res: any): any => {
                this.setState({
                    todosData: [...this.state.todosData, res]
                })
                    // .catch((err: any): void => {
                    //     return console.log(err)
                    // })
            })

        // this.setState({
        //     todosData: [...this.state.todosData, newTodo]
        // })
    }

    /**  (!) todoItem here is oneTodoData prop from TodoItem component **/
    handleTodoToggle(todoItem: TodoItem) { //todo: add type (there must be boolean type cuz i am passing bool value, not object as D does)
        const {todosData} = this.state;
        const todoItemPosition: number = todosData.findIndex((t: any) => t.title === todoItem.title);
        todoItem.isDone = !todoItem.isDone;
        console.log(todoItemPosition);
        const newTodosData = todosData.map((t, i) => i === todoItemPosition ? todoItem : t);

        this.setState({
            todosData: newTodosData
        })
    }

    handleFilterChange(newFilter: TodoFilter) {
        this.setState({
            filter: newFilter
        })
    }

    loadTodosDataFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({
                    todosData: res.data
                })
            })
    }

    componentDidMount() {
        this.loadTodosDataFromServer();
    }

  render() {
        const {todosData, filter} = this.state;
    return (
      <div className="App">
        <Header todosData={todosData} />
        <TodosPane>
          <AddTodo onAddTodo={(newTodo: any) => this.handleAddTodo(newTodo)} />
          <AllTodos todosData={todosData} filter={filter} onTodoToggle={(todoItem: TodoItem) => this.handleTodoToggle(todoItem)} />
          <Footer todosData={todosData} filter={filter} onFilterChange={(newFilter: TodoFilter) => this.handleFilterChange(newFilter)} />
        </TodosPane>
      </div>
    );
  }
}
