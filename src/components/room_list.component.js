import React from "react";
import QATable from './Generics/qa-table.component';

export default class ApartmentList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                Headers: ['Apartment number', 'Room number', 'Button'],
                Rows: [{ 'Apartment number': '22', 'Room number': '1', 'Button': <button>Click Me!</button> },
                { 'Apartment number': '26', 'Room number': '1', 'Button': <button>No, Click Me!</button> }]
            }
        };
    }

    render() {

        let json = this.state.data

        return (
            <div>
                <h2>
                    Room list
                </h2>
                <QATable data={json} />
            </div>
        );
    };
};
