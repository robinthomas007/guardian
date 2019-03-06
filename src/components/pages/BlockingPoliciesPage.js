import React, { Component } from 'react';
import PageHeader from '../PageHeader';

const mockData = require('../../mockData.json');

class BlockingPoliciesPage extends Component {

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
                <table className="table">
                    <thead >
                        <tr className="row no-gutters">
                            <th className="col-4 " nowrap>Site</th>
                            <th className="col-2 centered" nowrap>Monetize</th>
                            <th className="col-2 centered" nowrap>Block</th>
                            <th className="col-2 centered" nowrap>Duration</th>
                            <th className="col-2 centered" nowrap>Block Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="row no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite youtube"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                        <tr className="row no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite soundcloud"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                        <tr className="row no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite facebook"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                        <tr className="row no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite instagram"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                        <tr className="row no-gutters">
                            <td className="col-4 centered align-self-center" nowrap>
                                <span className="platform-sprite twitter"></span>
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>
                                <input type="radio" />
                            </td>
                            <td className="col-2 centered align-self-center" nowrap>Duration</td>
                            <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    
        const BlockingPolicySets = mockData.pages.BlockingPolicies.blockingPolicySets.map( function (set, i) {
            return(
                <div className="set-card">
                    <div className="row">
                        <div className="col-8">
                            <h3>{set.setTitle} </h3>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-4">
                            <table>
                                <thead>
                                    <tr className="row no-gutters">
                                        <th nowrap>Tracks to Block</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td nowrap>
                                            <div className="dropdown">
                                                <button type="button" id="selectTracksDropdown" className="btn btn-secondary dropdown-toggle territory-tracks" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Select Tracks or Drag Below
                                                </button>
                                                <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
                                                    {TracksWithNoSetPolicyDrop}
                                                </ul>
                                            </div>
                                            <div className="track-draggable-area territory-tracks"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-8">
                            <BlockingPolicySite set={set}/>
                        </div>
                    </div>
                </div>
            )
        });

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
                                >Create a New Blocking Policy</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="track-draggable-area">
                            {TracksWithNoSetPolicy}
                        </div>
                    </div>
                    <div className="col-9">
                        {BlockingPolicySets}
                    </div>
                </div>
            </section>
        )
    }
};

export default BlockingPoliciesPage;