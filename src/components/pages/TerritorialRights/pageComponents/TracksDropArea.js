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

    handleDrag(e, i, track) {
        this.props.handleChildDrag(e);
        e.dataTransfer.setData("text/html", e.target);
    }

    handleDrop(e,setIndex) {
        if(!this.props.dragSource.classList.contains('rightsSetTracks') || !e.target.classList.contains('rightsSetTracks')) {
            this.props.handleDrop(e, setIndex)
        }
    }

    getTracksList = (tracks) => {
        const tracksList = this.props.data.map( (track, i) => {
            return(
                <div 
                    key={i} 
                    draggable="true" 
                    className="draggable-track rightsSetTracks" 
                    onDragStart={ (e) => this.handleDrag(e)}
                    setindex={this.props.setIndex}
                    trackindex={i} 
                    trackid={track.trackID} 
                    tracktitle={track.trackTitle} 
                >
                    <i className="material-icons">dehaze</i>{track.trackTitle}
                </div>
            )
        })

        return(tracksList)
    }

    render() {
        return(
            <div droppable="true" className="track-draggable-area territory-tracks rightsSetTracks" onDrop={(e) => this.handleDrop(e, this.props.setIndex)} onDragOver={this.handleAllowDrop}>
                {this.getTracksList()}
            </div>
        )
    }
}

export default TracksDropArea;

