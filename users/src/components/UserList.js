import React, { Component } from 'react';
import User from './User';

class UserList extends Component {
    render() {
        const {users} = this.props
        return (
            <div>
              { users.map(user => (
                  <User {...user} />
              ))}
            </div>
        );
    }
}

export default UserList;