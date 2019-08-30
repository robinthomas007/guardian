import React, { Component } from 'react';

class TrackSelectDropDown extends Component {
    constructor(props) {
		super(props);
		this.state = {
            TerritorialRightsSets : []
        }
    }

    handleTrackSelect = (e) => {
        this.props.onChange(e);
    }

    getTracksOptions = () => {
        const tracksList = this.props.data.map( (track, i) => {
            return(
                <a key={i} className="dropdown-item" onClick={ (e) => this.handleTrackSelect(e, i) } setindex={this.props.setIndex} tracktitle={track.trackTitle} trackid={track.trackID}>
                    {track.trackTitle}
                </a>
            )
        })
        return(tracksList)
    }

    render() {
        return(
            <div className="dropdown tracks-dropdown">
                <button type="button" id="selectTracksDropdown" className="btn btn-secondary dropdown-toggle territory-tracks" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select Tracks or Drag Below
                </button>
                <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
                    {this.getTracksOptions()}
                </ul>
            </div>
        )
    }
}

export default TrackSelectDropDown;