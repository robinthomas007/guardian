import React, { Component } from 'react';

class TracksWithoutRights extends Component {
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    getTracksList = () => {
        const unassignedTracks = this.props.data.map( (track, i) => {
            return(
                <div draggable="true" class="draggable-track">
                    <i class="material-icons">dehaze</i>{track.trackTitle}
                </div>
            )
        })
        return(unassignedTracks)
    };

    render() {
        return(
            <div class="track-draggable-area h-100">
                {this.getTracksList()}
            </div>
        )
    }
};

export default TracksWithoutRights;