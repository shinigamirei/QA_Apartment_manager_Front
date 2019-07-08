import React, { Component } from 'react';
import QATable from './Generics/qa-table.component';
import axios from 'axios';

export default class AvailabilityList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Headers: ['Apartment Name', 'Apartment Address', 'Apartment Region', 'Room Name', 'Current Occupancy', 'Next Occupancy', 'Availability'],
            Rows: [],
            databaseresponse: []
        };
    }

    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_GET_ROOM+'/apartment/cleaningAvailability')
            .then(response => {
                this.setState({ databaseresponse: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

        let headers = [{ 'header': 'Apartment Name', 'width': 250 }, { 'header': 'Apartment Address', 'width': 250 }, { 'header': 'Apartment Region', 'width': 250 },
            { 'header': 'Room Name', 'width': 200 }, { 'header': 'Current Occupancy', 'width': 250 }, { 'header': 'Next Occupancy', 'width': 250 }, { 'header': 'Availability', 'width': 200 }]

        let rows = []

        //Creates a row for each apartment Json
        this.state.databaseresponse.map(data => {
            
            let row = {
                'Apartment Name': data.apartment_name,
                'Apartment Address': data.apartment_address,
                'Apartment Region': data.apartment_region,
                'Room Name': data.room_name,
				'Current Occupancy': data.room_current_occupancy_end,
				'Next Occupancy': data.room_next_occupancy_start,
				'Availability': data.available_days
            }
            //Adds apartment row to Rows
            rows.push(row)
        })

        //This what you give the table component
        let tableData = { Headers: headers, Rows: rows }

        return (
            <div>
                <h2>
                    Current Room Availability
                </h2>
                <QATable data={tableData} />

            </div>
        );
    };
};
