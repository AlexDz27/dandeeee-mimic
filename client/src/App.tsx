import * as React from 'react';
import './App.css';
import Header from "./components/Header";
import TodosPane from "./components/TodosPane";
import Footer from "./components/Footer";
import AddTodo from "./components/AddTodo";
import AllTodos from "./components/AllTodos";

import axios from 'axios';

export enum TodoFilter {ALL, DONE, TODO}

interface IAppStates {
    todosData: Array<any>,
    filter: TodoFilter,
    newTodo: any
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

    handleAddTodo(newTodo: any): any {
        axios.post(this.props.url, newTodo)
            .then((res: any): any => {
                this.setState({
                    todosData: res
                })
                    .catch((err: any): any => console.error(err))
            })

        // this.setState({
        //     todosData: [...this.state.todosData, newTodo]
        // })
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
        <Header/>
        <TodosPane>
          <AddTodo onAddTodo={(newTodo: any) => this.handleAddTodo(newTodo)} />
          <AllTodos todosData={todosData} filter={filter} />
          <Footer todosData={todosData} filter={filter} />
        </TodosPane>
      </div>
    );
  }
}
