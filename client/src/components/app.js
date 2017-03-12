import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { flushUsers } from '../actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {messages:[], users:[], id:""};
  }

  componentDidMount() {
    this.socket = io('https://messenger-server-kkv.herokuapp.com');
    this.socket.on('connect', () => {
      this.setState({"id":this.socket.id.slice(8)});
    })
    this.socket.on('message', message => {
      this.setState({messages:[message,...this.state.messages]});
    });
    this.socket.on('user', user => {
      this.setState({ users :user.users.filter((user) => {return user!==this.state.id}) });
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if(JSON.stringify(nextState.users)!==JSON.stringify(this.state.users)){
      this.props.flushUsers(nextState.users);
    }
  }

  handleSubmit(event) {
    const body = event.target.value;
    if(event.keyCode === 13 && body) {
      const message = {
        body,
        from :'Me'
      }
      this.setState({messages:[message,...this.state.messages] });
      this.socket.emit('message', body);
      event.target.value = '';
    }
    
  }
  render() {
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}><b>{message.from}: </b>{message.body}</li>
    })
    return (
      <div>
        <input type="text" placeholder="Enter a message" onKeyUp={(event) => {this.handleSubmit(event)}} />
        {messages}
      </div>
    );
  }
}

export default connect(null, {flushUsers})(App);
