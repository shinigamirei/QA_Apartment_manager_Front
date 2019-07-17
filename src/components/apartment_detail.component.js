import React from 'react';
import axios from 'axios';


export default class ApartmentDetail extends React.Component
{

    constructor(props) {
        super(props);
        

        this.state = {
        };  
  
	}


    render()
    {
        let text = this.props.aprtDetail

        

        return (
            <div>
                {JSON.stringify(text)}
            </div>
        );
    }
}
