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
            ]
        }
    }

    handleMonetizeBlock = (e) => {
        this.props.handleMonetizeBlock(e);
    }

    render() {
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
                                checked={false}
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
                                checked={true}
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
            }
        )
    )}
};

export default BlockingSites;