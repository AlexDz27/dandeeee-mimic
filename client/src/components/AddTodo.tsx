import * as React from 'react'
import {Component} from "react";

export default class AddTodo extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            newTodoVal: ""
        }
    }

    handleChange(e: any) {
        this.setState({
            newTodoVal: e.target.value
        })
    }

    handlePassTodo(e: any) {
        if (e.keyCode === 13) {
            this.props.onAddTodo(this.state.newTodoVal)
        }
    }

    render() {
        return (<div>
            <input onChange={(e: any) => this.handleChange(e)} onKeyDown={(e: any) => this.handlePassTodo(e)} placeholder="Add todo" />
        </div>)
    }
}