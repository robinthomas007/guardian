import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import TabbedTracks from '../TrackInformation/pageComponents/TabbedTracks';
import ReplaceAudioModal from '../../modals/ReplaceAudioModal';
import LoadingImg from 'component_library/LoadingImg';
import './TrackInformation.css';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as uploadProgressActions from 'redux/uploadProgressAlert/actions';
import {
  isFormValid,
  isDuplicateItem,
  isDuplicateISRC,
  showNotyError,
  showNotyAutoError,
  isPreReleaseDate,
  showNotyInfo,
  renameFile,
  NO_LABEL_ID,
} from '../../Utils';
import * as releaseAction from './../ReleaseInformation/releaseAction';
import _ from 'lodash';
import * as AudioActions from '../../../actions/audioActions';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import ConfirmModal from 'components/modals/ConfirmModal';
import TrackInformationDataTable from './pageComponents/TrackInformationDataTable';

class TrackInformationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {},
      tableRows: [],
      showReplaceModal: false,
      tracksData: [],
      projectReleaseDate: '',
      projectData: {},
      activeDiscTab: 1,
      discs: [],
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
        Discs: [],
      },
      showloader: false,
      showReplaceAudioModal: false,
      dragSource: null,
    };
    this.addBlankRow = this.addBlankRow.bind(this);
    this.showTrackModal = this.showTrackModal.bind(this);
    this.hideTrackModal = this.hideTrackModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageDataLoad = this.handlePageDataLoad.bind(this);
    this.setActiveDiscTab = this.setActiveDiscTab.bind(this);
    this.handleDiscUpdate = this.handleDiscUpdate.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.addDisc = this.addDisc.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.hideReplaceAudioModal = this.hideReplaceAudioModal.bind(this);
    this.showReplaceModal = this.showReplaceModal.bind(this);
    this.handleChildDrag = this.handleChildDrag.bind(this);
    this.getStepNumber = this.getStepNumber.bind(this);
    this.checkIsrc = this.checkIsrc.bind(this);
  }

  checkIsrc() {
    const { project, activeDiscTab } = this.state;
    const user = JSON.parse(sessionStorage.getItem('user'));
    let isrcs = _.map(project.Discs[activeDiscTab - 1].Tracks, 'isrc');
    let isrcsField = document.getElementsByClassName('trackIsrcField');
    let isValidForm = true;
    isrcs = isrcs.filter(n => n);
    for (var i = 0; i < isrcsField.length; i++) {
      if (!this.isValidIsrc(isrcsField[i].value)) {
        isValidForm = false;
      }
    }
    isrcs.length > 0 &&
      isValidForm &&
      this.props.isrcCheck({ User: { email: user.email }, isrcs: isrcs });
  }

  checkIsrcOnBlur = isrc => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.props.isrcCheck({ User: { email: user.email }, isrcs: [isrc] });
    // TODO:  only for video file
    if (this.state.project && this.state.project.Project.mediaType === 2) {
      this.props.getCisData({
        Iscrs: [isrc],
        ProjectId: this.props.match.params.projectID,
        mediaType: 2,
      });
    }
  };

  setActiveDiscTab(tabID) {
    this.setState({ activeDiscTab: tabID });
  }

  addBlankRow() {
    var newRow = this.state.tableRows;
    newRow.push(this.getBlankRow());
    this.setState({ tableRows: newRow });
  }

  showTrackModal(track, i) {
    this.setState({ showReplaceModal: true });
  }

  hideTrackModal() {
    this.setState({ showReplaceModal: false });
  }

  setifUpcData(data) {
    if (this.props.upcData) {
      const { upcData } = this.props;
      const { project } = this.state;
      if (upcData.ExDiscs && upcData.ExDiscs.length > 0) {
        const upcDisc = [];
        upcData.ExDiscs.forEach((disc, index) => {
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
          if (project.Project.mediaType === 1) {
            if (existingDisc.length > 0) {
              obj['Tracks'].push(...existingDisc[0].Tracks);
              // avoiding duplicate tracks
              obj['Tracks'] = _.uniqBy(obj['Tracks'], v => [v.isrc, v.trackTitle].join());
            }
          }
          upcDisc.push(obj);
          let hasOtherDisc = _.filter(data, val => val.discNumber !== disc.discNumber);
          if (hasOtherDisc.length > 0) {
            hasOtherDisc.forEach((Otherdisc, i) => {
              upcDisc.push(Otherdisc);
            });
          }
        });
        project.Discs = _.cloneDeep(upcDisc);
        this.setState({ project });
      }
    }
  }

  handlePageDataLoad() {
    this.setState({ showloader: true });
    const user = JSON.parse(sessionStorage.getItem('user'));
    const projectID = this.props.match.params.projectID;
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });
    const fetchBody = JSON.stringify({
      User: {
        email: user.email,
      },
      PagePath: this.props.match.url ? this.props.match.url : '',
      ProjectID: projectID,
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
          showloader: false,
        });
        this.props.setHeaderProjectData(this.state.project);
        this.checkUpcData();
        this.setifUpcData(_.cloneDeep(responseJSON.Discs));
        if (responseJSON.Project.mediaType === 2 && responseJSON.Project.upc) {
          this.cisUploadForVideo();
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ showloader: false });
      });
  }

  cisUploadForVideo() {
    const prevPage = JSON.parse(localStorage.getItem('prevStep'));
    if (prevPage <= 2) {
      const { project } = this.state;
      // upc length is 14 and isrc length is 12
      const isUpc = project.Project.upc && project.Project.upc.length === 14 ? true : false;
      this.props.getCisData({
        upc: isUpc ? project.Project.upc : '',
        Iscrs: !isUpc ? [project.Project.upc] : [],
        ProjectId: this.props.match.params.projectID,
        mediaType: 2,
      });
    }
  }

  checkUpcData() {
    if (localStorage.upc) {
      const { project } = this.state;
      if (this.props.upcData && this.props.upcData.ExDiscs) {
        const upcDisc = [];
        this.props.upcData.ExDiscs.forEach(disc => {
          const obj = {};
          obj['discNumber'] = disc.discNumber;
          obj['Tracks'] = disc.ExTracks;
          upcDisc.push(obj);
        });
        project.Discs = _.cloneDeep(upcDisc);
        this.setState({ project });
      } else {
        this.props.findUpc({ upc: localStorage.upc, mediaType: project.Project.mediaType });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.upcData !== nextProps.upcData) {
      const { project } = this.state;
      if (nextProps.upcData.ExDiscs && nextProps.upcData.ExDiscs.length > 0) {
        let upcDisc = [];
        nextProps.upcData.ExDiscs.forEach((disc, index) => {
          let existingDisc = _.filter(project.Discs, val => val.discNumber === disc.discNumber);
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
          if (project.Project.mediaType === 1) {
            if (existingDisc.length > 0) {
              obj['Tracks'].push(...existingDisc[0].Tracks);
              // avoiding duplicate tracks
              obj['Tracks'] = _.uniqBy(obj['Tracks'], v => [v.isrc, v.trackTitle].join());
            }
          }
          upcDisc.push(obj);
          let hasOtherDisc = _.filter(project.Discs, val => val.discNumber !== disc.discNumber);
          if (hasOtherDisc.length > 0) {
            hasOtherDisc.forEach((Otherdisc, i) => {
              upcDisc.push(Otherdisc);
            });
          }
        });
        project.Discs = _.cloneDeep(upcDisc);
        this.setState({ project });
      }
    }
    if (this.props.cisData !== nextProps.cisData) {
      const { project } = this.state;
      const cisDiscData = project.Discs;
      const tracks = project.Discs[0].Tracks;
      tracks[0].fileName = nextProps.cisData[0].fileName;
      cisDiscData[0].Tracks = tracks;
      project.Discs = _.cloneDeep(cisDiscData);
      this.setState({ project });
    }

    if (this.props.ExTracks !== nextProps.ExTracks) {
      const { project, activeDiscTab } = this.state;
      if (nextProps.ExTracks && nextProps.ExTracks.length > 0) {
        const upcDisc = project.Discs;
        const tracks = [];
        upcDisc[activeDiscTab - 1].Tracks.forEach(track => {
          let trackObj = track;
          let matchTrack = _.filter(nextProps.ExTracks, val => val.isrc === track.isrc);
          if (matchTrack && matchTrack[0]) {
            trackObj.artist = matchTrack[0].artist;
            trackObj.isrc = matchTrack[0].isrc;
            trackObj.trackTitle = matchTrack[0].trackTitle;
          }
          tracks.push(trackObj);
        });
        upcDisc[activeDiscTab - 1].Tracks = tracks;
        project.Discs = _.cloneDeep(upcDisc);
        this.setState({ project });
      }
    }
  }

  showNotification(saveAndContinue) {
    showNotyInfo(this.props.t('track:trackSavedAndSubmittedForIntialProtection'), () => {
      if (saveAndContinue) {
        if (
          !this.state.project.Project.projectReleaseDateTBD &&
          !isPreReleaseDate(this.state.project)
        ) {
          this.props.history.push({
            pathname: '/blockingPolicies/' + this.props.match.params.projectID,
          });
        } else {
          this.props.history.push({
            pathname: '/territorialRights/' + this.props.match.params.projectID,
          });
        }
      }
    });
  }

  showNotSavedNotification(e) {
    showNotyAutoError(this.props.t('track:NotSaved'));
  }

  handleDiscUpdate(i, updatedDisc) {
    const { discs } = this.state;
    let modifiedDiscs = discs;
    modifiedDiscs[i] = updatedDisc;

    this.setState({ discs: modifiedDiscs });
  }

  getTrack = (track, discNumber, trackNumber) => {
    return {
      trackID: track.trackID ? track.trackID : '',
      trackNumber: track.trackNumber ? track.trackNumber : '',
      hasUpload: track.hasUpload ? track.hasUpload : false,
      trackTitle: track.trackTitle ? track.trackTitle : '',
      isrc: track.isrc ? track.isrc : '',
      isSingle: track.isSingle ? track.isSingle : false,
      tbdReleaseDate: track.tbdReleaseDate ? track.tbdReleaseDate : '',
      trackReleaseDate: track.trackReleaseDate
        ? track.trackReleaseDate
        : this.state.project.Project.projectReleaseDate
        ? this.state.project.Project.projectReleaseDate
        : '',
      fileName: track.fileName ? track.fileName : '',
      artist: track.artist ? track.artist : this.state.project.Project.projectArtistName,

      isSingleDisabled: false,
      isReleaseDateDisabled: track.isSingle ? false : true,
      isTbdDisabled: track.trackReleaseDate !== '' || track.isSingle ? false : true,
      isTbdChecked: track.trackReleaseDate !== '' || track.isSingle ? false : true,
    };
  };

  isValidIsrc(isrc) {
    return isrc.length === 0 || isrc.match(/^[a-z0-9]{12}$/i) ? true : false;
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
    let isValidForm = true;

    let isrcValues = [];
    for (var x = 0; x < isrcs.length; x++) {
      isrcValues.push(isrcs[x].value);
    }

    for (var i = 0; i < isrcs.length; i++) {
      if (!this.isValidIsrc(isrcs[i].value) || isDuplicateItem(isrcValues, isrcs[i].value)) {
        this.setFieldValidation(isrcs[i], 'is-invalid');
        isValidForm = false;
      } else {
        this.setFieldValidation(isrcs[i], 'is-valid');
      }
    }
    return isValidForm;
  }

  saveTrackApi(saveAndContinue) {
    this.setState({ showloader: true });

    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });
    const fetchBody = JSON.stringify({
      User: {
        email: user.email,
      },
      projectID: this.props.match.params.projectID,
      isAudioPage: false,
      Discs: this.state.project.Discs,
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
        this.setState({ showloader: false });
        this.showNotification(saveAndContinue);
        this.props.setHeaderProjectData(this.state.project);
        localStorage.setItem('step', 4);
        localStorage.removeItem('upc');
        this.props.initializeUpcData();
        localStorage.setItem('prevStep', 4);
      })
      .catch(error => {
        this.setState({ showloader: false });
      });
  }

  handleSubmit(e) {
    const saveAndContinue = e.target.classList.contains('saveAndContinueButton') ? true : false;
    if (isFormValid() && this.isValidForm()) {
      this.saveTrackApi(saveAndContinue);
    } else {
      if (isDuplicateISRC()) {
        showNotyAutoError('Duplicate ISRC found for tracks');
      }
    }
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.projectID) {
      this.handlePageDataLoad();
    }
  }

  componentDidUpdate() {
    if (this.props.match && this.props.match.params && this.props.match.params.projectID) {
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
    }
  }

  addTrack() {
    const { project } = this.state;
    let modifiedProject = project;
    modifiedProject.Discs[this.state.activeDiscTab - 1].Tracks.push(
      this.getTrack({
        trackNumber: modifiedProject.Discs[this.state.activeDiscTab - 1].Tracks.length + 1,
      }),
    );

    this.setState({ project: modifiedProject });
  }

  addDisc = () => {
    const { Discs } = this.state.project;
    let modifiedDiscs = Discs;
    modifiedDiscs.push({
      discNumber: (Discs.length + 1).toString(),
      Tracks: [this.getTrack({ trackNumber: '0' })],
    });
    this.setState({ Discs: modifiedDiscs });
  };

  removeTrack = rowIndex => {
    const { Discs } = this.state.project;
    const ModifiedDiscs = Discs;
    ModifiedDiscs[this.state.activeDiscTab - 1].Tracks.splice(rowIndex, 1);
    this.setState({ Discs: this.handleTrackResequence(ModifiedDiscs) });
  };

  hideReplaceAudioModal() {
    this.setState({
      showReplaceAudioModal: false,
    });
  }

  showReplaceModal(track, i) {
    this.setState({
      showReplaceAudioModal: true,
      replaceTrack: track,
      replaceTrackIndex: i,
    });
  }

  isDuplicateFilename = fileName => {
    const { Discs } = this.state.project;
    return Discs.some(disc => disc.Tracks.some(track => track.fileName === fileName));
  };

  updateFile = e => {
    let newFiles = Array.from(e.target.files);
    const filename = newFiles[0].name.split(/\.(?=[^\.]+$)/)[0] + '.flac';
    if (this.isDuplicateFilename(filename)) {
      showNotyAutoError('Duplicate Audio File');
    } else {
      let { replaceTrack } = this.state;
      let modifiedReplaceTrack = replaceTrack;
      modifiedReplaceTrack.fileName = filename;
      this.setState({ replaceTrack: modifiedReplaceTrack }, () => {
        this.handleFileUpload(newFiles, replaceTrack);
        this.hideReplaceAudioModal();
      });
    }
  };

  handleFileUploadView = (trackNumber, showUpload) => {
    const { Discs } = this.state.project;
    let targetTrack = trackNumber > 0 ? trackNumber - 1 : 0;

    let modifiedDDiscs = Discs;
    modifiedDDiscs[this.state.activeDiscTab - 1].Tracks[targetTrack].fileUpload = showUpload;
    modifiedDDiscs[this.state.activeDiscTab - 1].Tracks[targetTrack].hasUpload = showUpload
      ? false
      : true;

    this.setState({ Discs: modifiedDDiscs });
  };

  removeFile = trackToRemove => {
    const { project, activeDiscTab } = this.state;
    let modifiedDiscs = [...project.Discs];
    const newTracks = modifiedDiscs[activeDiscTab - 1].Tracks.map(track => {
      if (track.trackID === trackToRemove.trackID) {
        return { ...track, fileName: '', fileUpload: false, hasUpload: false };
      } else {
        return track;
      }
    });
    modifiedDiscs[activeDiscTab - 1].Tracks = newTracks;
    this.setState({ project: { ...project, Discs: modifiedDiscs }, Discs: modifiedDiscs });
  };

  handleFileUpload(files, track) {
    const { onUploadStart, onUploadProgress, onUploadComplete } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const projectID = this.state.project.Project.projectID
      ? this.state.project.Project.projectID
      : '';
    files.map(file => {
      const uniqFileName = `${file.name}-${new Date().getTime()}`;
      onUploadStart(uniqFileName);
      var formData = new FormData();
      formData.append('file', file);
      // formData.append('file', renameFile(file, file.name.split(/\.(?=[^\.]+$)/)[0] + '.flac'));
      let request = new XMLHttpRequest();
      request.open('POST', window.env.api.url + '/media/api/Upload');
      request.setRequestHeader('Authorization', sessionStorage.getItem('accessToken'));
      request.setRequestHeader('User-Email', user.email);
      request.setRequestHeader('Project-Id', projectID);
      request.setRequestHeader('Track-Id', track.trackID ? track.trackID : '');
      this.handleFileUploadView(track.trackNumber, true);

      // upload progress event
      request.upload.addEventListener('progress', function(e) {
        // upload progress as percentage
        let percent_completed = (e.loaded / e.total) * 100;
        onUploadProgress(uniqFileName, Math.round(percent_completed));
      });

      request.addEventListener('load', e => {
        this.handleFileUploadView(track.trackNumber, false);
        onUploadComplete(uniqFileName);
        if (request.status >= 300) {
          showNotyError(this.props.t('track:uploadingAudioFailed'), 4);
          this.removeFile(track);
        }
      });
      request.send(formData);
    });
  }

  handleTrackResequence = discs => {
    let modifiedDiscs = discs;
    modifiedDiscs.map((disc, i) => {
      return disc.Tracks.map((track, i) => {
        return (track.trackNumber = i + 1);
      });
    });
    return modifiedDiscs;
  };

  handleNoRightsTracksRemove = i => {
    const { UnassignedTerritorialRightsSetTracks } = this.state.project;
    let modifiedUnassignedTracks = UnassignedTerritorialRightsSetTracks;
    modifiedUnassignedTracks.splice(i, 1);
    this.setState({ UnassignedTerritorialRightsSetTracks: modifiedUnassignedTracks });
  };

  handleDropAdd = e => {
    const setIndex = this.state.dragSource.getAttribute('setindex');
    const trackId = this.state.dragSource.getAttribute('trackid');
    const trackTitle = this.state.dragSource.getAttribute('trackTitle');
    const trackIndex = this.state.dragSource.getAttribute('trackindex');

    //restrict dropping to just the set tracks
    if (
      (this.state.dragSource && !this.state.dragSource.classList.contains('unassignedTrack')) ||
      !e.target.classList.contains('unassignedTrack')
    ) {
      //add the selection to the unassigned tracks
      const { UnassignedTerritorialRightsSetTracks } = this.state.project;
      let modifiedUnassignedTracks = UnassignedTerritorialRightsSetTracks;
      modifiedUnassignedTracks.push({ trackID: trackId, trackTitle: trackTitle });
      this.setState({ UnassignedTerritorialRightsSetTracks: modifiedUnassignedTracks });

      //remove the selection from the set's assigned tracks
      const { TerritorialRightsSets } = this.state.project;
      let modifiedTerritorialRightsSets = TerritorialRightsSets;
      modifiedTerritorialRightsSets[setIndex].tracks.splice(trackIndex, 1);
      this.setState({ TerritorialRightsSets: modifiedTerritorialRightsSets });
    }
  };

  handleChildDrag = (e, i) => {
    this.setState({
      dragSource: e.target,
      dragSourceIndex: i,
    });
  };

  handleChildDrop = (e, i) => {
    this.handleTrackMove(this.state.dragSourceIndex, i);
    this.setState({
      dragTarget: e.target,
      dragTargetIndex: i,
    });
  };

  handleTrackMove = (sourceIndex, targetIndex) => {
    const { Discs } = this.state.project;

    let sourceTrack = Discs[this.state.activeDiscTab - 1].Tracks[sourceIndex];

    let modifiedDiscs = Discs;
    modifiedDiscs[this.state.activeDiscTab - 1].Tracks.splice(sourceIndex, 1);
    modifiedDiscs[this.state.activeDiscTab - 1].Tracks.splice(targetIndex, 0, sourceTrack);

    this.setState({
      Discs: this.handleTrackResequence(modifiedDiscs),
      dragSource: null,
      dragSourceIndex: null,
      dragTarget: null,
      dragTargetIndex: null,
    });
  };

  getStepNumber = serverTimeDate => {
    if (this.state.project.Project.mediaType === 2) {
      return 3;
    }
    if (this.state.project.Project.projectID) {
      if (this.state.project.Project.projectReleaseDateTBD) {
        return 4;
      }
    }
    if (
      this.state.project &&
      this.state.project.Project &&
      this.state.project.Project.projectReleaseDate
    ) {
      const stepNumber = !isPreReleaseDate(this.state.project) ? 3 : 4;
      return stepNumber;
    }
  };

  diskDeleteConfirmation = (e, discIndex) => {
    console.log('discIndex', discIndex);
    e.preventDefault();
    e.stopPropagation();
    this.setState({ diskToDelete: discIndex });
  };

  deleteDisc = discIndex => {
    const { project, diskToDelete } = this.state;
    const newState = {
      project: { ...project, Discs: project.Discs.filter((disc, i) => i !== discIndex) },
      diskToDelete: null,
    };
    if (discIndex == diskToDelete) {
      newState.activeDiscTab = 1;
    }
    this.setState(newState);
  };

  render() {
    const { t, user } = this.props;
    const isReadOnlyUser = user.DefaultReleasingLabelID === NO_LABEL_ID ? true : false;
    return (
      <div className="col-10">
        <LoadingImg show={this.state.showloader || this.props.loading || this.props.upcLoading} />

        <ReplaceAudioModal
          showModal={this.state.showReplaceAudioModal}
          handleClose={this.hideReplaceAudioModal}
          onChange={e => this.updateFile(e)}
        />
        <ConfirmModal
          show={this.state.diskToDelete !== null ? true : false}
          title={t('audio:deleteDisc')}
          onHide={() => this.setState({ diskToDelete: null })}
          onConfirm={() => this.deleteDisc(this.state.diskToDelete)}
        />
        <PageHeader data={this.state.project} />

        <div className="row no-gutters step-description">
          <div className="col-12">
            <h2>
              {t('track:step')}{' '}
              <span className="count-circle">{this.getStepNumber(this.props.serverTimeDate)}</span>{' '}
              {this.state.project.Project.mediaType === 1
                ? t('track:TrackInformation')
                : t('track:VideoInformation')}
            </h2>
            <p>
              {this.state.project.Project.mediaType === 1
                ? t('track:DescriptionMain')
                : t('track:VideoDescriptionMain')}
            </p>
          </div>
        </div>

        <TabbedTracks
          data={this.state.project}
          showClick={this.showTrackModal}
          activeDiscTab={this.state.activeDiscTab}
          diskDeleteConfirmation={this.diskDeleteConfirmation}
          handleActiveDiscUpdate={this.setActiveDiscTab}
          handleDiscUpdate={this.handleDiscUpdate}
          addTrack={this.addTrack}
          addDisc={this.addDisc}
          removeTrack={this.removeTrack}
          setTBD={this.setTBD}
          setSingle={this.setSingle}
          showReplaceModal={(track, i) => this.showReplaceModal(track, i)}
          hideReplaceAudioModal={(track, i) => this.hideReplaceAudioModal(track, i)}
          handleChildDrag={(e, i) => this.handleChildDrag(e, i)}
          handleChildDrop={(e, i) => this.handleChildDrop(e, i)}
          checkIsrc={this.checkIsrc}
          checkIsrcOnBlur={this.checkIsrcOnBlur}
          t={t}
          isVideo={this.state.project.Project.mediaType === 1 ? false : true}
        />

        {!isReadOnlyUser && (
          <section className="row save-buttons">
            <div className="col-12">
              <div className="audio-footer-action-fxd">
                <button
                  type="button"
                  className="btn btn-secondary saveButton"
                  onClick={e => this.handleSubmit(e)}
                >
                  {t('track:Save')}
                </button>
                <button
                  type="button"
                  className="btn btn-primary saveAndContinueButton"
                  onClick={e => this.handleSubmit(e)}
                >
                  {t('track:SaveAndContinue')}
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

TrackInformationPage = reduxForm({
  form: 'TrackInformationPageForm',
})(TrackInformationPage);

export default withRouter(
  compose(
    withTranslation('track'),
    connect(
      state => ({
        formValues: state.form.TrackInformationPageForm,
        upcData: state.releaseReducer.upcData,
        ExTracks: state.audioReducer.ExTracks,
        loading: state.audioReducer.loading,
        upcLoading: state.releaseReducer.loading,
        cisData: state.audioReducer.cisData,
      }),
      dispatch => ({
        onUploadStart: uniqFileName => dispatch(uploadProgressActions.startUpload(uniqFileName)),
        onUploadProgress: (uniqFileName, percent_completed) =>
          dispatch(uploadProgressActions.setUploadProgress(uniqFileName, percent_completed)),
        onUploadComplete: uniqFileName => dispatch(uploadProgressActions.endUpload(uniqFileName)),
        findUpc: val => dispatch(releaseAction.findUpc(val)),
        initializeUpcData: () => dispatch(releaseAction.initializeUpcData()),
        isrcCheck: isrc => dispatch(AudioActions.isrcCheck(isrc)),
        getCisData: (isrcs, ProjectId) => dispatch(AudioActions.getCisData(isrcs, ProjectId)),
      }),
    ),
  )(TrackInformationPage),
);
