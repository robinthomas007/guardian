import React, { useEffect, useState } from 'react';
import BlockingPoliciesModal from '../../modals/BlockingPoliciesModal';
import LoadingImg from 'component_library/LoadingImg';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import youtube from '../../../images/YouTube.png';
import soundcloud from '../../../images/Soundcloud.png';
import facebook from '../../../images/facebook.png';
import instagram from '../../../images/instagram.png';
import tiktok from '../../../images/tiktok.png';
import { Table, Grid, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import _ from 'lodash';
import './BlockingPolicies.css';

function BlockingPoliciesPage(props) {
  const { t } = props;
  const [blockingPolicies, setBlockingPolicies] = useState([]);

  const handlePageDataLoad = () => {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      PagePath: props.match.url ? props.match.url : '',
      ProjectID: props.match.params.projectID,
      languagecode: localStorage.getItem('languageCode') || 'en',
    });

    fetch(window.env.api.url + '/project/review', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        setBlockingPolicies(responseJSON.BlockingPolicySets);
        console.log(responseJSON, 'responseJSONresponseJSON');
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    handlePageDataLoad();
  }, []);

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev, index) {
    ev.dataTransfer.setData('policyData', JSON.stringify({ trackID: ev.target.id, index: index }));
  }

  function drop(ev, index) {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('policyData'));
    let tracks = [];
    blockingPolicies.forEach(element => {
      let track = element.tracks.filter(track => track.trackID === data.trackID);
      if (track.length > 0) tracks = [...tracks, ...track];
    });
    let modifiedPolicies = [...blockingPolicies];
    // adding the track to new set
    modifiedPolicies[index].tracks = [...blockingPolicies[index].tracks, ...tracks];
    // removing track from existing set
    modifiedPolicies[data.index].tracks = _.filter(blockingPolicies[data.index].tracks, val => {
      console.log(data.trackID, val, '1111');
      return data.trackID !== val.trackID;
    });
    setBlockingPolicies(modifiedPolicies);
  }

  return (
    <div className="col-10">
      <BlockingPoliciesModal projectID={props.projectID} t={t} />
      <LoadingImg show={false} />
      <div className="row no-gutters step-description">
        <div className="col-12">
          <h2>
            {t('blocking:Step')} <span className="count-circle">6</span> {t('blocking:PostRelease')}{' '}
            <span className="option-text">({t('blocking:Optional')})</span>
          </h2>
          <p>{t('blocking:DescriptionMain')}</p>
          <p>{t('blocking:NoteMessage')}</p>
        </div>
      </div>
      {blockingPolicies.map((policy, index) => {
        return (
          <div>
            <div className="row no-gutters">
              <div className="col-10">
                <strong className="display-5" style={{ fontSize: 19 }}>
                  Policy {policy.sequence}
                </strong>
              </div>
              <div className="col-2 text-right">
                <button className="btn btn-secondary">
                  + {t('blocking:CreateANewBlockingPolicy')}
                </button>
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-12">
                <Table className="responsive w-100 border mt-2 blk-plcy-table">
                  <thead className="border">
                    <tr>
                      <th>
                        <strong>Track Title</strong> (Tracks are draggable between policies)
                      </th>
                      <th>
                        <strong>Platform</strong>
                      </th>
                      <th className="text-center">
                        <strong>Monetize</strong>
                      </th>
                      <th className="text-center">
                        <strong>Block After Release</strong>
                      </th>
                      <th className="text-center">
                        <strong>Set Duration</strong>
                      </th>
                      <th className="text-center">
                        <strong>Blocked Until</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="track-bg">
                        <div
                          onDrop={e => drop(e, index)}
                          onDragOver={allowDrop}
                          className="drop-area"
                          id={`blk-plcy-drop-${policy.sequence}`}
                        >
                          {policy.tracks.map((track, i) => {
                            return (
                              <div
                                draggable="true"
                                onDragStart={e => drag(e, index)}
                                id={track.trackID}
                                className="bp-tr-list"
                              >
                                <label className="custom-checkbox">
                                  <input className="track-multi-drag-check" type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                                <i className="material-icons">dehaze</i>
                                <span>{track.trackTitle}</span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td colSpan="5" className="p-0">
                        <div>
                          {policy.platformPolicies.map((platform, i) => {
                            const imgObj = {
                              youtube: youtube,
                              soundcloud: soundcloud,
                              facebook: facebook,
                              instagram: instagram,
                              tiktok: tiktok,
                            };
                            return (
                              <div className="d-flex align-items-stretch text-center policy-lp">
                                <div className="plt-img">
                                  <img
                                    src={imgObj[platform.platformName.toLowerCase()]}
                                    alt={platform.platformName.toLowerCase()}
                                  />
                                </div>
                                <div className="monetize">
                                  <Form.Control
                                    type="radio"
                                    checked={platform.block ? false : true}
                                  />
                                </div>
                                <div className="blk-af-rel">
                                  <Form.Control
                                    type="radio"
                                    checked={platform.block ? true : false}
                                  />
                                </div>
                                {platform.block && (
                                  <div className="duration">
                                    <Form.Control as="select"></Form.Control>
                                  </div>
                                )}
                                {platform.block && (
                                  <div className="untill">
                                    <DatePicker
                                      dateFormat="MM/dd/yyyy"
                                      placeholderText="mm/dd/yyyy"
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default withRouter(withTranslation('blocking')(BlockingPoliciesPage));
