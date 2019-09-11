import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import BlockingPolicDurationInput from '../pageComponents/blockingPolicyDurationInput'

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
                                type="radio" 
                                name={'monetizeBlock_' + site}
                                siteName={site}
                                setIndex={this.props.setIndex}
                                onChange={(e) => this.props.onChange(e)}
                                value={'monetize'}
                            />
                        </td>
                        <td className="col-2 centered align-self-center" nowrap>
                            <Form.Control 
                                type="radio" 
                                name={'monetizeBlock_' + site}
                                siteName={site}
                                setIndex={this.props.setIndex}
                                onChange={(e) => this.props.onChange(e)}
                                value={'block'}
                            />
                        </td>
                        <td className="col-2 centered align-self-center" nowrap>
                            <BlockingPolicDurationInput 
                                data={null}
                            />
                        </td>
                        <td className="col-2 centered align-self-center" nowrap>Block Until</td>
                    </tr>
                )
            }
        )
    )}
};

export default BlockingSites;


