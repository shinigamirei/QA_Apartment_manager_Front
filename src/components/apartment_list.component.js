import React from 'react';
import QATable from './Generics/qa-table.component';
import QATableSorted from './Generics/qa-table-sortable.component';
import TextButton from './Generics/text-button.component';
import AddOccupancy from './add_occupancy';
import AddRoom from './add_room';
import axios from 'axios';
import DatePicker from 'react-date-picker';
import SearchBar from './search-bar/search.component';
import magnifying_glass from './magnifying-glass.png';
import ApartmentDetail from "./apartment_detail.component"

export default class ApartmentList extends React.Component {



    constructor(props) {
        super(props);
        

        this.state = {
            Headers: ['Apartment Name','Apartment Address','Apartment Region', 'Apartment Rooms','Assign Trainee','Add Room' ],
            Rows: [],
			databaseresponse: [],
			noSearch: [],
            showForm_AssignTrainee: false,
			showForm_AddRoom: false,
			showTable: false,
			form_id: null,
			form_apartment: null,
			form_rooms: [],
			date: new Date(),
			region: 'All',
			endDate: new Date(),
			reloadPrompt: true
		};
		
		// if (window.performance) {
        //     if (performance.navigation.type == 1) {
        //       alert( "This page is reloaded" );
        //     } else {
        //       alert( "This page is not reloaded");
        //     }
        //   }
        this.handleButtonShow_AssignTrainee = this.handleButtonShow_AssignTrainee.bind(this);
        this.handleButtonShow_AddRoom = this.handleButtonShow_AddRoom.bind(this);
        this.updateRegion = this.updateRegion.bind(this);
        this.handleButtonRegionChange = this.handleButtonRegionChange.bind(this);

	}

    componentDidMount() {
		// this.state.reloadPrompt = false;
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
	
	componentDidUpdate() {
		
		if (document.getElementById("apartment-list")) {
			// this.state.reloadPrompt = false;
			console.log("List Was here" + this.state.reloadPrompt);
		}

		if(!document.getElementById("apartment-detail")){
			console.log("Details not here");
			// this.state.reloadPrompt = false;
			window.onbeforeunload = function() {
				return ;
				}.bind(this);
		}
        // this.state.reloadPrompt = true;
		// this.props.content(<ApartmentDetail reloadPrompt={this.state.reloadPrompt}/>);

		// if (window.performance) {
        //     if (performance.navigation.type === 1) {
              
        //         window.onbeforeunload = function() {
        //             return "";
        //             }.bind(this);

        //     }
        // }

    }
	
	DateChecker(){
		let date=this.state.date;
		let y=date.getFullYear();
		let m=date.getMonth();
		let d=date.getDate();
		let endDate=this.state.endDate;
		let ey=endDate.getFullYear();
		let em=endDate.getMonth();
		let ed=endDate.getDate();
		let r=this.state.region;

		if (y == ey && m == em && d == ed){
			if (r == 'All'){
				this.searchDate(y,m,d)
			}else{
				this.searchDateRegion(y,m,d,r)
			}
		}else{
			if (r == 'All'){
				this.searchDate2(y,m,d,ey,em,ed)
			}else{
				this.searchDate2Region(y,m,d,ey,em,ed,r)
			}
		}
	}
	onChange = date => {
		if (date === null){
			date=new Date()
		}
		if (date > this.state.endDate){
			this.setState({ date, endDate:date },function(){this.DateChecker()})
		}else{
			this.setState({ date },function(){this.DateChecker()})
		}
	}
	onChangeED = endDate => {
		if (endDate === null){
			endDate=new Date()
		}
		this.setState({ endDate },function(){this.DateChecker()});

	}

	search = event => {
		let noSearch = this.state.noSearch;
        if(event.length > 0){
			let searchResults = [];
			let demoString = "Hello World"
            this.state.noSearch.map(result => {
				let searchValues = Object.values(result)
                    if(searchValues.join('').replace(/ /g,'').toLowerCase().match(event.replace(/ /g,'').toLowerCase())){
						searchResults.push(result)          
                     }                
            })
            this.setState({ databaseresponse : searchResults })
        }
        else{
            this.setState({databaseresponse : noSearch})
        }
    };

	searchDate(year,month,day){
        axios.get('http://'+process.env.REACT_APP_GET_ROOM+'/apartment/getFromDate_Count/' + year + '/' + month + '/' + day)
           .then(response => {
			          this.setState({showForm_ChangeDate : false})
				this.setState({ databaseresponse: response.data })
				this.setState({ noSearch: response.data})
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
				this.setState({ noSearch: response.data})
           })
            .catch(function (error) {
                console.log(error);
           })
	}
	searchDate2Region(year,month,day,eyear,emonth,eday,region){
        axios.get('http://'+process.env.REACT_APP_GET_ROOM+'/apartment/getFromDate2_Region/' + year + '/' + month + '/' + day + '/' + eyear + '/' + emonth + '/' + eday + '/' + region)
           .then(response => {
			          this.setState({showForm_ChangeDate : false})
				this.setState({ databaseresponse: response.data })
				this.setState({ noSearch: response.data})
           })
            .catch(function (error) {
                console.log(error);
           })
	}
	searchDate2(year,month,day,eyear,emonth,eday){
        axios.get('http://'+process.env.REACT_APP_GET_ROOM+'/apartment/getFromDate2_Count/' + year + '/' + month + '/' + day + '/' +eyear + '/' + emonth + '/' + eday + '/')
           .then(response => {
			          this.setState({showForm_ChangeDate : false})
				this.setState({ databaseresponse: response.data })
				this.setState({ noSearch: response.data})
           })
            .catch(function (error) {
                console.log(error);
           })
	}
    updateRegion(event) {
        this.setState({ region: event.target.value },function(){this.DateChecker()})

    };
    handleButtonRegionChange(e) {
		let r=e.target.getAttribute('data-arg1');
		//let id=4
		//let apartname="hello"
        this.setState({region: r},function(){this.DateChecker()})
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
        let headers = [ {'header': 'Region', 'width': 100}, { 'header': 'Apartment Number', 'width': 200 }, { 'header': 'Apartment Address', 'width': 300 }, 
            { 'header': 'Availability', 'width': 150 }]


        let rows = []

        this.state.databaseresponse.map(data => {
			let _id = data._id
            let row = {
				'ID': _id,
                'Region': data.apartment_region,
                'Apartment Number': data.apartment_name,
                'Apartment Address': data.apartment_address,
                'Availability': data.room_count,
                'Apartment Image': data.apartment_image,
            }
            rows.push(row)
        })

		let tableData = { Headers: headers, Rows: rows }
		
		const styles= {
            display: "inline-flex"
		}

		/*if(this.state.showTable===false){
			return (
				<div>
				<div align="center">
				<table><tr><td align="center">
				<TextButton id="RegionBrighton" onClick={this.handleButtonRegionChange} dataarg1="Brighton"> Brighton</TextButton></td><td align="center">
				<TextButton id="RegionLeeds" onClick={this.handleButtonRegionChange}dataarg1="Leeds">Leeds</TextButton>
				</td></tr><tr><td align="center">
				<TextButton id="RegionLondon" onClick={this.handleButtonRegionChange}dataarg1="London">London</TextButton>
				</td><td align="center">
				<TextButton id="RegionManchester" onClick={this.handleButtonRegionChange} dataarg1="Manchester">Manchester</TextButton>
				</td></tr></table>
				</div>
				</div>
			)
		}else{	*/
			return (
			<div>
				<table width="100%" >
				<tr><td>
					<h2 id="apartment-list">  
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
						<div style={styles}>
						<img src={magnifying_glass} alt="QA logo" width="25px" height="25px"/> &nbsp;<SearchBar search={this.search}/>
						<br/>
						<br/>
						</div>
					<QATableSorted 
						data={tableData} 
						sortColumn='Region'
						getTrProps={(state, rowInfo) => {
							return {
							  onClick: (e) => {
								  console.log(rowInfo)
								  this.props.content(<ApartmentDetail aprtDetail={rowInfo.original} role={this.props.role} reloadPrompt={this.state.reloadPrompt}/>)
							  }
							}
						  }
						}
					/>
					
					{/*<div align="center">
					<TextButton id="GoBack" onClick={() => this.setState({ showTable: false })}>Go Back</TextButton>
					</div>*/}
	
				</div>
			)
		/*}*/
	}
}
