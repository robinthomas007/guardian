import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, withRouter } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import RecentProjectsDrop from '../Header/RecentProjectsDrop';
import { isPreReleaseDate, getAlias } from '../../Utils.js';
import VideoTutorialModal from '../../modals/VideoTutorialModal';
import CommentBox from '../../pages/CommentSlider';
import { connect } from 'react-redux';
import * as headerActions from './../../../actions/headerActions';
import moment from 'moment';
import * as projectInboxAction from 'actions/projectInboxAction';

let interval = null;
const hexArray = [
  '#636393',
  '#b5222d',
  '#d4953c',
  '#609491',
  '#26A4FF',
  '#CE53FA',
  '#636393',
  '#b5222d',
  '#d4953c',
  '#609491',
  '#26A4FF',
  '#CE53FA',
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Project: {
        projectTitle: '',
        projectStatus: '',
        projectID: '',
        serverTimeDate: '',
      },
      compactViewPages: {
        findProject: {
          titleText: 'Find A Project',
        },
        inbox: {
          titleText: 'Project Inbox',
        },
        admin: {
          titleText: 'User Administration',
        },
        helpGuide: {
          titleText: 'Help / FAQs',
        },
        userAdmin: {
          titleText: 'User Administration',
        },
      },
      projectID: '',
      pagePath: '',
      pageViewCompact: true,
      showProgressBar: true,
      showHeaderSizeToggle: true,
      showProjectStatus: true,
      utcDateTime: '',
      navSteps: [
        {
          description: 'Release Info',
          path: '/releaseInformation/',
          complete: false,
          stepComplete: true,
          preRelease: true,
          stepValidation: 'releaseInfoStatus',
          isActive: false,
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Release-Information-Step-1.mp4',
          modalHeader: 'Release Information',
        },
        {
          description: 'Contacts',
          path: '/projectContacts/',
          complete: false,
          stepComplete: false,
          preRelease: true,
          stepValidation: 'projectContactsStatus',
          isActive: false,
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Project-Contact-Information-Step-2.mp4',
          modalHeader: 'Project Contacts',
        },
        {
          description: 'Audio Files',
          path: '/audioFiles/',
          complete: false,
          stepComplete: false,
          preRelease: false,
          stepValidation: 'audioFilesStatus',
          isActive: false,
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Audio-Files-Part-1-Step-3.mp4',
          modalHeader: 'Audio Files',
        },
        {
          description: 'Track Info',
          path: '/trackInformation/',
          complete: false,
          stepComplete: false,
          preRelease: true,
          stepValidation: 'trackInfoStatus',
          isActive: false,
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Track-Information-Step-4.mp4',
          modalHeader: 'Track Information',
        },
        {
          description: 'Rights',
          path: '/territorialRights/',
          complete: false,
          stepComplete: false,
          preRelease: false,
          stepValidation: 'territorialRightsStatus',
          isActive: false,
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Territorial-Rights-Step-5.mp4',
          modalHeader: 'Territorial Rights',
        },
        {
          description: 'Blocking',
          path: '/blockingPolicies/',
          complete: false,
          stepComplete: false,
          preRelease: true,
          stepValidation: 'blockingPoliciesStatus',
          isActive: false,
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Project-Blocking-Policies-Step-6.mp4',
          modalHeader: 'Post-Release UGC Blocking',
        },
        {
          description: 'Review',
          path: '/reviewSubmit/',
          complete: false,
          stepComplete: false,
          preRelease: true,
          stepValidation: 'projectSubmitStatus',
          isActive: false,
          tutorialVideoLink:
            'https://guardian.umusic.com/static/videos/The-Guardian-Training-Video-Review-(Review-&-Submit)-Step-7.mp4',
          modalHeader: 'Review and Submit',
        },
      ],
      showVideoTutorialModal: false,
      notifify: false,
      showCommentBox: false,
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  getStepIcon = (navLink, navIndex) => {
    const stepValidation = parseInt(this.props.projectData.Project[navLink.stepValidation]);
    if (!stepValidation || parseInt(stepValidation) === 1) {
      return navIndex + 1;
    } else if (parseInt(stepValidation) === 2) {
      return <i className="material-icons">block</i>;
    } else {
      return <i className="material-icons">check</i>;
    }
  };

  setNavClickable = (e, navLink, activeNav) => {
    if (
      navLink.stepValidation === 'audioFilesStatus' &&
      (this.props.projectData.Project['trackInfoStatus'] >= 2 || activeNav === 3)
    ) {
      return null;
    } else {
      return parseInt(this.props.projectData.Project[navLink.stepValidation]) < 2 ||
        (!this.props.projectData.Project[navLink.stepValidation] &&
          navLink.stepValidation !== 'releaseInfoStatus')
        ? e.preventDefault()
        : null;
    }
  };

  getNavIndex = navToUse => {
    let navMatch = null;
    for (var i = 0; i < navToUse.length; i++) {
      if (
        this.props.pagePath.split('/')[1].toLowerCase() ===
        navToUse[i].path.split('/')[1].toLowerCase()
      ) {
        navMatch = i;
        break;
      }
    }
    return navMatch;
  };

  getActiveNav = () => {
    const isPreRelease = isPreReleaseDate(this.props.projectData);
    const navToUse = isPreRelease
      ? this.state.navSteps
      : this.state.navSteps.filter(step => step.preRelease);
    const activeNav = this.getNavIndex(navToUse);
    return activeNav;
  };

  getNavLinks = () => {
    const isPreRelease = isPreReleaseDate(this.props.projectData);
    //If prerelease date is on, We need 7 steps. Otherwise we need only 5 steps.
    //This can be differentiate based on the flag preRelease
    const navToUse = isPreRelease
      ? this.state.navSteps
      : this.state.navSteps.filter(step => step.preRelease);
    const activeNav = this.getActiveNav();
    return (
      <ul className="d-flex justify-content-center align-items-stretch">
        {navToUse.map((navLink, i) => {
          return (
            <React.Fragment key={i}>
              <li key={i} id={'step-' + (i + 1)}>
                <NavLink
                  className={activeNav === i ? 'active' : ''}
                  onClick={e => this.setNavClickable(e, navLink, activeNav)}
                  to={{
                    pathname:
                      navLink.path +
                      (this.state.Project && this.state.Project.projectID
                        ? this.state.Project.projectID
                        : ''),
                  }}
                >
                  <span className="step-description text-nowrap">{navLink.description}</span>
                  <span className={activeNav && activeNav > i ? 'step past' : 'step'}>
                    {this.props.projectData.Project ? this.getStepIcon(navLink, i) : null}
                  </span>
                  <span className="step-arrow "></span>
                </NavLink>
              </li>
              {i < navToUse.length - 1 ? (
                <li className={activeNav && parseInt(activeNav) > i ? 'step-bar past' : 'step-bar'}>
                  <span></span>
                </li>
              ) : null}
            </React.Fragment>
          );
        })}
      </ul>
    );
  };

  getDefaultPageTitle = defaultText => {
    const isDefaultCompactViewPage = this.state.compactViewPages[this.props.pagePath.split('/')[1]];
    return isDefaultCompactViewPage ? isDefaultCompactViewPage.titleText : defaultText;
  };

  handleHeaderViewType = () => {
    const isDefaultCompactViewPage = this.state.compactViewPages[this.props.pagePath.split('/')[1]];
    if (isDefaultCompactViewPage) {
      this.props.clearProject();
    }

    return isDefaultCompactViewPage ? true : false;
  };

  headerToggle = () => {
    const isCompactView = this.handleHeaderViewType();

    this.setState({
      showProgressBar: this.handleHeaderViewType() ? false : !this.state.showProgressBar,
      pageViewCompact: !this.state.pageViewCompact,
    });
  };

  handleClickOutside(event) {
    const { notifify } = this.state;
    const elem = document.querySelector('.notification-wrapper-div');
    if (elem && !elem.contains(event.target) && notifify && event.target.id !== 'notify-wrapper') {
      this.setState({ notifify: false });
      event.preventDefault();
    }
  }

  setHeaderView = () => {
    const isCompactView = this.handleHeaderViewType();

    if (isCompactView) {
      this.setState({
        showProgressBar: false,
        pageViewCompact: true,
        showHeaderSizeToggle: false,
        showProjectStatus: false,
      });
    } else {
      this.state.showProgressBar
        ? this.setState({
            showProgressBar: true,
            pageViewCompact: false,
            showHeaderSizeToggle: true,
            showProjectStatus: true,
          })
        : this.setState({
            showProgressBar: false,
            pageViewCompact: true,
            showHeaderSizeToggle: true,
            showProjectStatus: true,
          });
    }
  };

  handleNavLoadByStatus = () => {
    const projectStatusID = parseInt(this.props.projectData.Project.projectStatusID);
    //When project ID is there, we are fetching Navlinks and update.
    if (!projectStatusID || projectStatusID === 1) {
      this.getNavLinks();
    } else {
      //If no project ID, We are loading normal header without status and other new project releated settings.
      this.setState({
        showProgressBar: false,
        pageViewCompact: true,
        showHeaderSizeToggle: false,
        showProjectStatus: false,
      });
    }
  };

  componentDidUpdate() {
    if (this.props.pagePath !== this.state.pagePath) {
      this.setState(
        {
          pagePath: this.props.pagePath,
          showProgressBar: !this.handleHeaderViewType(),
          pageViewCompact: this.handleHeaderViewType(),
          showHeaderSizeToggle: !this.handleHeaderViewType(),
          showProjectStatus: !this.handleHeaderViewType(),
        },
        this.handleNavLoadByStatus(),
      );
    }

    //Updating project status to show show the status
    if (this.props.projectData.Project !== this.state.Project) {
      this.setState(
        {
          Project: this.props.projectData.Project,
        },
        this.handleNavLoadByStatus(),
      );
    }

    isPreReleaseDate(this.props.projectData);
    this.props.setPageViewType(this.state.pageViewCompact);
  }

  componentDidMount = () => {
    if (this.props.pagePath !== this.state.pagePath) {
      this.setState({
        pagePath: this.props.pagePath,
        pageViewCompact: this.handleHeaderViewType(),
      });
    }

    if (this.props.projectData.Project !== this.state.Project) {
      this.setState({
        Project: this.props.projectData.Project,
      });
    }

    this.setHeaderView();
    this.props.setPageViewType(this.state.pageViewCompact);
    this.props.getAllNotifications({ searchCriteria: { filter: { IsRead: 'false' } } });

    interval = setInterval(() => {
      this.props.getAllNotifications({ searchCriteria: { filter: { IsRead: 'false' } } });
      this.props.clearReadCount();
    }, 20000);
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    clearInterval(interval);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getHeaderContent = () => {
    return (
      <div className="row d-flex no-gutters project-title">
        <div className="col-2"></div>
        <div className="col-9">
          <div className="row d-flex no-gutters">
            <div className="col-10 align-self-start">
              <h1>
                {this.props.projectData.Project && this.props.projectData.Project.projectTitle
                  ? `${this.props.projectData.Project.projectArtistName} - ${this.props.projectData.Project.projectTitle}`
                  : this.getDefaultPageTitle('New Project')}
              </h1>
            </div>
            <div className="col-2 align-self-start">
              {this.state.showProjectStatus
                ? 'STATUS: ' +
                  (this.props.projectData.Project && this.props.projectData.Project.projectStatus
                    ? this.props.projectData.Project.projectStatus
                    : 'In Progress')
                : null}
            </div>
          </div>
          <div className="col-1"></div>
        </div>

        <div className="row d-flex no-gutters steps-bar">
          <div className="col-1"></div>
          <div className="col-10">{this.state.showProgressBar ? this.getNavLinks() : null}</div>
          <div className="col-1"></div>
        </div>
      </div>
    );
  };

  handleHelpClick = () => {
    this.props.history.push({ pathname: '/helpGuide/' });
  };

  showVideoTutorialModal = () => {
    const activeNav = this.getActiveNav();
    if (activeNav !== null) {
      this.setState({ showVideoTutorialModal: true });
    }
  };

  hideVideoTutorialModal = () => {
    this.setState({ showVideoTutorialModal: false });
  };

  openNotifivations = () => {
    this.setState({ notifify: !this.state.notifify });
  };

  showCommentBox = () => {
    this.setState({ showCommentBox: true });
  };

  hideCommentBox = () => {
    this.setState({ showCommentBox: false });
  };

  getNotifications = () => {
    const { notifications } = this.props;
    return (
      <div className="notification-content">
        <ul className="content-list">
          {notifications.map((noti, i) => {
            return (
              <li>
                <NavLink
                  className="content-divider"
                  to={{ pathname: '/inbox' }}
                  onClick={() => this.openNotifivations()}
                >
                  <div className="lft-col">
                    <span style={{ background: hexArray[i] }}>{getAlias(noti.AssignedBy)}</span>
                  </div>
                  <div className="rgt-col">
                    <p>
                      <strong className="bold">{noti.AssignedBy}</strong> left you a comment on the
                      project
                      <strong className="bold"> "{noti.ProjectTitle}" </strong> (
                      {moment(noti.DateCreated).fromNow()})
                    </p>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    const isPreRelease = isPreReleaseDate(this.props.projectData);
    const navToUse = isPreRelease
      ? this.state.navSteps
      : this.state.navSteps.filter(step => step.preRelease);
    const activeNav = this.getActiveNav();
    const { notifify } = this.state;
    const { notifications, projectData, readCount } = this.props;
    const { showCommentBox } = this.state;
    console.log(notifications.length, readCount, '==========================');
    let count = notifications && notifications.length ? notifications.length - readCount : 0;
    if (projectData.Project) {
      return (
        <React.Fragment>
          {activeNav !== null && (
            <VideoTutorialModal
              showModal={this.state.showVideoTutorialModal}
              handleClose={this.hideVideoTutorialModal}
              navSteps={navToUse}
              activeNav={activeNav}
            />
          )}
          {showCommentBox && projectData.Project.projectID && (
            <CommentBox
              projectID={projectData.Project.projectID}
              handleClose={this.hideCommentBox}
            />
          )}
          <header
            className={
              this.state.pageViewCompact ? 'row d-flex no-gutters compact' : 'row d-flex no-gutters'
            }
          >
            <div className="col-12 align-items-end flex-column flex-grow-1">
              <div className="row d-flex no-gutters">
                <div className="col-1"></div>
                <div className="col-2">
                  <NavLink to={{ pathname: '/findProject' }}>
                    <span className="guardian-logo"></span>
                  </NavLink>
                </div>
                <div className="nav-bg"></div>
                <nav className="col-8 d-flex no-gutters justify-content-end">
                  <ul className="menu-items">
                    {this.props.userData.IsAdmin ? (
                      <li>
                        <NavLink className="steps" to={{ pathname: '/userAdmin' }}>
                          <i class="material-icons">supervised_user_circle</i> Admin
                        </NavLink>
                      </li>
                    ) : null}
                    <li>
                      <NavLink
                        className="steps"
                        to={{ pathname: '/releaseInformation' }}
                        onClick={() => this.props.clearProject()}
                      >
                        <i class="material-icons">library_music</i> New Project
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="steps" to={{ pathname: '/findProject' }}>
                        <i class="material-icons">search</i> Project Search
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="steps" to={{ pathname: '/inbox' }}>
                        <i class="material-icons">email</i> Inbox
                      </NavLink>
                    </li>
                    {/*<li>
                      <RecentProjectsDrop
                        updateHistory={projectID => this.props.updateHistory(projectID)}
                      />
                    </li>*/}
                    <li className="notification-li">
                      <div
                        id="notify-wrapper"
                        className="notify-wrapper"
                        onClick={this.openNotifivations}
                      >
                        <i id="notify-wrapper" className="material-icons">
                          notifications
                        </i>
                        {count > 0 && <span>{count}</span>}
                      </div>
                      <div className="notification-wrapper-div">
                        {notifify && count > 0 && this.getNotifications()}
                      </div>
                    </li>
                    <li> | </li>
                    <li>Welcome, {this.props.userData.name}</li>
                    <li>
                      <span className="btn-log" onClick={e => this.props.handleLogoutClick(e)}>
                        Log Out
                      </span>
                    </li>
                  </ul>
                </nav>
                <div className="col-1"></div>
              </div>

              {this.getHeaderContent()}

              <ul className="button-bar">
                {this.state.showHeaderSizeToggle ? (
                  <li>
                    <button
                      className="btn btn-sm btn-secondary btn-collapse"
                      onClick={this.headerToggle}
                      title="Collapse/Expand Header"
                    >
                      <i className={'material-icons'}>unfold_more</i>
                    </button>
                  </li>
                ) : null}
                <li>
                  <button
                    className="btn btn-sm btn-secondary btn-video"
                    onClick={this.showVideoTutorialModal}
                    title="Tutorial Video"
                  >
                    <i className={'material-icons'}>videocam</i>
                  </button>
                </li>
                {parseInt(activeNav) >= 0 && projectData.Project.projectID && (
                  <li>
                    <button
                      className="btn btn-sm btn-secondary btn-collapse"
                      onClick={this.showCommentBox}
                      title="Comment"
                    >
                      <i className={'material-icons'}>message</i>
                    </button>
                  </li>
                )}
                <li>
                  <button
                    className="btn btn-sm btn-secondary btn-help"
                    onClick={this.handleHelpClick}
                    title="Help/FAQs"
                  >
                    <i className={'material-icons'}>help</i>
                  </button>
                </li>
              </ul>
            </div>
          </header>
        </React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  getAllNotifications: val => dispatch(headerActions.getNotifications(val)),
  clearReadCount: () => dispatch(projectInboxAction.clearReadCount()),
});

const mapStateToProps = state => ({
  notifications: state.headerReducer.notifications,
  readCount: state.ProjectInboxReducer.readCount,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Header),
);
