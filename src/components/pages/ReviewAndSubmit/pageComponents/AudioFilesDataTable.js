import React, { Component } from 'react';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

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
            <td className="col-2 aud-fle-name" title={track.fileName}>
              {track.fileName}
            </td>
            <td className="col-2">{track.trackTitle}</td>
            <td className="col-2">{track.isrc}</td>
            <td className="col-2">{track.artist}</td>
            {this.props.mediaType !== 2 && (
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
            )}
            <td className="col-2 text-center">
              {track.trackReleaseDate !== ''
                ? `${moment.utc(track.trackReleaseDate).format('MM-DD-YYYY hh:mm A')} UTC`
                : 'TBD'}
            </td>
          </tr>
        );
      });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <table className="table">
        <thead>
          <tr className="row no-gutters">
            <th className="col-1 text-center">#</th>
            <th className="col-2">
              {this.props.mediaType !== 2 ? t('review:AudioFile') : t('review:VideoFile')}
            </th>
            <th className="col-2">{t('review:TrackTitle')}</th>
            <th className="col-2">{t('review:ISRC')}</th>
            <th className="col-2">{t('review:Artist')}</th>
            {this.props.mediaType !== 2 && (
              <th className="col-1 text-center">{t('review:Single')}</th>
            )}
            <th className="col-2 text-center">{t('review:ReleaseDate')}</th>
          </tr>
        </thead>
        <tbody>{this.getAudioFileTableData()}</tbody>
      </table>
    );
  }
}

export default withTranslation()(AudioFilesDataTable);
