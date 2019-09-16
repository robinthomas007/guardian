import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import BlockingPolicDurationInput from '../pageComponents/blockingPolicyDurationInput'
import BlockingPolicyDateInput from '../pageComponents/BlockingPolicyDateInput'
import TracksDropArea from '../../TerritorialRights/pageComponents/TracksDropArea';
import TracksSelectDropDown from '../../TerritorialRights/pageComponents/TracksSelectDropDown';

class BlockingSites extends Component {

    constructor(props) {
		super(props);
		this.state = {
            sites : [
                'youtube',
                'soundcloud',
                'facebook',
                'instagram'
            ],
            monetized : false,
            blocked : false,
            blockingSet : {
                platformPolicies : [
                    { 
                        block : true,
                        platformName : ''
                    }
                ]
            }
        }
    }

    handleMonetizeBlock = (e) => {
        this.props.handleMonetizeBlock(e);
    }

    componentDidMount() {
        this.setState( {blockingSet : this.props.blockingSet} )
    };

    getSites = () => {
        return (
            this.state.blockingSet.platformPolicies.map( (site, i) => {
                return(
                    <tr className="row no-g utters" key={i}>
                        <td className="col-2 align-self-center"  nowrap="true">
                            <span className={"platform-sprite " + site.platformName.toLowerCase() }></span>
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <Form.Control 
                                type="radio" 
                                name={'monetizeBlock_' + site.platformName + '_' + this.props.setIndex}
                                siteName={site.platformName}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'block'}
                                onChange={(e) => this.handleMonetizeBlock(e)}
                                value={false}
                                checked={(site.block) ? false : true}
                            />
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <Form.Control 
                                type="radio" 
                                name={'monetizeBlock_' + site.platformName + '_' + this.props.setIndex}
                                siteName={site.platformName}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'block'}
                                onChange={(e) => this.handleMonetizeBlock(e)}
                                value={true}
                                checked={(site.block) ? true : false}
                            />
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <BlockingPolicDurationInput 
                                data={site.duration}
                                onChange={(e) => this.props.onChange(e,i)}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'duration'}
                            />
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <BlockingPolicyDateInput 
                                data={site.expirationDate}
                                onChange={(e) => this.props.onChange(e,i)}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'expirationDate'}
                            />
                        </td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <table>
                <thead>
                    <tr className="d-flex row no-gutters">
                        <th className="col-2" nowrap="true">Tracks to Block</th>
                        <th className="col-2" nowrap="true">Site</th>
                        <th className="col-2 text-center" nowrap="true">Monetize</th>
                        <th className="col-2 text-center" nowrap="true">Block</th>
                        <th className="col-2 text-self-center" nowrap="true">Allowance</th>
                        <th className="col-2 text-self-center" nowrap="true">Block Until</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="col-2" nowrap="true" rowspan="4">
                            <TracksSelectDropDown 
                                data={this.props.UnassignedBlockingPolicySetTracks}
                                onChange={ (e) => this.props.handleTrackSelect(e)}
                                setIndex={this.props.setIndex}
                            />

                            <TracksDropArea 
                                data={this.props.blockingSet.tracks}
                                dragSource={this.props.dragSource}
                                setIndex={this.props.setIndex}
                                handleChildDrag={ (e) => this.props.handleChildDrag(e)}
                                handleDrop={ (e) => this.props.handleChildDrop(e, this.props.setIndex)}
                            />
                        </td>
                    </tr>
                    {this.getSites()}
                </tbody>
            </table>
        )
    }
};

export default BlockingSites;