import React, { Component } from 'react';
import './App.css';
import RoomList from './components/Roomlist';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCUTYauwBz_cZtyDXtoMp3wUvvMe6WJ4Z0",
  authDomain: "bloc-chat-react-4a6bd.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-4a6bd.firebaseio.com",
  projectId: "bloc-chat-react-4a6bd",
  storageBucket: "bloc-chat-react-4a6bd.appspot.com",
  messagingSenderId: "55506979722"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        </header>
        <main>
        <RoomList
          firebase={firebase}
        />
        </main>
      </div>
    );
  }
}

export default App;
