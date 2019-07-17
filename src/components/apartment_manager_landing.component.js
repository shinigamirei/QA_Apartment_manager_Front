import React from 'react';
import ApartmentList from "./apartment_list.component"
import RoomList from "./room_list.component"
 import AvailabilityList from "./availability_list.component"
 import ByDateList from "./by_date_list.component"
 import QATable from "./Generics/qa-table.component"
import ApartmentAdmin from "./apartment_admin"
import ApartmentDetail from "./apartment_detail.component"

export default class ApartmentLanding extends React.Component
{

    changeContent = event => {
        this.props.content(event)
    };

    render()
    {

        

        return (
            <div>
                {/* <ApartmentAdmin/> */}
                <ApartmentList content = {this.changeContent}/>
            </div>
        );
    }
}
