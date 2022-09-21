import React, { Component } from 'react';
import MultiSelectDropDown from '../../../SharedPageComponents/multiSelectDropdown';
import TracksRightsRule from '../../TerritorialRights/pageComponents/TracksRightsRule';
import TracksSelectDropDown from '../../TerritorialRights/pageComponents/TracksSelectDropDown';
import TracksDropArea from '../../TerritorialRights/pageComponents/TracksDropArea';
import _ from 'lodash';

class TracksRightsSets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TerritorialRightsSets: [],
      selectedCountries: [],
    };

    this.handleDrop = this.handleDrop.bind(this);
  }

  getTracksList = tracks => {
    const tracksList = tracks.map((track, i) => {
      return (
        <div key={i} draggable="true" class="draggable-track">
          <i class="material-icons">dehaze</i>&nbsp;&nbsp;{track.trackTitle}
        </div>
      );
    });
    return tracksList;
  };

  handleTrackSelect = e => {
    const setIndex = parseInt(e.target.getAttribute('setindex'));
    const { TerritorialRightsSets } = this.props.data;
    let modifiedTerritorialRightsSets = TerritorialRightsSets;
    modifiedTerritorialRightsSets[setIndex].tracks.push({
      trackID: e.target.getAttribute('trackid'),
      trackTitle: e.target.getAttribute('tracktitle'),
    });
    this.props.handleChange(modifiedTerritorialRightsSets);
    this.props.handleNoRightsTracksRemove(undefined, e.target.getAttribute('trackid'));
  };

  handleDrop(e, i) {
    const { TerritorialRightsSets } = this.props.data;
    var data = e.dataTransfer.getData('text/html');
    let modifiedTerritorialRightsSets = TerritorialRightsSets;
    for (let j = 0; j < this.props.dragSource.length; j++) {
      modifiedTerritorialRightsSets[i].tracks.push({
        trackID: this.props.dragSource[j].getAttribute('trackid'),
        trackTitle: this.props.dragSource[j].getAttribute('tracktitle'),
      });
    }
    this.props.handleChange(modifiedTerritorialRightsSets);
    this.props.handleChildDrop(i);
  }

  getCountryNameByID(countryID) {
    const countrys = this.props.data.Countries.filter(country => {
      return !countryID.indexOf(country.id);
    });
    return { id: countrys[0].id, name: countrys[0].name };
  }

  handleCountrySelect = (inputValue, wwIndex) => {
    if (wwIndex == inputValue.length - 1) {
      return [inputValue[wwIndex]];
    } else {
      inputValue.splice(wwIndex, 1);
      return inputValue;
    }
  };

  handleCountryChange = (inputValue, setIndex) => {
    const { TerritorialRightsSets } = this.props.data;
    const wwIndex = inputValue.indexOf('WW');

    if (wwIndex >= 0) {
      inputValue = this.handleCountrySelect(inputValue, wwIndex);
    }

    inputValue = _.union(inputValue);
    let formattedInputValues = inputValue.map(countryID => {
      return this.getCountryNameByID(countryID);
    });

    let modifiedTerritorialRightsSets = TerritorialRightsSets;
    modifiedTerritorialRightsSets[setIndex].countries = formattedInputValues;

    this.props.handleChange(modifiedTerritorialRightsSets);
  };

  handleRightsRuleChange = (inputValue, setIndex) => {
    const { TerritorialRightsSets } = this.props.data;
    let modifiedTerritorialRightsSets = TerritorialRightsSets;
    modifiedTerritorialRightsSets[setIndex].hasRights = inputValue;
    if (modifiedTerritorialRightsSets[setIndex].countries.length === 0) {
      modifiedTerritorialRightsSets[setIndex].countries.push({
        id: 'WW',
        name: this.props.t('territorial:Worldwide'),
      });
    }
    this.props.handleChange(modifiedTerritorialRightsSets);

    if (!inputValue) {
      modifiedTerritorialRightsSets[setIndex].countries = [];
      this.props.handleChange(modifiedTerritorialRightsSets);
    }
  };

  handleDeleteButton = i => {
    if (this.props.data.TerritorialRightsSets.length > 1) {
      return (
        <button
          className="btn btn-secondary action align-middle"
          onClick={() => this.props.handleSetDelete(i)}
        >
          <i className="material-icons" data-toggle="tooltip" title="Save Rights Set">
            delete
          </i>
        </button>
      );
    } else {
      return '';
    }
  };

  getCountryIDs = countries => {
    let countryIDs = countries.map((country, i) => {
      return country.id;
    });
    return countryIDs;
  };

  listOfCountries = countries => {
    return countries.map((country, i) => {
      return country.name;
    });
  };

  getSetsList = () => {
    const { t } = this.props;
    const rightsSets = this.props.data.TerritorialRightsSets.map((rightsSet, i) => {
      const trackHeight = rightsSet.tracks.length > 3 ? rightsSet.tracks.length * 35 : 80;
      const dropDownVal = _.filter(
        this.props.data.UnassignedTerritorialRightsSetTracks,
        val => val.hasRights !== false,
      );
      const IsLockedByUgc = _.find(rightsSet.tracks, 'IsLockedByUgc');
      return (
        <div key={i} className="set-card">
          <div className="row d-flex col-12 no-gutters">
            <h3>{this.props.t('territorial:Set') + ' #' + (i + 1)}</h3>

            <div className="delete-rights-set">{this.handleDeleteButton(i)}</div>
          </div>

          <div className="table-responsive d-flex row no-gutters">
            <table className="territorial-rights-table col-12">
              <thead>
                <tr className="d-flex row no-gutters">
                  <th className="col-4" nowrap="true">
                    {t('territorial:TrackswiththisRightsSet')}
                  </th>
                  <th className="col-4" nowrap="true">
                    {t('territorial:RightsRule')}
                  </th>
                  <th className="col-4" nowrap="true">
                    {t('territorial:SelectCountries')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="d-flex row no-gutters">
                  <td className="col-4">
                    <TracksSelectDropDown
                      data={dropDownVal}
                      onChange={e => this.handleTrackSelect(e, rightsSet)}
                      setIndex={i}
                      t={t}
                      // disabled={IsLockedByUgc}
                    />

                    <TracksDropArea
                      data={rightsSet.tracks}
                      handleDrop={this.handleDrop}
                      setIndex={i}
                      handleChildDrop={(e, i) => this.handleDrop()}
                      handleChildDrag={this.props.handleChildDrag}
                      dragSource={this.props.dragSource}
                      t={t}
                      disabled={IsLockedByUgc}
                    />
                  </td>
                  <td className="col-4">
                    <TracksRightsRule
                      data={rightsSet.hasRights}
                      setIndex={i}
                      onChange={value => this.handleRightsRuleChange(value, i)}
                      t={t}
                      disabled={IsLockedByUgc}
                    />
                  </td>
                  <td className="col-4">
                    <div className="dropdown">
                      <MultiSelectDropDown
                        clear={rightsSet.hasRights}
                        placeHolder={t('territorial:SelectCountry')}
                        optionList={this.props.data.Countries}
                        value={this.getCountryIDs(rightsSet.countries)}
                        id={'territorialRightsCountry_' + i}
                        onChange={value => this.handleCountryChange(value, i)}
                        disabled={IsLockedByUgc}
                      />
                    </div>
                    <br />
                    <br />
                    <div className="country-list" style={{ maxHeight: trackHeight }}>
                      {this.listOfCountries(rightsSet.countries)
                        .toString()
                        .replace(/,/g, ', ')}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    });
    return rightsSets;
  };

  render() {
    return this.getSetsList();
  }
}

export default TracksRightsSets;
