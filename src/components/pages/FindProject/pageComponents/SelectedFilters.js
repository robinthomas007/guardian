import React, { Component } from 'react';

class SelectedFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        audios: [],
      },
    };
  }

  getFilterBubbles = (headerText, bubbles) => {
    return (
      <span>
        <label>{headerText}:</label>
        {bubbles}
      </span>
    );
  };

  formatToDateText = date => {
    let toDate = new Date(date);
    toDate.setHours(0, 0, 0);
    toDate.setDate(toDate.getDate() - 1);
    return (
      (toDate.getMonth() + 1).toString().padStart(2, '0') +
      ' / ' +
      toDate
        .getDate()
        .toString()
        .padStart(2, '0') +
      ' / ' +
      toDate.getFullYear()
    );
  };

  formatFromDateText = date => {
    let toDate = new Date(date);
    toDate.setHours(0, 0, 0);
    toDate.setDate(toDate.getDate() + 1);
    return (
      (toDate.getMonth() + 1).toString().padStart(2, '0') +
      ' / ' +
      toDate
        .getDate()
        .toString()
        .padStart(2, '0') +
      ' / ' +
      toDate.getFullYear()
    );
  };

  getDatebubbles = () => {
    const toDate = this.getToDateFilters();
    const fromDate = this.getFromDateFilters();
    return toDate || fromDate ? (
      <span className="date-bubbles">
        <label>Last Update: </label>
        <div>{fromDate}</div>
        <div>{toDate}</div>
      </span>
    ) : null;
  };

  getLabelFilters = () => {
    let count = 0;
    const labels = this.props.labelFilters.map((label, i) => {
      if (label.checked) {
        count++;
      }
      return label.checked ? (
        <button
          key={i}
          className="btn btn-sm btn-secondary"
          onClick={() => this.props.removeLabelsFilter(label.id)}
        >
          {label.name}
          <i className="material-icons">close</i>
        </button>
      ) : (
        ''
      );
    });
    return count > 0 ? this.getFilterBubbles('Labels', labels) : null;
  };

  getAudioFilters = () => {
    return this.props.filters.hasAudioName
      ? this.getFilterBubbles(
          'Has Audio',
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.props.removeAudioFilter()}
          >
            {this.props.filters.hasAudioName}
            <i className="material-icons">close</i>
          </button>,
        )
      : '';
  };

  getStatusFilters = () => {
    return this.props.filters.statusName
      ? this.getFilterBubbles(
          'Status',
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.props.removeStatusFilter()}
          >
            {this.props.filters.statusName}
            <i className="material-icons">close</i>
          </button>,
        )
      : '';
  };

  getBlockingFilters = () => {
    return this.props.filters.hasBlockingName
      ? this.getFilterBubbles(
          'Blocking',
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.props.removeBlockingFilter()}
          >
            {this.props.filters.hasBlockingName}
            <i className="material-icons">close</i>
          </button>,
        )
      : '';
  };

  getToDateFilters = () => {
    return this.props.filters.to
      ? this.getFilterBubbles(
          'To',
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.props.removeToDateFilter()}
          >
            {this.formatToDateText(this.props.filters.to)}
            <i className="material-icons">close</i>
          </button>,
        )
      : '';
  };

  getFromDateFilters = () => {
    return this.props.filters.from
      ? this.getFilterBubbles(
          'From',
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => this.props.removeFromDateFilter()}
          >
            {this.formatFromDateText(this.props.filters.from)}
            <i className="material-icons">close</i>
          </button>,
        )
      : '';
  };

  componentDidMount() {
    if (this.state.labels !== this.props.data) {
      this.setState({ labels: this.props.data });
    }
  }

  getSelectedFilters = () => {
    const labelFilters = this.getLabelFilters();
    const audioFilters = this.getAudioFilters();
    const statusFilters = this.getStatusFilters();
    const blockingFilters = this.getBlockingFilters();
    const dateFilters = this.getDatebubbles();

    if (labelFilters || audioFilters || statusFilters || blockingFilters || dateFilters) {
      return (
        <div className="selected-filters row d-flex flex-nowrap no-gutters">
          <div className="col-auto">Selected Filters:</div>
          <div className="col-10">
            {labelFilters}
            {audioFilters}
            {statusFilters}
            {blockingFilters}
            {dateFilters}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <ul className="row search-row filters">
        <li className="col-2 d-flex"></li>
        <li className="col-8 d-flex">{this.getSelectedFilters()}</li>
        <li className="col-2 d-flex"></li>
      </ul>
    );
  }
}

export default SelectedFilters;
