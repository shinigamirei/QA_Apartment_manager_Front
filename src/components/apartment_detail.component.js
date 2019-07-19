import React from 'react';
import axios from 'axios';
import TextButton from './Generics/text-button.component';
import aprtmentImage from './apartment.jpg';
import AddOccupancy from './add_occupancy';


export default class ApartmentDetail extends React.Component {

    constructor(props) {
        super(props);
      
        this.state = {
			showForm_AssignTrainee : false
        };  
        this.handleButtonAddOccupany = this.handleButtonAddOccupany.bind(this);
        this.handleButtonCloseOccupany = this.handleButtonCloseOccupany.bind(this);

	}
	
    handleButtonAddOccupany(e) {
       this.setState({showForm_AssignTrainee: true});
    }
    handleButtonCloseOccupany(e) {
       this.setState({showForm_AssignTrainee: false});
    }
    render() {
        console.log(this.props.role)
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
        
        
                let issues = [
            {
                "id": "565",
                "name": "dummy name of issue",
                "issue": "This is placeholder text for issue One."
            },
            {
                "id": "566",
                "name": "dummy name of issue",
                "issue": "This is placeholder text for issue Two."
            }
        ];

        let moreInfo = [
            {
                "id": "567",
                "name": "dummy name of information",
                "information": "This is placeholder text for first set of information."
            },
            {
                "id": "568",
                "name": "dummy name of information",
                "information": "This is placeholder text for second set of information."
            }
        ];

        return (
            <div>

            <div>
                </div>
                <span style={{ float: "right" }}>
            	<TextButton float="right" id="AddOccupancy" onClick={this.handleButtonAddOccupany}>Add occupant</TextButton><br/>
				{this.state.showForm_AssignTrainee && 
					<div>
						<AddOccupancy float="right" _id={_aprtDetail["ID"]} apartment={_aprtDetail["Apartment Number"]}/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
						<TextButton float="right"  id="Close" onClick={this.handleButtonCloseOccupany}>Close</TextButton>
					</div>
				}
				</span>

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

<div>
                    <div><h2>Issues</h2></div>
                    <div>
                        <ul style={{ lineHeight: "15px" }}>
                            {issues
                                .map(
                                    _issues =>
                                        <li value={_issues} key={_issues}>
                                            <p style={{ fontSize: "large" }}>{_issues.issue}</p>
                                        </li>)}
                        </ul>
                    </div>
                </div>
                <hr />
                <div>
                    <div><h2>More information</h2></div>
                    <div>
                        <ul style={{ lineHeight: "15px" }}>
                            {moreInfo
                                .map(
                                    _moreInfo =>
                                        <li value={_moreInfo} key={_moreInfo}>
                                            <p style={{ fontSize: "large" }}>{_moreInfo.information}</p>
                                        </li>)}
                        </ul>
                    </div>



            </div>
            </div>
        );
    }
}
