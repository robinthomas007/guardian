import React, { Component } from 'react';
import './PageHeader.css'
import { withRouter } from "react-router";

class PageHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user : {},
        };
    }
   
    render() {
        return('')
    }
};

export default withRouter(PageHeader);