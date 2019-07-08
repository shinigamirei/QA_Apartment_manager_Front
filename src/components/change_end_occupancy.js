import React, { Component } from 'react';
import axios from 'axios';
const API ='http://localhost:4000/apartment/changeEndOccupancy/';

export default class ChangeEndOcc extends Component {

  constructor(props) {
    super(props);
    this.state = {
        _id: this.props._id,
        apartment_name: this.props.apartment,
        room_name_number: this.props.room_name,
		occ_id: this.props.occ_id,
		
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
    axios.post('http://'+process.env.REACT_APP_ADD_OCCUPY+'/apartment/changeEndOccupancy/', {
        _id: this.state._id,
        room_name_number: this.state.room_name_number,
		occ_id: this.state.occ_id,
        eyear: new Date(this.state.occupancy_end).getFullYear(),
        emonth: new Date(this.state.occupancy_end).getMonth(),
        eday: new Date(this.state.occupancy_end).getDate(),

    }).then(res => {
      console.log(res);
      console.log(res.data);
      if (res.status === 200) {
        window.location.reload(true);
      }
      else {
         alert('Failed to change end occupancy ');
      };
    })

  }
  render() {
    return (
        <div>
      <h2>Change End Date</h2>
      <form className="forcesize" onSubmit={this.onSubmit}>
        
		<br></br>
        Apartment Name : {this.state.apartment_name}<br/>
		<br></br>
        Room Name : {this.state.room_name_number}
		<br></br>
		Occupacy ID :  {this.state.occ_id}
        <br></br>
        End Date
        <br></br>
        <label htmlFor="End Date"></label>
        <input id="occupancy_end" type="date" onChange={this.handleChange} />
      
        <input className="button" type="submit" value="Submit" position = "center"/>
      </form>
        </div>
    );
	}
}