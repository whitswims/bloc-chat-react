import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      rooms: [],
      newRoom: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  
    handleChange(event) {
      this.setState({
        inputValue: event.target.value
      });
    }


  render() {
    return (
      <section className='container'>
        <section className='roomlist'>
        <div className="panelTop">
          <h1 id="panelHeading">Bloc Chat</h1>
          <button id="newButton">New Room</button>
        </div>
            {
              this.state.rooms.map( (room, index) => 
                <ul className="room"  key={index}> 
                  <li className="">{room.name}</li>
                </ul>
              )
            }
        </section>
        <section className="adder">
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
             <input type="button" value="Cancel"/> 
             <input type="submit" value="Create room"/>
             </li>
             </ul>
           </form>
          </div>
      </section>
      </section>
    );
  }
}

export default RoomList;