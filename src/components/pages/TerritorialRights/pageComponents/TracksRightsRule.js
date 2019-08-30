import React, { Component } from 'react';

class TracksRightsRule extends Component {
    constructor(props) {
		super(props);
		this.state = {
            hasRights : false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState( {hasRights : e.currentTarget.value === 'true' ? true : false } )
    }

    componentDidMount() {
        this.setState( {hasRights : this.props.data} )
    };

    render() {
        return(
            <div>
                <input type="radio" value="true" checked={this.state.hasRights} onChange={this.handleChange} /> <label>Only Has Rights In</label><br />
                <input type="radio" value="false" checked={!this.state.hasRights} onChange={this.handleChange} /> <label>Has Rights Everywhere Except</label>
            </div>
        )
    }
};

export default TracksRightsRule;