import React from 'react';
import axios from 'axios';


export default class ApartmentDetail extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
        };

    }


    render() {
        let _aprtDetail = this.props.aprtDetail;

        let issues = [
            {
                "id":"565",
                "name": "dummy name of issue",
                "issue": "This is placeholder text for issue One."
            },
            {
                "id":"566",
                "name": "dummy name of issue",
                "issue": "This is placeholder text for issue Two."
            }
        ];

        let moreInfo = [
            {
                "id":"567",
                "name": "dummy name of information",
                "information": "This is placeholder text for first set of information."
            },
            {
                "id":"568",
                "name": "dummy name of information",
                "information": "This is placeholder text for second set of information."
            }
        ];



        return (
            <div>
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
