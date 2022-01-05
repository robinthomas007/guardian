import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class TerritorialRightsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getTrackCountries = countries => {
    return countries.map((country, i) => {
      return country.name + (i < countries.length - 1 ? ', ' : '');
    });
  };

  getTerritorialRightsTracks = (policy, setIndex) => {
    return this.props.data.TerritorialRightsSets[setIndex].tracks.map((track, i) => {
      return (
        <tr className="row no-gutters" key={i}>
          <td className="col-3">{i === 0 ? policy.description : ''}</td>
          <td className="col-3">{track.trackTitle}</td>
          <td className="col-3">
            {policy.hasRights ? this.getTrackCountries(policy.countries) : ''}
          </td>
          <td className="col-3">
            {!policy.hasRights ? this.getTrackCountries(policy.countries) : ''}
          </td>
        </tr>
      );
    });
  };

  getTerritorialRightsSets = () => {
    return this.props.data.TerritorialRightsSets.map((policy, i) => {
      return this.getTerritorialRightsTracks(policy, i);
    });
  };

  getUnassignedTerritorialRightsSetTracks = () => {
    return this.props.data.UnassignedTerritorialRightsSetTracks.map((track, i) => {
      return (
        <tr key={i} className={'row no-gutters'}>
          <td className="col-3">{i === 0 ? this.props.t('review:UnassignedTracks') : ''}</td>
          <td className="col-3">{track.trackTitle}</td>
          <td className="col-3">{this.props.t('territorial:Worldwide')}</td>
          <td className="col-3">&nbsp;</td>
        </tr>
      );
    });
  };

  render() {
    const { t } = this.props;
    return (
      <table className="table">
        <thead>
          <tr className="row no-gutters">
            <th className="col-3">{t('review:RightsPolicyName')}</th>
            <th className="col-3">{t('review:TracksWithThisPolicy')}</th>
            <th className="col-3">{t('review:HasRightsIn')}</th>
            <th className="col-3">{t('review:HasRightsEverywhereExcept')}</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.TerritorialRightsSets ? this.getTerritorialRightsSets() : null}
          {/* {(this.props.data.UnassignedTerritorialRightsSetTracks) ? this.getUnassignedTerritorialRightsSetTracks() : null} */}
        </tbody>
      </table>
    );
  }
}

export default withTranslation()(TerritorialRightsTable);
