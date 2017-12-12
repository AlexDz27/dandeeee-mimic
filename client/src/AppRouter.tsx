import * as React from 'react'
import {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import TodosPage from "./components/TodosPage";
import TodoPage from "./components/TodoPage"

import {IAppRouterProps} from "./App";

export default class AppRouter extends Component<IAppRouterProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            newTodo: ""
        }
    }

    render() {
        const findTodo = (id: string) => {
            return this.props.todosData.find(t => t._id == id)
        }

        return(
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" render={() => <TodosPage {...this.state} {...this.props} />} />

                    <Redirect exact={true} from="/todos" to="/"/>

                    <Route
                        exact={true}
                        path={`/todos/:id`}
                        render={
                            ({match: {params: {id}}}) => {
                                const neededTodo = findTodo(id)
                                return neededTodo ? <TodoPage oneTodoData={neededTodo} /> : <h1>404 - no todo with such an id found</h1>
                            }
                        }
                    />

                    <Route exact={true} path="*" render={() => <h1>404 page not found (route for a page)</h1>} />
                </Switch>
            </BrowserRouter>
        )
    }
}