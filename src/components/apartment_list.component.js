import React, { Component } from 'react';
import QATable from './Generics/qa-table.component';
import axios from 'axios';

export default class ApartmentList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Headers: ['Apartment Name','Apartment Address','Apartment Region', 'Apartment Rooms','Assign Trainee' ],
            Rows: [],
            databaseresponse: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/apartment/getAll')
            .then(response => {
                this.setState({ databaseresponse: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

        let headers = [{ 'header': 'Apartment Name', 'width': 250 }, { 'header': 'Apartment Address', 'width': 300 }, {
            'header': 'Region', 'width': 150},
            { 'header': 'Apartment Rooms', 'width': 300 }, { 'header': 'Current Occupancy', 'width': 200 }, { 'header': 'Next Occupancy', 'width': 200 }, { 'header': 'Availability', 'width': 200 }, { 'header': 'Assign Trainee', 'width': 200 }]
        let rows = []

        //Creates a row for each apartment Json
        this.state.databaseresponse.map(data => {
            let rooms = []
            //Gets all the room numbers in the apartment and adds to room array
            for (var room in data.apartment_rooms) {
                console.log(data.apartment_rooms[room].room_name_number)
                rooms.push(data.apartment_rooms[room].room_name_number)
            }
            //Takes room number array and converts to string
            let roomString = rooms.join()
            let row = {
                'Apartment Name': data.apartment_name,
                'Apartment Address': data.apartment_address,
                'Region': data.apartment_region,
                'Apartment Rooms': roomString,
                'Current Occupancy': data.room_current_occupancy_end,
                'Next Occupancy': data.room_next_occupancy_start,
                'Availability': data.available_days,
                'Assign Trainee': <button>Assign</button>
            }
            //Adds apartment row to Rows
            rows.push(row)
        })

        //This what you give the table component
        let tableData = { Headers: headers, Rows: rows }

        return (
            <div>
                <h2>
                    Apartment list
                </h2>
                <QATable data={tableData} />

            </div>
        );
    };
};
