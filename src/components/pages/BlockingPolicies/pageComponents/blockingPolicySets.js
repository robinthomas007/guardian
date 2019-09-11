import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import TracksDropArea from '../../TerritorialRights/pageComponents/TracksDropArea';
import TracksSelectDropDown from '../../TerritorialRights/pageComponents/TracksSelectDropDown';
import BlockingSites from '../pageComponents/BlockingSites';

class BlockingPolicySets extends Component {

    constructor(props) {
		super(props);
		this.state = {
        }
    }

    getBlockingPolicySets = () => {

        const policySets = this.props.data.BlockingPolicySets.map ( (blockingSet, i)  => {
            return (
                <div className="set-card">
                    <div className="row">
                        <div className="col-8">
                            <h3>{blockingSet.description}</h3>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col-4">
                            <table>
                                <thead>
                                    <tr className="row no-gutters">
                                        <th nowrap>Tracks to Block</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td nowrap>
                                           <TracksSelectDropDown 
                                                data={this.props.data.UnassignedTerritorialRightsSetTracks}
                                                onChange={null}
                                                setIndex={null}
                                            />

                                            <TracksDropArea 
                                                data={blockingSet.tracks}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-8">
                            <Table>
                                <thead >
                                    <tr className="row no-gutters">
                                        <th className="col-4 " nowrap>Site</th>
                                        <th className="col-2 text-center" nowrap>Monetize</th>
                                        <th className="col-2 text-center" nowrap>Block</th>
                                        <th className="col-2 text-self-center" nowrap>Allowance</th>
                                        <th className="col-2 text-self-center" nowrap>Block Until</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <BlockingSites
                                        data={blockingSet.platformPolicies}
                                        onChange={(e) => this.props.onChange(e)}
                                        setIndex={i}
                                    />
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            )
        })

        return(policySets)
    }

    render() {
        return(
            this.getBlockingPolicySets()
        )
    }
};

export default BlockingPolicySets;