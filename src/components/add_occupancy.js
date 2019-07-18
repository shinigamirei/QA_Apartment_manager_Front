import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import TextButton from './Generics/text-button.component';
var moment = require('moment');
const API ='http://'+process.env.REACT_APP_ADD_OCCUPY+'/apartment/addOccupancy/';

export default class AddOccupancy extends Component {

  constructor(props) {
    super(props);
    this.state = {
        _id: this.props._id,
        apartment_name: this.props.apartment,
        trainee_id: "def",
        occupancy_start: new Date(),
        occupancy_end: new Date(),
		
		trainees: [{"_id":"Person1",trainee_fname:"Michael",trainee_lname:"Wright"},{"_id":"Person2",trainee_fname:"Rob",trainee_lname:"Anderson"},{"_id":"Person3",trainee_fname:"Lisa",trainee_lname:"Gulliver"},{"_id":"Person4",trainee_fname:"James",trainee_lname:"Price"}]
    }
	
  }

  
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }  
	onChangeSD = date => {
		if (date === null){
			date=new Date()
		}
		if (date > this.state.endDate){
			this.setState({ occupancy_start: date, occupancy_end: date })
		}else{
			this.setState({ occupancy_start: date })
		}
	}
	onChangeED = endDate => {
		if (endDate === null){
			endDate=new Date()
		}
		this.setState({ occupancy_end: endDate });

	}  
  onSubmit = (event) => {
      
    event.preventDefault();
	if (this.state.trainee_id==='def'){
		alert("No trainee selected. Please ensure a trainee is selected.")
		return;
	}
	if (moment(this.state.occupancy_start).isSame(this.state.occupancy_end)){
		alert("A booking must be longer than 0 days.")
		return;
	}
   // let roomNum == 0;
    axios.post('http://'+process.env.REACT_APP_ADD_OCCUPY+'/apartment/addOccupancy/', {
        _id: this.state._id,
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
      if (res.status === 200) {
        window.location.reload(true);
      }
      else {
         alert('The apartment is not available for the dates selected.');
      };
    })

  }
  render() {
    return (
        <div style={this.props.divStyles? this.props.divStyles: { display: 'inline-flex', float: this.props.float }}>
      <form className="forcesize" onSubmit={this.onSubmit}>
        
        Trainee
        <br></br>
        <label htmlFor="Trainee" ></label>
        <select id="trainee_id" onChange={this.handleChange}>
			<option disabled selected value> -- select a trainee -- </option>
			{this.state.trainees.map(trainee =>{
				return <option value={trainee._id}>{trainee.trainee_fname} {trainee.trainee_lname}</option>
			})}
		</select>
        <br></br>
        Start Date
        <br></br>
        <label htmlFor="Start Date"></label>
		<DatePicker
			onChange={this.onChangeSD}
			selected={this.state.occupancy_start}
			selectsStart
			startDate={this.state.occupancy_start}
			endDate={this.state.occupany_end}
			value={this.state.occupancy_start}
		/>
        <br></br>
        End Date
        <br></br>
        <label htmlFor="End Date"></label>
		<DatePicker
			onChange={this.onChangeED}
			selected={this.state.occupancy_end}
			selectsEnd
			startDate={this.state.occupancy_start}
			endDate={this.state.occupancy_end}
			minDate={this.state.occupancy_start}
			value={this.state.occupancy_end}
		/>
        <br></br>    
        <TextButton type="submit" value="Submit" position = "center">Submit</TextButton>
      </form>
        </div>
    );
	}
}