import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySelector: 0,
      inputValue: '',
      rooms: [],
      newRoom: '',
      showSelection: ''
    };

    this.addChatRoom = this.addChatRoom.bind(this);
    this.cancelNewRoom = this.cancelNewRoom.bind(this);
    this.displaySelector = this.displaySelector.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addChatRoom (){
    this.setState({
      newRoom: true
    });
  }

  cancelNewRoom (){
    this.setState({
      newRoom: false
    })
  }

  clearValue (){
    this.setState({
      inputValue: ''
    });
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => { 
      console.log(snapshot);
      const room = snapshot.val();
      room.key = snapshot.key;
      console.log(snapshot);
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }
    createRoom (event){
      console.log(event);
      this.roomsRef.push({
        name: this.state.inputValue
      });
    }

    displaySelector (index){
      if(!this.newRoom){
      this.setState({showSelection: {index} });
      }
      else{
      }
    }
  
    handleChange(event) {
      this.setState({
        inputValue: event.target.value
      });
    }


  render() {
    const newRoom = this.state.newRoom;
    let section;
    if (newRoom === true){
      section = <section className="adder">
      <div className="addNewForm">
      <form onSubmit={this.createRoom}>
        <ul>
          <li> 
        <h3>Create a new Room</h3>
          </li>
          <li>
          Enter a room Name
          </li>
          <li>
        <input type="text" value={this.state.inputValue} onChange={this.handleChange}/>
        </li>
        <li>
        <input type="button" value="Cancel" onClick={this.cancelNewRoom}/> 
        <input type="submit" value="Create room"/>
        </li>
        </ul>
      </form>
      </div>
  </section>;
    }
    return (
      <section className='container'>
        <section className='roomlist'>
        <div className="panelTop">
          <h1 id="panelHeading">Bloc Chat</h1>
          <button id="newButton" onClick={this.addChatRoom}>New Room</button>
        </div>
            {
              this.state.rooms.map( (room, index) => 
                <ul className="room"  key={index}> 
                  <li className="" onClick={() =>this.state.displaySelector(index)} >{room.name}</li>
                </ul>
              )
            }
        </section>
        {section}
      </section>
    );
  }
}

export default RoomList;