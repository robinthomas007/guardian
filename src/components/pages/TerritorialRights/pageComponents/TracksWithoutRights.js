import React, { Component } from 'react';

class TracksWithoutRights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAllNoRights: false,
    };
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
    this.setState({ selectAllNoRights: false });
  }

  toggleChange = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name],
    });
  };

  selectAll = e => {
    const { selectAllNoRights } = this.state;
    for (let i = 0; i < this.props.data.length; i++) {
      let checkName = `check_${this.props.data[i].trackID}`;
      if (!selectAllNoRights) {
        this.setState({ [checkName]: true });
      } else {
        this.setState({ [checkName]: false });
      }
    }
    this.setState({
      selectAllNoRights: !selectAllNoRights,
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
            <label className="custom-checkbox">
              <input
                onChange={this.toggleChange}
                className="track-multi-drag-check"
                checked={this.state[`check_${track.trackID}`]}
                type="checkbox"
                id={`check_${track.trackID}`}
                name={`check_${track.trackID}`}
              />
              <span className="checkmark "></span>
            </label>
            <i className="material-icons">dehaze</i>&nbsp;&nbsp;{track.trackTitle}
          </div>
        );
      });
      return unassignedTracks;
    }
  };

  render() {
    const { selectAllNoRights } = this.state;
    const { data } = this.props;
    return (
      <div
        className="track-draggable-area d-flex flex-column h-100 unassignedTrack"
        onDrop={e => this.handleDrop(e)}
        onDragOver={this.handleAllowDrop}
      >
        {data && data.length > 1 && (
          <div className="select-all">
            <label className="custom-checkbox">
              <input
                onChange={this.selectAll}
                className="track-multi-drag-check"
                checked={selectAllNoRights}
                type="checkbox"
                id="selectAllNoRights"
                name="selectAllNoRights"
              />
              <span className="checkmark "></span>
            </label>
            <span>Select All</span>
          </div>
        )}
        <div className="sticky-box">{this.getTracksList()}</div>
      </div>
    );
  }
}

export default TracksWithoutRights;
