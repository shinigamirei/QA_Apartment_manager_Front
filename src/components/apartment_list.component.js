import React from 'react';
import QATable from './Generics/qa-table.component';
import QATableSorted from './Generics/qa-table-sortable.component';
import TextButton from './Generics/text-button.component';
import TextButtonArg from './Generics/text-button-arg.component';
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
			showTable: false,
			form_id: null,
			form_apartment: null,
			form_rooms: [],
			date: new Date(),
			region: 'All',
			endDate: new Date()
        };  
        this.handleButtonShow_AssignTrainee = this.handleButtonShow_AssignTrainee.bind(this);
        this.handleButtonShow_AddRoom = this.handleButtonShow_AddRoom.bind(this);
        this.updateRegion = this.updateRegion.bind(this);
        this.handleButtonRegionChange = this.handleButtonRegionChange.bind(this);

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
		if (this.state.region == 'All'){
			this.searchDate(y,m,d)
		}else{
			let r=this.state.region;
			this.searchDateRegion(y,m,d,r)
		}
	}
	onChangeED = endDate => {
		if (endDate === null){
			endDate=new Date()
		}
		this.setState({ endDate })
//		let y=date.getFullYear();
//		let m=date.getMonth();
//		let d=date.getDate();
//		if (this.state.region == 'All'){
//			this.searchDate(y,m,d)
//		}else{
//			let r=this.state.region;
//			this.searchDateRegion(y,m,d,r)
//		}
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
	searchDateRegion(year,month,day,region){
        axios.get('http://'+process.env.REACT_APP_GET_ROOM+'/apartment/getFromDate_Region/' + year + '/' + month + '/' + day + '/' + region)
           .then(response => {
			          this.setState({showForm_ChangeDate : false})
                this.setState({ databaseresponse: response.data })
           })
            .catch(function (error) {
                console.log(error);
           })
	}
    updateRegion(event) {
        this.setState({ region: event.target.value });
		let r=event.target.value;
		let date=this.state.date;
		let y=date.getFullYear();
		let m=date.getMonth();
		let d=date.getDate();
		if (r == 'All'){
			this.searchDate(y,m,d)
		}else{
			
			this.searchDateRegion(y,m,d,r)
		}
    };
    handleButtonRegionChange(e) {
		let r=e.target.getAttribute('data-arg1');
		//let id=4
		//let apartname="hello"
        this.setState({region: r});
		let date=this.state.date;
		let y=date.getFullYear();
		let m=date.getMonth();
		let d=date.getDate();
		if (r == 'All'){
			this.searchDate(y,m,d)
		}else{
			
			this.searchDateRegion(y,m,d,r)
		}
		this.setState({showTable: true});
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
        let headers = [ {'header': 'Region', 'width': 100}, { 'header': 'Apartment Name', 'width': 200 }, { 'header': 'Apartment Address', 'width': 300 }, 
            { 'header': 'Availability', 'width': 150 }]


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

		if(this.state.showTable===false){
			return (
				<div>
				<div align="center">
				<table><tr><td align="center">
				<TextButtonArg id="RegionBrighton" onClick={this.handleButtonRegionChange} dataarg1="Brighton" text="Brighton" /><
				/td><td align="center">
				<TextButtonArg id="RegionLeeds" onClick={this.handleButtonRegionChange}dataarg1="Leeds"  text="Leeds" />
				</td></tr><tr><td align="center">
				<TextButtonArg id="RegionLondon" onClick={this.handleButtonRegionChange}dataarg1="London"  text="London" />
				</td><td align="center">
				<TextButtonArg id="RegionManchester" onClick={this.handleButtonRegionChange} dataarg1="Manchester"  text="Manchester" />
				</td></tr></table>
				</div>
				</div>
			)
		}else{	
			return (
			<div>
				<table width="100%" >
				<tr><td>
					<h2>  
					Apartment list: {this.state.region}
					</h2></td>
						<td align="center">
						From: <DatePicker
						onChange={this.onChange}
						selected={this.state.date}
						selectsStart
						startDate={this.state.date}
						endDate={this.state.endDate}
						value={this.state.date}
						/> To: <DatePicker
						onChange={this.onChangeED}
						selected={this.state.endDate}
						selectsEnd
						startDate={this.state.date}
						endDate={this.state.endDate}
						minDate={this.state.date}
						value={this.state.endDate}
						/></td>
						{<td align="right">
						Region: <select value={this.state.region} onChange={this.updateRegion}>
									<option key='All' value='All'>Show all</option>
									<option key='Brighton' value='Brighton'>Brighton</option>
									<option key='Leeds' value='Leeds'>Leeds</option>
									<option key='London' value='London'>London</option>
									<option key='Manchester' value='Manchester'>Manchester</option>
								</select>
						</td>}
						</tr></table>
						<br/>
					<QATableSorted data={tableData} sortColumn='Region'/>
					
					<div align="center"><TextButton align="center" id="GoBack" onClick={() => this.setState({ showTable: false })} text="Go Back" /></div>
	
				</div>
			)
		}
	}
}
