import * as React from 'react';
import './App.css';
// import Header from "./components/Header";
// import TodosPane from "./components/TodosPane";
// import Footer from "./components/Footer";
// import AddTodo from "./components/AddTodo";
// import AllTodos from "./components/AllTodos";

import axios from 'axios';
import AppRouter from "./AppRouter";
/** import API from "./API" **/

export enum TodoFilter {ALL, DONE, TODO}

class TodoItem {
    _id: string
    title: string
    isDone?: boolean = false

    constructor(todoName: string) {
        this.title = todoName
    }
}

interface IAppStates {
    todosData: Array<TodoItem>,
    filter: TodoFilter
}

export interface IAppRouterProps {
    handleAddTodo: Function,
    todosData: Array<TodoItem>,
    filter: TodoFilter,
    handleTodoToggle: Function,
    handleFilterChange: Function
}

export default class App extends React.Component<any, IAppStates> {
    constructor(props: Array<any>) {
        super(props);

        this.state = {
            todosData: [],
            filter: TodoFilter.ALL,
        };

        this.loadTodosDataFromServer = this.loadTodosDataFromServer.bind(this);
    }

    handleAddTodo(newTodo: string) {
        const newTodoObj: any = new TodoItem(newTodo)

        axios.post(this.props.url, newTodoObj)
            // .then( () => this.setState({ todosData: [...this.state.todosData, newTodoObj] }) )
            .then( () => {
                this.setState({
                    todosData: [...this.state.todosData, newTodoObj]
                })
                this.loadTodosDataFromServer()
            } )
            // .then(this.loadTodosDataFromServer())
            .catch((err: any) => console.error(err))

    }

    /**  (!) todoItem here is oneTodoData prop from TodoItem component
     *
     */
    handleTodoToggle(todoItem: TodoItem) {
        /**
        // const {todosData} = this.state;
        // console.log(todosData);
        // const todoItemPosition: number = todosData.findIndex((t: any) => t.title === todoItem.title);
        // const newTodosData = todosData.map((t, i) => i === todoItemPosition ? todoItem : t);
         **/

        todoItem.isDone = !todoItem.isDone; /** (!!!) **/
        /** (!)
         * Как-то обошелся без findIndex, хз правильно ли это. Но всё работает, как надо.
         **/
        axios.put(`${this.props.url}/${todoItem._id}`, todoItem)
            .catch(err => console.log(err))


        this.setState({
            todosData: this.state.todosData
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

    componentWillMount() {
        // this.loadTodosDataFromServer();
        setTimeout(this.loadTodosDataFromServer, 1000)
        /** todo: API access layer **/
        // API.loadTodosDataFromServer().then(res => res.data) {
        //
        // }
        // setInterval(this.loadTodosDataFromServer, this.props.pollInterval)
    }

  render() {
        // const {todosData, filter} = this.state;
    return (
      <div className="App">
          <AppRouter
              {...this.state}
              handleAddTodo={(newTodo: any) => this.handleAddTodo(newTodo)}
              handleTodoToggle={(todoItem: TodoItem) => this.handleTodoToggle(todoItem)}
              handleFilterChange={(newFilter: TodoFilter) => this.handleFilterChange(newFilter)}
          />
      </div>
    );
  }
}

/**
 <Header/>
 <TodosPane>
 <AddTodo onAddTodo={(newTodo: any) => this.handleAddTodo(newTodo)} />
 <AllTodos todosData={todosData} filter={filter} onTodoToggle={(todoItem: TodoItem) => this.handleTodoToggle(todoItem)} />
 <Footer todosData={todosData} filter={filter} onFilterChange={(newFilter: TodoFilter) => this.handleFilterChange(newFilter)} />
 </TodosPane>
 **/
