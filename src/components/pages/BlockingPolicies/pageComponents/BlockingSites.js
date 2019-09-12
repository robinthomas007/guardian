import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import BlockingPolicDurationInput from '../pageComponents/blockingPolicyDurationInput'
import BlockingPolicyAllowanceInput from '../pageComponents/BlockingPolicyAllowanceInput'

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
        }
    }

    handleMonetizeBlock = (e) => {
        this.props.handleMonetizeBlock(e);
    }

    getSites = () => {
        return (
            this.state.sites.map( (site, i) => {
                return(
                    <tr className="row no-g utters" key={i}>
                        <td className="col-4 align-self-center"  nowrap="true">
                            <span className={"platform-sprite " + site }></span>
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <Form.Control 
                                type="radio" 
                                name={'monetizeBlock_' + site + '_' + this.props.setIndex}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'block'}
                                onChange={(e) => this.handleMonetizeBlock(e)}
                                value={false}
                                checked={this.state.monetized}
                            />
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <Form.Control 
                                type="radio" 
                                name={'monetizeBlock_' + site + '_' + this.props.setIndex}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'block'}
                                onChange={(e) => this.handleMonetizeBlock(e)}
                                value={true}
                                checked={this.state.blocked}
                            />
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <BlockingPolicDurationInput 
                                data={null}
                                onChange={(e) => this.props.onChange(e,i)}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'duration'}
                            />
                        </td>
                        <td className="col-2 centered align-self-center"  nowrap="true">
                            <BlockingPolicyAllowanceInput 
                                data={null}
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
            <Table>
                <thead >
                    <tr className="row no-gutters">
                        <th className="col-4 "  nowrap="true">Site</th>
                        <th className="col-2 text-center"  nowrap="true">Monetize</th>
                        <th className="col-2 text-center"  nowrap="true">Block</th>
                        <th className="col-2 text-self-center"  nowrap="true">Allowance</th>
                        <th className="col-2 text-self-center"  nowrap="true">Block Until</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getSites()}
                </tbody>
            </Table>
        )
    }
};

export default BlockingSites;