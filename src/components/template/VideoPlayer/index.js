import React, { Component } from 'react';
import VideoTutorialModal from '../../modals/VideoTutorialModal';

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoTutorialModal: false,
    };
  }

  show = () => {
    this.setState({ showVideoTutorialModal: true });
  };

  hide = () => {
    this.setState({ showVideoTutorialModal: false });
  };

  render() {
    const { showVideoTutorialModal } = this.state;
    const { title, link, text } = this.props;
    const videos = [
      {
        modalHeader: title || 'Video Tutorial',
        tutorialVideoLink:
          link ||
          'https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+17+Finding+a+Project.mp4',
      },
    ];
    return (
      <>
        <button
          type="button"
          className="btn btn-secondary btn-video"
          onClick={this.show}
          title={title || 'Tutorial Video'}
        >
          <i className={'material-icons'}>videocam</i>
          {text && <span>&nbsp;{text}</span>}
        </button>
        <VideoTutorialModal
          showModal={showVideoTutorialModal}
          handleClose={this.hide}
          navSteps={videos}
          activeNav={0}
          MoreVideos={false}
        />
      </>
    );
  }
}
