import React, { Component } from 'react';
import HaveAudioModal from '../../modals/HaveAudioModal';
import ReplaceAudioModal from '../../modals/ReplaceAudioModal';
import { withRouter } from 'react-router';
import './AudioFiles.css';
import Noty from 'noty';
import LoadingImg from '../../ui/LoadingImg';
import AudioFilesTabbedTracks from '../AudioFiles/pageComponents/audioFilesTabbedTracks';
import { connect } from 'react-redux';
import { incrementUploadCount, decrementUploadCount } from 'redux/uploadProgressAlert/actions';
import { isDuplicateTrackTitle, showNotyError } from '../../Utils';
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
      projectID: '',
      showReplaceAudioModal: false,
      replaceTrackIndex: null,
      showLoader: false,
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
  }

  showReplaceModal(track, i) {
    this.setState({
      showReplaceAudioModal: true,
      replaceTrackIndex: i,
    });
  }

  hideReplaceAudioModal() {
    this.setState({ showReplaceAudioModal: false });
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

    new Noty({
      type: 'success',
      id: 'tracksSaved',
      text: 'Your track information has been successfully saved.',
      theme: 'bootstrap-v4',
      layout: 'top',
      timeout: '3000',
    })
      .on('afterClose', () => {
        if (saveAndContinue) {
          this.props.history.push({
            pathname: '/trackInformation/' + projectID,
          });
        }
      })
      .show();
  }

  isValidAudioType(fileName) {
    const validFiles = {
      wav: 1,
      mp3: 1,
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

    let updatedDiscs = discs;
    updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].fileName =
      newFiles[0].name;
    updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].hasUpload = false;
    updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].fileUpload = true;

    const trackID = updatedDiscs[this.state.activeTab].Tracks[this.state.replaceTrackIndex].trackID;
    this.handleFileUpload(newFiles, trackID);
    this.setState({
      discs: updatedDiscs,
      replaceTrackIndex: null,
    });
    this.hideReplaceAudioModal();
  };

  updateFiles(e) {
    const { discs, activeTab } = this.state;
    let newFiles = Array.from(e.target.files);
    let modifiedDiscs = discs;

    for (var i = 0; i < newFiles.length; i++) {
      if (this.isValidAudioType(newFiles[i].name)) {
        let newTrack = {
          fileName: newFiles[i].name,
          fileUpload: true,
        };

        modifiedDiscs[activeTab].Tracks.push(
          this.getTrack(newTrack, modifiedDiscs[activeTab].Tracks.length),
        );
        this.setState({ discs: modifiedDiscs });
      } else {
        //remove this from the file stack
        newFiles.splice(i, 1);
      }
    }
    this.handleFileUpload(newFiles);
  }

  deleteRow(rowIndex) {
    const { discs } = this.state;
    const modifiedDiscs = discs;
    modifiedDiscs[this.state.activeTab].Tracks.splice(rowIndex, 1);
    this.setState({ discs: modifiedDiscs });
  }

  hideFileUploadingIndicator(fileName) {
    let uploadingIndicator = document.getElementById(fileName + '_ico');

    if (uploadingIndicator) {
      uploadingIndicator.style.display = 'none';
    }
  }

  handleFileUpload(files, trackID) {
    const { onUploadProgress, onUploadComplete } = this.props;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const projectID = this.state.projectID ? this.state.projectID : '';
    const fetchHeaders = new Headers({
      Authorization: sessionStorage.getItem('accessToken'),
      'Project-Id': projectID,
      'Track-Id': trackID ? trackID : '',
    });

    for (var i = 0; i < files.length; i++) {
      var formData = new FormData();
      formData.append('file', files[i]);
      onUploadProgress();
      fetch(window.env.api.url + '/media/api/Upload', {
        method: 'POST',
        headers: fetchHeaders,
        body: formData,
      })
        .then(response => {
          return response.json();
        })
        .then(responseJSON => {
          this.hideFileUploadingIndicator(responseJSON[0].fileName);
        })
        .catch(error => console.error(error))
        .finally(() => onUploadComplete());
    }
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
    const sortedDiscs = discs;

    sortedDiscs.map(disc => {
      var tracks = disc.Tracks;

      tracks.map((track, i) => {
        track.trackNumber = i + 1;
      });
    });
    this.setState({ discs: sortedDiscs });
  }

  handleDataLoad() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { pageTableData } = this.state;
    const fetchHeaders = new Headers({
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      PagePath: this.props.match.url ? this.props.match.url : '',
      ProjectID: this.props.match.params.projectID ? this.props.match.params.projectID : '',
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
          project: responseJSON,
          projectData: responseJSON.Project,
        });
        if (responseJSON.Discs && responseJSON.Discs.length > 0) {
          this.setState({
            discs: responseJSON.Discs,
            pageTableData: responseJSON.Discs[this.state.activeTab].Tracks,
          });
        } else {
          this.addDisc();
        }
        this.props.setHeaderProjectData(this.state.project);
      })
      .catch(error => console.error(error));
  }

  isValidIsrc(isrc) {
    return isrc.replace(/\W/g, '').length === 12 || isrc.replace(/\W/g, '').length === 0
      ? true
      : false;
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

    for (var i = 0; i < isrcs.length; i++) {
      if (!this.isValidIsrc(isrcs[i].value)) {
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

  handleDataSubmit(e) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const projectID = this.state.projectID ? this.state.projectID : '';
    const saveAndContinue = e.target.classList.contains('saveAndContinueButton') ? true : false;

    this.setTrackSequence();

    let formIsValid = this.isValidForm();

    if (isDuplicateTrackTitle()) {
      showNotyError("You're attempting to enter a duplicate track title.");
    } else if (formIsValid) {
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
        })
        .catch(error => {
          this.setState({ showLoader: false });
          console.error(error);
        });
    } else {
    }
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.projectID) {
      this.handleDataLoad();
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
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
    return (
      <div className="col-10">
        <HaveAudioModal projectID={this.props.projectID} />

        <LoadingImg show={this.state.showLoader} />

        <ReplaceAudioModal
          showModal={this.state.showReplaceAudioModal}
          handleClose={this.hideReplaceAudioModal}
          onChange={e => this.updateFile(e)}
        />

        <div className="row no-gutters step-description">
          <div className="col-12">
            <h2>
              Step <span className="count-circle">3</span> Audio Files
            </h2>
            <p>
              In this step, you can upload MP3s/WAVs for pre-release filtering by either dragging
              &amp; dropping or clicking to browse files. Tracks can be reordered using drag and
              drop as well. This section must be completed by clicking on the 'Save &amp; Continue'
              button below.
            </p>
          </div>
        </div>

        <form>
          <section className="row">
            <div className="form-group col-12">
              <label>Drag &amp; Drop MP3s/WAVs Below</label>
              <div droppable="true" className="form-control audio-drop-area col-12">
                <span>
                  Click to Browse
                  <br />
                  or Drag &amp; Drop MP3s or WAVs
                </span>
                <input
                  type="file"
                  id="audioFiles"
                  multiple={true}
                  onChange={this.updateFiles}
                  accept=".wav, .mp3"
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
                  <i className="material-icons">adjust</i> Add Disc
                </button>
              </li>
            </ul>
          </div>
        </div>

        <AudioFilesTabbedTracks
          data={this.state.discs}
          handleTabClick={this.handleTabClick}
          deleteRow={this.deleteRow}
          handleChange={this.handleChange}
          resequencePageTableData={this.resequencePageTableData}
          isValidIsrc={this.isValidIsrc}
          isValidTitle={this.isValidTitle}
          addDisc={this.addDisc}
          showReplaceModal={(track, i) => this.showReplaceModal(track, i)}
          hideReplaceAudioModal={(track, i) => this.hideReplaceAudioModal(track, i)}
        />

        <section className="row no-gutters save-buttons">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-secondary saveButton"
              onClick={e => this.handleDataSubmit(e)}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-primary saveAndContinueButton"
              onClick={e => this.handleDataSubmit(e)}
            >
              Save &amp; Continue
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({}),
    {
      onUploadProgress: incrementUploadCount,
      onUploadComplete: decrementUploadCount,
    },
  )(AudioFilesPage),
);
