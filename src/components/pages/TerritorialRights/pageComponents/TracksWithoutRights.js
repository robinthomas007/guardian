import React, { Component } from 'react';

class TracksWithoutRights extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAllowDrop(e) {
    e.preventDefault();
  }

  handleDrop = e => {
    this.props.handleDropAdd(e);
  };

  handleDrag(e, i, track) {
    let selectedArr = [];
    for (let i = 0; i < this.props.data.length; i++) {
      if (this.state[`check_${this.props.data[i].trackID}`]) {
        selectedArr.push(document.querySelector(`#check_${this.props.data[i].trackID}`));
        let checkName = `check_${this.props.data[i].trackID}`;
        this.setState({ [checkName]: null });
      }
    }
    if (selectedArr.length > 0) {
      for (let j = 0; j < selectedArr.length; j++) {
        e.dataTransfer.setData('text/html', selectedArr[j]);
      }
      this.props.handleChildDrag(selectedArr);
    } else {
      this.props.handleChildDrag([e.target]);
      e.dataTransfer.setData('text/html', e.target);
    }
  }

  toggleChange = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  getTracksList = () => {
    if (this.props.data) {
      const unassignedTracks = this.props.data.map((track, i) => {
        return (
          <div
            key={i}
            draggable="true"
            className="draggable-track unassignedTrack"
            trackindex={i}
            trackid={track.trackID}
            tracktitle={track.trackTitle}
            onDragStart={e => this.handleDrag(e, i, track)}
            id={`check_${track.trackID}`}
          >
            <input
              onChange={this.toggleChange}
              className="track-multi-drag-check"
              checked={this.state[`check_${track.trackID}`]}
              type="checkbox"
              id={`check_${track.trackID}`}
              name={`check_${track.trackID}`}
            />
            <i className="material-icons">dehaze</i>&nbsp;&nbsp;{track.trackTitle}
          </div>
        );
      });
      return unassignedTracks;
    }
  };

  render() {
    return (
      <div
        className="track-draggable-area d-flex flex-column h-100 unassignedTrack"
        onDrop={e => this.handleDrop(e)}
        onDragOver={this.handleAllowDrop}
      >
        <div className="sticky-box">{this.getTracksList()}</div>
      </div>
    );
  }
}

export default TracksWithoutRights;
