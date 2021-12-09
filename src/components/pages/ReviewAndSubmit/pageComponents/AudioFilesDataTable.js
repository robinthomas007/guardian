import React, { Component } from 'react';
import moment from 'moment';

class AudioFilesDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getAudioFileTableData() {
    if (this.props.data) {
      return this.props.data.map((track, i) => {
        return (
          <tr key={i} className="row no-gutters">
            <td className="col-1 text-center">{track.trackNumber}</td>
            <td className="col-2">{track.fileName}</td>
            <td className="col-2">{track.trackTitle}</td>
            <td className="col-2">{track.isrc}</td>
            <td className="col-2">{track.artist}</td>
            <td className="col-1 text-center">
              <label className="custom-checkbox">
                {track.isSingle ? (
                  <input disabled type="checkbox" checked />
                ) : (
                  <input disabled type="checkbox" />
                )}
                <span className="static-checkmark"></span>
              </label>
            </td>
            <td className="col-2 text-center">
              {track.isSingle || track.trackReleaseDate !== ''
                ? `${moment.utc(track.trackReleaseDate).format('MM-DD-YYYY hh:mm A')} UTC`
                : 'TBD'}
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr className="row no-gutters">
            <th className="col-1 text-center">#</th>
            <th className="col-2">Audio File</th>
            <th className="col-2">Track Title</th>
            <th className="col-2">ISRC</th>
            <th className="col-2">Artist</th>
            <th className="col-1 text-center">Single</th>
            <th className="col-2 text-center">Release Date</th>
          </tr>
        </thead>
        <tbody>{this.getAudioFileTableData()}</tbody>
      </table>
    );
  }
}

export default AudioFilesDataTable;
