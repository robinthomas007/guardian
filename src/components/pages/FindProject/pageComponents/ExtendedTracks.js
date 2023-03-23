import React, { useEffect } from 'react';
import './ExtendedTracks.css';
import { Table, Tabs, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Toggle from '../../../../component_library/Toggle';
import _ from 'lodash';
import youtube from '../../../../images/YouTube.png';
import soundcloud from '../../../../images/Soundcloud.png';
import facebook from '../../../../images/facebook.png';
import instagram from '../../../../images/instagram.png';
import tiktok from '../../../../images/tiktok.png';
import acrcloud from '../../../../images/acrcloud.png';
import audibleMagic from '../../../../images/audibleMagic.png';
import block from '../../../../images/block.png';
import snap from '../../../../images/snap.png';
import spectrum from '../../../../images/spectrum.png';
import moment from 'moment';
import LoadingImg from '../../../../component_library/LoadingImg';

const ExtendDeliveryInfo = ({ orderPartnerDetails }) => {
  return (
    <tr className="dws-wrapper-tr">
      <td colSpan={10} className="wrapper-td white-bg">
        <div className="ext-tracks-wrapper">
          <DeliverInfo orderPartnerDetails={orderPartnerDetails} />
        </div>
      </td>
    </tr>
  );
};

const DeliverInfo = ({ orderPartnerDetails }) => {
  return (
    <Table className="ext-tracks-table white-bg dws-table" responsive bgcolor="#fff">
      <thead>
        <tr className="white-bg">
          <th style={{ width: '50%' }}></th>
          <th>Partner</th>
          <th>First Delivery Date</th>
          <th>Last Delivery Date</th>
        </tr>
      </thead>
      <tbody>
        {orderPartnerDetails.map((order, i) => {
          const imgObj = {
            YOUTUBE: youtube,
            soundcldfingerprintrbd: soundcloud,
            FACEBOOK: facebook,
            instagram: instagram,
            tiktokugc: tiktok,
            audiblemagicblock: audibleMagic,
            audiblemagicspectrum: audibleMagic,
            acrcloudresgsc: acrcloud,
            audiblesnapugc: snap,
          };
          return (
            <tr className="white-bg" key={i}>
              <td style={{ width: '50%' }}></td>
              <td>
                <div className="plt-img">
                  <img
                    className="partner-img"
                    src={imgObj[order.shortname]}
                    alt={order.shortname}
                  />
                  {order.shortname === 'audiblemagicblock' && (
                    <img src={block} alt={order.shortname} />
                  )}
                  {order.shortname === 'audiblemagicspectrum' && (
                    <img src={spectrum} alt={order.shortname} />
                  )}
                </div>
              </td>
              <td>
                {moment(order.firstDeliveryDate).isValid()
                  ? moment(order.firstDeliveryDate).format('DD/MM/YYYY')
                  : order.firstDeliveryDate}
              </td>
              <td>
                {moment(order.lastDeliveryDate).isValid()
                  ? moment(order.lastDeliveryDate).format('DD/MM/YYYY')
                  : order.lastDeliveryDate}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const Tracks = ({
  tracks,
  project,
  onIsPublishToggle,
  extendedTrackIds,
  expandTracks,
  dwsOrderInfo,
}) => {
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
          <th>{t('track:Deliver')}</th>
          <th className="status text-center">{t('track:HasRights')}</th>
          <th>{t('track:Deliver')}?</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track, i) => {
          const dwsData = dwsOrderInfo.filter(dws => track.isrc === dws.Isrc);
          return (
            <React.Fragment key={track.trackID}>
              <tr>
                <td>{i + 1}</td>
                <td>{track.fileName}</td>
                <td>{track.trackTitle}</td>
                <td>{track.isrc}</td>
                <td>{track.artist}</td>
                <td>
                  <i className="material-icons">{track.isSingle ? 'check' : 'close'}</i>
                </td>
                <td>{track.trackReleaseDate || t('track:TBD')}</td>
                <td>
                  {dwsData.length > 0 && (
                    <button
                      className="btn btn-sm btn-secondary btn-collapse"
                      onClick={() => expandTracks(track.trackID)}
                      title="Open Tracks"
                      type="button"
                      disabled={false}
                    >
                      {dwsData[0].OrderStatus}
                      <i className="material-icons">
                        {extendedTrackIds.includes(track.trackID)
                          ? 'arrow_drop_up'
                          : 'arrow_drop_down'}
                      </i>
                    </button>
                  )}
                  {dwsData.length === 0 && (
                    <button
                      className="btn btn-sm btn-secondary btn-collapse"
                      type="button"
                      disabled={false}
                    >
                      None
                    </button>
                  )}
                </td>
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
              {extendedTrackIds.includes(track.trackID) ? (
                <ExtendDeliveryInfo
                  track={track}
                  orderPartnerDetails={dwsData[0].OrderPartnerDetails}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

const Discs = ({
  discs,
  project,
  onIsPublishToggle,
  extendedTrackIds,
  expandTracks,
  dwsOrderInfo,
}) => {
  const { t } = useTranslation();
  return (
    <Tabs defaultActiveKey={discs[0].discNumber}>
      {discs.map(disc => (
        <Tab
          key={disc.discNumber}
          eventKey={disc.discNumber}
          title={t('track:Disc') + ' ' + disc.discNumber}
        >
          <Tracks
            tracks={disc.Tracks}
            project={project}
            expandTracks={expandTracks}
            extendedTrackIds={extendedTrackIds}
            onIsPublishToggle={onIsPublishToggle}
            dwsOrderInfo={dwsOrderInfo}
          />
        </Tab>
      ))}
    </Tabs>
  );
};

export default ({ discs, project, onIsPublishToggle, expandedProjectIds }) => {
  const [extendedTrackIds, setExtendedTrackIds] = React.useState([]);
  const [dwsOrderInfo, setDwsOrderInfo] = React.useState([]);
  const [loading, seLoading] = React.useState(false);

  const expandTracks = trackId => {
    if (!extendedTrackIds.includes(trackId)) {
      setExtendedTrackIds([...extendedTrackIds, trackId]);
    } else {
      const tracks = extendedTrackIds.filter(id => id !== trackId);
      setExtendedTrackIds(tracks);
    }
  };

  useEffect(() => {
    (async () => {
      let isrcList = [];
      discs.forEach(disc => {
        const isrc = _.map(disc.Tracks, 'isrc');
        isrcList = [...isrcList, ...isrc];
      });
      seLoading(true);
      const fetchHeaders = new Headers({
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('accessToken'),
      });

      const fetchBody = JSON.stringify({
        Isrc: isrcList,
      });
      try {
        const response = await fetch(window.env.api.url + '/project/search/dwsorder', {
          method: 'POST',
          headers: fetchHeaders,
          body: fetchBody,
        });
        const res = await response.json();
        setDwsOrderInfo(res.DwsOrderInfo);
        seLoading(false);
      } catch (err) {
        console.log(err, 'Error in DWS API');
        seLoading(false);
      }
    })();
  }, []);

  const renderTracks = () => {
    if (discs.length > 1) {
      return (
        <Discs
          discs={discs}
          project={project}
          extendedTrackIds={extendedTrackIds}
          expandTracks={expandTracks}
          onIsPublishToggle={onIsPublishToggle}
          dwsOrderInfo={dwsOrderInfo}
        />
      );
    } else {
      return (
        <Tracks
          tracks={discs[0].Tracks}
          project={project}
          extendedTrackIds={extendedTrackIds}
          expandTracks={expandTracks}
          onIsPublishToggle={onIsPublishToggle}
          dwsOrderInfo={dwsOrderInfo}
        />
      );
    }
  };

  return (
    <tr className="wrapper-tr">
      <td colSpan={13} className="wrapper-td">
        <LoadingImg show={loading} />
        <div className="ext-tracks-wrapper">{renderTracks()}</div>
      </td>
    </tr>
  );
};
