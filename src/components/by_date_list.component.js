import React, { Component } from 'react';
import QATable from './Generics/qa-table.component';
import axios from 'axios';
import DatePicker from 'react-date-picker';

export default class ByDateList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Headers: ['Apartment Name', 'Apartment Address', 'Apartment Region', 'Room Name', 'Trainee ID', 'Occupancy Start', 'Occupancy End'],
            Rows: [],
            databaseresponse: [],
			date: new Date(),
        };
    }


    componentDidMount() {
			let y=this.state.date.getFullYear();
			let m=this.state.date.getMonth();
			let d=this.state.date.getDate();
			this.searchDate(y,m,d)
		}

	onChange = date => {
		this.setState({ date })
		let y=date.getFullYear();
		let m=date.getMonth();
		let d=date.getDate();
		this.searchDate(y,m,d)
	}
	searchDate(year,month,day){
        axios.get('http://localhost:4000/apartment/getFromDate/' + year + '/' + month + '/' + day)
           .then(response => {
                this.setState({ databaseresponse: response.data })
           })
            .catch(function (error) {
                console.log(error);
           })
	}
    render() {
		
        let headers = [{ 'header': 'Apartment Name', 'width': 250 }, { 'header': 'Apartment Address', 'width': 250 }, { 'header': 'Apartment Region', 'width': 250 },
            { 'header': 'Room Name', 'width': 250 }, { 'header': 'Trainee ID', 'width': 250 }, { 'header': 'Occupancy Start', 'width': 250 }, { 'header': 'Occupancy End', 'width': 250 }]
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
				'Occupancy End': data.occupancy_end
            }
            //Adds apartment row to Rows
            rows.push(row)
        })

        //This what you give the table component
        let tableData = { Headers: headers, Rows: rows }

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
    };
};
