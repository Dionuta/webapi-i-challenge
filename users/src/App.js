import React, { Component } from 'react';
import axios from 'axios';

import UserList from './components/UserList';

class App extends Component {

  state = { 
    users: []
  }
  componentDidMount(){
    axios
      .get('http://localhost:5000/api/users')
      .then( res => {this.setState({users: res.data})}) 
      .catch(err => console.log(err)); 
 }


  render() {
    return (
      <div>
        <UserList users= {this.state.users}/>
      </div>
    );
  }
}

export default App;
