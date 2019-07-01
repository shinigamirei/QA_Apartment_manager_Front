import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import '../css/QATable.css'




export default class QATable extends React.Component {

    constructor(props) {
        super(props);
            
        this.state = {
            tableRows: [],
            tableColumns:[]
    
        };
    }

    componentDidMount() {
        let columns =[];
        this.props.data.Headers.map(header =>{
            columns.push({Header: header, accessor: header})
        })
        this.setState({
            tableRows: this.props.data.Rows,
            tableColumns: columns
        })
    }

    componentWillReceiveProps(nextProps) {
        let columns =[];
        nextProps.data.Headers.map(header =>{
            columns.push({Header: header, accessor: header})
        })
        this.setState({
            tableRows: nextProps.data.Rows,
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
                style={{
                        height: "400px"
                }}
            />
        );
    };
};

