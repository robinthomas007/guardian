import React, { Component } from 'react';

class TerritorialRightsTable extends Component {

    constructor(props) {
        super(props);

        this.state = { 
        }
    };

    getTrackCountries = (countries) => {
        return(
            countries.map( (country, i) => {
                return(
                    country.name + ((i < countries.length - 1) ? ', ' : '')
                )
            })
        )
    };

    getTerritorialRightsTracks = (policy, setIndex) => {
        return(
            this.props.data.TerritorialRightsSets[setIndex].tracks.map( (track, i)  => {
                return(
                    <tr className="row no-gutters" key={i}>
                        <td className="col-3">{(i === 0) ? policy.description : ''}</td>
                        <td className="col-3">{track.trackTitle}</td>
                        <td className="col-3">{ (policy.hasRights) ? this.getTrackCountries(policy.countries) : ''}</td>
                        <td className="col-3">{ (!policy.hasRights) ? this.getTrackCountries(policy.countries) : ''}</td>
                    </tr>
                )
            })
        )
    };

    getTerritorialRightsSets = () => {
        return(
            this.props.data.TerritorialRightsSets.map( (policy, i)  => {
                return(
                    this.getTerritorialRightsTracks(policy, i)
                )
            })
        )
    };

    render() {
        return(
            <table className="table">
                <thead>
                    <tr className="row no-gutters">
                        <th className="col-3">Rights Policy Name</th>
                        <th className="col-3">Tracks With This Policy</th>
                        <th className="col-3">Has Rights In</th>
                        <th className="col-3">Has Rights Everywhere Except</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.props.data.TerritorialRightsSets) ? this.getTerritorialRightsSets() : null}
                </tbody>
            </table>
        )
    }
};

export default TerritorialRightsTable;