import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import './TerritorialRights.css'

const mockData = require('../../../mockData.json');

class TerritorialRightsPage extends Component {

    render() {

        const createNewRightsSet = () => {
            alert('Creating New Rights Set');
        }
    
        const selectSavedRightsSet = () => {
            alert('Select Rights Set');
        }
    
        const TracksWithNoSetPolicy = mockData.pages.TerritorialRights.tracks.map( function (noPolicyTrack, i) {
            return(
                <div key={i} draggable className="draggable-track">
                    <i className="material-icons">dehaze</i>{noPolicyTrack.trackAudioFile}
                </div>
            )
        });
    
        const TracksWithNoSetPolicyDrop = mockData.pages.TerritorialRights.tracks.map( function (noPolicyTrack, i) {
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
    
        const CountriesWithRights = mockData.pages.TerritorialRights.countriesWithRights.map( function (country, i) {
            return(
                <li key={i}>
                    <label className="dropdown-item custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <span>{country.countryName}</span>
                </li>
            )
        });
    
        const CountriesWithOutRights = mockData.pages.TerritorialRights.countriesWithOutRights.map( function (country, i) {
            return(
                <li key={i}>
                    <label className="dropdown-item custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <span>{country.countryName}</span>
                </li>
            )
        });

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
                                    onClick={createNewRightsSet}
                                    className="btn btn-primary"
                                >Create a New Rights Set</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="track-draggable-area" droppable>
                            {TracksWithNoSetPolicy}
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="set-card">
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <h3>Territorial Rights Set 1 
                                        <i className="material-icons" data-toggle="tooltip" title="Edit Rights Set Name">edit</i>
                                    </h3>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <table className="table">
                                    <thead>
                                        <tr className="row no-gutters">
                                            <th className="col-4" nowrap>Tracks with this Rights Set</th>
                                            <th className="col-8" nowrap>Rights Set Rules</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="row no-gutters">
                                            <td className="col-4">
                                                <div className="dropdown tracks-dropdown">
                                                    <button type="button" id="selectTracksDropdown" className="btn btn-secondary dropdown-toggle territory-tracks" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Select Tracks or Drag Below
                                                    </button>
                                                    <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
                                                        {TracksWithNoSetPolicyDrop}
                                                    </ul>
                                                </div>
                                                <div droppable className="track-draggable-area territory-tracks">

                                                </div>
                                            </td>
                                            <td className="col-8">
                                                <label>Only Has Rights In</label><input type="radio" />
                                                <label>Has Rights Everywhere Except</label><input type="radio" />
                                                <div className="dropdown">
                                                    <button type="button" id="includedCountriesDropdown" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Select Countries
                                                    </button>
                                                    <ul className="dropdown-menu countries" aria-labelledby="includedCountriesDropdown">
                                                        {CountriesWithRights}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};

export default TerritorialRightsPage;