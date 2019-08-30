import React, { Component } from 'react';

class TracksDropArea extends Component {
    constructor(props) {
		super(props);
		this.state = {
        }
    }

    handleAllowDrop(e) {
        e.preventDefault();
    }

    getTracksList = (tracks) => {
        const tracksList = this.props.data.map( (track, i) => {
            return(
                <div key={i} draggable="true" class="draggable-track">
                    <i class="material-icons">dehaze</i>{track.trackTitle}
                </div>
            )
        })
        return(tracksList)
    }

    render() {
        return(
            <div droppable className="track-draggable-area territory-tracks" onDrop={(e) => this.props.handleDrop(e, this.props.setIndex)} onDragOver={this.handleAllowDrop}>
                {this.getTracksList()}
            </div>
        )
    }
}

export default TracksDropArea;

