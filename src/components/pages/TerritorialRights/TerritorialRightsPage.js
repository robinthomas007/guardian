import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import TracksRightsSets from '../TerritorialRights/pageComponents/TracksRightsSets';
import LoadingImg from 'component_library/LoadingImg';
import './TerritorialRights.css';
import { withRouter } from 'react-router';
import { showNotyInfo, showNotyAutoError } from 'components/Utils';
import { connect } from 'react-redux';
import * as territorialRightsAction from '../../../actions/territorialRightsAction';
import _ from 'lodash';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

class TerritorialRightsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        Countries: [],
        UnassignedTerritorialRightsSetTracks: [],
        TerritorialRightsSets: [],
      },
      dragSource: [],
      showloader: false,
      combinedTracks: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePageDataLoad = this.handlePageDataLoad.bind(this);
    this.handleNoRightsTracksRemove = this.handleNoRightsTracksRemove.bind(this);
  }

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
        this.setState({ project: responseJSON });
        if (!responseJSON.TerritorialRightsSets || !responseJSON.TerritorialRightsSets.length) {
          this.addRightsSet();
        }
        this.setState({ showLoader: false });
        this.props.setHeaderProjectData(this.state.project);
        this.props.getRights(
          {
            User: { email: user.email },
            ProjectId: this.props.match.params.projectID,
            IsNewUgcRights: localStorage.step === '4' ? true : false,
            languagecode: localStorage.getItem('languageCode') || 'en',
          },
          this.props.t,
        );
      })
      .catch(error => {
        console.error(error);
        this.setState({ showLoader: false });
      });
  };

  handleChange = modifiedTerritorialRightsSets => {
    this.setState({
      project: {
        ...this.state.project,
        TerritorialRightsSets: modifiedTerritorialRightsSets,
      },
    });
  };

  getRightsSet(set, index) {
    return {
      territorialRightsSetID: set.id ? set.id : '',
      sequence: set.sequence ? set.sequence : index,
      description: set.description || '',
      countries: [
        {
          id: 'WW',
          name: this.props.t('territorial:Worldwide'),
        },
      ],
      tracks: [],
      hasRights: true,
    };
  }

  componentWillUnmount() {
    this.props.initializeRightsData();
  }

  addRightsSet = () => {
    const { TerritorialRightsSets } = this.state.project;
    let modifiedTerritorialRightsSets = TerritorialRightsSets;
    modifiedTerritorialRightsSets.push(this.getRightsSet({}, TerritorialRightsSets.length + 1));
    this.setState({ TerritorialRightsSets: modifiedTerritorialRightsSets });
  };

  handleSetDelete = i => {
    const { TerritorialRightsSets } = this.state.project;
    const { UnassignedTerritorialRightsSetTracks } = this.state.project;
    const deletedTracks = TerritorialRightsSets[i].tracks ? TerritorialRightsSets[i].tracks : [];
    const combinedTracks = [...UnassignedTerritorialRightsSetTracks, ...deletedTracks];

    if (TerritorialRightsSets.length > 1) {
      let modifiedTerritorialRightsSets = TerritorialRightsSets;
      modifiedTerritorialRightsSets.splice(i, 1);
      this.setState({
        TerritorialRightsSets: modifiedTerritorialRightsSets,
        project: { ...this.state.project, UnassignedTerritorialRightsSetTracks: combinedTracks },
      });
    }
  };

  handleNoRightsTracksRemove = (i, trackID) => {
    const { UnassignedTerritorialRightsSetTracks } = this.state.project;
    let modifiedUnassignedTracks = UnassignedTerritorialRightsSetTracks;
    if (i || i >= 0) {
      modifiedUnassignedTracks.splice(i, 1);
      this.setState({
        project: {
          ...this.state.project,
          UnassignedTerritorialRightsSetTracks: modifiedUnassignedTracks,
        },
      });
    } else {
      modifiedUnassignedTracks = _.filter(
        UnassignedTerritorialRightsSetTracks,
        val => !trackID.includes(val.trackID),
      );
      this.setState({
        project: {
          ...this.state.project,
          UnassignedTerritorialRightsSetTracks: modifiedUnassignedTracks,
        },
      });
    }
  };

  handleDropAdd = e => {
    const { dragSource } = this.state;

    for (let i = 0; i < dragSource.length; i++) {
      const setIndex = dragSource[i].getAttribute('setindex');
      const trackId = dragSource[i].getAttribute('trackid');
      const trackTitle = dragSource[i].getAttribute('trackTitle');
      //restrict dropping to just the set tracks
      if (
        (dragSource[i] && !dragSource[i].classList.contains('unassignedTrack')) ||
        !e.target.classList.contains('unassignedTrack')
      ) {
        //add the selection to the unassigned tracks
        const { UnassignedTerritorialRightsSetTracks } = this.state.project;
        let modifiedUnassignedTracks = UnassignedTerritorialRightsSetTracks;
        modifiedUnassignedTracks.push({ trackID: trackId, trackTitle: trackTitle });

        //remove the selection from the set's assigned tracks
        const { TerritorialRightsSets } = this.state.project;
        let modifiedTerritorialRightsSets = TerritorialRightsSets;
        if (modifiedTerritorialRightsSets[setIndex]) {
          modifiedTerritorialRightsSets[setIndex].tracks = _.filter(
            TerritorialRightsSets[setIndex].tracks,
            val => val.trackID !== trackId,
          );
          this.setState({
            project: {
              ...this.state.project,
              TerritorialRightsSets: modifiedTerritorialRightsSets,
              UnassignedTerritorialRightsSetTracks: modifiedUnassignedTracks,
            },
          });
        }
      }
    }
    this.setState({ dragSource: [] });
  };

  handleChildDrag = e => {
    this.setState({ dragSource: e });
  };

  handleChildDrop = (e, i) => {
    const { dragSource } = this.state;
    let dragTrackId = [];
    for (let j = 0; j < dragSource.length; j++) {
      dragTrackId.push(dragSource[j] ? dragSource[j].getAttribute('trackId') : []);
    }
    this.handleNoRightsTracksRemove(i, dragTrackId);
    this.setState({ dragSource: [] });
  };

  showNotification = (saveAndContinue, projectID) => {
    showNotyInfo(this.props.t('territorial:NotyInfo'), () => {
      if (saveAndContinue) {
        this.props.history.push({
          pathname: '/blockingPolicies/' + projectID,
        });
      }
    });
  };

  showNotSavedNotification = e => {
    showNotyAutoError(this.props.t('territorial:NotyError'));
  };

  showUnassignedTracksNotification = (saveAndContinue, projectID) => {
    showNotyAutoError(this.props.t('territorial:NotyError1'), () => {
      if (saveAndContinue) {
        this.props.history.push({
          pathname: '/blockingPolicies/' + projectID,
        });
        this.props.initializeRightsData();
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ showLoader: true });
    const saveAndContinue = e.target.id === 'contactsSaveContButton' ? true : false;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const fetchHeaders = new Headers({
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('accessToken'),
    });

    const fetchBody = JSON.stringify({
      projectID: this.props.match.params.projectID,
      TerritorialRightsSets: this.state.project.TerritorialRightsSets,
      NoRightsTracks: this.props.NoRightsTracks,
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
        if (responseJSON.errorMessage) {
          this.showNotSavedNotification();
        } else {
          if (this.state.project.UnassignedTerritorialRightsSetTracks.length > 0) {
            this.showUnassignedTracksNotification(
              saveAndContinue,
              this.props.match.params.projectID,
            );
          } else {
            this.showNotification(saveAndContinue, this.props.match.params.projectID);
          }
          this.props.setHeaderProjectData(this.state.project);
          localStorage.setItem('prevStep', 5);
        }
        this.setState({ showLoader: false });
        localStorage.removeItem('step');
      })
      .catch(error => {
        console.error(error);
        this.showNotSavedNotification();
        this.setState({ showLoader: false });
      });
  };

  componentDidMount() {
    if (this.props.match.params.projectID) {
      this.handlePageDataLoad();
    }
  }

  componentDidUpdate() {
    if (this.props.match.params.projectID) {
      this.props.setProjectID(this.props.match.params.projectID, this.props.match.url);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.TerritorialRightsSets !== nextProps.TerritorialRightsSets ||
      this.props.UnassignedTracks !== nextProps.UnassignedTracks ||
      this.props.NoRightsTracks !== nextProps.NoRightsTracks
    ) {
      let { TerritorialRightsSets } = this.state.project;
      let rightSets = [];
      let unAssigned = [];
      let noRights = [];
      if (nextProps.TerritorialRightsSets.length > 0) {
        rightSets = _.cloneDeep(nextProps.TerritorialRightsSets);
      }
      if (nextProps.UnassignedTracks.length > 0) {
        unAssigned = _.cloneDeep(nextProps.UnassignedTracks);
      }
      if (nextProps.NoRightsTracks.length > 0) {
        noRights = _.cloneDeep(nextProps.NoRightsTracks);
        noRights = _.map(noRights, o => _.extend({ hasRights: false }, o));
      }
      if (TerritorialRightsSets.length >= 1 && TerritorialRightsSets[0].territorialRightsSetID) {
        rightSets.forEach((data, i) => {
          // get the set of items with same sequence number and updating the tracks list
          let sequenceList = _.filter(TerritorialRightsSets, v => v.sequence === data.sequence);
          if (sequenceList.length > 0) {
            let newTracks = _.unionBy(data.tracks, sequenceList[0].tracks, 'trackID');
            rightSets[i].tracks = _.cloneDeep(newTracks);
          }
        });

        let set = _.xorBy(rightSets, TerritorialRightsSets, 'sequence');
        if (set.length > 0) {
          rightSets = [...rightSets, ...set];
          rightSets = _.uniq(rightSets, 'sequence');
        }
      }
      let rightTracksList = _.map(rightSets, 'tracks');
      rightTracksList = rightTracksList.reduce((a, b) => a.concat(b), []);
      _.map(rightTracksList, (n, key) => {
        let commonTrack = _.filter(unAssigned, val => val.trackID === n.trackID);
        if (commonTrack.length > 0) {
          unAssigned = _.filter(unAssigned, val => val.trackID !== n.trackID);
        }
      });

      if (rightSets.length > 0 && noRights.length > 0) {
        this.setState({
          project: {
            ...this.state.project,
            TerritorialRightsSets: rightSets,
            UnassignedTerritorialRightsSetTracks: unAssigned.concat(noRights),
          },
        });
      }
      if (rightSets.length === 0 && noRights.length > 0) {
        this.setState({
          project: {
            ...this.state.project,
            UnassignedTerritorialRightsSetTracks: unAssigned.concat(noRights),
          },
        });
      }
      if (rightSets.length > 0 && (noRights.length === 0 || unAssigned.length > 0)) {
        this.setState({
          project: {
            ...this.state.project,
            TerritorialRightsSets: rightSets,
            UnassignedTerritorialRightsSetTracks: unAssigned.concat(noRights),
          },
        });
      }
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="col-10">
        <LoadingImg show={this.state.showLoader || this.props.loading} />

        <PageHeader data={this.state.project} />

        <div className="row no-gutters step-description">
          <div className="col-12">
            <h2>
              {t('territorial:step')} <span className="count-circle">5</span>
              {t('territorial:TerritorialRights')}
            </h2>
            <p>{t('territorial:DescriptionMain')}</p>
          </div>
        </div>

        <div className="row no-gutters align-items-center">
          <div className="col-3">
            <h3>{t('territorial:TrackswithNoRightsApplied')}</h3>
          </div>
          <div className="col-9">
            <div className="row no-gutters align-items-center card-nav">
              <div className="col-4">
                <span className="drag-drop-arrow float-left">
                  <span nowrap="true">{t('territorial:DragAudioFilesToTheRightsSet')}</span>
                </span>
              </div>
              <div className="col-8">
                <button onClick={this.addRightsSet} className="btn btn-primary">
                  {t('territorial:CreateNewRightsSet')}
                </button>

                {/* <TracksCustomRightsSet /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <TracksWithoutRights
              data={this.state.project.UnassignedTerritorialRightsSetTracks}
              handleChildDrag={this.handleChildDrag}
              dragSource={this.state.dragSource}
              handleDropAdd={this.handleDropAdd}
              t={t}
            />
          </div>
          <div className="col-9">
            <TracksRightsSets
              data={this.state.project}
              handleChange={this.handleChange}
              dragSource={this.state.dragSource}
              handleChildDrop={(e, i) => this.handleChildDrop(e, i)}
              handleChildDrag={this.handleChildDrag}
              handleSetDelete={i => this.handleSetDelete(i)}
              dragSource={this.state.dragSource}
              addRightsSet={this.addRightsSet}
              handleNoRightsTracksRemove={this.handleNoRightsTracksRemove}
              t={t}
            />
          </div>
        </div>
        <div className="row save-buttons">
          <div className="col-12 audio-footer-action-fxd">
            <button
              tabIndex="5+"
              id="contactsSaveButton"
              type="button"
              className="btn btn-secondary"
              onClick={this.handleSubmit}
            >
              {t('territorial:Save')}
            </button>
            <button
              tabIndex="6+"
              id="contactsSaveContButton"
              type="button"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              {t('territorial:SaveAndContinue')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRights: (val, t) => dispatch(territorialRightsAction.getRights(val, t)),
  initializeRightsData: () => dispatch(territorialRightsAction.initializeRightsData()),
});

const mapStateToProps = state => ({
  TerritorialRightsSets: state.territorialRightsReducer.TerritorialRightsSets,
  UnassignedTracks: state.territorialRightsReducer.UnassignedTracks,
  NoRightsTracks: state.territorialRightsReducer.NoRightsTracks,
  loading: state.territorialRightsReducer.loading,
});

export default withRouter(
  compose(
    withTranslation('territorial'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(TerritorialRightsPage),
);
