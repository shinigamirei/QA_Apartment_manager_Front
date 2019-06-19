import React from "react";
import QATable from './Generics/qa-table.component';

export default class ApartmentList extends React.Component {

    constructor(props) {
        super(props);
            
        this.state = {
            data: {
                    Headers: ['Apartment Building', 'Apartment number', 'Button'],
                Rows: [{ 'Apartment Building': 'John', 'Apartment number': '22', 'Button': <button>Click Me!</button>},
                    { 'Apartment Building': 'Jane', 'Apartment number': '26', 'Button': <button>No, Click Me!</button>}]
                }
        };
    }
    
    render() {

        let json= this.state.data

        return (
            <div>
                <h2>
                Apartment list
                </h2>
                <QATable data={json}/>
            </div>
        );
    };
};
