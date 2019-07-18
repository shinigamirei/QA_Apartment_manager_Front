import React from 'react';
import axios from 'axios';


export default class ApartmentDetail extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            databaseresponse: []
        };
    }

    render() {
        let text = this.props.aprtDetail

        let myText = {
            "ID": "5d2857beb08369211e5cfa9f",
            "Region": "Brighton",
            "Apartment Number": "Demo apartment 1",
            "Apartment Address": "123 Example Street",
            "Availability": "3/3 available"
        }

        let occupiers = [
            {
                "f_name": "Ben",
                "l_name": "Benny",
                "phone_number": "07777777777",
                "start_date": "24/07/2019",
                "end_date": "25/07/2019"
            },
            {
                "f_name": "Sam",
                "l_name": "Sammy",
                "phone_number": "07777777777",
                "start_date": "26/07/2019",
                "end_date": "27/07/2019"
            },
            {
                "f_name": "Tom",
                "l_name": "Tommy",
                "phone_number": "07777777777",
                "start_date": "28/07/2019",
                "end_date": "28/07/2019"
            }

        ]

        return (

            <div>
                <div>
                    {JSON.stringify(text)}
                </div>

                <div>
                    <div><h2>Occupiers</h2></div>
                    <div>
                        <ul style={{ lineHeight: "15px" }}>
                            {occupiers
                                .map(
                                    occupiers =>
                                    <li value={occupiers} key={occupiers} style={{ listStyleType: "none", marginLeft: "-40px" }}>
                                    <span style={{ display: "inline-flex" }}>
                                        <p style={{ fontSize: "large" }}>
                                            {`${occupiers.f_name} ${occupiers.l_name}, `}
                                        </p>&nbsp;&nbsp;&nbsp;

                                    <p style={{ fontSize: "large" }}>
                                            <b> Phone Number:  </b> {occupiers.phone_number},
                                    </p>&nbsp;&nbsp;&nbsp;

                                    <p style={{ fontSize: "large" }}>
                                            <b> Dates of Occupancy:  </b> {occupiers.start_date} - {occupiers.end_date}
                                        </p>
                                    </span>
                                </li>)}
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}
