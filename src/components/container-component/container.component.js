import React, { Component } from 'react';
import Navbarr from './navbar.component';
import Navigation from'./header.component';
import { authService } from './modules/authService'
import * as _ from 'lodash';
import SideBar from './sideBar.component';
import './css/Container.css'
import Content from './content.component';

export default class NavbarDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: this.props.role,
            content: '',
            service: 'Home'
        };
    }

    changeContent = event => {
        this.setState({content:  event})
        window.scrollTo(0, 0)
        console.log("State Changed"+this.state.content)
    };

    changeService = event => {
        this.setState({service:  event})
        window.scrollTo(0, 0)
        console.log("STATE SERVICE"+this.state.service)
    };

    componentWillMount(){
        if(this.state.role === ''){
            this.setState({
                content: this.props.links.null
            })
        }
        else{
            this.setState({
                content: this.props.links[this.state.role].home
            })
        }
    }

    render() {
        let render

        if(this.state.role === ''){
            render = <div>
                        <Navigation/>
                        {this.state.content}
                    </div>
        }
        else{
            render = <div>
                        <div id="fixed">
                            <Navigation
                            role={this.state.role}
                            content={this.changeContent}
                            links={this.props.links}
                            service={this.changeService}
                            />
                            {/* <Navbarr
                                role={this.state.role}
                                content={this.changeContent}
                                links={this.props.links}
                            /> */}
                        </div>
                        <div className="sideBarNarrow"></div>
                        <div id='outer-container'>
                            <SideBar 
                                role={this.state.role}
                                content={this.changeContent}
                                links={this.props.links}
                                service={this.state.service}
                            />
                        </div>
                        <main id="page-wrap">
                            <Content content={this.changeContent}>
                                {this.state.content}
                            </Content>
                        </main>

                    </div>
        }

        return (
            <div>
                {render}
            </div>

        );
    };

}