import React, { Component } from 'react';
import BlockingPoliciesModal from '../../modals/BlockingPoliciesModal';
import PageHeader from '../PageHeader/PageHeader';
import './BlockingPolicies.css';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import BlockingPolicySets from '../BlockingPolicies/pageComponents/blockingPolicySets';
import LoadingImg from 'component_library/LoadingImg';
import { withRouter } from 'react-router-dom';
import { formatDateToYYYYMMDD, convertToLocaleTime, resetDatePickerByObj } from '../../Utils';
import { showNotyInfo, showNotyAutoError } from 'components/Utils';
import _ from 'lodash';

class BlockingPoliciesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        BlockingPolicySets: [],
        UnassignedBlockingPolicySetTracks: [],
      },
      dragSource: [],
      showLoader: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChildDrag = this.handleChildDrag.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleChange = e => {
    const setIndex = e.target.getAttribute('setIndex');
    const siteIndex = e.target.getAttribute('siteIndex');

    const { BlockingPolicySets } = this.state.project;
    let modifiedBlockingPolicySets = BlockingPolicySets;
    modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex][e.target.id] = e.target.value;
    this.setState({ BlockingPolicySets: modifiedBlockingPolicySets });
  };

  handleDateChange = (date, id, setIndex, siteIndex) => {
    const { BlockingPolicySets } = this.state.project;
    let modifiedBlockingPolicySets = BlockingPolicySets;
    modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex][id] = date;
    this.setState({ BlockingPolicySets: modifiedBlockingPolicySets });
  };

  handleExpirationDisable = (setIndex, siteIndex) => {
    const { BlockingPolicySets } = this.state.project;
    let modifiedBlockingPolicySets = BlockingPolicySets;
    modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].disabled = true;
    this.setState({ BlockingPolicySets: modifiedBlockingPolicySets });
  };

  handleMonetizeBlock = e => {
    const setIndex = e.target.getAttribute('setIndex');
    const siteIndex = e.target.getAttribute('siteIndex');
    const eTargetValue = e.target.value === 'true' ? true : false;
    const { BlockingPolicySets } = this.state.project;
    let modifiedBlockingPolicySets = BlockingPolicySets;
    modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].block = eTargetValue;

    const expirationDateInputs = document.getElementsByClassName('blockingPolicyDateInput');

    for (var i = 0; i < expirationDateInputs.length; i++) {
      if (
        expirationDateInputs[i].getAttribute('setIndex') === setIndex &&
        expirationDateInputs[i].getAttribute('siteIndex') === siteIndex
      ) {
        resetDatePickerByObj(expirationDateInputs[i]);
      }
    }

    if (!eTargetValue) {
      modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].disabled = false;
      modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].expirationDate = '';
      modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].duration = '';
      this.setState({ BlockingPolicySets: modifiedBlockingPolicySets }, () => {
        this.handleExpirationDisable(setIndex, siteIndex);
      });
    } else {
      modifiedBlockingPolicySets[setIndex].platformPolicies[siteIndex].disabled = false;
      this.setState({ BlockingPolicySets: modifiedBlockingPolicySets });
    }
  };

  setDefaultMonetizeForPostRelease = (releaseDate = null) => {
    if (releaseDate && typeof releaseDate === 'string')
      return (
        formatDateToYYYYMMDD(convertToLocaleTime(this.props.serverTimeDate)) >
        formatDateToYYYYMMDD(releaseDate)
      );
    else return false;
  };

  setDefaultBlockedUntil = (releaseDate = null) => {
    if (releaseDate && typeof releaseDate === 'string') {
      if (
        formatDateToYYYYMMDD(convertToLocaleTime(this.props.serverTimeDate)) >
        formatDateToYYYYMMDD(releaseDate)
      ) {
        return '';
      } else {
        return formatDateToYYYYMMDD(releaseDate);
      }
    }
    return '';
  };

  getPlatforms = (releaseDate = null) => {
    return [
      {
        platformName: 'YouTube',
        // block : (this.setDefaultMonetizeForPostRelease(releaseDate)) ? false : true,
        block: false,
        duration: '',
        // expirationDate : this.setDefaultBlockedUntil(releaseDate)
        expirationDate: '',
      },
      {
        platformName: 'SoundCloud',
        // block : (this.setDefaultMonetizeForPostRelease(releaseDate)) ? false : true,
        block: false,
        duration: '',
        // expirationDate : this.setDefaultBlockedUntil(releaseDate)
        expirationDate: '',
      },
      {
        platformName: 'Facebook',
        // block : (this.setDefaultMonetizeForPostRelease(releaseDate)) ? false : true,
        block: false,
        duration: '',
        // expirationDate : this.setDefaultBlockedUntil(releaseDate)
        expirationDate: '',
      },
      {
        platformName: 'Instagram',
        // block : (this.setDefaultMonetizeForPostRelease(releaseDate)) ? false : true,
        block: false,
        duration: '',
        // expirationDate : this.setDefaultBlockedUntil(releaseDate)
        expirationDate: '',
      },
    ];
  };

  getBlockingSet = (set, i, releaseDate = null) => {
    return {
      blockingPolicySetID: set.blockingPolicySetID ? set.blockingPolicySetID : '',
      sequence: set.sequence ? set.sequence : i,
      description: 'Set #' + i,
      platformPolicies: this.getPlatforms(releaseDate),
      tracks: [],
    };
  };

  addBlockingSet = (releaseDate = null) => {
    const { BlockingPolicySets } = this.state.project;
    let modifiedBlockingPolicySets = BlockingPolicySets;

    if (typeof releaseDate === 'object')
      releaseDate = this.state.project.Project.projectReleaseDate;

    modifiedBlockingPolicySets.push(
      this.getBlockingSet({}, BlockingPolicySets.length + 1, releaseDate),
    );
    this.setState({ BlockingPolicySets: modifiedBlockingPolicySets });
  };

  handlePageDataLoad = () => {
    this.setState({ showLoader: true });

    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      PagePath: this.props.match.url ? this.props.match.url : '',
      ProjectID: this.props.match.params.projectID,
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
        responseJSON.BlockingPolicySets.map((policies, key) => {
          policies.platformPolicies.map((data, index) => {
            if (
              this.setDefaultMonetizeForPostRelease(responseJSON.Project.projectReleaseDate) &&
              !data.duration &&
              !data.expirationDate
            ) {
              responseJSON.BlockingPolicySets[key].platformPolicies[index].block = false;
            }
          });
        });
        this.setState({ project: responseJSON });
        if (!responseJSON.BlockingPolicySets || !responseJSON.BlockingPolicySets.length) {
          this.addBlockingSet(responseJSON.Project.projectReleaseDate);
        }
        this.setState({ showLoader: false });
        this.props.setHeaderProjectData(this.state.project);
      })
      .catch(error => {
        console.error(error);
        this.setState({ showLoader: false });
      });
  };

  handleSubmit = e => {
    const saveAndContinue = e.target.classList.contains('saveAndContinueButton') ? true : false;
    this.setState({ showLoader: true });
    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      projectID: this.props.match.params.projectID,
      BlockingPolicySets: this.state.project.BlockingPolicySets,
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
        if (responseJSON.errorMessage) {
          this.showNotSavedNotification();
        } else {
          this.showNotification(null, this.props.match.params.projectID, saveAndContinue);
          this.props.setHeaderProjectData(this.state.project);
        }
        this.setState({ showLoader: false });
      })
      .catch(error => {
        console.error(error);
        this.showNotSavedNotification();
        this.setState({ showLoader: false });
      });
  };

  handleChildDrag = e => {
    this.setState({ dragSource: e });
  };

  handleChildDrop = (e, i) => {
    const { dragSource } = this.state;
    const { UnassignedBlockingPolicySetTracks, BlockingPolicySets } = this.state.project;

    let dragTrackId = [];
    for (let j = 0; j < dragSource.length; j++) {
      dragTrackId.push(dragSource[j] ? dragSource[j].getAttribute('trackid') : []);
      BlockingPolicySets[i].tracks.push({
        trackID: dragSource[j].getAttribute('trackid'),
        trackTitle: dragSource[j].getAttribute('tracktitle'),
      });
    }

    let modifiedUnassignedBlockingPolicySetTracks = UnassignedBlockingPolicySetTracks;
    modifiedUnassignedBlockingPolicySetTracks = _.filter(
      UnassignedBlockingPolicySetTracks,
      val => !dragTrackId.includes(val.trackID),
    );

    this.setState({
      project: {
        ...this.state.project,
        BlockingPolicySets: BlockingPolicySets,
        UnassignedBlockingPolicySetTracks: modifiedUnassignedBlockingPolicySetTracks,
        dragSource: null,
      },
    });
  };

  handleTrackSelect = e => {
    const setIndex = parseInt(e.target.getAttribute('setindex'));
    const trackIndex = parseInt(e.target.getAttribute('optionindex'));
    const { UnassignedBlockingPolicySetTracks } = this.state.project;
    const { tracks } = this.state.project.BlockingPolicySets[setIndex];

    let modifiedUnassignedBlockingPolicySetTracks = UnassignedBlockingPolicySetTracks;
    modifiedUnassignedBlockingPolicySetTracks.splice(trackIndex, 1);

    let modifiedTracks = tracks;
    modifiedTracks.push({
      trackID: e.target.getAttribute('trackid'),
      trackTitle: e.target.getAttribute('tracktitle'),
    });

    this.setState({
      UnassignedBlockingPolicySetTracks: modifiedUnassignedBlockingPolicySetTracks,
      tracks: modifiedTracks,
    });
  };

  handleDropAdd = e => {
    const { dragSource } = this.state;
    for (let i = 0; i < dragSource.length; i++) {
      const setIndex = dragSource[i].getAttribute('setindex');
      const trackId = dragSource[i].getAttribute('trackid');
      const trackTitle = dragSource[i].getAttribute('trackTitle');
      const trackIndex = dragSource[i].getAttribute('trackindex');

      // restrict dropping to just the set tracks
      if (
        (dragSource[i] && !dragSource[i].classList.contains('unassignedTrack')) ||
        !e.target.classList.contains('unassignedTrack')
      ) {
        //add the selection to the unassigned tracks
        const { UnassignedBlockingPolicySetTracks } = this.state.project;

        let modifiedUnassignedBlockingPolicySetTracks = UnassignedBlockingPolicySetTracks;
        modifiedUnassignedBlockingPolicySetTracks.push({
          trackID: trackId,
          trackTitle: trackTitle,
        });

        //remove the selection from the set's assigned tracks
        const { BlockingPolicySets } = this.state.project;

        let modifiedBlockingPolicySets = BlockingPolicySets;

        modifiedBlockingPolicySets[setIndex].tracks = _.filter(
          BlockingPolicySets[setIndex].tracks,
          val => val.trackID !== trackId,
        );

        this.setState({
          project: {
            ...this.state.project,
            BlockingPolicySets: modifiedBlockingPolicySets,
            UnassignedBlockingPolicySetTracks: modifiedUnassignedBlockingPolicySetTracks,
          },
        });
      }
    }
  };

  handleResequenceRighstSets = () => {
    const { BlockingPolicySets } = this.state.project;
    let modifiedBlockingPolicySets = BlockingPolicySets;

    for (let i = 0; i < modifiedBlockingPolicySets.length; i++) {
      modifiedBlockingPolicySets[i].description = 'Set #' + (i + 1);
    }

    this.setState({ BlockingPolicySets: modifiedBlockingPolicySets });
  };

  handleSetDelete(i) {
    const { project } = this.state;
    const deletedTracks = this.state.project.BlockingPolicySets[i].tracks;
    const combinedTracks = [
      ...this.state.project.UnassignedBlockingPolicySetTracks,
      ...deletedTracks,
    ];

    if (this.state.project.BlockingPolicySets.length > 1) {
      let modifiedProject = project;
      modifiedProject.BlockingPolicySets.splice(i, 1);
      modifiedProject.UnassignedBlockingPolicySetTracks = combinedTracks;

      this.handleResequenceRighstSets();
      this.setState({
        project: modifiedProject,
      });
    }
  }

  showNotification(e, projectID, saveAndContinue) {
    showNotyInfo('Your blocking preferences have been successfully saved.', () => {
      if (saveAndContinue) {
        this.props.history.push({
          pathname: '/reviewSubmit/' + projectID,
        });
      }
    });
  }

  showNotSavedNotification(e) {
    showNotyAutoError('Your blocking policies have NOT been successfully saved.');
  }

  getStepNumber() {
    let stepNumber;
    if (this.state.project && this.state.project.Project) {
      if (this.state.project.Project.projectReleaseDateTBD) {
        return 6;
      }
    }
    if (
      this.props.serverTimeDate &&
      this.state.project &&
      this.state.project.Project &&
      this.state.project.Project.projectReleaseDate
    ) {
      stepNumber =
        formatDateToYYYYMMDD(convertToLocaleTime(this.props.serverTimeDate)) >
        formatDateToYYYYMMDD(this.state.project.Project.projectReleaseDate)
          ? 4
          : 6;
    }
    return stepNumber;
  }

  componentDidMount() {
    this.handlePageDataLoad();
  }

  componentDidUpdate() {
    if (this.props.match.params.projectID) {
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
    }
  }

  render() {
    return (
      <div className="col-10">
        <BlockingPoliciesModal projectID={this.props.projectID} />

        <LoadingImg show={this.state.showLoader} />

        <PageHeader data={this.state.project} />

        <div className="row no-gutters step-description">
          <div className="col-12">
            <h2>
              Step <span className="count-circle">{this.getStepNumber()}</span> Post-Release UGC
              Blocking <span className="option-text">(Optional)</span>
            </h2>
            <p>
              In this OPTIONAL step, you can choose to block content AFTER commercial release until
              a desired date. UMG’s default policy is to monetize content on licensed platforms upon
              commercial release. Here you can create a post-release block policy set, then drag
              &amp; drop titles to assign specific tracks to that policy. This section can only be
              completed by selecting the Request Approval button below.
            </p>
            <p>
              Note: any post-release policies created in this section require approval and will not
              be put into effect until approval is granted. Confirmation of approval will arrive via
              email.
            </p>
          </div>
        </div>
        <div className="row no-gutters align-items-center">
          <div className="col-3">
            <h2>Tracks With No Set Policy</h2>
          </div>
          <div className="col-9">
            <div className="row no-gutters align-items-center card-nav">
              <div className="col-4">
                <span className="drag-drop-arrow float-left">
                  <span>Drag Audio Files To The Policy Set</span>
                </span>
              </div>
              <div className="col-8">
                <button className="btn btn-primary" onClick={this.addBlockingSet}>
                  Create a New Blocking Policy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <TracksWithoutRights
              data={this.state.project.UnassignedBlockingPolicySetTracks}
              dragSource={this.state.dragSource}
              handleDropAdd={this.handleDropAdd}
              handleChildDrag={this.handleChildDrag}
            />
          </div>
          <div className="col-9">
            <BlockingPolicySets
              data={this.state.project}
              onChange={e => this.handleChange(e)}
              handleDateChange={(date, id, setIndex, siteIndex) =>
                this.handleDateChange(date, id, setIndex, siteIndex)
              }
              handleMonetizeBlock={e => this.handleMonetizeBlock(e)}
              dragSource={this.state.dragSource}
              handleDrop={(e, i) => this.handleChildDrop(e, i)}
              handleChildDrop={(e, i) => this.handleDrop()}
              handleChildDrag={(e, i) => this.handleChildDrag(e)}
              handleTrackSelect={(e, i) => this.handleTrackSelect(e, i)}
              handleSetDelete={i => this.handleSetDelete(i)}
            />
          </div>
        </div>

        <div className="row save-buttons">
          <div className="col-12">
            <button
              tabIndex="5+"
              id="contactsSaveButton"
              type="button"
              className="btn btn-secondary saveButton"
              onClick={e => this.handleSubmit(e)}
            >
              Save Draft
            </button>
            <button
              tabIndex="6+"
              id="contactsSaveContButton"
              type="button"
              className="btn btn-primary saveAndContinueButton"
              onClick={e => this.handleSubmit(e)}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BlockingPoliciesPage);
