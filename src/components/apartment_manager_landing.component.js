import React from 'react';
import ApartmentList from "./apartment_list.component"
import RoomList from "./room_list.component"


export default class ApartmentLanding extends React.Component
{

    render()
    {

        return (
            <div>
                <ApartmentList/>
                <RoomList/>

            </div>
        );
    }
}