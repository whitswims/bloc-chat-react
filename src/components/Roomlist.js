import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
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

  render() {
    return (
      <section className='container'>
        <section className='roomlist'>
          <table id="room-list">
            <tbody>
              {
                this.state.rooms.map( (room, index) => 
                  <tr className="room" /* key={index} onClick={() => this.handleRoomClick(room)} onMouseEnter={this.onMouseEnterHandler.bind (this, room)} onMouseLeave={this.onMouseLeaveHandler.bind (this, room) }*/ >
                    <td className="">{room.name}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </section>
      </section>
    );
  }
}

export default RoomList;