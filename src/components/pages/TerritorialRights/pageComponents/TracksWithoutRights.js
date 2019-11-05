import React, { Component } from 'react';

class TracksWithoutRights extends Component {
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    handleAllowDrop(e) {
        e.preventDefault();
    }

    handleDrop = (e) => {
        this.props.handleDropAdd(e)
    }

    handleDrag(e, i, track) {
        this.props.handleChildDrag(e);
        e.dataTransfer.setData("text/html", e.target);
    }

    getTracksList = () => {
        if(this.props.data) {
            const unassignedTracks = this.props.data.map( (track, i) => {
                return(
                    <div 
                        key={i} 
                        draggable="true" 
                        className="draggable-track unassignedTrack" 
                        trackindex={i} 
                        trackid={track.trackID} 
                        tracktitle={track.trackTitle} 
                        onDragStart={(e) => this.handleDrag(e, i, track)} 
                        >
                        <i className="material-icons">dehaze</i>{track.trackTitle}
                    </div>
                )
            })
            return(unassignedTracks)
        }
    };

    render() {
        return(
            <div className="track-draggable-area d-flex flex-column h-100 unassignedTrack" onDrop={ (e) => this.handleDrop(e)} onDragOver={this.handleAllowDrop}>
               <div className="sticky-box">
                {this.getTracksList()}
                </div>
            </div>
        )
    }
};

export default TracksWithoutRights;