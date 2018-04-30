import React, { Component } from 'react';

export default class InputBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(e) {
        this.setState({ text: e.target.value });
    }

    onFormSubmit(e) {
        e.preventDefault();
        if (this.state.text.trim() !== '') {
            this.props.addTask(this.state.text.trim());
            this.setState({ text: '' });
        }
    }
    render() {
        return (
            <form className="ui action input" onSubmit={this.onFormSubmit}>
                <input
                    type="text"
                    placeholder="Add new task"
                    value={this.state.text}
                    onChange={this.onInputChange}>
                </input>
                <button className="ui button" type="submit">Add Task</button>
            </form>
        );
    }
}