import React, { Component } from 'react';
import {formatDateToYYYYMMDD} from '../../../Utils';

class BlockingPoliciesDataTable extends Component {

    constructor(props) {
        super(props);

        this.state = { 

        }
    };

    getblockedPolicyText = (platform) => {
        return(
            (!platform.duration && !platform.expirationDate) ? ((!platform.expirationDate) ? 'Block All' : 'Block All Until ' + platform.expirationDate) : 'Block ' + platform.duration + ((platform.expirationDate) ? ' Until ' + platform.expirationDate : ' Always ')
        )
    };

    getTrackPolicies = (platforms) => {
        return(
            platforms.map( (platform, i) => {
                return(
                    <td className="align-items-center" nowrap="nowrap">{ (platform.block) ? this.getblockedPolicyText(platform) : 'Monetize All'}</td>
                )
            })
        )
    };

    getBlockingPolicyTracks = (policy, setIndex) => {
        return(
            this.props.data.TerritorialRightsSets[setIndex].tracks.map( (track, i)  => {
                return(
                    <tr>
                        <td nowrap="nowrap">{(i === 0) ? policy.description : ''}</td>
                        <td className="" nowrap="nowrap">{track.trackTitle}</td>
                        {this.getTrackPolicies(policy.platformPolicies)}
                    </tr>
                )
            })
        )
    };

    getBlockingPolicySets = () => {
        return(
            this.props.data.BlockingPolicySets.map( (policy, i)  => {
                return(
                    this.getBlockingPolicyTracks(policy, i)
                )
            })
        )
    };

    render() {
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th className="align-text-bottom" nowrap="nowrap">Blocking Policy Name</th>
                        <th className="align-text-bottom" nowrap="nowrap">Tracks With This Policy</th>
                        <th className="align-items-center"><span className="platform-sprite small youtube"></span></th>
                        <th className="align-items-center"><span className="platform-sprite small soundcloud"></span></th>
                        <th className="align-items-center"><span className="platform-sprite small facebook"></span></th>
                        <th className="align-items-center"><span className="platform-sprite small instagram"></span></th>
                    </tr>
                </thead>
                <tbody>
                    {(this.props.data.TerritorialRightsSets) ? this.getBlockingPolicySets() : null}
                </tbody>
            </table>
        )
    }
}

export default BlockingPoliciesDataTable;