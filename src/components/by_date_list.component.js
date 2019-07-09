import React, { Component } from 'react';
import QATable from './Generics/qa-table.component';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import ChangeEndOcc from './change_end_occupancy';

export default class ByDateList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Headers: ['Apartment Name', 'Apartment Address', 'Apartment Region', 'Room Name', 'Trainee ID', 'Occupancy Start', 'Occupancy End', 'Change End Date'],
            Rows: [],
            databaseresponse: [],
			      date: new Date(),
            showForm_ChangeDate: false,
			      form_id: null,
			      form_apartment: null,
			      form_room_name: null,
			      form_occ_id: null,        
        };
		
		this.handleButtonShow_ChangeEnd = this.handleButtonShow_ChangeEnd.bind(this);

    }


    componentDidMount() {
			let y=this.state.date.getFullYear();
			let m=this.state.date.getMonth();
			let d=this.state.date.getDate();
			this.searchDate(y,m,d)
		}

	onChange = date => {
		if (date === null){
			date=new Date()
		}
		this.setState({ date })
		let y=date.getFullYear();
		let m=date.getMonth();
		let d=date.getDate();
		this.searchDate(y,m,d)
	}
	searchDate(year,month,day){
        axios.get('http://'+process.env.REACT_APP_GET_OCCUPANCY+'/apartment/getFromDate/' + year + '/' + month + '/' + day)
           .then(response => {
			          this.setState({showForm_ChangeDate : false})
                this.setState({ databaseresponse: response.data })
           })
            .catch(function (error) {
                console.log(error);
           })
	}
	
	   handleButtonShow_ChangeEnd(e) {
		    let id=e.target.getAttribute('data-arg1');
		    let apartname=e.target.getAttribute('data-arg2');
		    let room_name=e.target.getAttribute('data-arg3');
		    let occ_id=e.target.getAttribute('data-arg4');
		//let id=4
		//let apartname="hello"
        this.setState({showForm_ChangeDate: true});
        this.setState({form_id: id});
        this.setState({form_apartment: apartname});
        this.setState({form_room_name: room_name});
        this.setState({form_occ_id: occ_id});
        console.log(this.state.databaseresponse);
      }

	
    render() {
		
        let headers = [{ 'header': 'Apartment Name', 'width': 250 }, { 'header': 'Apartment Address', 'width': 250 }, { 'header': 'Apartment Region', 'width': 250 },
            { 'header': 'Room Name', 'width': 250 }, { 'header': 'Trainee ID', 'width': 250 }, { 'header': 'Occupancy Start', 'width': 250 }, { 'header': 'Occupancy End', 'width': 250 }, { 'header': 'Change End Date', 'width': 200 }]

        let rows = []

        //Creates a row for each apartment Json
        this.state.databaseresponse.map(data => {
            
            let row = {
                'Apartment Name': data.apartment_name,
                'Apartment Address': data.apartment_address,
                'Apartment Region': data.apartment_region,
                'Room Name': data.room_name,
				'Trainee ID': data.trainee_id,
				'Occupancy Start': data.occupancy_start,
				'Occupancy End': data.occupancy_end,
				'Change End Date': <button className="actionBtn" onClick={this.handleButtonShow_ChangeEnd} id="ThisButton" data-arg1={data._id} data-arg2={data.apartment_name} data-arg3={data.room_name} data-arg4={data.occ_id}>Change</button>
            }
            //Adds apartment row to Rows
            rows.push(row)
        })

        //This what you give the table component
        let tableData = { Headers: headers, Rows: rows }

		if(this.state.showForm_ChangeDate === true){
			return (

				<div>
				<DatePicker
					onChange={this.onChange}
					value={this.state.date}
				/>
					<h2>
						Room Occupancies
					</h2>
					<QATable data={tableData} />
					<ChangeEndOcc _id={this.state.form_id} apartment={this.state.form_apartment} room_name={this.state.form_room_name} occ_id={this.state.form_occ_id} />
				</div>
			);
		}
		else{
			return (
				<div>
				<DatePicker
					onChange={this.onChange}
					value={this.state.date}
				/>
					<h2>
						Room Occupancies
					</h2>
					<QATable data={tableData} />
				</div>
			);
		}
    };
};
