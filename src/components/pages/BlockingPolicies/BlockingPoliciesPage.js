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
import { Duration, showNotyInfo, showNotyAutoError } from './../../Utils';
import moment from 'moment';

import _ from 'lodash';
import './BlockingPolicies.css';

function BlockingPoliciesPage(props) {
  const { t } = props;
  const [blockingPolicies, setBlockingPolicies] = useState([]);
  const [project, setProject] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [selected, setSelected] = useState([]);

  const handlePageDataLoad = () => {
    setShowLoader(true);
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
        setShowLoader(false);
        setProject(responseJSON);
        if (
          responseJSON.BlockingPolicySets.length > 0 &&
          responseJSON.UnassignedBlockingPolicySetTracks.length > 0
        ) {
          const blksets = [...responseJSON.BlockingPolicySets];
          blksets[0].tracks.push(...responseJSON.UnassignedBlockingPolicySetTracks);
          setBlockingPolicies(blksets);
        }
        if (
          responseJSON.BlockingPolicySets.length > 0 &&
          responseJSON.UnassignedBlockingPolicySetTracks.length === 0
        ) {
          setBlockingPolicies([...responseJSON.BlockingPolicySets]);
        }
        if (
          responseJSON.BlockingPolicySets.length === 0 &&
          responseJSON.UnassignedBlockingPolicySetTracks.length > 0
        ) {
          const blksets = [];
          blksets.push(createPolicySet());
          blksets[0].tracks.push(...responseJSON.UnassignedBlockingPolicySetTracks);
          setBlockingPolicies(blksets);
        }
        if (
          responseJSON.BlockingPolicySets.length === 0 &&
          responseJSON.UnassignedBlockingPolicySetTracks.length === 0
        ) {
          const blksets = [];
          blksets.push(createPolicySet());
          setBlockingPolicies(blksets);
        }
        props.setHeaderProjectData(responseJSON);
      })
      .catch(error => {
        console.error(error);
        setShowLoader(false);
      });
  };

  const createPolicySet = () => {
    return {
      blockingPolicySetID: '',
      sequence: blockingPolicies.length > 0 ? blockingPolicies.length + 1 : 1,
      description: '',
      platformPolicies: getPlatforms(),
      tracks: [],
    };
  };

  const getPlatforms = () => {
    return [
      {
        platformName: 'YouTube',
        block: false,
        duration: '',
        expirationDate: '',
      },
      {
        platformName: 'SoundCloud',
        block: false,
        duration: '',
        expirationDate: '',
      },
      {
        platformName: 'Facebook',
        block: false,
        duration: '',
        expirationDate: '',
      },
      {
        platformName: 'Instagram',
        block: false,
        duration: '',
        expirationDate: '',
      },
    ];
  };

  useEffect(() => {
    handlePageDataLoad();
  }, []);

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev, index) {
    ev.dataTransfer.setData('policyData', JSON.stringify({ trackID: ev.target.id, index: index }));
    if (selected.length > 0) {
      const ele = document.querySelector(`#${ev.target.id} .track-title-name`);
      ele.innerHTML = `You are dragging ${selected.length} files`;
    }
  }

  function drop(ev, index) {
    ev.preventDefault();
    const data = JSON.parse(ev.dataTransfer.getData('policyData'));
    let tracks = [];
    if (index === data.index) return false;
    blockingPolicies.forEach(element => {
      let track = [];
      if (selected.length > 0)
        track = element.tracks.filter(track => selected.includes(track.trackID));
      else track = element.tracks.filter(track => track.trackID === data.trackID);

      if (track.length > 0) tracks = [...tracks, ...track];
    });
    const modifiedPolicies = [...blockingPolicies];
    // adding the track to new set
    modifiedPolicies[index].tracks = [...blockingPolicies[index].tracks, ...tracks];
    // removing track from existing set
    const removeTracks = selected.length > 0 ? selected : [data.trackID];
    modifiedPolicies[data.index].tracks = _.filter(blockingPolicies[data.index].tracks, val => {
      return !removeTracks.includes(val.trackID);
    });
    setSelected([]);
    setBlockingPolicies(modifiedPolicies);
  }

  const handleMonetizeBlock = e => {
    const platformindex = e.target.getAttribute('platformindex');
    const policyindex = e.target.getAttribute('policyindex');
    const eTargetValue = e.target.value === 'true' ? true : false;
    const modifiedPolicies = [...blockingPolicies];
    modifiedPolicies[policyindex].platformPolicies[platformindex].block = eTargetValue;
    setBlockingPolicies(modifiedPolicies);
  };

  const handleDurationChange = e => {
    const platformindex = e.target.getAttribute('platformindex');
    const policyindex = e.target.getAttribute('policyindex');
    const eTargetValue = e.target.value;
    const modifiedPolicies = [...blockingPolicies];
    modifiedPolicies[policyindex].platformPolicies[platformindex].duration = eTargetValue;
    setBlockingPolicies(modifiedPolicies);
  };

  const handleDateChange = (date, platformindex, policyindex) => {
    const modifiedPolicies = [...blockingPolicies];
    modifiedPolicies[policyindex].platformPolicies[platformindex].expirationDate = moment(
      date,
    ).format('MM-DD-YYYY');
    setBlockingPolicies(modifiedPolicies);
  };

  const createANewBlockingPolicy = () => {
    const newBlkPolicy = [...blockingPolicies];
    newBlkPolicy.push(createPolicySet());
    setBlockingPolicies(newBlkPolicy);
  };

  const deleteBlockingPolicy = (e, policyindex) => {
    const newBlkPolicy = [...blockingPolicies];
    newBlkPolicy[0].tracks.push(...blockingPolicies[policyindex].tracks);
    newBlkPolicy.splice(policyindex, 1);
    setBlockingPolicies(newBlkPolicy);
  };

  const showNotification = projectID => {
    showNotyInfo(props.t('blocking:NotyInfo'), () => {
      props.history.push({
        pathname: '/reviewSubmit/' + projectID,
      });
    });
  };

  const showNotSavedNotification = () => {
    showNotyAutoError(props.t('blocking:NotyError'));
  };

  const handleSubmit = () => {
    setShowLoader(true);
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    setProject({ ...project, BlockingPolicySets: blockingPolicies });
    const fetchBody = JSON.stringify({
      projectID: props.match.params.projectID,
      BlockingPolicySets: blockingPolicies,
    });

    fetch(window.env.api.url + '/project/blockingpolicies', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        setShowLoader(false);
        if (responseJSON.errorMessage) {
          showNotSavedNotification();
        } else {
          showNotification(props.match.params.projectID);
          props.setHeaderProjectData(project);
          localStorage.setItem('prevStep', 6);
        }
      })
      .catch(error => {
        console.error(error);
        showNotSavedNotification();
        setShowLoader(false);
      });
  };

  const handleCheckboxChange = (e, trackId) => {
    if (e.target.checked) {
      setSelected([...selected, trackId]);
    } else {
      setSelected(selected.filter(id => id !== trackId));
    }
  };

  return (
    <div className="col-10">
      <BlockingPoliciesModal projectID={props.projectID} t={t} />
      <LoadingImg show={showLoader} />
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
      {blockingPolicies.map((policy, policyindex) => {
        return (
          <div>
            <div className="row no-gutters">
              <div className="col-10">
                <strong className="display-5" style={{ fontSize: 19 }}>
                  Policy {policy.sequence}
                </strong>
              </div>
              <div className="col-2 text-right">
                {policyindex === 0 && (
                  <button className="btn btn-secondary" onClick={createANewBlockingPolicy}>
                    + {t('blocking:CreateANewBlockingPolicy')}
                  </button>
                )}
                {policyindex > 0 && (
                  <button
                    className="btn btn-secondary"
                    onClick={e => deleteBlockingPolicy(e, policyindex)}
                  >
                    <i className="material-icons">delete</i>&nbsp;
                    {t('blocking:deleteBlockPolicy')}
                  </button>
                )}
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
                          onDrop={e => drop(e, policyindex)}
                          onDragOver={allowDrop}
                          className="drop-area"
                          id={`blk-plcy-drop-${policy.sequence}`}
                        >
                          {policy.tracks.map((track, i) => {
                            return (
                              <div
                                draggable="true"
                                onDragStart={e => drag(e, policyindex)}
                                id={`check_${track.trackID}`}
                                className="bp-tr-list"
                              >
                                <label className="custom-checkbox">
                                  <input
                                    name={`check_${track.trackID}`}
                                    className="track-multi-drag-check"
                                    type="checkbox"
                                    checked={selected.includes(track.trackID)}
                                    onChange={e => handleCheckboxChange(e, track.trackID)}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                                <i className="material-icons">dehaze</i>
                                <span className="track-title-name">{track.trackTitle}</span>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td colSpan="5" className="p-0">
                        <div>
                          {policy.platformPolicies.map((platform, platformindex) => {
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
                                    onChange={e => handleMonetizeBlock(e)}
                                    platformindex={platformindex}
                                    policyindex={policyindex}
                                    value={false}
                                  />
                                </div>
                                <div
                                  className={`${
                                    platform.block ? 'blk-af-rel' : 'light-gray-bg blk-af-rel'
                                  }`}
                                >
                                  <Form.Control
                                    type="radio"
                                    checked={platform.block ? true : false}
                                    onChange={e => handleMonetizeBlock(e)}
                                    platformindex={platformindex}
                                    policyindex={policyindex}
                                    value={true}
                                  />
                                </div>

                                <div
                                  className={`${
                                    platform.block ? 'duration' : 'light-gray-bg duration'
                                  }`}
                                >
                                  {platform.block && (
                                    <Form.Control
                                      as="select"
                                      value={platform.duration}
                                      onChange={handleDurationChange}
                                      platformindex={platformindex}
                                      policyindex={policyindex}
                                    >
                                      {Duration.map((option, i) => {
                                        return (
                                          <option key={i} value={option.value}>
                                            {option.text}
                                          </option>
                                        );
                                      })}
                                    </Form.Control>
                                  )}
                                </div>
                                <div
                                  className={`${
                                    platform.block ? 'untill' : 'light-gray-bg untill'
                                  }`}
                                >
                                  {platform.block && (
                                    <DatePicker
                                      dateFormat="MM/dd/yyyy"
                                      placeholderText="mm/dd/yyyy"
                                      platformindex={platformindex}
                                      policyindex={policyindex}
                                      onChange={date =>
                                        handleDateChange(date, platformindex, policyindex)
                                      }
                                      selected={
                                        platform.expirationDate != null &&
                                        platform.expirationDate != ''
                                          ? new Date(platform.expirationDate)
                                          : null
                                      }
                                    />
                                  )}
                                </div>
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
      <div className="row save-buttons">
        <div className="col-12">
          <div className="audio-footer-action-fxd">
            <button
              tabIndex="6+"
              id="contactsSaveContButton"
              type="button"
              className="btn btn-primary saveAndContinueButton"
              onClick={e => handleSubmit(e)}
            >
              {t('blocking:Save')} & {t('blocking:Continue')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(withTranslation('blocking')(BlockingPoliciesPage));
