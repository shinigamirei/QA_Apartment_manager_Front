import React from "react";
import axios from 'axios';
import QATable from './Generics/qa-table.component';
import QATableSorted from './Generics/qa-table-sortable.component';

export default class ApartmentAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choice: 0,
            _id: '',
            apartment_name: '',
            apartment_address: '',
            apartment_region: '',
            apartment_rooms: '',
            apartments: '',
            headers: [ {'header': 'Region', 'width': 150}, { 'header': 'Apartment Name', 'width': 250 }, { 'header': 'Apartment Address', 'width': 300 }, 
            { 'header': 'Number of rooms', 'width': 300 }, { 'header': 'Action', 'width': 200 }],
            rows: []
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
        axios.get('http://'+process.env.REACT_APP_GET_ALL+'/apartment/getAll')
            .then(response => {
                this.setState({ apartments: response.data });
                this.state.apartments.map(data => {
                    
                    let row = {
						'Region': data.apartment_region,
						'Apartment Name': data.apartment_name,
						'Apartment Address': data.apartment_address,
						'Number of rooms': data.apartment_rooms,
                        'Action': <div><button onClick={() => this.delete(data._id)}>Delete</button> 
                        <button onClick={() => this.setState({ choice: 3, _id: data._id, apartment_name: data.apartment_name, apartment_address: data.apartment_address, apartment_region: data.apartment_region,apartment_rooms: data.apartment_rooms })}>Update</button></div>
                    }
                    //Adds apartment row to Rows
                    this.state.rows.push(row);
                })
            })
			.catch(function (error) {
                        console.log(error);
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
        this.setState({ apartment_rooms: event.target.value });
    };

    send(event) {
        event.preventDefault();

        if (this.state.apartment_region === 'Manchester' || this.state.apartment_region === 'Brighton' || this.state.apartment_region === 'Leeds') {
            var apartment = {
                apartment_name: this.state.apartment_name,
                apartment_address: this.state.apartment_address,
                apartment_region: this.state.apartment_region,
				apartment_rooms: this.state.apartment_rooms
            };

            axios.post('http://'+process.env.REACT_APP_ROOM+'/apartment/create', apartment).then((response) => {
                if (response.status === 200) {
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
				apartment_rooms: this.state.apartment_rooms
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
                            Number of rooms <br />
                            <input type='text' value={this.state.apartment_rooms} onChange={this.updateRoomNumber} /> <br />
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
                    <QATableSorted data={{ 'Headers': this.state.headers, 'Rows': this.state.rows }} sortColumn='Region'/>
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
							 <select value={this.state.apartment_region} onChange={this.updateRegion}>
								<option key='Brighton' value='Brighton'>Brighton</option>
								<option key='Leeds' value='Leeds'>Leeds</option>
								<option key='Manchester' value='Manchester'>Manchester</option>
							 </select>
							 <br />
                            Number of rooms <br />
                            <input type='text' value={this.state.apartment_rooms} onChange={this.updateRoomNumber} /> <br />
							<br />
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
