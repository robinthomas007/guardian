import React, { useEffect, useState } from 'react';
import LoadingImg from 'component_library/LoadingImg';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Table, Form } from 'react-bootstrap';
import './TerritorialRights.css';

function TerritorialRightsPage(props) {
  const { t } = props;
  const [territorialRights, setTerritorialRights] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [project, setProject] = useState({});
  const [selected, setSelected] = useState([]);

  const rightindex = 0;

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
          responseJSON.TerritorialRightsSets.length > 0 &&
          responseJSON.UnassignedTerritorialRightsSetTracks.length > 0
        ) {
          const blksets = [...responseJSON.TerritorialRightsSets];
          blksets[0].tracks.push(...responseJSON.UnassignedTerritorialRightsSetTracks);
          setTerritorialRights(blksets);
        }
        if (
          responseJSON.TerritorialRightsSets.length > 0 &&
          responseJSON.UnassignedTerritorialRightsSetTracks.length === 0
        ) {
          setTerritorialRights([...responseJSON.TerritorialRightsSets]);
        }
        if (
          responseJSON.TerritorialRightsSets.length === 0 &&
          responseJSON.UnassignedTerritorialRightsSetTracks.length > 0
        ) {
          const blksets = [];
          blksets.push(createRightSet());
          blksets[0].tracks.push(...responseJSON.UnassignedTerritorialRightsSetTracks);
          setTerritorialRights(blksets);
        }
        if (
          responseJSON.TerritorialRightsSets.length === 0 &&
          responseJSON.UnassignedTerritorialRightsSetTracks.length === 0
        ) {
          const blksets = [];
          blksets.push(createRightSet());
          setTerritorialRights(blksets);
        }
        props.setHeaderProjectData(responseJSON);
      })
      .catch(error => {
        console.error(error);
        setShowLoader(false);
      });
  };

  useEffect(() => {
    handlePageDataLoad();
  }, []);

  console.log(territorialRights, 'territorialRightsterritorialRights');
  const createRightSet = () => {
    return {
      territorialRightsSetID: '',
      sequence: '',
      description: '',
      countries: [
        {
          id: 'WW',
          name: this.props.t('territorial:Worldwide'),
        },
      ],
      tracks: [],
      hasRights: true,
    };
  };

  const createANewBlockingPolicy = () => {};

  const deleteBlockingPolicy = () => {};

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev, index) {
    // const id = ev.target.id ? ev.target.id.split('_')[1] : '';
    // ev.dataTransfer.setData('policyData', JSON.stringify({ trackID: id, index: index }));
    // if (selected.length > 0) {
    //   const ele = document.querySelector(`#${ev.target.id} .track-title-name`);
    //   ele.innerHTML = `You are dragging ${selected.length} files`;
    // }
  }

  function drop(ev, index) {
    // ev.preventDefault();
    // const data = JSON.parse(ev.dataTransfer.getData('policyData'));
    // let tracks = [];
    // if (index === data.index) return false;
    // blockingPolicies.forEach(element => {
    //   let track = [];
    //   if (selected.length > 0)
    //     track = element.tracks.filter(track => selected.includes(track.trackID));
    //   else {
    //     track = element.tracks.filter(track => track.trackID === data.trackID);
    //   }
    //   if (track.length > 0) tracks = [...tracks, ...track];
    // });
    // const modifiedPolicies = [...blockingPolicies];
    // adding the track to new set
    // modifiedPolicies[index].tracks = [...blockingPolicies[index].tracks, ...tracks];
    // removing track from existing set
    // const removeTracks = selected.length > 0 ? selected : [data.trackID];
    // modifiedPolicies[data.index].tracks = _.filter(blockingPolicies[data.index].tracks, val => {
    //   return !removeTracks.includes(val.trackID);
    // });
    // setSelected([]);
    // setBlockingPolicies(modifiedPolicies);
  }

  const handleCheckboxChange = (e, trackId, blkIndex) => {
    // if (selectedBlock === null || selectedBlock === blkIndex) {
    //   if (e.target.checked) {
    //     setSelected([...selected, trackId]);
    //   } else {
    //     setSelected(selected.filter(id => id !== trackId));
    //   }
    //   setSelectedBlock(blkIndex);
    // } else {
    //   alert('Select from any 1 Policy block at a time');
    // }
  };

  return (
    <div className="col-10">
      <LoadingImg show={false} />

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
                    <span>{t('blocking:defaultPolicy')}</span>
                  ) : (
                    <span>Rights {rightindex}</span>
                  )}
                </strong>
              </div>
              <div className="col-2 text-right">
                {rightindex === 0 && (
                  <button className="btn btn-secondary" onClick={createANewBlockingPolicy}>
                    + {t('blocking:CreateANewBlockingPolicy')}
                  </button>
                )}
                {rightindex > 0 && (
                  <button
                    className="btn btn-secondary"
                    onClick={e => deleteBlockingPolicy(e, rightindex)}
                  >
                    <i className="material-icons">delete</i>&nbsp;
                    {t('blocking:deleteBlockPolicy')}
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
                                onDragStart={e => drag(e, rightindex)}
                                id={`check_${track.trackID}`}
                                className="bp-tr-list"
                              >
                                <label className="custom-checkbox">
                                  <input
                                    name={`check_${track.trackID}`}
                                    className="track-multi-drag-check"
                                    type="checkbox"
                                    checked={selected.includes(track.trackID)}
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
                      <td colSpan="5" className="p-0"></td>
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

export default withRouter(withTranslation('blocking')(TerritorialRightsPage));
