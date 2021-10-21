import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import TracksRightsSets from '../TerritorialRights/pageComponents/TracksRightsSets';
import LoadingImg from '../../ui/LoadingImg';
import './TerritorialRights.css';
import { withRouter } from 'react-router';
import { showNotyInfo, showNotyAutoError } from 'components/Utils';
import { connect } from 'react-redux';
import * as territorialRightsAction from '../../../actions/territorialRightsAction';
import _ from 'lodash';

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
        this.props.getRights({
          User: { email: user.email },
          projectID: this.props.match.params.projectID,
          previousPage: localStorage.step === '4' ? 'trackInformation' : 'blockingPolicies',
        });
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
      description: set.description ? set.description : 'Set # ' + index,
      countries: [
        {
          id: 'WW',
          name: 'Worldwide',
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

  handleResequenceRighstSets = () => {
    const { TerritorialRightsSets } = this.state.project;
    let modifiedTerritorialRightsSets = TerritorialRightsSets;
    for (let i = 0; i < modifiedTerritorialRightsSets.length; i++) {
      modifiedTerritorialRightsSets[i].description = 'Set # ' + (i + 1);
    }
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
      this.setState(
        {
          TerritorialRightsSets: modifiedTerritorialRightsSets,
        },
        this.handleResequenceRighstSets(),
      );

      //TODO : do this correctly
      this.state.project.UnassignedTerritorialRightsSetTracks = combinedTracks;
    }

    // this.setState({
    //     UnassignedTracks : combinedTracks
    // }, () => alert(this.state.project.UnassignedTracks));
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

  showNotification(saveAndContinue, projectID) {
    showNotyInfo('Your rights policies have been successfully saved', () => {
      if (saveAndContinue) {
        this.props.history.push({
          pathname: '/blockingPolicies/' + projectID,
        });
      }
    });
  }

  showNotSavedNotification(e) {
    showNotyAutoError('Your rights policies have NOT been successfully saved');
  }

  showUnassignedTracksNotification(saveAndContinue, projectID) {
    showNotyAutoError(
      'Your rights policies have been successfully saved however, all Unassigned Tracks must be assigned to 1 or more sets for this step to be complete.',
      () => {
        if (saveAndContinue) {
          this.props.history.push({
            pathname: '/blockingPolicies/' + projectID,
          });
        }
      },
    );
  }

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
          this.props.initializeRightsData();
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
      this.props.UnassignedTracks !== nextProps.UnassignedTracks
    ) {
      let { TerritorialRightsSets } = this.state.project;
      let UnassignedTracks = [];
      if (nextProps.TerritorialRightsSets.length > 0) {
        TerritorialRightsSets = _.cloneDeep(nextProps.TerritorialRightsSets);
      }
      if (nextProps.NoRightsTracks && nextProps.NoRightsTracks.length > 0) {
        let NoRightsTracks = _.cloneDeep(nextProps.NoRightsTracks);
        NoRightsTracks = _.map(NoRightsTracks, o => _.extend({ hasRights: false }, o));
        UnassignedTracks = _.cloneDeep(nextProps.UnassignedTracks).concat(NoRightsTracks);
      }
      if (
        nextProps.TerritorialRightsSets.length > 0 ||
        (nextProps.NoRightsTracks && nextProps.NoRightsTracks.length > 0)
      ) {
        this.setState({
          project: {
            ...this.state.project,
            TerritorialRightsSets: TerritorialRightsSets,
            UnassignedTerritorialRightsSetTracks: UnassignedTracks,
          },
        });
      }
    }
  }

  render() {
    return (
      <div className="col-10">
        <LoadingImg show={this.state.showLoader || this.props.loading} />

        <PageHeader data={this.state.project} />

        <div className="row no-gutters step-description">
          <div className="col-12">
            <h2>
              Step <span className="count-circle">5</span> Territorial Rights
            </h2>
            <p>
              In this step, you can set the territorial/geographic rights for each track in the
              project. You can either drag &amp; drop tracks from the list or select tracks from the
              "Tracks with this Rights Set" dropdown before assigning rights to them. The section
              must be completed by assigning all tracks to a rights set and by selecting the "Save
              &amp; Continue" button below.
            </p>
          </div>
        </div>

        <div className="row no-gutters align-items-center">
          <div className="col-3">
            <h3>Tracks With No Rights Applied</h3>
          </div>
          <div className="col-9">
            <div className="row no-gutters align-items-center card-nav">
              <div className="col-4">
                <span className="drag-drop-arrow float-left">
                  <span nowrap="true">Drag Audio Files To The Rights Set</span>
                </span>
              </div>
              <div className="col-8">
                <button onClick={this.addRightsSet} className="btn btn-primary">
                  Create a New Rights Set
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
            />
          </div>
        </div>
        <div className="row save-buttons">
          <div className="col-12">
            <button
              tabIndex="5+"
              id="contactsSaveButton"
              type="button"
              className="btn btn-secondary"
              onClick={this.handleSubmit}
            >
              Save
            </button>
            <button
              tabIndex="6+"
              id="contactsSaveContButton"
              type="button"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Save &amp; Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRights: val => dispatch(territorialRightsAction.getRights(val)),
  initializeRightsData: () => dispatch(territorialRightsAction.initializeRightsData()),
});

const mapStateToProps = state => ({
  TerritorialRightsSets: state.territorialRightsReducer.TerritorialRightsSets,
  UnassignedTracks: state.territorialRightsReducer.UnassignedTracks,
  NoRightsTracks: state.territorialRightsReducer.NoRightsTracks,
  loading: state.territorialRightsReducer.loading,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TerritorialRightsPage),
);
