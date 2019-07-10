import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import '../css/QATable.css'




export default class QATableSorted extends React.Component {

    constructor(props) {
        super(props);
            
        this.state = {
            tableRows: [],
            tableColumns:[],
			sortColumn: this.props.sortColumn
        };
    }

    componentDidMount() {
        this.setTableData(this.props.data)
    }

    componentWillReceiveProps(nextProps) {
        this.setTableData(nextProps.data)
      }
     
    setTableData(tableData){
        let columns =[];
        tableData.Headers.map(column =>{
            columns.push({Header: column.header, accessor: column.header, width: column.width})
        })
        this.setState({
            tableRows: tableData.Rows,
            tableColumns: columns
        })
    }


    render() {
        let data = this.state.tableRows;
         
        let columns = this.state.tableColumns;

        return (
            <ReactTable
                className="-striped -highlight"
                data={data}
                columns={columns}
                showPagination={false}
				defaultSorted ={[{
					id: this.state.sortColumn,
					asc: true
				}]}
                style={{
                        height: "400px"
                }}
            />
        );
    };
};

