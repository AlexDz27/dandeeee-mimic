import * as React from 'react';
import {Component} from "react";

import './components-styles/Header.css'

export default class Header extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    // handleTodoToggle(): void {
    //     const {todosData} = this.props;
    //     console.log(todosData);
    // }

    render() {
        return(
            <div className="Header">Alex todos</div>
        )
    }
}