import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import '../css/button.css'

export default class TextButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        const styles= {
            display: 'inline-flex'
        }

        return (
            <div style={styles}>
                <ButtonGroup role={this.props.role ? this.props.role : 'group'}>
                    <Button
                        id={this.props.id ? this.props.id : 'Btn'}
                        type={this.props.type}
                        onClick={this.props.onClick}
                        disabled={this.props.disabled}>
                        {this.props.text}
                    </Button>
                </ButtonGroup>
            </div>

        );
    };
};

