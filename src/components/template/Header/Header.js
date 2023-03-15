import React, { Component } from 'react';
import { BrowserRouter as Route, NavLink, withRouter } from 'react-router-dom';
import { isPreReleaseDate, getAlias } from '../../Utils.js';
import VideoTutorialModal from '../../modals/VideoTutorialModal';
import CommentBox from '../../pages/CommentSlider';
import { connect } from 'react-redux';
import * as headerActions from './../../../actions/headerActions';
import moment from 'moment';
import _ from 'lodash';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import LanguageDropdown from '../../common/LanguageDropdown';

let interval = null;
const hexArray = [
  '#FF26A8',
  '#26A4FF',
  '#CE53FA',
  '#609491',
  '#26A4FF',
  '#FF26A8',
  '#26A4FF',
  '#CE53FA',
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
          titleText: 'ProjectSearch',
        },
        inbox: {
          titleText: 'ProjectInbox',
        },
        admin: {
          titleText: 'UserAdministration',
        },
        helpGuide: {
          titleText: 'Help/FAQs',
        },
        userAdmin: {
          titleText: 'UserAdministration',
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
          description: 'ReleaseInfo',
          path: '/releaseInformation/',
          complete: false,
          stepComplete: true,
          preRelease: true,
          stepValidation: 'releaseInfoStatus',
          isActive: false,
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+4+Release+Information.mp4',
          modalHeader: 'Release Information',
          isNav: true,
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
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+5+Contact+Information.mp4',
          modalHeader: 'Project Contacts',
          isNav: true,
        },
        {
          description: 'AudioFiles',
          path: '/audioFiles/',
          complete: false,
          stepComplete: false,
          preRelease: false,
          stepValidation: 'audioFilesStatus',
          isActive: false,
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+3.5+Audio+Files.mp4',
          modalHeader: 'Audio Files',
          isNav: true,
        },
        {
          description: 'TrackInfo',
          path: '/trackInformation/',
          complete: false,
          stepComplete: false,
          preRelease: true,
          stepValidation: 'trackInfoStatus',
          isActive: false,
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+9+Track+Information.mp4',
          modalHeader: 'Track Information',
          isNav: true,
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
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+10+Territorial+Rights.mp4',
          modalHeader: 'Territorial Rights',
          isNav: true,
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
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+12+Blocking+Policies.mp4',
          modalHeader: 'Post-Release UGC Blocking',
          isNav: true,
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
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+13+Review+%26+Submit.mp4',
          modalHeader: 'Review and Submit',
          isNav: true,
        },
        {
          description: 'Find a Project',
          path: '/findProject/',
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+17+Finding+a+Project.mp4',
          modalHeader: 'Find a Project',
          isNav: false,
        },
        {
          description: 'Project Inbox',
          path: '/inbox',
          tutorialVideoLink:
            'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+15+Project+Inbox.mp4',
          modalHeader: 'Project Inbox',
          isNav: false,
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
      return <i className="material-icons notranslate">block</i>;
    } else {
      return <i className="material-icons notranslate">check</i>;
    }
  };

  setNavClickable = (e, navLink, activeNav) => {
    if (
      navLink.stepValidation === 'audioFilesStatus' &&
      (this.props.projectData.Project['trackInfoStatus'] >= 2 || activeNav === 3)
    ) {
      localStorage.setItem('prevStep', activeNav + 1);
      return null;
    } else {
      if (
        parseInt(this.props.projectData.Project[navLink.stepValidation]) < 2 ||
        (!this.props.projectData.Project[navLink.stepValidation] &&
          navLink.stepValidation !== 'releaseInfoStatus')
      ) {
        e.preventDefault();
      } else {
        localStorage.setItem('prevStep', activeNav + 1);
        return null;
      }
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
    if (this.props.pagePath === '/findProject') {
      return this.getNavIndex(this.state.navSteps);
    }
    if (this.props.pagePath === '/inbox') {
      return this.getNavIndex(this.state.navSteps);
    }
    const isPreRelease = isPreReleaseDate(this.props.projectData);
    const navToUse = isPreRelease
      ? this.state.navSteps.filter(step => step.isNav)
      : this.state.navSteps.filter(step => step.preRelease);
    const activeNav = this.getNavIndex(navToUse);
    return activeNav;
  };

  getNavLinks = () => {
    const isPreRelease = isPreReleaseDate(this.props.projectData);
    //If prerelease date is on, We need 7 steps. Otherwise we need only 5 steps.
    //This can be differentiate based on the flag preRelease
    const navToUse = isPreRelease
      ? this.state.navSteps.filter(step => step.isNav)
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
                  <span className="step-description text-nowrap">
                    {this.props.t(`header:${navLink.description}`)}
                  </span>
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
    return isDefaultCompactViewPage
      ? this.props.t(`header:${isDefaultCompactViewPage.titleText}`)
      : defaultText;
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
    if (!projectStatusID || projectStatusID === 1 || projectStatusID === 4) {
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
    this.props.getAllNotifications({});

    interval = setInterval(() => {
      this.props.getAllNotifications({});
    }, 60000);
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.error !== nextProps.error && nextProps.error) {
      clearInterval(interval);
    }
  }

  componentWillUnmount() {
    clearInterval(interval);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  getHeaderContent = () => {
    let Projectstatus = _.get(
      this.props.projectData,
      'Project.projectStatus',
      this.props.t('header:InProgress'),
    );
    if (this.props.status) {
      Projectstatus = this.props.status ? this.props.status : Projectstatus;
    }
    return (
      <div className="row d-flex no-gutters project-title">
        <div className="col-2"></div>
        <div className="col-9">
          <div className="row d-flex no-gutters">
            <div className="col-10 align-self-start">
              <h1>
                {this.props.projectData.Project && this.props.projectData.Project.projectTitle
                  ? `${this.props.projectData.Project.projectArtistName} - ${this.props.projectData.Project.projectTitle}`
                  : this.getDefaultPageTitle(this.props.t('header:NewProject'))}
              </h1>
            </div>
            <div className="col-2 align-self-start">
              {this.state.showProjectStatus
                ? this.props.t('header:Status') + ': ' + Projectstatus
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
    const win = window.open('/helpGuide', '_blank');
    win.focus();
    // this.props.history.push({ pathname: '/helpGuide/' });
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
              <li key={i}>
                <NavLink
                  className="content-divider"
                  to={{ pathname: '/inbox' }}
                  onClick={() => this.openNotifivations()}
                >
                  <div className="lft-col">
                    <span style={{ background: hexArray[i] }}>{getAlias(noti.AssignedBy)}</span>
                  </div>
                  <div className="rgt-col">
                    {noti.NotificationType === 'Comment' && (
                      <p>
                        <strong className="bold">{noti.AssignedBy}</strong> left you a comment on{' '}
                        <strong className="bold">{noti.Step} </strong>for the project
                        <strong className="bold"> "{noti.ProjectTitle}" </strong> (
                        {moment.utc(noti.DateCreated).fromNow()})
                      </p>
                    )}
                    {noti.NotificationType === 'Audio' && (
                      <p>
                        <strong className="bold">{noti.AssignedBy}</strong> uploaded audio files for
                        the project
                        <strong className="bold"> "{noti.ProjectTitle}" </strong> (
                        {moment.utc(noti.DateCreated).fromNow()})
                      </p>
                    )}
                    {noti.NotificationType === 'Submit' && (
                      <p>
                        <strong className="bold">{noti.AssignedBy}</strong> completed and submitted
                        the project
                        <strong className="bold"> "{noti.ProjectTitle}" </strong> (
                        {moment.utc(noti.DateCreated).fromNow()})
                      </p>
                    )}
                    {noti.NotificationType === 'Tracks' && (
                      <p>
                        <strong className="bold">{noti.AssignedBy}</strong> completed the{' '}
                        <strong className="bold">{noti.Step} </strong>for the project
                        <strong className="bold"> "{noti.ProjectTitle}" </strong> (
                        {moment.utc(noti.DateCreated).fromNow()})
                      </p>
                    )}
                    {noti.NotificationType === 'Masking' && (
                      <p>
                        <strong className="bold">{noti.AssignedBy}</strong> has opted to mask for
                        the project
                        <strong className="bold"> "{noti.ProjectTitle}" </strong> (
                        {moment.utc(noti.DateCreated).fromNow()})
                      </p>
                    )}
                    {noti.NotificationType === 'Project Save' && (
                      <p>
                        <strong className="bold">{noti.AssignedBy}</strong> has assigned{' '}
                        {noti.AssignedTo} for the project
                        <strong className="bold"> "{noti.ProjectTitle}" </strong> (
                        {moment.utc(noti.DateCreated).fromNow()})
                      </p>
                    )}
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
    const { t } = this.props;
    const isPreRelease = isPreReleaseDate(this.props.projectData);
    const activeNav = this.getActiveNav();
    let navToUse =
      isPreRelease || activeNav === 7
        ? this.state.navSteps
        : this.state.navSteps.filter(step => step.preRelease);
    const { notifify } = this.state;
    const { projectData, count } = this.props;
    const { showCommentBox } = this.state;
    if (projectData.Project) {
      return (
        <React.Fragment>
          {activeNav !== null && (
            <VideoTutorialModal
              showModal={this.state.showVideoTutorialModal}
              handleClose={this.hideVideoTutorialModal}
              navSteps={navToUse}
              activeNav={activeNav}
              MoreVideos={true}
            />
          )}
          {showCommentBox && projectData.Project.projectID && (
            <CommentBox
              projectID={projectData.Project.projectID}
              handleClose={this.hideCommentBox}
              t={t}
            />
          )}
          <header
            className={
              this.state.pageViewCompact ? 'row d-flex no-gutters compact' : 'row d-flex no-gutters'
            }
          >
            <div className="col-12 align-items-end flex-column flex-grow-1">
              <div className="row d-flex no-gutters custom-col-width">
                <div className="col-1"></div>
                <div className="col-2 custom-col-2">
                  <NavLink to={{ pathname: '/findProject' }}>
                    <span className="guardian-logo"></span>
                  </NavLink>
                </div>
                <div className="nav-bg"></div>
                <nav className="col-8 custom-col-8 d-flex no-gutters justify-content-end">
                  <ul className="menu-items nav-header-menu">
                    {this.props.userData.IsAdmin ? (
                      <li>
                        <NavLink className="steps" to={{ pathname: '/userAdmin' }}>
                          <i className="material-icons notranslate">supervised_user_circle</i>
                          {t('header:Admin')}
                        </NavLink>
                      </li>
                    ) : null}
                    <li>
                      <NavLink
                        className="steps"
                        to={{ pathname: '/releaseInformation' }}
                        onClick={() => this.props.clearProject()}
                      >
                        <i className="material-icons notranslate">library_music</i>
                        {t('header:NewProject')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="steps" to={{ pathname: '/findProject' }}>
                        <i className="material-icons notranslate">search</i>
                        {t('header:ProjectSearch')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="steps" to={{ pathname: '/inbox' }}>
                        <i className="material-icons notranslate">email</i> {t('header:Inbox')}
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
                        <i id="notify-wrapper" className="material-icons notranslate">
                          notifications
                        </i>
                        {count > 0 && <span>{count}</span>}
                      </div>
                      <div className="notification-wrapper-div">
                        {notifify && count > 0 && this.getNotifications()}
                      </div>
                    </li>
                    <li> | </li>
                    <li>
                      <LanguageDropdown getUserData={this.props.getUserData} />
                    </li>
                    <li>
                      {t('header:Welcome')}, {this.props.userData.FullName}
                    </li>
                    <li>
                      <span className="btn-log" onClick={e => this.props.handleLogoutClick(e)}>
                        {t('header:Logout')}
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
                      <i className={'material-icons notranslate'}>unfold_more</i>
                    </button>
                  </li>
                ) : null}
                <li>
                  <button
                    className="btn btn-sm btn-secondary btn-video"
                    onClick={this.showVideoTutorialModal}
                    title="Tutorial Video"
                  >
                    <i className={'material-icons notranslate'}>videocam</i>
                  </button>
                </li>
                {parseInt(activeNav) >= 0 && projectData.Project.projectID && (
                  <li>
                    <button
                      className="btn btn-sm btn-secondary btn-collapse"
                      onClick={this.showCommentBox}
                      title="Comment"
                    >
                      <i className={'material-icons notranslate'}>message</i>
                    </button>
                  </li>
                )}
                <li>
                  <button
                    className="btn btn-sm btn-secondary btn-help"
                    onClick={this.handleHelpClick}
                    title="Help/FAQs"
                  >
                    <i className={'material-icons notranslate notranslate'}>help</i>
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
});

const mapStateToProps = state => ({
  notifications: state.headerReducer.notifications,
  count: state.headerReducer.count,
  error: state.headerReducer.error,
});

export default withRouter(
  compose(
    withTranslation('header'),
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
  )(Header),
);
