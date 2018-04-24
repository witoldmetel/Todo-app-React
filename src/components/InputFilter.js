import React, { Component } from 'react';

export default class InputFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeBtn: 1
        }

        this.onHandleClick = this.onHandleClick.bind(this);
    }

    onHandleClick(e) {
        this.setState({ activeBtn: e.target.id })
        console.log(e.target.id, this.state.activeBtn);
    }

    render() {
        return (
            <button
                type='button'
                className={(this.state.activeBtn === this.props.id) ? "ui active button" : "ui button"}
                id={this.props.id}
                onClick={this.onHandleClick}
                disabled>
                {this.props.name}
            </button>
        );
    }
}