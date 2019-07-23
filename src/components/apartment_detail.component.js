import React from 'react';
import axios from 'axios';
import TextButton from './Generics/text-button.component';
import AddOccupancy from './add_occupancy';
import logo from './container-component/QA_logo.png';
import Overlay from './Generics/overlay.component';
import './css/QAOverlay.css'
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';



export default class ApartmentDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showForm_AssignTrainee: false,
            showModal: false,
			      defImage: "QA_logo.png",
            occupiers: [],
        };
        this.handleButtonAddOccupany = this.handleButtonAddOccupany.bind(this);
        this.handleButtonCloseOccupany = this.handleButtonCloseOccupany.bind(this);

    }
    componentDidMount(){
        axios.get('http://'+process.env.REACT_APP_ADD_OCCUPY+'/apartment/getOccupiers/'+this.props.aprtDetail.ID)
        .then(response => {
            this.setState({occupiers: response.data})
        })

        // Returns prompt on refresh
        window.onbeforeunload = function() {
            return "";
            }
    }

    componentWillUnmount() {
        // Refresh prompt is overridden when component is unmounted 
        window.onbeforeunload = function() {
            return;
            }
    }

    handleButtonAddOccupany(e) {
        window.onbeforeunload = function() {
            return;
            }
        this.setState({ showModal: true });
    }
    handleButtonCloseOccupany(e) {
        this.setState({ showModal: false });
    }
	
	getImage = (url) => {
		return require(url)
    }
	
    render() {
        console.log(this.props.role)
        let _aprtDetail = this.props.aprtDetail;
        let occupiers = this.state.occupiers;

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

        const overlayContent = <AddOccupancy float="right" _id={_aprtDetail["ID"]} apartment={_aprtDetail["Apartment Number"]} />
        return (
            <div>

                <span style={{ display: "inline-flex" }}>
				
                <div>
				{(JSON.stringify(_aprtDetail["Apartment Image"]) != null) ? (
					(JSON.stringify(_aprtDetail["Apartment Image"]).replace(/\"/g, "") != "" ) ? (
						<img src={require('./image/'+JSON.stringify(_aprtDetail["Apartment Image"]).replace(/\"/g, ""))} style={{ width: "250px", height: "159px" }}></img>
					):(
						<img src={require('./image/'+this.state.defImage)} style={{ width: "250px", height: "159px" }}></img>
					)
				):(
					<img src={require('./image/'+this.state.defImage)} style={{ width: "250px", height: "159px" }}></img>
				)}

                </div>
                &nbsp;&nbsp;&nbsp;


                    <div>
                        <div><h3 align="center">{JSON.stringify(_aprtDetail["Apartment Number"]).replace(/\"/g, "")}</h3></div>
                        <div><h2 align="center">{JSON.stringify(_aprtDetail["Apartment Address"])
                        .replace(/\"/g, "")
                        .split(',')
                        .map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                            })}
                            </h2>
                    </div>
                    </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <h3 style={{ position: "relative", left: "42px", top: "45px" }}>{JSON.stringify(_aprtDetail.Availability).replace(/\"/g, "")}</h3>
                </span>
                <hr />
                <span style={{ float: "right" }}>
                    <TextButton float="right" id="AddOccupancy" onClick={this.handleButtonAddOccupany}>Add Occupant</TextButton><br />
                    {this.state.showModal &&
                        <div>
                            <Modal
                                show={this.state.showModal}
                                onHide={this.handleButtonCloseOccupany}
                                backdrop={true}
                                backdropClassName="backdrop-style"
                                dialogClassName="modal-style"
                                aria-labelledby="modal-label"
                            >

                            <Modal.Header >
                                <h4 id="modal-label" className="overlay-title">Add Occupant</h4>
                            </Modal.Header>

                            <Modal.Body>
                                {overlayContent}
                            </Modal.Body>

                            <Modal.Footer>                <button
                                className='close-btn'
                                onClick={this.handleButtonCloseOccupany}
                            >Close</button><br></br></Modal.Footer>
                            </Modal>
                            {/* Old form below added in Modal above */}
                            {/* <AddOccupancy float="right" _id={_aprtDetail["ID"]} apartment={_aprtDetail["Apartment Number"]} /> */}
                            {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
                            {/* <TextButton float="right" id="Close" onClick={this.handleButtonCloseOccupany}>Close</TextButton> */}
                        </div>
                    }
                </span>

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
                                                    <b> Dates of Occupancy:  </b> {moment(occupiers.start_date).format('DD-MM-YYYY')} to {moment(occupiers.end_date).format('DD-MM-YYYY')}
                                                </p>
                                            </span>
                                        </li>)}
                        </ul>
                    </div>
                </div>
                <hr />

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
