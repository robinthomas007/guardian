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

    handleDrop = () => {
        alert(123)
    }

    handleDrag(e, i, track) {
        this.props.handleChildDrag(e);
        e.dataTransfer.setData("text/html", e.target);
    }

    getTracksList = () => {
        const unassignedTracks = this.props.data.map( (track, i) => {
            return(
                <div 
                    key={i} 
                    draggable="true" 
                    className="draggable-track" 
                    trackindex={i} 
                    trackid={track.trackID} 
                    tracktitle={track.trackTitle} 
                    onDrop={this.handleDrop} 
                    onDragStart={(e) => this.handleDrag(e, i, track)} 
                    onDragOver={this.handleAllowDrop}
                    >
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