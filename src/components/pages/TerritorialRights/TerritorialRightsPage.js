import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import MultiSelectDropDown from '../../SharedPageComponents/multiSelectDropdown';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import TracksRightsSets from '../TerritorialRights/pageComponents/TracksRightsSets';
import './TerritorialRights.css';
import { withRouter } from "react-router";

class TerritorialRightsPage extends Component {

    constructor(props) {
		super(props);
		this.state = {
            project : {
                Countries : [],
                UnassignedTracks : [],
                TerritorialRightsSets : []
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePageDataLoad = this.handlePageDataLoad.bind(this);
    }

    handlePageDataLoad = () => {

        const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
		)

		const fetchBody = JSON.stringify( {
            "User" : {
				"email" : user.email
            },
            "ProjectID": this.props.match.params.projectID,
		})

        fetch ('https://api-dev.umusic.net/guardian/project/review', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        )
        .then (responseJSON => 
            {
                this.setState( {project : responseJSON} )
            }
        )
        .catch(
            error => console.error(error)
		);
    }

    handleChange = (e) => {

    }

    componentDidMount() {
        if(this.props.match.params.projectID) {
            this.handlePageDataLoad()
        }        
    }

    getBlankRightsSet() {
        return(
            {
                "territorialRightsSetID": "",
                "sequence": "",
                "description": "",
                "countries": [
                    {
                        "id": "",
                        "name": ""
                    }
                ],
                "tracks": [],
                "hasRights": false
            }
        )
    }

    addBlankRightsSet = () => {
        const { TerritorialRightsSets } = this.state.project;
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
            modifiedTerritorialRightsSets.push(this.getBlankRightsSet());
        
        this.setState({TerritorialRightsSets : modifiedTerritorialRightsSets});
    }

    render() {

        return(
        
            <section className="page-container h-100">
                
                <PageHeader />
    
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">5</span> Territorial Rights</h2>
                        <p>In this step, you can set the territorial/geographic rights for each track in the project. Tracks with no specified territories will be claimed worldwide. You can either drag &amp; drop tracks         from the list or select tracks from the "Tracks with this Rights Set" dropdown before assigning rights. The section must be completed by selecting the "Save &amp; Continue" button below.</p>
                    </div>
                </div>
    
                <div className="row no-gutters align-items-center">
                    <div className="col-3">
                        <h3>Tracks With No Rights Applied</h3>
                    </div>
                    <div className="col-9">
                        <div className="row no-gutters align-items-center card-nav">
                            <div className="col-4">
                                <span className="drag-drop-arrow float-left">
                                    <span nowrap>Drag Audio Files To The Rights Set</span>
                                </span>
                            </div>
                            <div className="col-8">
                                <button 
                                    onClick={this.addBlankRightsSet}
                                    className="btn btn-primary"
                                >Create a New Rights Set</button>

                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Custom Rights Sets
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <TracksWithoutRights 
                            data={this.state.project.UnassignedTracks}
                        />
                    </div>
                    <div className="col-9">
                        <TracksRightsSets 
                            data={this.state.project}
                            onChange={this.handleChange()}
                        />
                    </div>
                </div>
            </section>
        )
    }
};

export default withRouter(TerritorialRightsPage);