import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import './BlockingPolicies.css';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import BlockingPolicySets from '../BlockingPolicies/pageComponents/blockingPolicySets';
import LoadingImg from '../../ui/LoadingImg';
import { withRouter } from 'react-router-dom';
import Noty from 'noty';
import {formatDateToYYYYMMDD, resetDatePickerByObj} from '../../Utils';

class BlockingPoliciesPage extends Component {

    constructor(props) {
		super(props);
		this.state = {
            project : {
                BlockingPolicySets : [],
                UnassignedBlockingPolicySetTracks : []
            },
            dragSource : null,
            showLoader : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChildDrag = this.handleChildDrag.bind(this);
    }
  
    handleChange = (e) => {
        const setIndex = e.target.getAttribute('setIndex');
        const siteIndex = e.target.getAttribute('siteIndex');

        const { BlockingPolicySets } = this.state.project;
        let modifiedBlockingPolicySets = BlockingPolicySets;
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex][e.target.id] = e.target.value;
        this.setState( {BlockingPolicySets : modifiedBlockingPolicySets} )
    }

    handleExpirationDisable = (setIndex, siteIndex) => {
        const { BlockingPolicySets } = this.state.project;
        let modifiedBlockingPolicySets = BlockingPolicySets;
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].disabled = true;
        this.setState( {BlockingPolicySets : modifiedBlockingPolicySets});
    };

    handleMonetizeBlock = (e) => {
        const setIndex = e.target.getAttribute('setIndex');
        const siteIndex = e.target.getAttribute('siteIndex');
        const eTargetValue = (e.target.value === "true") ? true : false;
        const { BlockingPolicySets } = this.state.project;
        let modifiedBlockingPolicySets = BlockingPolicySets;
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].block = eTargetValue;

        const expirationDateInputs = document.getElementsByClassName('blockingPolicyDateInput');

        for(var i=0; i<expirationDateInputs.length; i++) {
            if(expirationDateInputs[i].getAttribute('setIndex') === setIndex && expirationDateInputs[i].getAttribute('siteIndex') === siteIndex) {
                resetDatePickerByObj(expirationDateInputs[i])
            }
        }

        if(!eTargetValue) {
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].disabled = false;
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].expirationDate = '';
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].duration = '';
            this.setState( { BlockingPolicySets : modifiedBlockingPolicySets}, () => { this.handleExpirationDisable(setIndex, siteIndex) } )
        } else {
            modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].disabled = false;
            this.setState( { BlockingPolicySets : modifiedBlockingPolicySets } )
        }       
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

        this.setState( { showLoader : true } )

        const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
		)

		const fetchBody = JSON.stringify( {
            "PagePath" : (this.props.match.url) ? this.props.match.url : '',
            "ProjectID": this.props.match.params.projectID
		})

        fetch ('https://api-dev.umusic.net/guardian/project/review', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 
            {
                this.setState( {project : responseJSON} )
                if(!responseJSON.BlockingPolicySets || !responseJSON.BlockingPolicySets.length) {
                    this.addBlockingSet();
                }
                this.setState( { showLoader : false } )
            }
        ).catch(
            error =>  {
                console.error(error)
                this.setState( { showLoader : false } )
            }
		);
    };

    handleSubmit = () => {
        this.setState( { showLoader : true } )
        const user = JSON.parse(sessionStorage.getItem('user'))
        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
		)

		const fetchBody = JSON.stringify( {
            "projectID": this.props.match.params.projectID,
            "BlockingPolicySets": this.state.project.BlockingPolicySets
		})

        fetch ('https://api-dev.umusic.net/guardian/project/blockingpolicies', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 
            {
                if(responseJSON.errorMessage) {
                    this.showNotSavedNotification()
                } else {
                    this.showNotification(null, this.props.match.params.projectID)
                    this.props.setHeaderProjectData(this.state.project)
                }
                this.setState( { showLoader : false } )
            }
        ).catch(
            error => {
                console.error(error);
                this.showNotSavedNotification()
                this.setState( { showLoader : false } )
            }
		);
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

    handleResequenceRighstSets = () => {
        const { BlockingPolicySets } = this.state.project;
        let modifiedBlockingPolicySets = BlockingPolicySets;

        for(let i=0; i<modifiedBlockingPolicySets.length; i++) {
            modifiedBlockingPolicySets[i].description = 'Set #' + (i + 1);
        }

        this.setState( {BlockingPolicySets : modifiedBlockingPolicySets })
    }

    handleSetDelete(i) {
        const {project} = this.state;
        const deletedTracks = this.state.project.BlockingPolicySets[i].tracks;
        const combinedTracks = [...this.state.project.UnassignedBlockingPolicySetTracks, ...deletedTracks];

        if(this.state.project.BlockingPolicySets.length > 1) {
            let modifiedProject = project;
                modifiedProject.BlockingPolicySets.splice(i,1);
                modifiedProject.UnassignedBlockingPolicySetTracks = combinedTracks;

            this.handleResequenceRighstSets()
            this.setState( { 
                project : modifiedProject,
            });
        }
    };

    showNotification(e, projectID){
        new Noty ({
            type: 'success',
            id:'blockingSaved',
            text: 'Your blocking policies have been successfully saved',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).on('afterClose', ()  =>
            this.props.history.push({
                pathname : '/reviewSubmit/' + projectID
            })
        ).show()
    };

    showNotSavedNotification(e){
        new Noty ({
            type: 'error',
            id:'blockingnotSaved',
            text: 'Your blocking policies have NOT been successfully saved',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()
    };

    componentDidMount() {
        this.handlePageDataLoad()
    };

    componentDidUpdate() {
        if(this.props.match.params.projectID) {
            this.props.setProjectID(this.props.match.params.projectID)
        }
    };

    render() {
        return(
            <div className="col-10">
    
                <LoadingImg show={this.state.showLoader} />

                <PageHeader 
                    data={this.state.project}
                />
    
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">6</span> Post-Release UGC Blocking <span className="option-text">(Optional)</span></h2>
                        <p>In this OPTIONAL step, you can choose to block content AFTER commercial release until a desired date.  UMG’s default policy is to monetize content on licensed platforms upon commercial release.  Here you can create a post-release block policy set, then drag &amp; drop titles to assign specific tracks to that policy.  This section can only be completed by selecting the Request Approval button below.</p>
                        <p>
                            Note: any post-release policies created in this section require approval and will not be put into effect until approval is granted.  Confirmation of approval will arrive via email.
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
                            handleSetDelete={(i) => this.handleSetDelete(i)}
                        />
                    </div>
                </div>

                <div className="row save-buttons">
                    <div className="col-12">
                        <button tabIndex='5+' id="contactsSaveButton" type="button" className="btn btn-secondary" onClick={this.handleSubmit}>Save</button>
                        <button tabIndex='6+' id="contactsSaveContButton" type="button" className="btn btn-primary" onClick={this.handleSubmit}>Request Approval</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(BlockingPoliciesPage);
