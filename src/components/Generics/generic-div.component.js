import React from "react";
import QATable from './qa-table.component';

export default class GenericDiv extends React.Component {

    constructor(props) {
        super(props);
            
        this.state = {
            data: {
                    Headers: ['Name', 'Age', 'Button'],
                    Rows: [{'Name': 'John', 'Age': '22', 'Button': <button>Click Me!</button>},
                            {'Name': 'Jane', 'Age': '26', 'Button': <button>No, Click Me!</button>}]
                }
        };
    }
    
    render() {

        let json= this.state.data

        return (
            <div>
                <h2>
                QA Concourse-Table Demo
                </h2>
                <button onClick={()=>{json.Rows=[]; this.setState({data: json})}}>Clear</button>
                <QATable data={json}/>
            </div>
        );
    };
};
