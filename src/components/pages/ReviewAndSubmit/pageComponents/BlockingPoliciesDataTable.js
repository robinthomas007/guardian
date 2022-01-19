import React, { Component } from 'react';
import moment from 'moment';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';

class BlockingPoliciesDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getblockedPolicyText = platform => {
    return !platform.duration && !platform.expirationDate
      ? !platform.expirationDate
        ? 'Block All'
        : 'Block All Until ' + platform.expirationDate
      : 'Block ' +
          platform.duration +
          (platform.expirationDate
            ? ' Until ' + moment(platform.expirationDate).format('DD-MM-YYYY')
            : ' Always ');
  };

  getTrackPolicies = platforms => {
    return platforms.map((platform, i) => {
      return (
        <td key={i} className="align-items-center" nowrap="nowrap">
          {platform.block
            ? this.getblockedPolicyText(platform)
            : this.props.t('review:MonetizeAll')}
        </td>
      );
    });
  };

  getBlockingPolicyTracks = (policy, setIndex) => {
    return this.props.data.BlockingPolicySets[setIndex].tracks.map((track, i) => {
      return (
        <tr key={i}>
          <td nowrap="nowrap">
            {i === 0 ? this.props.t('territorial:Set') + ' #' + (setIndex + 1) : ''}
          </td>
          <td className="" nowrap="nowrap">
            {track.trackTitle}
          </td>
          {this.getTrackPolicies(policy.platformPolicies)}
        </tr>
      );
    });
  };

  getBlockingPolicySets = () => {
    return this.props.data.BlockingPolicySets.map((policy, i) => {
      return this.getBlockingPolicyTracks(policy, i);
    });
  };

  getUnassignedBlockingPolicyTracks = () => {
    return this.props.data.UnassignedBlockingPolicySetTracks.map((track, i) => {
      return (
        <tr key={i}>
          <td>{i === 0 ? this.props.t('review:UnassignedTracks') : ''}</td>
          <td>{track.trackTitle}</td>
          <td>{this.props.t('review:MonetizeAll')}</td>
          <td>{this.props.t('review:MonetizeAll')}</td>
          <td>{this.props.t('review:MonetizeAll')}</td>
          <td>{this.props.t('review:MonetizeAll')}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="align-text-bottom" nowrap="nowrap">
              {this.props.t('review:BlockingPolicyName')}
            </th>
            <th className="align-text-bottom" nowrap="nowrap">
              {this.props.t('review:TracksWithThisPolicy')}
            </th>
            <th className="align-items-center">
              <span className="platform-sprite small youtube"></span>
            </th>
            <th className="align-items-center">
              <span className="platform-sprite small soundcloud"></span>
            </th>
            <th className="align-items-center">
              <span className="platform-sprite small facebook"></span>
            </th>
            <th className="align-items-center">
              <span className="platform-sprite small instagram"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.TerritorialRightsSets ? this.getBlockingPolicySets() : null}
          {this.props.data.UnassignedBlockingPolicySetTracks
            ? this.getUnassignedBlockingPolicyTracks()
            : null}
        </tbody>
      </table>
    );
  }
}

export default withTranslation()(BlockingPoliciesDataTable);
