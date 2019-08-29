import React, { Component } from 'react';
import MultiSelectDropDown from '../../../SharedPageComponents/multiSelectDropdown'

class TracksRightsSets extends Component {
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    getTracksList = (tracks) => {
        const tracksList = tracks.map( (track, i) => {
            return(
                <div draggable="true" class="draggable-track">
                    <i class="material-icons">dehaze</i>{track.trackTitle}
                </div>
            )
        })
        return(tracksList)
    }

    getTracksOptions = (tracks) => {
        const tracksList = tracks.map( (track, i) => {
            return(
                <a className="dropdown-item" key={i} onClick={null}>
                    {track.trackTitle}
                </a>
            )
        })
        return(tracksList)
    }

    getSetsList = () => {
        const rightsSets = this.props.data.map( (rightsSet, i) => {
            return(
                <div className="set-card">
                    <div className="row d-flex col-12 no-gutters">
                        <h3>{rightsSet.description}</h3>
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
                                                {this.getTracksOptions(rightsSet.tracks)}
                                            </ul>
                                        </div>
                                        <div droppable className="track-draggable-area territory-tracks">
                                            {this.getTracksList(rightsSet.tracks)}
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
                                                data={this.props.countries}
                                                id={'territorialRightsCountry'}
                                                onChange={this.props.onChange}
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