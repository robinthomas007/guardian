import React, { Component } from 'react';
import HaveAudioModal from '../../modals/HaveAudioModal';
import ReplaceAudioModal from '../../modals/ReplaceAudioModal';
import { withRouter } from 'react-router';
import './AudioFiles.css';
import LoadingImg from 'component_library/LoadingImg';
import { reduxForm } from 'redux-form';
import AudioFilesTabbedTracks from '../AudioFiles/pageComponents/audioFilesTabbedTracks';
import { connect } from 'react-redux';
import * as uploadProgressActions from 'redux/uploadProgressAlert/actions';
import {
  isDuplicateItem,
  isDuplicateISRC,
  showNotyError,
  showNotyAutoError,
  NO_LABEL_ID,
} from '../../Utils';
import _ from 'lodash';
import { showNotyInfo, isValidIsrc } from 'components/Utils';
import * as releaseAction from './../ReleaseInformation/releaseAction';
import * as AudioActions from '../../../actions/audioActions';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import ConfirmModal from 'components/modals/ConfirmModal';

class AudioFilesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectID: '',
      projectData: {},
      files: [],
      discs: [],
      activeTab: 0,
      pageTableData: [],
      showReplaceAudioModal: false,
      replaceTrackIndex: null,
      modalAction: 'Replace',
      showLoader: false,
      diskToDelete: null,
      project: {
        Project: {
          projectID: '',
          projectTitle: '',
          projectTypeID: '',
          projectType: '',
          projectArtistName: '',
          projectReleasingLabelID: '',
          projectReleasingLabel: '',
          projectReleaseDate: '',
          projectReleaseDateTBD: false,
          projectPrimaryContact: '',
          projectPrimaryContactEmail: '',
          projectAdditionalContacts: '',
          projectNotes: '',
          projectSecurityID: '',
          projectSecurity: '',
          projectStatusID: '',
          projectStatus: '',
          projectCoverArtFileName: '',
          projectCoverArtBase64Data: '',
        },
      },
    };

    this.showReplaceAudioModal = this.showReplaceModal.bind(this);
    this.hideReplaceAudioModal = this.hideReplaceAudioModal.bind(this);

    this.showNotification = this.showNotification.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDataSubmit = this.handleDataSubmit.bind(this);
    this.resequencePageTableData = this.resequencePageTableData.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);

    this.addTrack = this.addTrack.bind(this);
    this.addDisc = this.addDisc.bind(this);
    this.checkIsrc = this.checkIsrc.bind(this);
  }

  checkIsrc() {
    const { discs, activeTab } = this.state;
    let isrcs = _.map(discs[activeTab].Tracks, 'isrc');
    const user = JSON.parse(sessionStorage.getItem('user'));
    let isrcsField = document.getElementsByClassName('trackIsrcField');
    let isValidForm = true;
    isrcs = isrcs.filter(n => n);

    for (var i = 0; i < isrcsField.length; i++) {
      if (!isValidIsrc(isrcsField[i].value)) {
        isValidForm = false;
      }
    }
    if (isrcs.length > 0 && isValidForm) {
      this.props.isrcCheck({ User: { email: user.email }, isrcs: isrcs });
      this.props.getCisData({
        upc: _.get(this.state.project, 'Project.upc', ''),
        Iscrs: isrcs,
        ProjectId: this.props.match.params.projectID,
        mediaType: 1,
      });
    }
  }

  checkIsrcOnBlur = isrc => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.props.isrcCheck({ User: { email: user.email }, isrcs: [isrc] });
    this.props.getCisData({
      Iscrs: [isrc],
      ProjectId: this.props.match.params.projectID,
      mediaType: 1,
    });
  };

  showReplaceModal(track, i, upload) {
    this.setState({
      showReplaceAudioModal: true,
      replaceTrackIndex: i,
      modalAction: upload ? upload : 'Replace',
    });
  }

  hideReplaceAudioModal() {
    this.setState({ showReplaceAudioModal: false, modalAction: 'Replace' });
  }

  getTrack(track, trackIndex) {
    const { projectData } = this.state;

    return {
      artist: track.artist
        ? track.artist
        : projectData.projectArtistName
        ? projectData.projectArtistName
        : '',
      discNumber: track.discNumber ? track.discNumber : '',
      fileName: track.fileName ? track.fileName : '',
      hasUpload: track.hasUpload ? track.hasUpload : false,
      isrc: track.isrc ? track.isrc : '',
      isSingle: track.isSingle ? track.isSingle : false,
      trackID: track.trackID ? track.trackID : '',
      trackNumber: track.trackID ? track.trackID : trackIndex,
      trackReleaseDate: track.trackReleaseDate
        ? track.trackReleaseDate
        : projectData.projectReleaseDate,
      trackTitle: track.trackTitle ? track.trackTitle : '',
      fileUpload: track.fileUpload ? track.fileUpload : false,
    };
  }

  handleChange(track, updatedData, rowID) {
    const { discs } = this.state;
    let modifiedDiscs = discs;

    const tracksList = updatedData.map((track, i) => this.getTrack(track, i + 1));

    modifiedDiscs[track.discNumber] = {
      discNumber: track.discNumber + 1,
      Tracks: tracksList,
    };

    this.setState({ discs: modifiedDiscs });
  }

  showNotification(saveAndContinue) {
    const projectID = this.state.projectID ? this.state.projectID : '';

    showNotyInfo(this.props.t('audio:trackSaved'), () => {
      if (saveAndContinue) {
        this.props.history.push({
          pathname: '/trackInformation/' + projectID,
        });
      }
    });
  }

  isValidAudioType(fileName) {
    const validFiles = {
      wav: 1,
      mp3: 1,
      flac: 1,
    };

    const fileNameParts = fileName.toLowerCase().split('.');
    if (validFiles[fileNameParts[fileNameParts.length - 1]]) {
      return true;
    } else {
      return false;
    }
  }

  updateFile = e => {
    let newFiles = Array.from(e.target.files);
    const { discs } = this.state;
    let filename = newFiles[0].name.split(/\.(?=[^\.]+$)/)[0] + '.flac';
    if (this.isDuplicateFilename(filename)) {
      showNotyAutoError('Duplicate Audio File');
    } else {
      let updatedDiscs = discs;
      updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].fileName = filename;
      updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].hasUpload = false;
      updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].fileUpload = true;

      const trackID =
        updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].trackID;
      this.handleFileUpload(newFiles, trackID);
      this.setState({
        discs: updatedDiscs,
        replaceTrackIndex: null,
      });
      this.props.saveDiscs(_.cloneDeep(updatedDiscs));
      this.hideReplaceAudioModal();
    }
  };

  isDuplicateFilename = fileName => {
    const { discs } = this.state;
    return discs.some(disc => disc.Tracks.some(track => track.fileName === fileName));
  };

  updateFiles = e => {
    const { discs, activeTab } = this.state;
    let newFiles = Array.from(e.target.files);
    let modifiedDiscs = discs;
    for (var i = 0; i < newFiles.length; i++) {
      let filename = newFiles[i].name.split(/\.(?=[^\.]+$)/)[0] + '.flac';
      if (this.isValidAudioType(filename)) {
        let newTrack = {
          fileName: filename,
          fileUpload: true,
        };
        if (this.isDuplicateFilename(filename)) {
          newFiles.splice(i, 1);
          showNotyAutoError('Duplicate Audio File');
        } else {
          modifiedDiscs[activeTab].Tracks.push(
            this.getTrack(newTrack, modifiedDiscs[activeTab].Tracks.length),
          );
          this.setState({ discs: modifiedDiscs });
          this.props.saveDiscs(_.cloneDeep(modifiedDiscs));
        }
      } else {
        newFiles.splice(i, 1);
      }
    }
    this.handleFileUpload(newFiles);
  };

  deleteRow(rowIndex) {
    const { discs } = this.state;
    const modifiedDiscs = discs;
    modifiedDiscs[this.state.activeTab].Tracks.splice(rowIndex, 1);
    this.setState({ discs: modifiedDiscs });
  }

  diskDeleteConfirmation = (e, discIndex) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ diskToDelete: discIndex });
  };

  deleteDisc = discIndex => {
    const { discs, diskToDelete } = this.state;
    const newState = {
      discs: discs.filter((disc, i) => i !== discIndex),
      diskToDelete: null,
    };
    if (discIndex === diskToDelete) {
      newState.activeTab = 0;
    }
    this.setState(newState);
  };

  hideFileUploadingIndicator(fileName) {
    let uploadingIndicator = document.getElementById(`${fileName}_ico`);
    if (uploadingIndicator) {
      uploadingIndicator.style.display = 'none';
    }
  }

  removeTrack = (fileName, trackID) => {
    const { discs, activeTab } = this.state;
    let modifiedDiscs = discs;
    if (trackID) {
      const newTracks = discs[activeTab].Tracks.map(track => {
        if (track.trackID === trackID) {
          return { ...track, fileName: '', fileUpload: false, hasUpload: false };
        } else {
          return track;
        }
      });
      modifiedDiscs[activeTab].Tracks = newTracks;
    } else {
      const newTracks = discs[activeTab].Tracks.filter(
        track => !(track.fileName === fileName && track.trackID === ''),
      );
      modifiedDiscs[activeTab].Tracks = newTracks;
    }
    this.setState({ discs: modifiedDiscs });
    // this.props.saveDiscs(_.cloneDeep(modifiedDiscs));
  };

  handleFileUpload(files, trackID) {
    const { onUploadStart, onUploadProgress, onUploadComplete } = this.props;
    const removeTrack = this.removeTrack;
    const projectID = this.state.projectID ? this.state.projectID : '';
    files.map(file => {
      const uniqFileName = `${file.name}-${new Date().getTime()}/${trackID ? trackID : ''}`;
      onUploadStart(uniqFileName, trackID);
      let formData = new FormData();
      // formData.append('file', renameFile(file, file.name.split(/\.(?=[^\.]+$)/)[0] + '.flac'));
      formData.append('file', file);
      let request = new XMLHttpRequest();
      request.open('POST', window.env.api.url + '/media/api/Upload');
      request.setRequestHeader('Authorization', sessionStorage.getItem('accessToken'));
      request.setRequestHeader('Project-Id', projectID);
      request.setRequestHeader('Track-Id', trackID ? trackID : '');
      // upload progress event
      request.upload.addEventListener('progress', function(e) {
        // upload progress as percentage
        let percent_completed = (e.loaded / e.total) * 100;
        onUploadProgress(uniqFileName, Math.round(percent_completed));
      });

      // request finished event
      request.addEventListener('load', e => {
        onUploadComplete(uniqFileName);
        if (request.status >= 300) {
          showNotyError(this.props.t('audio:UploadingFailed'), 3);
          removeTrack(file.name, trackID);
        }
      });

      request.send(formData);
    });
  }

  resequencePageTableData(dragSource, dragTarget) {
    const { discs } = this.state;

    let modifiedDiscs = discs;

    let sourceData = modifiedDiscs[this.state.activeTab].Tracks[dragSource].fileName;
    let targetData = modifiedDiscs[this.state.activeTab].Tracks[dragTarget].fileName;

    modifiedDiscs[this.state.activeTab].Tracks[dragTarget].fileName = sourceData;
    modifiedDiscs[this.state.activeTab].Tracks[dragSource].fileName = targetData;

    this.setState({ discs: modifiedDiscs });
  }

  setTrackSequence() {
    const { discs } = this.state;
    const sortedDiscs = discs.map(disc => {
      let newTracks = disc.Tracks.map((track, i) => ({ ...track, trackNumber: i + 1 }));
      console.log('newTracks', newTracks);
      return { ...disc, Tracks: newTracks };
    });
    this.setState({ discs: sortedDiscs });
  }

  setifUpcData(data) {
    if (this.props.upcData) {
      const { project } = this.state;
      const { upcData } = this.props;
      if (upcData.ExDiscs && upcData.ExDiscs.length > 0) {
        const upcDisc = [];
        upcData.ExDiscs.forEach((disc, i) => {
          let existingDisc = _.filter(data, val => val.discNumber === disc.discNumber);
          const obj = {};
          obj['discNumber'] = disc.discNumber;
          obj['Tracks'] = _.cloneDeep(disc.ExTracks);
          disc.ExTracks.forEach((track, i) => {
            if (project.Project.projectReleaseDate) {
              obj['Tracks'][i].trackReleaseDate = project.Project.projectReleaseDate;
            } else {
              obj['Tracks'][i].isTbdDisabled = true;
            }
          });
          if (existingDisc.length > 0) {
            obj['Tracks'] = [...new Set([...existingDisc[0].Tracks, ...obj['Tracks']])];
            obj['Tracks'] = _.uniqBy(obj['Tracks'], v => [v.isrc, v.trackTitle].join());
          }
          upcDisc.push(obj);
          let hasOtherDisc = _.filter(data, val => val.discNumber !== disc.discNumber);
          if (hasOtherDisc.length > 0) {
            hasOtherDisc.forEach((Otherdisc, i) => {
              upcDisc.push(Otherdisc);
            });
          }
        });
        this.setState({ discs: _.cloneDeep(upcDisc) });
        const isrcs = [];
        upcDisc.forEach(disc => {
          let trackIsrcs = _.map(disc.Tracks, 'isrc');
          isrcs.push(...trackIsrcs);
        });
        const prevPage = JSON.parse(localStorage.getItem('prevStep'));
        if (prevPage <= 2) {
          this.props.getCisData({
            upc: _.get(project, 'Project.upc', ''),
            Iscrs: isrcs,
            ProjectId: this.props.match.params.projectID,
            mediaType: 1,
          });
        }
      } else {
        let upc = _.get(project, 'Project.upc', '');
        upc && this.props.findUpc({ upc: upc, mediaType: 1 });
      }
    }
  }

  handleDataLoad() {
    const { discs } = this.state;
    this.setState({ showLoader: true });
    const fetchHeaders = new Headers({
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      PagePath: this.props.match.url ? this.props.match.url : '',
      ProjectID: this.props.match.params.projectID ? this.props.match.params.projectID : '',
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
        this.setState({
          project: _.cloneDeep(responseJSON),
          projectData: responseJSON.Project,
        });
        if (responseJSON.Discs && responseJSON.Discs.length > 0) {
          this.setState({
            pageTableData: responseJSON.Discs[this.state.activeTab].Tracks,
          });
          if (discs.length === 0) {
            this.setState({
              discs: responseJSON.Discs,
            });
          }
        } else {
          this.addDisc();
        }
        this.props.setHeaderProjectData(this.state.project);
        this.setifUpcData(_.cloneDeep(responseJSON.Discs));
        this.setState({ showLoader: false });
      })
      .catch(error => {
        this.setState({ showLoader: false });
        console.error(error);
      });
  }

  isValidTitle(title) {
    return title.length > 0 ? true : false;
  }

  setFieldValidation(input, status) {
    if (status === 'is-invalid') {
      input.className = input.className.replace('is-invalid', '') + ' is-invalid';
    } else {
      input.className = input.className.replace('is-invalid', '');
    }
  }

  isValidForm() {
    let isrcs = document.getElementsByClassName('trackIsrcField');
    let trackTitles = document.getElementsByClassName('trackTitleField');
    let isValidForm = true;

    let isrcValues = [];
    for (var x = 0; x < isrcs.length; x++) {
      isrcValues.push(isrcs[x].value);
    }

    for (var i = 0; i < isrcs.length; i++) {
      if (!isValidIsrc(isrcs[i].value) || isDuplicateItem(isrcValues, isrcs[i].value)) {
        this.setFieldValidation(isrcs[i], 'is-invalid');
        isValidForm = false;
      } else {
        this.setFieldValidation(isrcs[i], 'is-valid');
      }

      if (!this.isValidTitle(trackTitles[i].value)) {
        this.setFieldValidation(trackTitles[i], 'is-invalid');
        isValidForm = false;
      } else {
        this.setFieldValidation(trackTitles[i], 'is-valid');
      }
    }
    return isValidForm;
  }

  saveAudioApi(saveAndContinue) {
    const projectID = this.state.projectID ? this.state.projectID : '';

    this.setState({ showLoader: true });

    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      projectID: projectID,
      isAudioPage: true,
      Discs: this.state.discs,
    });

    fetch(window.env.api.url + '/project/track', {
      method: 'POST',
      headers: fetchHeaders,
      body: fetchBody,
    })
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        this.showNotification(saveAndContinue);
        this.setState({ showLoader: false });
        this.props.setHeaderProjectData(this.state.project);
        localStorage.removeItem('upc');
        this.props.initializeUpcData();
        localStorage.setItem('prevStep', 3);
      })
      .catch(error => {
        this.setState({ showLoader: false });
        console.error(error);
      });
  }

  handleDataSubmit(e) {
    const saveAndContinue = e.target.classList.contains('saveAndContinueButton') ? true : false;
    this.setTrackSequence();
    let formIsValid = this.isValidForm();

    if (formIsValid) {
      this.saveAudioApi(saveAndContinue);
    } else {
      if (isDuplicateISRC()) {
        showNotyAutoError('Duplicate ISRC found for tracks');
      }
    }
  }

  componentDidMount() {
    if (this.props.discs.length > 0) {
      const { discs } = this.props;
      this.setState({ discs: _.cloneDeep(discs) });
    } else {
      if (this.props.match.params && this.props.match.params.projectID) {
        this.handleDataLoad();
        this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.upcData !== nextProps.upcData) {
      const { discs, project } = this.state;
      if (nextProps.upcData.ExDiscs && nextProps.upcData.ExDiscs.length > 0) {
        const upcDisc = [];
        const isrcs = [];
        nextProps.upcData.ExDiscs.forEach((disc, i) => {
          let existingDisc = _.filter(discs, val => val.discNumber === disc.discNumber);
          const obj = {};
          obj['discNumber'] = disc.discNumber;
          obj['Tracks'] = _.cloneDeep(disc.ExTracks);
          disc.ExTracks.forEach((track, i) => {
            if (project.Project.projectReleaseDate) {
              obj['Tracks'][i].trackReleaseDate = project.Project.projectReleaseDate;
            } else {
              obj['Tracks'][i].isTbdDisabled = true;
            }
          });
          if (existingDisc.length > 0) {
            obj['Tracks'] = [...new Set([...existingDisc[0].Tracks, ...obj['Tracks']])];
            obj['Tracks'] = _.uniqBy(obj['Tracks'], v => [v.isrc, v.trackTitle].join());
          }
          upcDisc.push(obj);
          let trackIsrcs = _.map(disc.ExTracks, 'isrc');
          isrcs.push(...trackIsrcs);
          let hasOtherDisc = _.filter(discs, val => val.discNumber !== disc.discNumber);
          if (hasOtherDisc.length > 0) {
            hasOtherDisc.forEach((Otherdisc, i) => {
              upcDisc.push(Otherdisc);
            });
          }
        });
        this.setState({ discs: _.cloneDeep(upcDisc) });
        const prevPage = JSON.parse(localStorage.getItem('prevStep'));
        if (prevPage <= 2) {
          this.props.getCisData({
            upc: _.get(this.state.project, 'Project.upc', ''),
            Iscrs: isrcs,
            ProjectId: this.props.match.params.projectID,
            mediaType: 1,
          });
        }
      }
    }
    if (this.props.ExTracks !== nextProps.ExTracks) {
      const { discs, activeTab } = this.state;
      if (nextProps.ExTracks && nextProps.ExTracks.length > 0) {
        const upcDisc = discs;
        const tracks = [];
        discs[activeTab].Tracks.forEach(track => {
          let trackObj = track;
          let matchTrack = _.filter(nextProps.ExTracks, val => val.isrc === track.isrc);
          if (matchTrack && matchTrack[0]) {
            trackObj.artist = matchTrack[0].artist;
            trackObj.isrc = matchTrack[0].isrc;
            trackObj.trackTitle = matchTrack[0].trackTitle;
          }
          tracks.push(trackObj);
        });
        upcDisc[activeTab].Tracks = tracks;
        this.setState({ discs: _.cloneDeep(upcDisc) });
      }
    }
    if (this.props.cisData !== nextProps.cisData) {
      const { discs } = this.state;
      const allDiscs = [];
      discs.forEach(disc => {
        let discTab = disc;
        const tracks = [];
        disc.Tracks.forEach(track => {
          let trackObj = track;
          let cisTrack = _.filter(nextProps.cisData, val => val.isrc === track.isrc);
          if (cisTrack.length > 0) {
            trackObj.hasUpload = true;
            trackObj.fileName = cisTrack[0].fileName;
            trackObj.isCisAudio = cisTrack[0].isCisAudio;
          }
          tracks.push(trackObj);
        });
        discTab.Tracks = tracks;
        allDiscs.push(discTab);
      });
      // console.log(allDiscs, "allDiscsallDiscsallDiscs")
      this.setState({ discs: _.cloneDeep(allDiscs) });
    }
  }

  componentDidUpdate() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.state.projectID !== this.props.match.params.projectID
    ) {
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
      this.setState({ projectID: this.props.match.params.projectID });
    }
  }

  handleTabClick(key) {
    this.setState({ activeTab: key });
  }

  addTrack() {
    const { discs } = this.state;
    const { Tracks } = discs[this.state.activeTab];
    let modifiedTracks = Tracks ? Tracks : [];

    let newTrack = {
      fileName: '',
      fileUpload: false,
    };
    modifiedTracks.push(this.getTrack(newTrack, Tracks.length));
    this.setState({ Tracks: modifiedTracks });
  }

  addDisc() {
    const { discs } = this.state;
    let modifiedDiscs = discs;
    let newDisc = {
      discNumber: discs.length + 1,
      Tracks: [],
    };

    modifiedDiscs.push(newDisc);
    this.setState({ discs: modifiedDiscs });
  }

  render() {
    const { project } = this.state;
    const { uploads, loading, upcLoading, t, user } = this.props;
    const isReadOnlyUser = user.DefaultReleasingLabelID === NO_LABEL_ID ? true : false;
    let isUpcProject = false;
    if (this.state.project && this.state.project.Project.projectID) {
      if (this.state.project.Project.upc) {
        isUpcProject = false;
      } else {
        isUpcProject = true;
      }
    }
    return (
      <div className="col-10">
        {isUpcProject && <HaveAudioModal t={t} projectID={this.props.projectID} />}
        <LoadingImg show={this.state.showLoader || loading || upcLoading} />

        <ReplaceAudioModal
          showModal={this.state.showReplaceAudioModal}
          handleClose={this.hideReplaceAudioModal}
          onChange={e => this.updateFile(e)}
          modalAction={this.state.modalAction}
        />

        <ConfirmModal
          show={this.state.diskToDelete !== null ? true : false}
          title={t('audio:deleteDisc')}
          onHide={() => this.setState({ diskToDelete: null })}
          onConfirm={() => this.deleteDisc(this.state.diskToDelete)}
        />

        <div className="row no-gutters step-description">
          <div className="col-12">
            <h2>
              {t('audio:step')} <span className="count-circle">3</span> {t('audio:Audiofiles')}
            </h2>
            <p>{t('audio:DescriptionMain')}</p>
          </div>
        </div>

        <form>
          <section className="row">
            <div className="form-group col-12">
              <label>{t('audio:DragAndDrop')}</label>
              <div droppable="true" className="form-control audio-drop-area col-12">
                <span>
                  {t('audio:ClickToBrowse')}
                  <br />
                  {t('audio:orDrag')} &amp; {t('audio:Drop')} {t('audio:Mp3OrWaves')}
                </span>
                <input
                  type="file"
                  id="audioFiles"
                  multiple={true}
                  onChange={this.updateFiles}
                  accept=".wav, .mp3, .flac"
                />
              </div>
            </div>
          </section>
        </form>

        <div className="row no-gutters d-flex">
          <div className="col-9"></div>
          <div className="col-3 d-flex justify-content-end">
            <ul className="disc-track-buttons">
              <li>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm float-right"
                  onClick={this.addDisc}
                >
                  <i className="material-icons">adjust</i>
                  {t('audio:AddDisc')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <AudioFilesTabbedTracks
          data={this.state.discs}
          handleTabClick={this.handleTabClick}
          deleteRow={this.deleteRow}
          diskDeleteConfirmation={this.diskDeleteConfirmation}
          handleChange={this.handleChange}
          resequencePageTableData={this.resequencePageTableData}
          isValidIsrc={isValidIsrc}
          isValidTitle={this.isValidTitle}
          addDisc={this.addDisc}
          showReplaceModal={(track, i, upload) => this.showReplaceModal(track, i, upload)}
          hideReplaceAudioModal={(track, i) => this.hideReplaceAudioModal(track, i)}
          uploads={uploads}
          checkIsrc={this.checkIsrc}
          upc={project.Project.upc ? true : false}
          cisLoading={this.props.cisLoading}
          Iscrs={this.props.Iscrs}
          t={t}
          activeTab={this.state.activeTab}
          checkIsrcOnBlur={this.checkIsrcOnBlur}
        />

        {!isReadOnlyUser && (
          <section className="row no-gutters save-buttons">
            <div className="col-12">
              <div className="audio-footer-action-fxd">
                <button
                  type="button"
                  className="btn btn-secondary saveButton"
                  onClick={e => this.handleDataSubmit(e)}
                >
                  {t('audio:Save')}
                </button>
                <button
                  type="button"
                  className="btn btn-primary saveAndContinueButton"
                  onClick={e => this.handleDataSubmit(e)}
                >
                  {t('audio:SaveAndContinue')}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

AudioFilesPage = reduxForm({
  form: 'AudioFilesPageForm',
})(AudioFilesPage);

export default withRouter(
  compose(
    withTranslation('audio'),
    connect(
      state => ({
        formValues: state.form.AudioFilesPageForm,
        uploads: state.uploadProgressAlert.uploads,
        discs: state.uploadProgressAlert.discs,
        upcData: state.releaseReducer.upcData,
        ExTracks: state.audioReducer.ExTracks,
        loading: state.audioReducer.loading,
        cisData: state.audioReducer.cisData,
        cisLoading: state.audioReducer.cisLoading,
        Iscrs: state.audioReducer.Iscrs,
        upcLoading: state.releaseReducer.upcLoading,
      }),
      dispatch => ({
        onUploadStart: (uniqFileName, trackID) =>
          dispatch(uploadProgressActions.startUpload(uniqFileName, trackID)),
        onUploadProgress: (uniqFileName, percent_completed) =>
          dispatch(uploadProgressActions.setUploadProgress(uniqFileName, percent_completed)),
        onUploadComplete: uniqFileName => dispatch(uploadProgressActions.endUpload(uniqFileName)),
        saveDiscs: updatedDiscs => dispatch(uploadProgressActions.saveDisc(updatedDiscs)),
        findUpc: val => dispatch(releaseAction.findUpc(val)),
        initializeUpcData: () => dispatch(releaseAction.initializeUpcData()),
        isrcCheck: isrc => dispatch(AudioActions.isrcCheck(isrc)),
        getCisData: (isrcs, ProjectId) => dispatch(AudioActions.getCisData(isrcs, ProjectId)),
      }),
    ),
  )(AudioFilesPage),
);
