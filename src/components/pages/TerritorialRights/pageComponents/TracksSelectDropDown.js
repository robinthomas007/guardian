import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class TrackSelectDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TerritorialRightsSets: [],
    };
  }

  handleTrackSelect = e => {
    this.props.onChange(e);
  };

  getTracksOptions = () => {
    const tracksList = this.props.data.map((track, i) => {
      return (
        <a
          key={i}
          className="dropdown-item"
          onClick={e => this.handleTrackSelect(e, i)}
          optionindex={i}
          setindex={this.props.setIndex}
          tracktitle={track.trackTitle}
          trackid={track.trackID}
        >
          {track.trackTitle}
        </a>
      );
    });
    return tracksList;
  };

  render() {
    const { t, disabled } = this.props;
    return (
      <div className="dropdown tracks-dropdown">
        <button
          type="button"
          id="selectTracksDropdown"
          className="btn btn-secondary dropdown-toggle territory-tracks"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          disabled={disabled}
        >
          {t('territorial:SelectTracksorDragBelow')}
        </button>
        <ul className="dropdown-menu tracks" aria-labelledby="selectTracksDropdown">
          {this.getTracksOptions()}
        </ul>
      </div>
    );
  }
}

export default withTranslation()(TrackSelectDropDown);
