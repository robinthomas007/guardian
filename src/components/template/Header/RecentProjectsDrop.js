import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter as Route, NavLink } from "react-router-dom";

class RecentProjectDrop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options : []
        }
    };

    handleClick = (projectID) => {
        //this.props.updateHistory('/reviewSubmit/' + projectID)

        this.props.history.push('/reviewSubmit/' + projectID)
    }

    getOptions = () => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers({
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
        })

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : user.email
            },
            "Items" : 5
        })

        fetch (window.env.api.url + '/project/search/recent', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => {
                return(response.json());
        }).then (responseJSON => {
            this.setState( { options : responseJSON.items } )
        }
            
        ).catch(
            error => {
                console.error(error);
            }
        );
    }

    componentDidMount() {
        //this.getOptions()
    }

    getRecentProjects = () => {
        return(
            this.state.options.map( (option, i) => {
                return(
                    <a className="dropdown-item" onClick={() => this.props.updateHistory(option.id)}>{option.name}</a>
                )
            })
        )
    };

    render() {
        return(
            <div className="dropdown">
                <button onMouseOver={this.getOptions} onClick={this.getRecentProjects} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Recent Projects
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    { (this.state.options) ? this.getRecentProjects() : null}
                </div>
            </div>
        )
    }
} 

export default withRouter(RecentProjectDrop);