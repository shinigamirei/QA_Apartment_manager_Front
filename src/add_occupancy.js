import React, { Component } from 'react';

import axios from 'axios';
const API ='http://localhost:4000/apartment/addOccupancy/';

export default class AddOccupancy extends Component {

  constructor() {
    super();
    this.state = {
        _id: "null",
        room_name_number: "null",
        trainee_id: "def",
        startDate: "",
        endDate: ""
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
        _id: "5d1089353052d33304cbdd7f",
        room_name_number: "115",
        trainee_id: this.state.trainee_id,
        occupancy_start: this.state.occupancy_start,
        occupancy_end: this.state.occupancy_end,

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
        
        Apartment Name <br></br>
        <label htmlFor="Apartment Name" ></label>   
        <input readOnly placeholder="Apartment" defaultValue={this.props.apartment_name} />
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