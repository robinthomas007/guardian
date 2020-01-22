import React, { Component } from 'react';
import MultiSelectDropDown from '../../../SharedPageComponents/multiSelectDropdown';
import TracksRightsRule from '../../TerritorialRights/pageComponents/TracksRightsRule';
import TracksSelectDropDown from '../../TerritorialRights/pageComponents/TracksSelectDropDown';
import TracksDropArea from '../../TerritorialRights/pageComponents/TracksDropArea';

class TracksRightsSets extends Component {
    constructor(props) {
		super(props);
		this.state = {
            TerritorialRightsSets : [],
            selectedCountries : []
        }

        this.handleDrop = this.handleDrop.bind(this);
    }

    getTracksList = (tracks) => {
        const tracksList = tracks.map( (track, i) => {
            return(
                <div key={i} draggable="true" class="draggable-track">
                    <i class="material-icons">dehaze</i>&nbsp;&nbsp;{track.trackTitle}
                </div>
            )
        })
        return(tracksList)
    }

    handleTrackSelect = (e) => {
        const setIndex = parseInt(e.target.getAttribute('setindex'));
        const trackIndex = parseInt(e.target.getAttribute('optionindex'));
        const { TerritorialRightsSets } = this.props.data;
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
            modifiedTerritorialRightsSets[setIndex].tracks.push( {trackID : e.target.getAttribute('trackid'), trackTitle : e.target.getAttribute('tracktitle')} )

        this.props.handleChange(modifiedTerritorialRightsSets);
        this.props.handleChildDrop(e, trackIndex);
     }

    handleDrop(e, i) {
        const { TerritorialRightsSets } = this.props.data;
        var data = e.dataTransfer.getData("text/html");
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
            modifiedTerritorialRightsSets[i].tracks.push( {trackID : this.props.dragSource.getAttribute('trackid'), trackTitle : this.props.dragSource.getAttribute('tracktitle')} )

        this.props.handleChange(modifiedTerritorialRightsSets);
        this.props.handleChildDrop(i);
    }

    getCountryNameByID(countryID) {
        const countrys = this.props.data.Countries.filter ( (country) => {
             return (!countryID.indexOf(country.id))
        })
        return( { id : countrys[0].id, name : countrys[0].name })
    }

    handleCountrySelect = (inputValue, wwIndex) => {
        if (wwIndex == (inputValue.length - 1)) {
            return([inputValue[wwIndex]]);
        } else {
            inputValue.splice(wwIndex, 1)
            return(inputValue);
        }
    }

   handleCountryChange = (inputValue, setIndex) => {
        const { TerritorialRightsSets } = this.props.data;
        const stateContainsWW = TerritorialRightsSets[setIndex].countries.includes('WW');
        const wwIndex = inputValue.indexOf('WW');

        // if(wwIndex >= 0) {
        //     inputValue = this.handleCountrySelect(inputValue, wwIndex);
        // }


        let formattedInputValues = inputValue.map( (countryID) => {
            return(this.getCountryNameByID(countryID))
        })

        let modifiedTerritorialRightsSets = TerritorialRightsSets;
            modifiedTerritorialRightsSets[setIndex].countries = formattedInputValues;

        this.props.handleChange(modifiedTerritorialRightsSets)
    }

    handleRightsRuleChange = (inputValue, setIndex) => {
        const { TerritorialRightsSets } = this.props.data;
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
            modifiedTerritorialRightsSets[setIndex].hasRights = inputValue;
        this.props.handleChange(modifiedTerritorialRightsSets)
    }

    handleDeleteButton = (i) => {
        if(this.props.data.TerritorialRightsSets.length > 1 ) {
            return (
                <button className="btn btn-secondary action align-middle" onClick={ () => this.props.handleSetDelete(i)}>
                    <i className="material-icons" data-toggle="tooltip" title="Save Rights Set">delete</i>
                </button>
            )
        } else {
            return('')
        }
    }

    getCountryIDs = (countries) => {
        let countryIDs = countries.map( (country, i) => {
            return(country.id)
        })
        return(countryIDs)
    }

    listOfCountries = (countries) => {
        return(
            countries.map( (country, i) => {
                return(country.name)
            })
        )
    }

    getSetsList = () => {
        const rightsSets = this.props.data.TerritorialRightsSets.map( (rightsSet, i) => {
            return(
                <div key={i} className="set-card">
                    <div className="row d-flex col-12 no-gutters">
                        <h3>{rightsSet.description}</h3>
                      
                        
                        <div className="delete-rights-set">
                            {this.handleDeleteButton(i)}
                        </div>
                    </div>
                    
                    <div className="table-responsive d-flex row no-gutters">
                        <table className="territorial-rights-table col-12">
                            <thead>
                                <tr className="d-flex row no-gutters">
                                    <th className="col-4" nowrap="true">Tracks with this Rights Set</th>
                                    <th className="col-4" nowrap="true">Rights Rule</th>
                                    <th className="col-4" nowrap="true">Select Countries</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="d-flex row no-gutters">
                                    <td className="col-4">
  
                                        <TracksSelectDropDown 
                                            data={this.props.data.UnassignedTerritorialRightsSetTracks }
                                            onChange={ (e) => this.handleTrackSelect(e, rightsSet)}
                                            setIndex={i}
                                        />

                                        <TracksDropArea 
                                            data={rightsSet.tracks}
                                            handleDrop={this.handleDrop}
                                            setIndex={i}
                                            handleChildDrop={(e,i) => this.handleDrop() }
                                            handleChildDrag={(e) => this.props.handleChildDrag(e)}
                                            dragSource={this.props.dragSource}
                                        />
                                    </td>
                                    <td className="col-4">
                                        <TracksRightsRule 
                                            data={rightsSet.hasRights}
                                            setIndex={i}
                                            onChange={(value) => this.handleRightsRuleChange(value, i)}
                                        />
                                    </td>
                                    <td className="col-4">
                                        <div className="dropdown">
                                            <MultiSelectDropDown 
                                                placeHolder={'Select Country'}
                                                optionList={this.props.data.Countries}
                                                value={this.getCountryIDs(rightsSet.countries)}
                                                id={'territorialRightsCountry_' + i}
                                                onChange={(value) => this.handleCountryChange(value, i)}
                                            />
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            {this.listOfCountries(rightsSet.countries).toString().replace(/,/g, ', ')}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        })
        return(rightsSets)
    };
    
    render() {
        return(
            this.getSetsList()
        )
    }
};

export default TracksRightsSets;