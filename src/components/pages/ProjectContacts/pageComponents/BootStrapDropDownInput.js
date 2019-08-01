import React, { Component } from 'react';
import {Table, Grid, Button, Form, Dropdown } from 'react-bootstrap'; 


class BootStrapDropDownInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : '',
            toggleValue : '',
            value : this.props.value,
            onChange : '',
            options : [
                '<i class="material-icons" data-toggle="tooltip" title="Private">lock</i> Private (Viewable on by you)', 
                '<i class="material-icons" data-toggle="tooltip" title="Public">group</i> Public (Viewable by all label members)'
            ]
        }

        this.state.toggleValue = this.state.options[0];
    }

    getOptions = () => {
        let options = this.state.options.map( (option, i) => {
            return(
                <Dropdown.Item 
                    eventKey={i + 1} 
                    dangerouslySetInnerHTML={{ __html: option }}
                >
                </Dropdown.Item>
            )
        })
        return(options)
    }

    getTextValue(value) {
        return(
            this.state.options[value - 1]
        )
    }

    handleChange(value) {
        this.setState({toggleValue : this.getTextValue(value)})
        this.setState({value : value})
        this.props.onChange(this.props.id, value)
    }

    initToggleValue(value) {
        if(this.state.toggleValue !== this.getTextValue(value)) {
            this.setState({toggleValue : this.getTextValue(value)})
        }        
    }

    componentDidUpdate() {
        this.initToggleValue(this.props.value);
    }

    render() { 
        return(
            <Dropdown className={'dropdown ' + this.props.className} onSelect={(e) => this.handleChange(e)}>
                <Dropdown.Toggle 
                    id="dropdown-basic"
                    dangerouslySetInnerHTML=
                    {{ __html: this.state.toggleValue }}
                >
                </Dropdown.Toggle>
               
                <input 
                    type="hidden" 
                    id={this.props.id} 
                    value={this.props.value} 
                />

                <Dropdown.Menu>
                    {this.getOptions()}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default BootStrapDropDownInput;