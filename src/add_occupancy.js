import React, { Component } from 'react';
import axios from 'axios';
const API ='http://localhost:4000/apartment/addOccupancy/';

export default class AddOccupancy extends Component {

  constructor(props) {
    super(props);
    this.state = {
        _id: this.props._id,
        apartment_name: this.props.apartment,
		rooms: this.props.rooms.split(","),
        room_name_number: "null",
        trainee_id: "def",
        occupancy_start: new Date(),
        occupancy_end: new Date(),
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
    axios.post(API, {
        _id: this.state._id,
        room_name_number: this.state.room_name_number,
        trainee_id: this.state.trainee_id,
        syear: new Date(this.state.occupancy_start).getFullYear(),
        smonth: new Date(this.state.occupancy_start).getMonth(),
        sday: new Date(this.state.occupancy_start).getDate(),
        eyear: new Date(this.state.occupancy_end).getFullYear(),
        emonth: new Date(this.state.occupancy_end).getMonth(),
        eday: new Date(this.state.occupancy_end).getDate(),

    }).then(res => {
      console.log(res);
      console.log(res.data);
    })

  }
  render() {
    return (
        <div>
      <h2>Assign a Trainee</h2>
      <form className="forcesize" onSubmit={this.onSubmit}>
        
		<br></br>
        Apartment Name : {this.state.apartment_name}<br/>
		<br></br>
        Room Name 
		<br></br>
        <label htmlFor="Room Name" ></label>   
		<select id="room_name_number" onChange={this.handleChange}>
			{this.state.rooms.map(room =>{
				return <option key={room}>{room}</option>
			})}
		</select>
		<br></br>
        Trainee ID
        <br></br>
        <label htmlFor="Trainee ID" ></label>
        <input id="trainee_id" type="text" placeholder="Enter Trainee ID"onChange={this.handleChange} />
        <br></br>
        Start Date
        <br></br>
        <label htmlFor="Start Date"></label>
        <input id="occupancy_start" type="date" onChange={this.handleChange} />
        <br></br>
        End Date
        <br></br>
        <label htmlFor="End Date"></label>
        <input id="occupancy_end" type="date" onChange={this.handleChange} />
        <br></br>    
        <input className="button" type="submit" value="Submit" position = "center"/>
      </form>
        </div>
    );
	}
}