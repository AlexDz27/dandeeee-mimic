import * as React from 'react';
import './App.css';


import axios from 'axios';
import AppRouter from "./AppRouter";
import API from "./API"

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
        debugger
        const newTodoObj: any = new TodoItem(newTodo)
        debugger
        axios.post(this.props.url, newTodoObj)

            // .then( () => this.setState({ todosData: [...this.state.todosData, newTodoObj] }) )
            .then( (responseData: any) => { /** responseData - res.json from server **/
                debugger
                // debugger
                this.setState({
                    todosData: [...this.state.todosData, (responseData.data.obj) as TodoItem]
                })
                // this.loadTodosDataFromServer()
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
            .then(res => console.log(todoItem))
            // .then(res => res.data.isDone = !res.data.isDone)
            .catch(err => console.log(err))

        // axios.put(`${this.props.url}/${todoItem._id}`)
        //     .then(res => console.log(res))
        //     .then(res => todoItem.isDone = !todoItem.isDone)
        //     .catch(err => console.log(err))


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
        // setTimeout(this.loadTodosDataFromServer, 1000)
        /** todo: API access layer **/
        // API.loadTodosDataFromServer().then(res => res.data) {
        //
        // }
        // setInterval(this.loadTodosDataFromServer, this.props.pollInterval)
        API.loadTodosDataFromServer(this.props.url)
            .then((res: any) => {
                this.setState({todosData: res.data})
            })
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
