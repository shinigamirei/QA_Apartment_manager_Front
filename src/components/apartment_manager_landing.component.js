import React from 'react';
import QATable from "./Generics/qa-table.component"
import ApartmentList from "./apartment_list.component"

export default class ApartmentLanding extends React.Component
{

    render()
    {

        return (
            <div>
                <ApartmentList className="ffs">
                    </ApartmentList>

            </div>
        );
    }
}