import React, { useEffect, useState } from 'react';
import LoadingImg from 'component_library/LoadingImg';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Table, Form } from 'react-bootstrap';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { showNotyInfo, showNotyAutoError, NO_LABEL_ID } from './../../Utils';
import _ from 'lodash';
import './TerritorialRights.css';

function TerritorialRightsPage(props) {
  const { t } = props;
  const [territorialRights, setTerritorialRights] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [project, setProject] = useState({});
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedDisk, setSelectedDisk] = useState(0);
  const [tracksByDiscs, setTracksByDiscs] = useState([]);

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
        getRights();
        props.setHeaderProjectData(responseJSON);
      })
      .catch(error => {
        console.error(error);
        setShowLoader(false);
      });
  };

  const getRights = () => {
    setShowLoader(true);
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });
    const fetchBody = JSON.stringify({
      ProjectId: props.match.params.projectID,
      IsNewUgcRights: localStorage.prevStep === '4' ? true : false,
      languagecode: localStorage.getItem('languageCode') || 'en',
    });

    fetch(window.env.api.url + '/project/ugcrights', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        const blksets = [];
        if (responseJSON.TerritorialRightsSets.length > 0) {
          blksets.push(...responseJSON.TerritorialRightsSets);
        }
        if (responseJSON.NoRightsTracks.length > 0) {
          updateProjectStatus('4');
          blksets.push(createRightSet());
          let arrObj = responseJSON.NoRightsTracks.map(item => {
            item.IsLockedByUgc = true;
            return item;
          });
          blksets[blksets.length - 1].tracks.push(...arrObj);
          blksets[blksets.length - 1].NoRights = true;
          setTerritorialRights(blksets);
          showNotyAutoError(t('territorial:NotyErrorForOwnRights'));
        } else {
          updateProjectStatus('1');
        }
        setTerritorialRights(blksets);
        setShowLoader(false);
      })
      .catch(error => {
        console.error(error);
        setShowLoader(false);
      });
  };

  const updateProjectStatus = statusId => {
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });
    const fetchBody = JSON.stringify({
      ProjectId: props.match.params.projectID,
      StatusId: statusId,
    });

    fetch(window.env.api.url + '/project/statusnonadmin', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        props.setStatus(
          statusId === '1' ? props.t('territorial:InProgress') : props.t('territorial:NoRights'),
        );
      })
      .catch(error => {
        console.error(error);
        setShowLoader(false);
      });
  };

  useEffect(() => {
    handlePageDataLoad();
  }, []);

  const createRightSet = () => {
    return {
      territorialRightsSetID: '',
      sequence: '',
      description: '',
      countries: [
        {
          id: 'WW',
          name: props.t('territorial:Worldwide'),
        },
      ],
      tracks: [],
      hasRights: true,
    };
  };

  const createANewBlockingPolicy = () => {
    const territorial = [...territorialRights];
    territorial.push(createRightSet());
    setTerritorialRights(territorial);
  };

  const deleteBlockingPolicy = (e, rightIndex) => {
    const newTerr = [...territorialRights];
    newTerr[0].tracks.push(...territorialRights[rightIndex].tracks);
    newTerr.splice(rightIndex, 1);
    setTerritorialRights(newTerr);
  };

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev, index) {
    const id = ev.target.id ? ev.target.id.split('_')[1] : '';
    ev.dataTransfer.setData('rightsData', JSON.stringify({ trackID: id, index: index }));
    if (selectedTracks.length > 0) {
      const ele = document.querySelector(`#${ev.target.id} .track-title-name`);
      ele.innerHTML = `You are dragging ${selectedTracks.length} files`;
    }
  }

  function drop(ev, index) {
    ev.preventDefault();
    if (!ev.dataTransfer.getData('rightsData')) {
      return false;
    }
    const data = JSON.parse(ev.dataTransfer.getData('rightsData'));
    let tracks = [];
    if (index === data.index) return false;
    territorialRights.forEach(element => {
      let track = [];
      if (selectedTracks.length > 0)
        track = element.tracks.filter(track => selectedTracks.includes(track.trackID));
      else {
        track = element.tracks.filter(track => track.trackID === data.trackID);
      }
      if (track.length > 0) tracks = [...tracks, ...track];
    });
    const modifiedTerritorials = [...territorialRights];
    // adding the track to new set
    modifiedTerritorials[index].tracks = [...territorialRights[index].tracks, ...tracks];
    // removing track from existing set
    const removeTracks = selectedTracks.length > 0 ? selectedTracks : [data.trackID];
    modifiedTerritorials[data.index].tracks = _.filter(
      territorialRights[data.index].tracks,
      val => {
        return !removeTracks.includes(val.trackID);
      },
    );
    setSelectedTracks([]);
    setTerritorialRights(modifiedTerritorials);
  }

  const handleCheckboxChange = (e, trackId, blkIndex) => {
    if (selectedBlock === null || selectedBlock === blkIndex) {
      if (e.target.checked) {
        setSelectedTracks([...selectedTracks, trackId]);
      } else {
        setSelectedTracks(selectedTracks.filter(id => id !== trackId));
      }
      setSelectedBlock(blkIndex);
    } else {
      alert('Select from any 1 Policy block at a time');
    }
  };

  useEffect(() => {
    if (selectedTracks.length === 0) {
      setSelectedBlock(null);
    }
  }, [selectedTracks]);

  const handleRightChange = e => {
    const rightIndex = e.target.getAttribute('rightIndex');
    const eTargetValue = e.target.value === 'true' ? true : false;
    const modifiedRights = [...territorialRights];
    modifiedRights[rightIndex].hasRights = eTargetValue;
    setTerritorialRights(modifiedRights);
  };

  const selectTerChange = (data, e) => {
    let hasWolrdWide = false;
    const selectedCountries = data.map(c => {
      if (c.value === 'WW') hasWolrdWide = true;
      return { name: c.label, id: c.value };
    });
    const rightIndex = e.name;
    const modifiedRights = [...territorialRights];
    modifiedRights[rightIndex].countries = hasWolrdWide
      ? selectedCountries.filter(o => o.id === 'WW')
      : selectedCountries.filter(o => o.id !== 'WW');
    setTerritorialRights(modifiedRights);
  };

  const showNotSavedNotification = () => {
    showNotyAutoError(props.t('territorial:NotyError'));
  };

  const showNotification = projectID => {
    showNotyInfo(props.t('territorial:NotyInfo'), () => {
      props.history.push({
        pathname: '/blockingPolicies/' + projectID,
      });
    });
  };

  const removeCountries = (c, rightIndex) => {
    // let hasWolrdWide = false;
    if (c.id === 'WW') {
      // hasWolrdWide = true;
      return false;
    }
    const modifiedRights = [...territorialRights];
    modifiedRights[rightIndex].countries = modifiedRights[rightIndex].countries.filter(
      o => o.id !== c.id,
    );
    if (modifiedRights[rightIndex].countries.length === 0) {
      modifiedRights[rightIndex].countries = [{ name: 'Worldwide', id: 'WW' }];
    }
    setTerritorialRights(modifiedRights);
  };

  const handleSubmit = () => {
    setShowLoader(true);
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    setProject({
      ...project,
      TerritorialRightsSets: territorialRights,
      UnassignedTerritorialRightsSetTracks: [],
    });
    const NoRightsTracks = _.filter(territorialRights, val => val.NoRights);
    const fetchBody = JSON.stringify({
      projectID: props.match.params.projectID,
      TerritorialRightsSets: _.filter(territorialRights, val => !val.NoRights),
      NoRightsTracks: NoRightsTracks.length > 0 ? NoRightsTracks[0].tracks : [],
    });

    fetch(window.env.api.url + '/project/territorialrights', {
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
          localStorage.setItem('prevStep', 5);
        }
      })
      .catch(error => {
        console.error(error);
        showNotSavedNotification();
        setShowLoader(false);
      });
  };

  useEffect(() => {
    let trackByDisc = _.cloneDeep(territorialRights);
    trackByDisc.forEach((ter, i) => {
      let newTracks = [];
      ter.tracks.forEach(track => {
        if (project.Discs && project.Discs[selectedDisk]) {
          let discTrack = project.Discs[selectedDisk].Tracks.filter(
            t => t.trackID === track.trackID,
          );
          if (discTrack.length > 0) newTracks.push(track);
        }
      });
      if (newTracks.length > 0) {
        trackByDisc[i].tracks = newTracks;
        trackByDisc[i].discNo = selectedDisk;
      }
    });
    setTracksByDiscs(trackByDisc);
  }, [territorialRights, selectedDisk]);

  const isReadOnlyUser = props.user.DefaultReleasingLabelID === NO_LABEL_ID ? true : false;

  const getStepNumber = () => {
    if (project.Project && project.Project.mediaType === 2) {
      return 4;
    }
    return 5;
  };

  return (
    <div className="col-10">
      <LoadingImg show={showLoader} />
      <div className="row no-gutters step-description">
        <div className="col-12">
          <h2>
            {t('territorial:step')} <span className="count-circle">{getStepNumber()}</span>
            {t('territorial:TerritorialRights')}
          </h2>
          <p>{t('territorial:DescriptionMain')}</p>
        </div>
        <div className="col-12"></div>
      </div>
      {tracksByDiscs.map((rights, rightindex) => {
        let isDisabled = false;
        isDisabled = rights.NoRights ? true : isDisabled;
        return (
          <div>
            <div className="row no-gutters">
              <div className="col-10">
                <strong className="display-5" style={{ fontSize: 19 }}>
                  {rights.description === 'Default' ? (
                    <span>{t('territorial:defaultRights')}</span>
                  ) : (
                    <span>
                      {t('territorial:Rights')} {rightindex === 0 ? rightindex + 1 : rightindex}
                    </span>
                  )}
                </strong>
              </div>
              <div className="col-2 text-right">
                {rightindex === 0 && project.Project.mediaType !== 2 && (
                  <button className="btn btn-secondary" onClick={createANewBlockingPolicy}>
                    + {t('territorial:CreateANewBlockingRights')}
                  </button>
                )}
                {rightindex > 0 && (
                  <button
                    className="btn btn-secondary"
                    onClick={e => !isDisabled && deleteBlockingPolicy(e, rightindex)}
                  >
                    <i className="material-icons">delete</i>&nbsp;
                    {t('territorial:deleteRule')}
                  </button>
                )}
              </div>
            </div>
            <div className="row no-gutters">
              <div className="col-12">
                <Table className="responsive w-100 border mt-2 ter-right-table">
                  <thead className="border">
                    <tr>
                      <th>
                        <strong>{t('territorial:TrackTitle')}</strong> (
                        {t('territorial:TrackTitledrag')})
                      </th>
                      <th>
                        <strong>{t('territorial:RightsRule')}</strong>
                      </th>
                      <th>
                        <strong>{t('territorial:SelectTerritories')}</strong>
                      </th>
                      <th>
                        <strong>{t('territorial:SelectedTerritories')}</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="track-bg">
                        {project.Project.mediaType !== 2 && (
                          <div className="ter-tab-wrapper">
                            {project.Discs &&
                              project.Discs.map((disc, index) => {
                                return (
                                  <div
                                    onClick={() => setSelectedDisk(index)}
                                    className={`${
                                      selectedDisk === index ? 'active ter-tabs' : 'ter-tabs'
                                    }`}
                                  >
                                    {t('territorial:Disc') + ' ' + (index + 1)}
                                  </div>
                                );
                              })}
                          </div>
                        )}
                        <div
                          onDrop={e => drop(e, rightindex)}
                          onDragOver={allowDrop}
                          className="drop-area"
                          id={`blk-plcy-drop-${rights.sequence}`}
                        >
                          {rights.tracks && rights.tracks.length === 0 && (
                            <p className="drag-track-info">{t('territorial:DragTracksHere')}</p>
                          )}
                          {rights.discNo !== selectedDisk && (
                            <p className="drag-track-info">
                              {t('territorial:noTrackInDisk')} {selectedDisk + 1}
                            </p>
                          )}
                          {rights.discNo === selectedDisk &&
                            rights.tracks.map((track, i) => {
                              isDisabled = track.IsLockedByUgc ? true : isDisabled;
                              return (
                                <div
                                  key={i}
                                  draggable="true"
                                  onDragStart={e => !track.IsLockedByUgc && drag(e, rightindex)}
                                  id={`check_${track.trackID}`}
                                  className={
                                    rights.NoRights ? 'blocked-tracks bp-tr-list' : 'bp-tr-list'
                                  }
                                >
                                  <label className="custom-checkbox">
                                    <input
                                      disabled={isDisabled}
                                      name={`check_${track.trackID}`}
                                      className="track-multi-drag-check"
                                      type="checkbox"
                                      checked={selectedTracks.includes(track.trackID)}
                                      onChange={e =>
                                        handleCheckboxChange(e, track.trackID, rightindex)
                                      }
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
                        <div className="d-flex p-5">
                          <div className="rights-input-wrap">
                            <div className="rights-input">
                              <Form.Control
                                type="radio"
                                checked={rights.hasRights ? true : false}
                                onChange={e => handleRightChange(e)}
                                rightIndex={rightindex}
                                value={true}
                                disabled={isDisabled}
                              />
                              <label>{t('territorial:HasRights')}</label>
                            </div>
                            <div className="rights-input">
                              <Form.Control
                                type="radio"
                                checked={!rights.hasRights ? true : false}
                                onChange={e => handleRightChange(e)}
                                rightIndex={rightindex}
                                value={false}
                                disabled={isDisabled}
                              />
                              <label>{t('territorial:NoRights')}</label>
                            </div>
                          </div>
                          <div className="select-ter">
                            <ReactMultiSelectCheckboxes
                              disabled={isDisabled}
                              value={rights.countries.map(c => {
                                return { label: c.name, value: c.id };
                              })}
                              name={rightindex}
                              placeholderButtonLabel="Select Territory"
                              onChange={(data, e) => !isDisabled && selectTerChange(data, e)}
                              options={project.Countries.map(c => {
                                return { label: c.name, value: c.id };
                              })}
                            />
                          </div>
                          <div className="selected-ter">
                            {rights.countries.map(c => {
                              return (
                                <span>
                                  {c.name}{' '}
                                  <i
                                    className="material-icons"
                                    onClick={() => !isDisabled && removeCountries(c, rightindex)}
                                  >
                                    close
                                  </i>
                                </span>
                              );
                            })}
                          </div>
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
      {!isReadOnlyUser && (
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
      )}
    </div>
  );
}

export default withRouter(withTranslation('territorial')(TerritorialRightsPage));
