import React, { Component } from 'react';
import axios from 'axios';
const API ='http://localhost:2302/apartment/addRoom/';

export default class AddRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
        _id: this.props._id,
        apartment_name: this.props.apartment,
        room_name_number: "null",
    }
	
  }

  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }  
  
  onSubmit = (event) => {
      
    event.preventDefault();
   // let roomNum == 0;
    axios.post('http://'+process.env.REACT_APP_ROOM+'/apartment/addRoom/', {
        _id: this.state._id,
        room_name_number: this.state.room_name_number,

    }).then(res => {
      console.log(res);
      console.log(res.data);
      if (res.status === 200) {
        window.location.reload(true);
      }
      else {
         alert('Failed to add room ');
      };
    })

  }
  render() {
    return (
        <div>
      <h2>Add a room</h2>
      <form className="forcesize" onSubmit={this.onSubmit}>
        
		<br></br>
        Apartment Name : {this.state.apartment_name}<br/>
		<br></br>
        Room Name 
		<br></br>
        <label htmlFor="Room Name" ></label>   
        <input id="room_name_number" type="text" placeholder="Enter Room Name"onChange={this.handleChange} />
      
        <input className="button" type="submit" value="Submit" position = "center"/>
      </form>
        </div>
    );
	}
}
