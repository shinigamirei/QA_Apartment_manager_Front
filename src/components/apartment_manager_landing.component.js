import React from 'react';
import QATable from "./Generics/qa-table.component"
import ApartmentList from "./apartment_list.component"
import RoomList from "./room_list.component"
import AvailabilityList from "./availability_list.component"
import ByDateList from "./by_date_list.component"

export default class ApartmentLanding extends React.Component
{

    render()
    {

        return (
            <div>
                <ApartmentList>
                </ApartmentList>
                <RoomList>
                </RoomList>
		<ByDateList>
		</ByDateList>
            </div>
        );
    }
}
