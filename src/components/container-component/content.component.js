import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as _ from 'lodash';
import SideBar from './sideBar.component';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

export default class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles= {
            margin: '20px'
        }
        return (
            <div style={styles}>
                {React.cloneElement(this.props.children, { content: this.props.content, role: this.props.role })}
            </div>
        );
    };

}