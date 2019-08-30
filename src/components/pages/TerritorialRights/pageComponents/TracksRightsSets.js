import React, { Component } from 'react';
import MultiSelectDropDown from '../../../SharedPageComponents/multiSelectDropdown';
import TracksRightsRule from '../../TerritorialRights/pageComponents/TracksRightsRule';
import TracksSelectDropDown from '../../TerritorialRights/pageComponents/TracksSelectDropDown';
import TracksDropArea from '../../TerritorialRights/pageComponents/TracksDropArea';

class TracksRightsSets extends Component {
    constructor(props) {
		super(props);
		this.state = {
            TerritorialRightsSets : []
        }

        this.handleDrop = this.handleDrop.bind(this);
    }

    getTracksList = (tracks) => {
        const tracksList = tracks.map( (track, i) => {
            return(
                <div key={i} draggable="true" class="draggable-track">
                    <i class="material-icons">dehaze</i>{track.trackTitle}
                </div>
            )
        })
        return(tracksList)
    }

    handleTrackSelect = (e, i) => {
        const { TerritorialRightsSets } = this.props.data;
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
     }

    handleDrop(e, i) {

        const { TerritorialRightsSets } = this.props.data;
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
            modifiedTerritorialRightsSets[i].tracks.push( {trackID : this.props.dragSource.getAttribute('trackid'), trackTitle : this.props.dragSource.getAttribute('tracktitle')} )

        this.props.handleChange(modifiedTerritorialRightsSets);
        var data = e.dataTransfer.getData("text/html");

        this.props.handleChildDrop();
    }

    getSetsList = () => {
        const rightsSets = this.props.data.TerritorialRightsSets.map( (rightsSet, i) => {
            return(
                <div key={i} className="set-card">
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
  
                                        <TracksSelectDropDown 
                                            data={this.props.data.UnassignedTracks}
                                        />

                                        {/* <div droppable className="track-draggable-area territory-tracks" onDrop={(e) => this.drop(e, i)} onDragOver={this.allowDrop}>
                                            {this.getTracksList(rightsSet.tracks)}
                                        </div> */}

                                        <TracksDropArea 
                                            data={rightsSet.tracks}
                                            handleDrop={this.handleDrop}
                                            setIndex={i}

                                        />
                                    </td>
                                    <td className="col-4">
                                        <TracksRightsRule 
                                            data={rightsSet.hasRights}
                                        />
                                    </td>
                                    <td className="col-4">
                                        <div className="dropdown">
                                            <MultiSelectDropDown 
                                                placeHolder={'Select Country'}
                                                data={this.props.data.Countries}
                                                id={'territorialRightsCountry'}
                                                onChange={this.props.handleChange}
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