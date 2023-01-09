import React, { useEffect, useState, useRef } from 'react';
import { Table, Modal, Form } from 'react-bootstrap';
import './AuditModal.css';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import moment from 'moment';
import { connect, useSelector } from 'react-redux';
import * as auditAction from 'actions/auditAction';
import { withRouter } from 'react-router-dom';
import LoadingImg from 'component_library/LoadingImg';
import ReactToPrint from 'react-to-print';
import tiktok from '../../images/tiktok.png';

const getCountries = countries => {
  return _.map(countries, 'name').toString();
};

const renderStep1Table = project => {
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>UPC</th>
          <th>Project Title</th>
          <th>Artist</th>
          <th>Project Type</th>
          <th>Label</th>
          <th>Release Date</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{project.upc}</td>
          <td>{project.projectTitle}</td>
          <td>{project.projectArtistName}</td>
          <td>{project.projectType}</td>
          <td>{project.projectReleasingLabel}</td>
          <td>{project.projectReleaseDate}</td>
          <td>{project.projectNotes}</td>
        </tr>
      </tbody>
    </Table>
  );
};

const renderStep2Table = project => {
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Project Security</th>
          <th className="text-center">Masked</th>
          <th>Primary Contact</th>
          <th>Primary Contact Email</th>
          <th>Additional Contacts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{project.projectSecurity}</td>
          <td className="text-center">
            <label className="custom-checkbox">
              <input
                id="projectReleaseDateTBD"
                className="form-control"
                type="checkbox"
                checked={project.isMasked}
              />
              <span className="checkmark "></span>
            </label>
          </td>
          <td>{project.projectPrimaryContact}</td>
          <td>{project.projectPrimaryContactEmail}</td>
          <td>{project.projectAdditionalContacts}</td>
        </tr>
      </tbody>
    </Table>
  );
};

const renderStep3UploadTable = AudioFiles => {
  const audioFileData = _.map(AudioFiles, (item, key) => {
    return (
      <tr>
        <td>{key + 1}</td>
        <td>{item.FileName}</td>
        <td>{item.FileSize}</td>
        <td>{item.FileFormat}</td>
        <td className="text-center completed-icon">
          {item.IsCompleted ? (
            <i className="material-icons success">verified_user</i>
          ) : (
            <i className="material-icons success">verified_user</i>
          )}
        </td>
      </tr>
    );
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Upload Order</th>
          <th>File Name</th>
          <th>File Size</th>
          <th>Format</th>
          <th className="text-center">Completed</th>
        </tr>
      </thead>
      <tbody>{audioFileData}</tbody>
    </Table>
  );
};

const renderStep3TrackTable = Discs => {
  const trackData = _.map(Discs, Disc => {
    return _.map(Disc.Tracks, track => {
      return (
        <tr>
          <td>{Disc.discNumber}</td>
          <td>{track.trackNumber}</td>
          <td>{track.fileName}</td>
          <td>{track.trackTitle}</td>
          <td>{track.isrc}</td>
          <td>{track.artist}</td>
        </tr>
      );
    });
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Disc</th>
          <th>Track</th>
          <th>File Name</th>
          <th>Track Title</th>
          <th>ISRC</th>
          <th>Artist</th>
        </tr>
      </thead>
      <tbody>{trackData}</tbody>
    </Table>
  );
};

const renderStep4TrackTable = Discs => {
  const trackData = _.map(Discs, Disc => {
    return _.map(Disc.Tracks, track => {
      return (
        <tr>
          <td>{Disc.discNumber}</td>
          <td>{track.trackNumber}</td>
          <td>{track.fileName}</td>
          <td>{track.trackTitle}</td>
          <td>{track.isrc}</td>
          <td>{track.artist}</td>
          <td className="text-center">
            <label className="custom-checkbox">
              <input
                id="projectReleaseDateTBD"
                className="form-control"
                type="checkbox"
                checked={track.isSingle}
              />
              <span className="checkmark "></span>
            </label>
          </td>
          <td>{track.trackReleaseDate ? track.trackReleaseDate : 'TBD'}</td>
        </tr>
      );
    });
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Disc</th>
          <th>Track</th>
          <th>File Name</th>
          <th>Track Title</th>
          <th>ISRC</th>
          <th>Artist</th>
          <th className="text-center">Single</th>
          <th>Release Date</th>
        </tr>
      </thead>
      <tbody>{trackData}</tbody>
    </Table>
  );
};

const renderStep5RightsTable = TerritorialRightsSets => {
  const TerritorialRightsSetsData = _.map(TerritorialRightsSets, Rights => {
    return _.map(Rights.tracks, track => {
      return (
        <tr>
          <td>{Rights.sequence}</td>
          <td>{track.trackID}</td>
          <td>{track.trackTitle}</td>
          <td>{Rights.hasRights ? 'Only Has Rights In' : 'Everywhere Except'}</td>
          <td>{getCountries(Rights.countries)}</td>
        </tr>
      );
    });
  });
  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Set #</th>
          <th>Track</th>
          <th>Track Title</th>
          <th>Rights Rule</th>
          <th>Countries</th>
        </tr>
      </thead>
      <tbody>{TerritorialRightsSetsData}</tbody>
    </Table>
  );
};

const renderStep6BlockingPolicyTable = (blockingPolicies, t) => {
  const blockingPoliciesData = _.map(blockingPolicies, blocking => {
    const platforms = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper social-icons">
          <span>
            {platform.platformName.toLowerCase() !== 'tiktok' && (
              <span
                className={`platform-sprite small ${platform.platformName.toLowerCase()}`}
              ></span>
            )}
            {platform.platformName.toLowerCase() === 'tiktok' && (
              <img alt="tiktok" src={tiktok} style={{ width: '80%', paddingLeft: '10px' }} />
            )}
          </span>
        </div>
      );
    });

    const trackTitle = _.map(blocking.tracks, track => {
      return (
        <div className="td-bottom-line-div">
          <span>{track.trackTitle}</span>
        </div>
      );
    });

    const trackId = _.map(blocking.tracks, track => {
      return (
        <div className="td-bottom-line-div">
          <span>{track.trackID}</span>
        </div>
      );
    });

    const setId = _.map(blocking.tracks, () => {
      return (
        <div className="td-bottom-line-div">
          <span>{blocking.sequence}</span>
        </div>
      );
    });

    const Monetize = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper">
          <span>
            {!platform.block && (
              <label className="custom-checkbox">
                <input
                  id="projectReleaseDateTBD"
                  className="form-control"
                  type="checkbox"
                  checked={true}
                />
                <span className="checkmark "></span>
              </label>
            )}
          </span>
        </div>
      );
    });

    const duration = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper">
          <span>{platform.duration}</span>
        </div>
      );
    });

    const blockUntil = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper">
          <span>
            {platform.block
              ? !platform.duration && !platform.expirationDate
                ? !platform.expirationDate
                  ? t('review:BlockAll')
                  : t('review:BlockAllUntil') + ' ' + platform.expirationDate
                : t('review:Block') +
                  ' ' +
                  (platform.expirationDate
                    ? ' ' +
                      t('review:Until') +
                      ' ' +
                      moment(platform.expirationDate).format('DD-MM-YYYY')
                    : ' ' + t('Always') + ' ')
              : t('review:MonetizeAll')}
          </span>
        </div>
      );
    });

    const Block = _.map(blocking.platformPolicies, platform => {
      return (
        <div className="platform-wrapper">
          <span>
            {platform.block && (
              <label className="custom-checkbox">
                <input
                  id="projectReleaseDateTBD"
                  className="form-control"
                  type="checkbox"
                  checked={true}
                />
                <span className="checkmark "></span>
              </label>
            )}
          </span>
        </div>
      );
    });

    return (
      <tr>
        <td className="audit-5-custom-td">{setId}</td>
        <td className="audit-5-custom-td">{trackId}</td>
        <td className="audit-5-custom-td border-right">{trackTitle}</td>
        <td className="audit-5-custom-td"> {platforms}</td>
        <td className="audit-5-custom-td text-center">{Monetize}</td>
        <td className="audit-5-custom-td text-center">{Block}</td>
        <td className="audit-5-custom-td text-center">{duration}</td>
        <td className="audit-5-custom-td text-center">{blockUntil}</td>
      </tr>
    );
  });

  return (
    <Table className="responsive">
      <thead>
        <tr>
          <th>Set #</th>
          <th>Track</th>
          <th>Track Title</th>
          <th className="text-center">Platform</th>
          <th className="text-center">Monetize</th>
          <th className="text-center">Block</th>
          <th className="text-center">Duration</th>
          <th className="text-center">Block Until</th>
        </tr>
      </thead>
      <tbody>{blockingPoliciesData}</tbody>
    </Table>
  );
};

const Audit = props => {
  const { show, onHide, project, audit } = props;
  const [auditData, setauditData] = useState([]);
  const [selectedFilter, setFilter] = useState({
    checkBoxAll: true,
    checkBoxStep_1_2: false,
    checkBoxStep_3: false,
    checkBoxStep_4: false,
    checkBoxStep_5: false,
    checkBoxStep_6: false,
    checkBoxStep_7: false,
  });
  const { t } = useTranslation();
  const exportRef = useRef(null);

  useEffect(() => {
    if (project.projectID) {
      // const backdrop = document.querySelector('.modal-backdrop');
      // backdrop.style.background = 'transparent';
      const user = JSON.parse(sessionStorage.getItem('user'));
      props.getAuditData({
        User: {
          email: user.email,
        },
        ProjectId: project.projectID,
      });
    }
  }, []);

  useEffect(() => {
    if (audit.length > 0) {
      setauditData(audit);
    }
  }, [audit]);

  // useEffect(
  //   () => () => {
  //     const backdrop = document.querySelector('.modal-backdrop');
  //     backdrop.style.background = '#000000';
  //   },
  //   [],
  // );

  const handleChangeStepFilter = e => {
    setFilter({
      ...selectedFilter,
      [e.target.id]: e.target.checked ? true : false,
      checkBoxAll: e.target.id !== 'checkBoxAll' ? false : e.target.checked ? true : false,
    });
    let dataArr = [];
    let checkedSteps = [];
    let keys = Object.keys(selectedFilter);

    let filtered = keys.filter(function(key) {
      return selectedFilter[key];
    });

    if (e.target.checked) {
      filtered.forEach(el => {
        const steps = el.split('_').splice(1);
        checkedSteps.push(...steps);
      });

      const steps = e.target.id ? e.target.id.split('_').splice(1) : [];
      steps.push(...checkedSteps);
      _.map(steps, item => {
        const data = _.filter(audit, val => val.StepId === parseInt(item));
        dataArr.push(...data);
      });
    } else {
      let filteredArr = filtered.filter(val => val !== e.target.id);
      if (filteredArr.length === 0) {
        dataArr = audit;
        setFilter({ checkBoxAll: true });
      }
      filteredArr.forEach(el => {
        const steps = el.split('_').splice(1);
        checkedSteps.push(...steps);
      });
      _.map(checkedSteps, item => {
        const data = _.filter(audit, val => val.StepId === parseInt(item));
        dataArr.push(...data);
      });
    }
    if (e.target.id === 'checkBoxAll' && e.target.checked) {
      setFilter({
        checkBoxStep_1_2: false,
        checkBoxStep_3: false,
        checkBoxStep_4: false,
        checkBoxStep_5: false,
        checkBoxStep_6: false,
        checkBoxStep_7: false,
      });
      dataArr = audit;
    }
    setauditData(_.orderBy(dataArr, ['StepId'], ['asc']));
  };

  return (
    <Modal
      dialogClassName="new clas"
      fullscreen={true}
      scrollable={true}
      className="test"
      id="AuditModal"
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <div className="row filter-head">
          <div className="col-3">
            <h3>Audit Trail for {project ? project.projectTitle : ''}</h3>
          </div>
          <div className="col-8">
            <div className="display-filter">
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">Display</Form.Label>
                <label className="custom-checkbox"></label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">All </Form.Label>
                <label className="custom-checkbox">
                  <input
                    id="checkBoxAll"
                    className="form-control"
                    type="checkbox"
                    onChange={handleChangeStepFilter}
                    checked={selectedFilter.checkBoxAll}
                  />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">
                  Step <span className="round-step-circle light-blue">1</span> / Step{' '}
                  <span className="round-step-circle light-blue">2</span>
                </Form.Label>
                <label className="custom-checkbox">
                  <input
                    id="checkBoxStep_1_2"
                    className="form-control"
                    type="checkbox"
                    onChange={handleChangeStepFilter}
                    checked={selectedFilter.checkBoxStep_1_2}
                  />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">
                  Step <span className="round-step-circle light-blue">3</span>
                </Form.Label>
                <label className="custom-checkbox">
                  <input
                    id="checkBoxStep_3"
                    className="form-control"
                    type="checkbox"
                    onChange={handleChangeStepFilter}
                    checked={selectedFilter.checkBoxStep_3}
                  />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">
                  Step <span className="round-step-circle light-blue">4</span>
                </Form.Label>
                <label className="custom-checkbox">
                  <input
                    id="checkBoxStep_4"
                    className="form-control"
                    type="checkbox"
                    onChange={handleChangeStepFilter}
                    checked={selectedFilter.checkBoxStep_4}
                  />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">
                  Step <span className="round-step-circle light-blue">5</span>
                </Form.Label>
                <label className="custom-checkbox">
                  <input
                    id="checkBoxStep_5"
                    className="form-control"
                    type="checkbox"
                    onChange={handleChangeStepFilter}
                    checked={selectedFilter.checkBoxStep_5}
                  />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">
                  Step <span className="round-step-circle light-blue">6</span>
                </Form.Label>
                <label className="custom-checkbox">
                  <input
                    id="checkBoxStep_6"
                    className="form-control"
                    type="checkbox"
                    onChange={handleChangeStepFilter}
                    checked={selectedFilter.checkBoxStep_6}
                  />
                  <span className="checkmark "></span>
                </label>
              </div>
              <div className="col-auto">
                <Form.Label className="col-form-label tbd text-nowrap">
                  Step <span className="round-step-circle light-blue">7</span>
                </Form.Label>
                <label className="custom-checkbox">
                  <input
                    id="checkBoxStep_7"
                    className="form-control"
                    type="checkbox"
                    onChange={handleChangeStepFilter}
                    checked={selectedFilter.checkBoxStep_7}
                  />
                  <span className="checkmark "></span>
                </label>
              </div>
            </div>
          </div>
          <div className="col-1">
            <ReactToPrint
              content={() => exportRef.current}
              trigger={() => (
                <button className="btn btn-secondary" type="button">
                  <span>
                    <i className="material-icons">description</i> {t('search:Export')}
                  </span>
                </button>
              )}
            />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body ref={exportRef} className="custom-scroll">
        <LoadingImg show={props.loading} />
        <div className="row">
          {_.map(auditData, item => {
            return (
              <div className="col-12">
                {item.StepId === 2 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">1</span>/{' '}
                      <span className="round-step-circle">2</span>
                      On {moment(item.CreatedDateTime).format('DD/MM/YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} created a new
                      project, {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep1Table(item.Project)}
                  </div>
                )}
                {item.StepId === 2 && renderStep2Table(item.Project)}

                {item.StepId === 3 && item.ActionType === 'Upload' && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">3</span>
                      On {moment(item.CreatedDateTime).format('DD/MM/YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} uploaded the
                      following files:{' '}
                    </div>
                    {renderStep3UploadTable(item.AudioFiles)}
                  </div>
                )}
                {item.StepId === 3 && item.ActionType === 'Save' && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">3</span>
                      On {moment(item.CreatedDateTime).format('DD/MM/YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 3
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep3TrackTable(item.Discs)}
                  </div>
                )}
                {item.StepId === 4 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">4</span>
                      On {moment(item.CreatedDateTime).format('DD/MM/YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 4
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep4TrackTable(item.Discs)}
                  </div>
                )}
                {item.StepId === 5 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">5</span>
                      On {moment(item.CreatedDateTime).format('DD/MM/YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 5
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep5RightsTable(item.TerritorialRightsSets)}
                  </div>
                )}
                {item.StepId === 6 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">6</span>
                      On {moment(item.CreatedDateTime).format('DD/MM/YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} saved Step 6
                      for {item.Project.projectTitle} with the following values:{' '}
                    </div>
                    {renderStep6BlockingPolicyTable(item.BlockingPolicySets, t)}
                  </div>
                )}
                {item.StepId === 7 && (
                  <div>
                    <div className="table-sub-head">
                      step <span className="round-step-circle">7</span>
                      On {moment(item.CreatedDateTime).format('DD/MM/YYYY')} at{' '}
                      {moment(item.CreatedDateTime).format('hh:mm a')}.{item.UserName} has changed
                      the status to {item.Project.projectStatus} for {item.Project.projectTitle}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  getAuditData: val => dispatch(auditAction.getAuditData(val)),
});

const mapStateToProps = state => ({
  audit: state.auditReducer.audit,
  loading: state.auditReducer.loading,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Audit),
);
