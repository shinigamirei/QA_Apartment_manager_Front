import React from 'react';
import QATable from './Generics/qa-table.component';
import QATableSorted from './Generics/qa-table-sortable.component';
import AddOccupancy from './add_occupancy';
import AddRoom from './add_room';
import axios from 'axios';
import DatePicker from 'react-date-picker';

export default class ApartmentList extends React.Component {



    constructor(props) {
        super(props);
        

        this.state = {
            Headers: ['Apartment Name','Apartment Address','Apartment Region', 'Apartment Rooms','Assign Trainee','Add Room' ],
            Rows: [],
            databaseresponse: [],
            showForm_AssignTrainee: false,
			showForm_AddRoom: false,
			form_id: null,
			form_apartment: null,
			form_rooms: [],
			date: new Date()
        };  
        this.handleButtonShow_AssignTrainee = this.handleButtonShow_AssignTrainee.bind(this);
        this.handleButtonShow_AddRoom = this.handleButtonShow_AddRoom.bind(this);


    }

    componentDidMount() {
		let y=this.state.date.getFullYear();
		let m=this.state.date.getMonth();
		let d=this.state.date.getDate();
        //axios.get('http://'+process.env.REACT_APP_GET_ROOM+'/apartment/getFromDate_Count/'+y+'/'+m+'/'+d)
        //    .then(response => {
        //        this.setState({ databaseresponse: response.data })
        //    })
        //    .catch(function (error) {
        //        console.log(error);
        //    })
		this.searchDate(y,m,d);
    }
	onChange = date => {
		if (date === null){
			date=new Date()
		}
		this.setState({ date })
		let y=date.getFullYear();
		let m=date.getMonth();
		let d=date.getDate();
		this.searchDate(y,m,d)
	}
	searchDate(year,month,day){
        axios.get('http://'+process.env.REACT_APP_GET_ROOM+'/apartment/getFromDate_Count/' + year + '/' + month + '/' + day)
           .then(response => {
			          this.setState({showForm_ChangeDate : false})
                this.setState({ databaseresponse: response.data })
           })
            .catch(function (error) {
                console.log(error);
           })
	}

      
      handleButtonShow_AssignTrainee(e) {
		let id=e.target.getAttribute('data-arg1');
		let apartname=e.target.getAttribute('data-arg2');
		let rooms=e.target.getAttribute('data-arg3');
		//let id=4
		//let apartname="hello"
        this.setState({showForm_AssignTrainee: false});
        this.setState({showForm_AssignTrainee: true});
        this.setState({showForm_AddRoom: false});
        this.setState({form_id: id});
        this.setState({form_apartment: apartname});
        this.setState({form_rooms: rooms});
        console.log(this.state.databaseresponse);
      }
      handleButtonShow_AddRoom(e) {
		let id=e.target.getAttribute('data-arg1');
		let apartname=e.target.getAttribute('data-arg2');
		//let id=4
		//let apartname="hello"
        this.setState({showForm_AssignTrainee: false});
        this.setState({showForm_AddRoom: false});
        this.setState({showForm_AddRoom: true});
        this.setState({form_id: id});
        this.setState({form_apartment: apartname});
        console.log(this.state.databaseresponse);
      }


       
    render() {
        const showForm = this.state.showForm;
        console.log(showForm);
        let headers = [ {'header': 'Region', 'width': 150}, { 'header': 'Apartment Name', 'width': 250 }, { 'header': 'Apartment Address', 'width': 300 }, 
            { 'header': 'Availability', 'width': 300 }]


        let rows = []

        //Creates a row for each apartment Json
        this.state.databaseresponse.map(data => {
			let _id = data._id
			let apartname= data.apartment_name
          //  let rooms = []
            //Gets all the room numbers in the apartment and adds to room array
         //   for (var room in data.apartment_rooms) {
         //       console.log(data.apartment_rooms[room].room_name_number)
         //       rooms.push(`${data.apartment_rooms[room].room_name_number}`)
         //   }
            //Takes room number array and converts to string
          //  let roomString = rooms.join()
            let row = {
                'Region': data.apartment_region,
                'Apartment Name': data.apartment_name,
                'Apartment Address': data.apartment_address,
                'Availability': data.room_count,

                //'Assign Trainee': <button className="actionBtn" onClick={this.handleButtonShow_AssignTrainee} id="ThisButton" data-arg1={data._id} data-arg2={data.apartment_name} data-arg3={rooms}>Assign</button>,
			    //'Add Room': <button className="actionBtn" onClick={this.handleButtonShow_AddRoom} id="AddRoomButton" data-arg1={data._id} data-arg2={data.apartment_name}>Add</button>

            }
            //Adds apartment row to Rows
            rows.push(row)
        })

        //This what you give the table component
        let tableData = { Headers: headers, Rows: rows }
               
//        if(this.state.showForm_AssignTrainee === true){
//                    return( 
//                        <div>
//                        <h2>
//                        Apartment listing<br/>	
//				
//				<br/>
//                    </h2>
//                    <QATable data={tableData}/>
//                    <AddOccupancy _id={this.state.form_id} apartment={this.state.form_apartment} rooms={this.state.form_rooms}/>
//
//                    </div>
//                    );
//                }
//		else if (this.state.showForm_AddRoom === true){
//                    return( 
//                        <div>
//                        <h2>
//                        Apartment listing<br/>
//                    </h2>
//                    <QATable data={tableData}/>
//                    <AddRoom _id={this.state.form_id} apartment={this.state.form_apartment} />
//
//                    </div>
//                    );
//                }
//        else {
        return (
            <div>
			<table width="100%" ><tr><td>
                  <h2>  
				  Apartment list
				  </h2></td>
					<td align="right">
					Search: <DatePicker
					onChange={this.onChange}
					value={this.state.date}
					/></td></tr></table>
					<br/>
                <QATableSorted data={tableData} sortColumn='Region'/>
             
            </div>
        )
	}
}
