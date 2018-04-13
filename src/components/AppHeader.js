// import React from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { addTask } from '../actions/';

// class AppHeader extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { value: "" };
//         this.handleChange = this.handleChange.bind(this);
//         this.addTask = this.addTask.bind(this);
//     }

//     handleChange(e) {
//         this.setState({ value: e.target.value });
//     }

//     addTask(task) {
//         if (task.length > 0) {
//             this.props.addTask(task);
//             this.setState({ value: "" });
//         }
//     }

//     render() {
//         return (
//                 <header className="ui fixed menu">
//                     <nav className="ui container">
//                         <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
//                             <div className="ui action input">
//                                 <input placeholder="Add new task" ref ="task" value={this.state.value} onChange={this.handleChange}></input>
//                                 <button className="ui button" onClick={() => this.props.addTask(this.refs.task.value)}>Add Task</button>
//                             </div>
//                             <div className="ui icon input">
//                                 <input type="text" placeholder="Search task..."></input>
//                                 <i className="search icon"></i>
//                             </div>
//                     </nav>
//                 </header>
//         );
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({addTask}, dispatch)
// }

// export default connect (()=>[],mapDispatchToProps) (AppHeader);