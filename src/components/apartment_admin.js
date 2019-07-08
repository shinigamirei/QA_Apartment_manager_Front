import React from "react";
import axios from 'axios';
import QATable from './Generics/qa-table.component';

export default class ApartmentAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choice: 0,
            _id: '',
            apartment_name: '',
            apartment_address: '',
            apartment_region: '',
            room_number: '1',
            apartments: '',
            headers: [{ 'header': 'Apartment Name', 'width': 200 }, { 'header': 'Apartment Address', 'width': 200 }, { 'header': 'Apartment Region', 'width': 200 },
            { 'header': 'Apartment Rooms', 'width': 200 }, { 'header': 'Action', 'width': 200 }],
            rows: [],
        };


        this.updateName = this.updateName.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.updateRegion = this.updateRegion.bind(this);
        this.updateRoomNumber = this.updateRoomNumber.bind(this);
        this.send = this.send.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);

        
    };

    componentDidMount() {
        axios.get('http://localhost:2303/apartment/getAll')
            .then(response => {
                this.setState({ apartments: response.data });
                this.state.apartments.map(data => {
                    let rooms = []
                    //Gets all the room numbers in the apartment and adds to room array
                    for (var room in data.apartment_rooms) {
                        rooms.push(data.apartment_rooms[room].room_name_number)
                    }
                    //Takes room number array and converts to string
                    let roomString = rooms.join();
                    let row = {
                        'Apartment Name': data.apartment_name,
                        'Apartment Address': data.apartment_address,
                        'Apartment Region': data.apartment_region,
                        'Apartment Rooms': roomString,
                        'Action': <div><button onClick={() => this.delete(data._id)}>Delete</button> 
                        <button onClick={() => this.setState({ choice: 3, _id: data._id, apartment_name: data.apartment_name, apartment_address: data.apartment_address, apartment_region: data.apartment_region })}>Update</button></div>
                    }
                    //Adds apartment row to Rows
                    this.state.rows.push(row);
                })
                    .catch(function (error) {
                        console.log(error);
                    });

            });
    };

    updateName(event) {
        this.setState({ apartment_name: event.target.value });
    };

    updateAddress(event) {
        this.setState({ apartment_address: event.target.value });
    };

    updateRegion(event) {
        this.setState({ apartment_region: event.target.value });
    };

    updateRoomNumber(event) {
        this.setState({ room_number: event.target.value });
    };

    send(event) {
        event.preventDefault();

        if (this.state.apartment_region === 'Manchester' || this.state.apartment_region === 'Brighton' || this.state.apartment_region === 'Leeds') {
            var apartment = {
                apartment_name: this.state.apartment_name,
                apartment_address: this.state.apartment_address,
                apartment_region: this.state.apartment_region,
            };

            axios.post('http://localhost:2302/apartment/create', apartment).then((response) => {
                if (response.status === 200) {
                    for (var i = 1; i <= parseInt(this.state.room_number); i++) {
                        axios.post('http://localhost:4000/apartment/addRoom', { '_id': response.data, 'room_name_number': i });
                    };
					window.location.reload(true);
                }
                else {
                    alert('Failed to get a proper respose from the database');
                };
            });
        }
        else {
            alert('Input a valid region');
        };
    };

    delete(event) {
        axios.delete('http://localhost:2302/apartment/delete/' + event).then((response) => {
            if (response.status === 200) {
                window.location.reload(true);
            }
            else {
                alert('Failed to delete');
            };
        });
    };

    update(event) {
        event.preventDefault();

        if (this.state.apartment_region === 'Manchester' || this.state.apartment_region === 'Brighton' || this.state.apartment_region === 'Leeds') {
            var apartment = {
                _id: this.state._id,
                apartment_name: this.state.apartment_name,
                apartment_address: this.state.apartment_address,
                apartment_region: this.state.apartment_region,
            };

            axios.put('http://localhost:2302/apartment/update', apartment).then((response) => {
                window.location.reload(true);
            });
        }
        else {
            alert('Fail');
        };
    };

    render() {
        if (this.state.choice === 1) {
            return (
                <div>
                    <h2>
                        Admin Page
                </h2>
                    <form className='createApartment' onSubmit={this.send}>
                        <h2>Apartment add form</h2>
                        <div>
                            Apartment name <br />
                            <input type='text' value={this.state.apartment_name} onChange={this.updateName} /> <br />
                            Apartment address <br />
                            <input type='text' value={this.state.apartment_address} onChange={this.updateAddress} /> <br />
                            Apartment region <br />
                            <select  onChange={this.updateRegion}>
							    <option disabled selected value> -- select a region -- </option>
								<option key='Brighton' value='Brighton'>Brighton</option>
								<option key='Leeds' value='Leeds'>Leeds</option>
								<option key='Manchester' value='Manchester'>Manchester</option>
							</select>
							<br />
                            
                            <input type='submit' onSubmit={this.send} />
                        </div>
                    </form>
                    <button onClick={() => this.setState({ choice: 0 })}>Back</button>
                </div>
            );
        }
        else if (this.state.choice === 2) {
            return (
                <div>
                    <h2>Apartment list</h2>
                    <button onClick={() => this.setState({ choice: 0 })}>Back</button>
                    <QATable data={{ 'Headers': this.state.headers, 'Rows': this.state.rows }} />
                </div>
            );
        }
        else if (this.state.choice === 3) {
            return (
                <div>
                    <h2>
                        Admin Page
                </h2>
                    <form className='createApartment' onSubmit={this.update}>
                        <h2>Apartment update form</h2>
                        <div>
                            Apartment name <br />
                            <input type='text' value={this.state.apartment_name} onChange={this.updateName} /> <br />
                            Apartment address <br />
                            <input type='text' value={this.state.apartment_address} onChange={this.updateAddress} /> <br />
                            Apartment region <br />
                            <input type='text' value={this.state.apartment_region} onChange={this.updateRegion} /> <br />
                            <input type='submit' onSubmit={this.update} />
                        </div>
                    </form>
                    <button onClick={() => this.setState({ choice: 0 })}>Back</button>
                </div>
            );
        }
        else {
            return (
                <div>
                    <button onClick={() => this.setState({ choice: 1 })}>Create</button>
                    <button onClick={() => this.setState({ choice: 2 })}>Delete/Update</button>
                </div>
            );
        };
    };
};
