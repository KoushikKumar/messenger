import React, { Component } from 'react';
import { connect } from 'react-redux';

class Users extends Component {

    renderUsers() {
        if(this.props.users && this.props.users.length) {
           return  this.props.users.map((user, index) => {
                return <li key={index}>{user}</li>
            })
        } else {
            return (
                <div>
                    No user is currently online
                </div>
            )
        }
        
    }

    render() {
        return (
            <div>
                <br />
                <b> Available users </b>
                {this.renderUsers()}
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.users
    }
}

export default connect(mapStateToProps, null)(Users);