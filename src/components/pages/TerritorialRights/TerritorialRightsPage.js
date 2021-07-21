import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import TracksWithoutRights from '../TerritorialRights/pageComponents/TracksWithoutRights';
import TracksRightsSets from '../TerritorialRights/pageComponents/TracksRightsSets';
import LoadingImg from '../../ui/LoadingImg';
import './TerritorialRights.css';
import { withRouter } from 'react-router';
import { showNotyInfo, showNotyAutoError } from 'components/Utils';

class TerritorialRightsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        Countries: [],
        UnassignedTerritorialRightsSetTracks: [],
        TerritorialRightsSets: [],
      },
      dragSource: null,
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
      })
      .catch(error => {
        console.error(error);
        this.setState({ showLoader: false });
      });
  };

  handleChange = modifiedTerritorialRightsSets => {
    const { TerritorialRightsSets } = this.state.project;
    this.setState({ TerritorialRightsSets: modifiedTerritorialRightsSets });
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

  handleChildDrag = e => {
    this.setState({ dragSource: e.target });
  };

  handleChildDrop = (e, i) => {
    let dragTrackIndex = this.state.dragSource
      ? this.state.dragSource.getAttribute('trackindex')
      : null;
    this.handleNoRightsTracksRemove(i ? i : dragTrackIndex);
    this.setState({ dragSource: null });
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
        }
        this.setState({ showLoader: false });
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

  render() {
    return (
      <div className="col-10">
        <LoadingImg show={this.state.showLoader} />

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
              handleChildDrag={e => this.handleChildDrag(e)}
              handleSetDelete={i => this.handleSetDelete(i)}
              dragSource={this.state.dragSource}
              addRightsSet={this.addRightsSet}
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

export default withRouter(TerritorialRightsPage);
