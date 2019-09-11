import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import './BlockingPolicies.css';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import BlockingPolicySets from '../BlockingPolicies/pageComponents/blockingPolicySets';
import { withRouter } from 'react-router-dom';

const mockData = require('../../../mockData.json');

class BlockingPoliciesPage extends Component {

<<<<<<< HEAD
    constructor(props) {
		super(props);
		this.state = {
            project : {
                BlockingPolicySets : [],
                UnassignedTerritorialRightsSetTracks : []
            }
=======
    render() {

        const TracksWithNoSetPolicy = mockData.pages.BlockingPolicies.tracks.map( function (noPolicyTrack, i) {
            return(
                <div key={i} className="draggable-track">{noPolicyTrack.trackAudioFile}</div>
            )
        });
    
        const TracksWithNoSetPolicyDrop = mockData.pages.BlockingPolicies.tracks.map( function (noPolicyTrack, i) {
            return(
                <li key={i}>
                    <label className="dropdown-item custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <span>{noPolicyTrack.trackAudioFile}</span>
                </li>
            )
        });
    
        const BlockingPolicySite = () => {
    
            return(
            <div className="table-repsonsive">
            <Table>
                    <thead >
                        <tr className="d-flex no-gutters">
                            <th className="col-4" nowrap>Platform</th>
                            <th className="col-2 text-center" nowrap>Monetize</th>
                            <th className="col-2 text-center" nowrap>Block</th>
                            <th className="col-2 text-self-center" nowrap>Allowance</th>
                            <th className="col-2 text-self-center" nowrap>Block Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="d-flex no-gutters">
                            <td className="col-4 align-self-center" nowrap>
                                <span className="platform-sprite youtube"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                        <tr className="d-flex no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite soundcloud"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                        <tr className="d-flex no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite facebook"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                        <tr className="d-flex no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite instagram"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <Form.Control type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="date" />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </div>
            )
>>>>>>> 0a2289f98efbad6857eb46015062400709f3b45c
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        alert(e.target.getAttribute('setIndex'))
        alert(e.target.getAttribute('siteName'))
    }

    getBlockingSet = (set, i) => {
        return(
            {
                blockingPolicySetID : (set.blockingPolicySetID) ? set.blockingPolicySetID : '',
                sequence :  (set.sequence) ? set.sequence : i,
                description : 'Set #' + i,
                platformPolicies :
                    [
                        {
                            platformName : '',
                            block : true,
                            duration : '',
                            expirationDate : ''
                        }
                    ],
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
    

    componentDidMount() {
        this.handlePageDataLoad()
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
                            data={this.state.project.UnassignedTerritorialRightsSetTracks}
                            handleChildDrag={null}
                            dragSource={null}
                            handleDropAdd={null}
                        />
                    </div>
                    <div className="col-9">
                        <BlockingPolicySets 
                            data={this.state.project}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                </div>
            </section>
        )
    }
};

export default withRouter(BlockingPoliciesPage);
