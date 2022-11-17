import React, { useEffect, useState } from 'react';
import LoadingImg from 'component_library/LoadingImg';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Table, Form } from 'react-bootstrap';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { showNotyInfo, showNotyAutoError } from './../../Utils';
import _ from 'lodash';
import './TerritorialRights.css';

function TerritorialRightsPage(props) {
  const { t } = props;
  const [territorialRights, setTerritorialRights] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [project, setProject] = useState({});
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

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
        if (responseJSON.UnassignedTracks.length > 0) {
          blksets.push(createRightSet());
          blksets[0].tracks.push(...responseJSON.UnassignedTracks);
          blksets[0].unAssigned = true;
          setTerritorialRights(blksets);
        }
        if (responseJSON.NoRightsTracks.length > 0) {
          updateProjectStatus('4');
          blksets.push(createRightSet());
          let arrObj = responseJSON.NoRightsTracks.map(item => {
            item.IsLockedByUgc = true;
            return item;
          });
          blksets[blksets.length - 1].tracks.push(...arrObj);
          blksets[blksets.length - 1].hasRights = false;
          blksets[blksets.length - 1].isUgc = true;
          blksets[blksets.length - 1].NoRights = true;
          setTerritorialRights(blksets);
          showNotyAutoError(
            'We do not own the rights to one or more of the tracks in your project. Please remove them from your project or correct the rights status outside of the Guardian to continue.',
          );
        } else {
          updateProjectStatus('1');
        }
        if (responseJSON.TerritorialRightsSets.length > 0) {
          let arrObj = responseJSON.TerritorialRightsSets.map(item => {
            item.isUgc = true;
            item.territorial = true;
            return item;
          });
          blksets.push(...arrObj);
          setTerritorialRights(blksets);
        }
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
        props.setStatus(statusId === '1' ? 'In Progress' : 'No Rights');
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
    if (data.index === 0 && index > 0) {
      modifiedTerritorials[index].territorial = true;
      delete modifiedTerritorials[index].unAssigned;
    }
    if (index === 0 && data.index > 0) {
      modifiedTerritorials[index].unAssigned = true;
      delete modifiedTerritorials[index].territorial;
    }
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
      TerritorialRightsSets: _.filter(territorialRights, val => val.territorial),
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

  return (
    <div className="col-10">
      <LoadingImg show={showLoader} />

      <div className="row no-gutters step-description">
        <div className="col-12">
          <h2>
            {t('territorial:step')} <span className="count-circle">5</span>
            {t('territorial:TerritorialRights')}
          </h2>
          <p>{t('territorial:DescriptionMain')}</p>
        </div>
      </div>
      {territorialRights.map((rights, rightindex) => {
        return (
          <div>
            <div className="row no-gutters">
              <div className="col-10">
                <strong className="display-5" style={{ fontSize: 19 }}>
                  {rightindex === 0 ? (
                    <span>{t('territorial:defaultRights')}</span>
                  ) : (
                    <span>Rights {rightindex}</span>
                  )}
                </strong>
              </div>
              <div className="col-2 text-right">
                {rightindex === 0 && (
                  <button className="btn btn-secondary" onClick={createANewBlockingPolicy}>
                    + {t('territorial:CreateANewBlockingRights')}
                  </button>
                )}
                {rightindex > 0 && (
                  <button
                    className="btn btn-secondary"
                    onClick={e => !rights.isUgc && deleteBlockingPolicy(e, rightindex)}
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
                        <strong>Track Title</strong> (Tracks are draggable between policies)
                      </th>
                      <th>
                        <strong>Rights Rule</strong>
                      </th>
                      <th>
                        <strong>Select Territories</strong>
                      </th>
                      <th>
                        <strong>Selected Territories</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="track-bg">
                        <div
                          onDrop={e => drop(e, rightindex)}
                          onDragOver={allowDrop}
                          className="drop-area"
                          id={`blk-plcy-drop-${rights.sequence}`}
                        >
                          {rights.tracks && rights.tracks.length === 0 && (
                            <p className="drag-track-info">
                              Drag tracks here from any other policy set
                            </p>
                          )}
                          {rights.tracks.map((track, i) => {
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
                                disabled={rights.isUgc}
                              />
                              <label>Has Rights</label>
                            </div>
                            <div className="rights-input">
                              <Form.Control
                                type="radio"
                                checked={!rights.hasRights ? true : false}
                                onChange={e => handleRightChange(e)}
                                rightIndex={rightindex}
                                value={false}
                                disabled={rights.isUgc}
                              />
                              <label>No Rights</label>
                            </div>
                          </div>
                          <div className="select-ter">
                            <ReactMultiSelectCheckboxes
                              disabled={rights.isUgc}
                              value={rights.countries.map(c => {
                                return { label: c.name, value: c.id };
                              })}
                              name={rightindex}
                              placeholderButtonLabel="Select Territory"
                              onChange={(data, e) => !rights.isUgc && selectTerChange(data, e)}
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
                                    onClick={() => !rights.isUgc && removeCountries(c, rightindex)}
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

export default withRouter(withTranslation('territorial')(TerritorialRightsPage));
