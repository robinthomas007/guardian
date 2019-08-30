import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import MultiSelectDropDown from '../../SharedPageComponents/multiSelectDropdown';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import TracksRightsSets from '../TerritorialRights/pageComponents/TracksRightsSets';
import TracksCustomRightsSet from '../TerritorialRights/pageComponents/TracksCustomRightsSet';

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
            },
            dragSource : {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePageDataLoad = this.handlePageDataLoad.bind(this);
        this.handleNoRightsTracksRemove = this.handleNoRightsTracksRemove.bind(this);
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

    handleChange = (modifiedTerritorialRightsSets) => {
        const {TerritorialRightsSets} = this.state.project;
        this.setState( { TerritorialRightsSets :  modifiedTerritorialRightsSets} )
    }

    getRightsSet(set, index) {
        return(
            {
                "territorialRightsSetID": (set.id) ? set.id : '',
                "sequence": (set.sequence) ? set.sequence : index,
                "description":  (set.description) ? set.description : "Set # " + (index + 1),
                "countries": [
                    {
                        "id": "WW",
                        "name": "Worldwide"
                    }
                ],
                "tracks": [],
                "hasRights": true
            }
        )
    }

    addRightsSet = () => {
        const { TerritorialRightsSets } = this.state.project;
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
            modifiedTerritorialRightsSets.push(this.getRightsSet({}, TerritorialRightsSets.length));
        this.setState({TerritorialRightsSets : modifiedTerritorialRightsSets});
    }

    handleNoRightsTracksRemove = (i) => {
        const { UnassignedTracks } = this.state.project;
        let modifiedUnassignedTracks = UnassignedTracks;
            modifiedUnassignedTracks.splice(i,1);
        this.setState( {UnassignedTracks : modifiedUnassignedTracks} )
    }

    handleChildDrag = (e) => {
        this.setState( {dragSource : e.target} )
    }

    handleChildDrop = (e, i) => {
        this.handleNoRightsTracksRemove(i);
        this.setState( {dragSource : null} )
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
            "TerritorialRightsSets": this.state.project.TerritorialRightsSets,
		})

        fetch ('https://api-dev.umusic.net/guardian/project/territorialrights', {
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

    componentDidMount() {
        if(this.props.match.params.projectID) {
            this.handlePageDataLoad()
        }        
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
    
                {/* <div onClick={this.handleSubmit}>test</div> */}

                <div className="row no-gutters align-items-center">
                    <div className="col-3">
                        <h3>Tracks With No Rights Applied</h3>
                    </div>
                    <div className="col-9">
                        <div className="row no-gutters align-items-center card-nav">
                            <div className="col-4">
                                <span className="drag-drop-arrow float-left">
                                    <span nowrap="true">Drag Audio Files To The Rights Set</span>
                                </span>
                            </div>
                            <div className="col-8">
                                <button 
                                    onClick={this.addRightsSet}
                                    className="btn btn-primary"
                                >Create a New Rights Set</button>

                                <TracksCustomRightsSet />

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <TracksWithoutRights 
                            data={this.state.project.UnassignedTracks}
                            handleChildDrag={this.handleChildDrag}
                        />
                    </div>
                    <div className="col-9">
                        <TracksRightsSets 
                            data={this.state.project}
                            handleChange={this.handleChange}
                            dragSource={this.state.dragSource}
                            handleChildDrop={this.handleChildDrop}
                        />
                    </div>
                </div>
            </section>
        )
    }
};

export default withRouter(TerritorialRightsPage);