import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import BlockingPolicDurationInput from '../pageComponents/blockingPolicyDurationInput'
import BlockingPolicyDateInput from '../pageComponents/BlockingPolicyDateInput'
import TracksDropArea from '../../TerritorialRights/pageComponents/TracksDropArea';
import TracksSelectDropDown from '../../TerritorialRights/pageComponents/TracksSelectDropDown';
import {formatDateToYYYYMMDD} from '../../../Utils';

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
            blockingSet : {
                platformPolicies : [
                    { 
                        block : false,
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
                    <tr key={i}>
                        <td>
                            <span className={"platform-sprite " + site.platformName.toLowerCase() }></span>
                        </td>
                        <td>
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
                        <td>
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
                        <td>
                            <BlockingPolicDurationInput 
                                data={site.duration}
                                onChange={(e) => this.props.onChange(e,i)}
                                siteName={site.platformName}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'duration'}
                                id={'duration'}
                            />
                        </td>
                        <td>
                            <BlockingPolicyDateInput 
                                data={site.expirationDate}
                                onChange={(e) => this.props.onChange(e,i)}
                                siteName={site.platformName}
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
            <Table>
                <thead>
                    <tr>
                        <th>Tracks to Block</th>
                        <th>Site</th>
                        <th>Monetize</th>
                        <th>Block</th>
                        <th>Allowance</th>
                        <th>Block Until</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td rowspan="5">
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
            </Table>
        )
    }
};

export default BlockingSites;