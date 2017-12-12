import * as React from 'react'
import { Link } from 'react-router-dom'
import {Component} from "react";

export default class TodoPage extends Component<any, any> {
    render() {
        const {oneTodoData} = this.props;

        return(
            <div>
                <h1>{oneTodoData._id}</h1>
                <h2>{oneTodoData.title}</h2>
                <h3>{oneTodoData.isDone ? 'Alex todo is done!' : 'Alex todo isn\'t done...'}</h3>
                <Link to={`/`}>Go back</Link>
            </div>
        )
    }
}