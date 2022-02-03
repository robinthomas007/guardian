import React from 'react';
import './ExtendedTracks.css';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Tracks = ({ tracks }) => {
  const { t } = useTranslation();
  return (
    <Table className="ext-tracks-table" responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('track:FileName')}</th>
          <th>{t('track:TrackTitle')}</th>
          <th>{t('track:ISRC')}</th>
          <th>{t('track:Artist')}</th>
          <th>{t('track:Single')}</th>
          <th>{t('track:ReleaseDate')}</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, i) => (
          <tr key={track.trackID}>
            <td>{i + 1}</td>
            <td>{track.fileName}</td>
            <td>{track.trackTitle}</td>
            <td>{track.isrc}</td>
            <td>{track.artist}</td>
            <td>
              <i className="material-icons">{track.isSingle ? 'check' : 'close'}</i>
            </td>
            <td>{track.trackReleaseDate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Discs = ({ discs }) => {
  return (
    <Tabs defaultActiveKey={discs[0].discNumber}>
      {discs.map(disc => (
        <Tab key={disc.discNumber} eventKey={disc.discNumber} title={'Disc' + disc.discNumber}>
          <Tracks tracks={disc.Tracks} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default ({ projectID, discs, handleClose }) => {
  const renderTracks = () => {
    if (discs.length > 1) {
      return <Discs discs={discs} />;
    } else {
      return <Tracks tracks={discs[0].Tracks} />;
    }
  };

  return (
    <tr className="wrapper-tr">
      <td colSpan={13} className="wrapper-td">
        <span class="material-icons close" onClick={() => handleClose(projectID)}>
          close
        </span>
        <div className="table-wrapper">{renderTracks()}</div>
      </td>
    </tr>
  );
};
