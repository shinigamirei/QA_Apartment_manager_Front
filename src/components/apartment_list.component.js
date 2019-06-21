import React, { Component } from 'react';
import QATable from './Generics/qa-table.component';
import axios from 'axios';

export default class ApartmentList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                Headers: ['Apartment Name', 'Apartment Address', 'Apartment Region', 'Apartment Rooms'],
                Rows: []
            },
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
        let json = this.state.data

        let databaseJson = [{ "_id": "5d08a0a945b6800f9066472d", "apartment_name": "Hell", "apartment_address": "6 6 6", "apartment_region": "Manchester", "apartment_rooms": [], "__v": 0 },
        { "_id": "5d08a21621ef1831c0ced8d1", "apartment_name": "Hed", "apartment_address": "7 6 6", "apartment_region": "Manchester", "apartment_rooms": [{ "room_occupancies": [], "_id": "5d08a23921ef1831c0ced8d2", "room_name_number": "111" }, { "room_occupancies": [], "_id": "5d08a31021ef1831c0ced8d3", "room_name_number": "112" }, { "room_occupancies": [], "_id": "5d08a31421ef1831c0ced8d4", "room_name_number": "113" }], "__v": 3 }]

        let headers = ['Apartment Name', 'Apartment Address', 'Apartment Region', 'Apartment Rooms']
        let rows = []

        //Creates a row for each apartment Json
        databaseJson.map(data => {
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
                'Apartment Region': data.apartment_region,
                'Apartment Rooms': roomString
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
