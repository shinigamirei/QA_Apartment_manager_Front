import React from "react";
import QAForm from "./form-component/qa-form.component";
import axios from 'axios';

export default class Example extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [{"FieldText": "Apartment Number", "Type": "text" , "UniqueID": "apartmentNumber"},
                   {"FieldText": "Apartment Address", "Type": "text" , "UniqueID": "apartmentAddress"},
                   {"FieldText": "Apartment Region", "Type": "select" , "UniqueID": "apartmentRegion", "Options":["Brighton","Leeds","London","Manchester"]},
                   {"FieldText": "Number of Rooms", "Type": "number" , "UniqueID": "apartmentNumber"}
                ]
        }
    }

    render() {

        let submitfunc = function(x){
                            console.log(x);
                            let apartment={
                                    "apartment_name":x['Apartment Number'],
                                    "apartment_address":x['Apartment Address'],
                                    "apartment_region":x['Apartment Region'],
                                    "apartment_rooms":x['Number of Rooms'],
                                    "room_occupancies":[]
                            }
                            console.log(apartment)
                            axios.post('http://' + process.env.REACT_APP_ROOM + '/apartment/create', apartment).then((response) => {
                                if (response.status === 200) {
                                    window.location.reload(true);
                                }
                                else {
                                    alert('Failed to get a proper respose from the database');
                                };
                            });
                        }

        let json = this.state.data

        return (
            <div>
                <QAForm data={json} submit={submitfunc}/>
            </div>
        );
    };
};
