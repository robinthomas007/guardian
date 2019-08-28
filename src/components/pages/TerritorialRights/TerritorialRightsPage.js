import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import MultiSelectDropDown from '../../SharedPageComponents/multiSelectDropdown'
import './TerritorialRights.css'
import { withRouter } from "react-router";

const mockData = require('../../../mockData.json');

class TerritorialRightsPage extends Component {

    constructor(props) {
		super(props);
		this.state = {
            countries : []
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
		})

        fetch ('https://api-dev.umusic.net/guardian/countries', {
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
                this.setState( {countries : responseJSON.Countries} )
            }
        )
        .catch(
            error => console.error(error)
		);
    }

    handleChange = (e) => {

    }

    componentDidMount() {
        this.handlePageDataLoad()
    }

    render() {

        const createNewRightsSet = () => {
            alert('Creating New Rights Set');
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
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Custom Rights Sets
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 1</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 2</a>
                                        <a className="dropdown-item" href="#">Custom Rights Set 3</a>
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
                        <div className="track-draggable-area h-100" droppable>
                            {TracksWithNoSetPolicy}
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="set-card">
                                <div className="row d-flex col-12 no-gutters">
                                     
                                    <h3>Territorial Rights Set 1 </h3>
                                        
                                    <button className="btn btn-secondary action align-middle">
                                            <i className="material-icons" data-toggle="tooltip" title="Edit Rights Set Name">edit</i>
                                        </button>
                                        <button className="btn btn-secondary action align-middle">
                                        <i className="material-icons" data-toggle="tooltip" title="Save Rights Set">save</i>
                                        </button>
                                       
                                </div>
                           
                            <div className="table-responsive d-flex row no-gutters">
                                <table className="territorial-rights-table col-12">
                                    <thead>
                                        <tr className="d-flex row no-gutters">
                                            <th className="col-4" nowrap>Tracks with this Rights Set</th>
                                            <th className="col-4" nowrap>Rights Rule</th>
                                            <th className="col-4" nowrap>Select Countries</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="d-flex row no-gutters">
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
                                            <td className="col-4">
                                            <input type="radio" /> <label>Only Has Rights In</label><br />
                                            <input type="radio" /> <label>Has Rights Everywhere Except</label>
                                            </td>
                                            <td className="col-4">
                                                <div className="dropdown">
                                                    <MultiSelectDropDown 
                                                        placeHolder={'Select Country'}
                                                        data={this.state.countries}
                                                        id={'territorialRightsCountry'}
                                                        onChange={this.handleChange()}
                                                        buttonClass={null}
                                                        dropClass={null}
                                                    />
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

export default withRouter(TerritorialRightsPage);