import React, { Component } from 'react';
import QATable from './Generics/qa-table.component';
import axios from 'axios';

export default class RoomList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Rows: [],
            databaseresponse: []
        };
    }

    componentDidMount() {
        axios.get('http://'+process.env.REACT_APP_ADD_OCCUPY+'/apartment/getAll')
            .then(response => {
                this.setState({ databaseresponse: response.data })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {

        let headers = [{ 'header': 'Room Number', 'width': 400 }, { 'header': 'Room Occupancies', 'width': 400 },
        { 'header': 'Room Availability', 'width': 400 }, { 'header': 'Assign Trainee', 'width': 200 }]
        let rows = []

        //Creates a row for each apartment Json
        this.state.databaseresponse.map(data => {
            //Gets all the room numbers in the apartment and adds to room array
            for (var room in data.apartment_rooms) {
               

                let row = {
                    'Room Number': data.apartment_rooms[room].room_name_number,
                    'Room Occupancies': data.apartment_rooms[room].room_occupancies,
                    'Room Availability': "available",
                    'Assign Trainee': <button>Assign</button>
                }
                //Adds apartment row to Rows
                rows.push(row)
            }
        })

        //This what you give the table component
        let tableData = { Headers: headers, Rows: rows }

        return (
            <div>
                <h2>
                    Room list
                </h2>
                <QATable data={tableData} />

            </div>
        );
    };
};
