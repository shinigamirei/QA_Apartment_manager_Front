import React from 'react';
import axios from 'axios';
import TextButton from './Generics/text-button.component';
import aprtmentImage from './apartment.jpg';



export default class ApartmentDetail extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
        };
    }

    render() {
        let _aprtDetail = this.props.aprtDetail;

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
                    {JSON.stringify(_aprtDetail)}
                </div>
                
            <TextButton float="right">Book</TextButton>

                <h2>Apartment View</h2>

                <span style={{ display: "inline-flex" }}>

                    <img src={aprtmentImage} style={{ width: "400px", height: "267px" }}></img>
                    &nbsp;&nbsp;&nbsp;


                    <div>
                        <div><h3 align="center">{JSON.stringify(_aprtDetail["Apartment Number"]).replace(/\"/g, "")}</h3></div>
                        <div><h2 align="center">{JSON.stringify(_aprtDetail["Apartment Address"]).replace(/\"/g, "")}</h2></div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
                <h3 style={{ position: "relative", left: "42px", top: "45px" }}>{JSON.stringify(_aprtDetail.Availability).replace(/\"/g, "")}</h3>
                </span>
                <hr />
                  
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
