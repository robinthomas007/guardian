import React, { Component } from 'react';

class TracksWithoutRights extends Component {
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    drag(e, i, track) {
        this.props.handleChildDrag(e);
        e.dataTransfer.setData("text/html", e.target);
    }

    getTracksList = () => {
        const unassignedTracks = this.props.data.map( (track, i) => {
            return(
                <div key={i} draggable="true" className="draggable-track" trackindex={i} trackid={track.trackID} tracktitle={track.trackTitle} onDragStart={(e) => this.drag(e, i, track)} >
                    <i className="material-icons">dehaze</i>{track.trackTitle}
                </div>
            )
        })
        return(unassignedTracks)
    };

    render() {
        return(
            <div className="track-draggable-area h-100">
                {this.getTracksList()}
            </div>
        )
    }
};

export default TracksWithoutRights;