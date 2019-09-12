import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import './BlockingPolicies.css';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import BlockingPolicySets from '../BlockingPolicies/pageComponents/blockingPolicySets';
import { withRouter } from 'react-router-dom';

const mockData = require('../../../mockData.json');

class BlockingPoliciesPage extends Component {

    constructor(props) {
		super(props);
		this.state = {
            project : {
                BlockingPolicySets : [],
                UnassignedBlockingPolicySetTracks : []
            },
            dragSource : null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChildDrag = this.handleChildDrag.bind(this);
    }
  
    handleChange = (e) => {
        const setIndex = e.target.getAttribute('setIndex');
        const siteName = e.target.getAttribute('siteName');
        const siteIndex = e.target.getAttribute('siteIndex');

        const { BlockingPolicySets } = this.state.project;
        let { modifiedBlockingPolicySets } = BlockingPolicySets;

            alert(JSON.stringify(BlockingPolicySets[setIndex].platformPolicies[siteIndex][e.target.id] = e.target.value))

              //modifiedBlockingPolicySets[setIndex].platformPolicies[e.target.id] = e.target.value;

        //this.setState( {BlockingPolicySets : modifiedBlockingPolicySets} )
        alert(setIndex + " : " + siteName + ' : ' + siteIndex + ' : ' + e.target.id)
    }

    handleMonetizeBlock = (e) => {
        const setIndex = e.target.getAttribute('setIndex');
        const siteName = e.target.getAttribute('siteName');
        const siteIndex = e.target.getAttribute('siteIndex');
        const inputTarget = e.target.getAttribute('inputTarget');

        const { BlockingPolicySets } = this.state.project;
        let modifiedBlockingPolicySets = BlockingPolicySets;
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex][inputTarget] = e.target.value

        alert(JSON.stringify(modifiedBlockingPolicySets))

        this.setState( {BlockingPolicySets : modifiedBlockingPolicySets} )
    }

    getPlatforms = () => {
        return(
            [
                {
                    platformName : 'YouTube',
                    block : true,
                    duration : '',
                    expirationDate : ''
                },
                {
                    platformName : 'SoundCloud',
                    block : true,
                    duration : '',
                    expirationDate : ''
                },
                {
                    platformName : 'Facebook',
                    block : true,
                    duration : '',
                    expirationDate : ''
                },
                {
                    platformName : 'Instagram',
                    block : true,
                    duration : '',
                    expirationDate : ''
                },

            ]
        )
    }

    getBlockingSet = (set, i) => {
        return(
            {
                blockingPolicySetID : (set.blockingPolicySetID) ? set.blockingPolicySetID : '',
                sequence :  (set.sequence) ? set.sequence : i,
                description : 'Set #' + i,
                platformPolicies : this.getPlatforms(),
                tracks : []
            }
        )
    };

    addBlockingSet = () => {
        const { BlockingPolicySets } = this.state.project;
        let modifiedBlockingPolicySets = BlockingPolicySets;
            modifiedBlockingPolicySets.push(this.getBlockingSet({}, BlockingPolicySets.length + 1));
        this.setState({BlockingPolicySets : modifiedBlockingPolicySets});
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
                if(!responseJSON.BlockingPolicySets || !responseJSON.BlockingPolicySets.length) {
                    this.addBlockingSet();
                }
                // this.setState( { showLoader : false } )
            }
        )
        .catch(
            error => console.error(error)
		);
    };
    
    handleSubmit = () => {
        alert(JSON.stringify(this.state.project.BlockingPolicySets))
    }

    componentDidMount() {
        this.handlePageDataLoad()
    };

    handleChildDrag = (e) => {
        this.setState( {dragSource : e.target} )
    };

    handleChildDrop = (e, i) => {
        const { UnassignedBlockingPolicySetTracks } = this.state.project;
        const { tracks } = this.state.project.BlockingPolicySets[i];
        let dragTrackIndex = (this.state.dragSource) ? this.state.dragSource.getAttribute('trackindex') : null;

        let modifiedUnassignedBlockingPolicySetTracks = UnassignedBlockingPolicySetTracks;
            modifiedUnassignedBlockingPolicySetTracks.splice(dragTrackIndex,1);

        let modifiedTracks = tracks;
            modifiedTracks.push({trackID : this.state.dragSource.getAttribute('trackid'), trackTitle : this.state.dragSource.getAttribute('tracktitle')})

        this.setState( {
            UnassignedBlockingPolicySetTracks : modifiedUnassignedBlockingPolicySetTracks,
            tracks : modifiedTracks,
            dragSource : null
         })
    }

    handleChildDrag = (e) => {
        this.setState( {dragSource : e.target} )
    };

    handleTrackSelect = (e) => {
         const setIndex = parseInt(e.target.getAttribute('setindex'));
         const trackIndex = parseInt(e.target.getAttribute('optionindex'));
         const { UnassignedBlockingPolicySetTracks } = this.state.project;
         const { tracks } = this.state.project.BlockingPolicySets[setIndex];
 
         let modifiedUnassignedBlockingPolicySetTracks = UnassignedBlockingPolicySetTracks;
             modifiedUnassignedBlockingPolicySetTracks.splice(trackIndex,1);
 
         let modifiedTracks = tracks;
             modifiedTracks.push({trackID : e.target.getAttribute('trackid'), trackTitle : e.target.getAttribute('tracktitle')})
 
         this.setState( {
             UnassignedBlockingPolicySetTracks : modifiedUnassignedBlockingPolicySetTracks,
             tracks : modifiedTracks,
          })
     }

    handleDropAdd = (e) => {
        const setIndex = this.state.dragSource.getAttribute('setindex');
        const trackId = this.state.dragSource.getAttribute('trackid');
        const trackTitle = this.state.dragSource.getAttribute('trackTitle');
        const trackIndex = this.state.dragSource.getAttribute('trackindex');

        // restrict dropping to just the set tracks
        if( ((this.state.dragSource) && !this.state.dragSource.classList.contains('unassignedTrack')) || !e.target.classList.contains('unassignedTrack')) {
             //add the selection to the unassigned tracks
             const { UnassignedBlockingPolicySetTracks } = this.state.project;
             
             let modifiedUnassignedBlockingPolicySetTracks = UnassignedBlockingPolicySetTracks;
                 modifiedUnassignedBlockingPolicySetTracks.push({trackID : trackId, trackTitle : trackTitle})
             
             //remove the selection from the set's assigned tracks
             const { BlockingPolicySets } = this.state.project;
        
             let modifiedBlockingPolicySets = BlockingPolicySets;
                 modifiedBlockingPolicySets[setIndex].tracks.splice(trackIndex, 1)
             this.setState({
                 BlockingPolicySets : modifiedBlockingPolicySets,
                 UnassignedBlockingPolicySetTracks : modifiedUnassignedBlockingPolicySetTracks
            })
         }
    };

    render() {
        return(
            <section className="page-container h-100">
    
                <PageHeader />
    
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">6</span> Post-Release UGC Blocking <span className="option-text">(Optional)</span></h2>
                        <p>In this optional step, you can choose to block content after commericial release until the desired date. UMG's default policy is to monetize content on licensed platforms upon commercial release. Here you can create a post-release block policy set then drag &amp; drop titles to assign specific tracks to that policy.</p>
                        <p>
                            *Any post-release policies created here will require review and will not be complete until approval is granted.  <br />
                            *Confirmation of approval will arrive via email.
                        </p>
                    </div>
                </div>
                <div className="row no-gutters align-items-center">
                    <div className="col-3">
                        <h2>Tracks With No Set Policy</h2>
                    </div>
                    <div className="col-9">
                        <div className="row no-gutters align-items-center card-nav">
                            <div className="col-4">
                                <span className="drag-drop-arrow float-left">
                                    <span>Drag Audio Files To The Policy Set</span>
                                </span>
                            </div>
                            <div className="col-8">
                                <button
                                    className="btn btn-primary" 
                                    onClick={this.addBlockingSet}
                                >Create a New Blocking Policy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <TracksWithoutRights 
                            data={this.state.project.UnassignedBlockingPolicySetTracks}
                            handleChildDrag={null}
                            dragSource={this.state.dragSource}
                            handleDropAdd={this.handleDropAdd}
                            handleChildDrag={this.handleChildDrag}
                        />
                    </div>
                    <div className="col-9">
                        <BlockingPolicySets 
                            data={this.state.project}
                            onChange={(e) => this.handleChange(e)}
                            handleMonetizeBlock = { (e) => this.handleMonetizeBlock(e)}
                            dragSource={this.state.dragSource}
                            handleDrop={(e,i) => this.handleChildDrop(e, i)}
                            handleChildDrop={(e,i) => this.handleDrop() }
                            handleChildDrag={(e,i) => this.handleChildDrag(e) }
                            handleTrackSelect={(e,i) => this.handleTrackSelect(e, i)}
                        />
                    </div>
                </div>

                <div className="row save-buttons">
                    <div className="col-12">
                        <button tabIndex='5+' id="contactsSaveButton" type="button" className="btn btn-secondary" onClick={this.handleSubmit}>Save</button>
                        <button tabIndex='6+' id="contactsSaveContButton" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save &amp; Continue</button>
                    </div>
                </div>
            </section>
        )
    }
};

export default withRouter(BlockingPoliciesPage);
