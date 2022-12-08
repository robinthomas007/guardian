import React from 'react';
import './ExtendedTracks.css';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Toggle from '../../../../component_library/Toggle';

const Tracks = ({ tracks, project, onIsPublishToggle }) => {
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
          <th className="status text-center">{t('track:HasRights')}</th>
          <th>{t('track:Deliver')}?</th>
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
            <td>{track.trackReleaseDate || t('track:TBD')}</td>
            <td className="status text-center">
              {track.nonExclusive ? (
                <i className="material-icons warning">report_problem</i>
              ) : (
                <i className="material-icons success">verified_user</i>
              )}
            </td>
            <td>
              <Toggle
                defaultChecked={Boolean(track.isPublish)}
                onChange={() => onIsPublishToggle(project, track.trackID)}
                disabled={project.status === 'In Progress'}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Discs = ({ discs, project, onIsPublishToggle }) => {
  const { t } = useTranslation();
  return (
    <Tabs defaultActiveKey={discs[0].discNumber}>
      {discs.map(disc => (
        <Tab
          key={disc.discNumber}
          eventKey={disc.discNumber}
          title={t('track:Disc') + ' ' + disc.discNumber}
        >
          <Tracks tracks={disc.Tracks} project={project} onIsPublishToggle={onIsPublishToggle} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default ({ discs, project, onIsPublishToggle }) => {
  const renderTracks = () => {
    if (discs.length > 1) {
      return <Discs discs={discs} project={project} onIsPublishToggle={onIsPublishToggle} />;
    } else {
      return (
        <Tracks tracks={discs[0].Tracks} project={project} onIsPublishToggle={onIsPublishToggle} />
      );
    }
  };

  return (
    <tr className="wrapper-tr">
      <td colSpan={13} className="wrapper-td">
        <div className="ext-tracks-wrapper">{renderTracks()}</div>
      </td>
    </tr>
  );
};
