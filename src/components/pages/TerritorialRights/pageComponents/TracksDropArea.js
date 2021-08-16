import React, { Component } from 'react';

class TracksDropArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAllNoRights: false,
    };
  }

  handleAllowDrop(e) {
    e.preventDefault();
  }

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

  handleDrop(e, setIndex) {
    const { dragSource } = this.props;
    let isValid = false;
    for (let i = 0; i < dragSource.length; i++) {
      if (
        !dragSource[i].classList.contains('rightsSetTracks') ||
        !e.target.classList.contains('rightsSetTracks')
      ) {
        isValid = true;
      }
    }
    if (isValid) this.props.handleDrop(e, setIndex);
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

  getTracksList = tracks => {
    const tracksList = this.props.data.map((track, i) => {
      return (
        <div
          key={i}
          draggable="true"
          className="draggable-track rightsSetTracks"
          onDragStart={e => this.handleDrag(e)}
          setindex={this.props.setIndex}
          trackindex={i}
          trackid={track.trackID}
          tracktitle={track.trackTitle}
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

    return tracksList;
  };

  render() {
    const { data } = this.props;
    const { selectAllNoRights } = this.state;
    return (
      <div
        droppable="true"
        className="track-draggable-area territory-tracks rightsSetTracks"
        onDrop={e => this.handleDrop(e, this.props.setIndex)}
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

        {this.getTracksList()}
      </div>
    );
  }
}

export default TracksDropArea;
