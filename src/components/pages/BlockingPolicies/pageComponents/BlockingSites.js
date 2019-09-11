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

    getSitesValues = (site) => {
        const { platformPolicies } = this.props.data;
    };

    handleMonetizeBlock = (e) => {
        this.props.handleMonetizeBlock(e);
    }

    render() {
        return (
            this.state.sites.map( (site, i) => {
                return(
                    <tr className="row no-g utters">
                        <td className="col-4 align-self-center" nowrap>
                            <span className={"platform-sprite " + site }></span>
                        </td>
                        <td className="col-2 centered align-self-center" nowrap>
                            <Form.Control 
                                id={'block'}
                                type="radio" 
                                name={'monetizeBlock_' + site + '_' + this.props.setIndex}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'block'}
                                onChange={(e) => this.props.onChange(e,i)}
                                value={false}
                            />
                        </td>
                        <td className="col-2 centered align-self-center" nowrap>
                            <Form.Control 
                                id={'block'}
                                type="radio" 
                                name={'monetizeBlock_' + site + '_' + this.props.setIndex}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'block'}
                                onChange={(e) => this.props.onChange(e,i)}
                                value={true}
                            />
                        </td>
                        <td className="col-2 centered align-self-center" nowrap>
                            <BlockingPolicDurationInput 
                                data={null}
                                onChange={(e) => this.props.onChange(e)}
                                siteName={site}
                                siteIndex={i}
                                setIndex={this.props.setIndex}
                                inputTarget={'duration'}
                            />
                        </td>
                        <td className="col-2 centered align-self-center" nowrap>
                            <BlockingPolicyAllowanceInput 
                                data={null}
                                onChange={(e) => this.props.onChange(e)}
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