import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js'; 

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault(); //this prevents form from refreshing upon submit 
    const itemsRef = firebase.database().ref('items');//store the items that people are bringing to the potluck and store them in items
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    } //this puts username and item in an obkect and sends it to the firebase db 
    itemsRef.push(item); //send a copy of our object to the db 
    this.setState({
      currentItem: '',
      username: ''
    }); //this clears the database so a new item can be stored 
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Potluck</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username}/>
                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem}/>
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className="wrapper">
              <ul>
              {this.state.items.map((item) => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>brought by: {item.user}</p>
                      <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                    </li>
                  )
                })
              }
              </ul>
           </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;