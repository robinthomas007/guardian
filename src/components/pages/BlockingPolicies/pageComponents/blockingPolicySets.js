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

    handleTrackSelect = (e) => {
        this.props.handleTrackSelect(e);
    }

     handleDrop(e, i) {

        // const { TerritorialRightsSets } = this.props.data;
        // var data = e.dataTransfer.getData("text/html");
        // let modifiedTerritorialRightsSets = TerritorialRightsSets;
        //     modifiedTerritorialRightsSets[i].tracks.push( {trackID : this.props.dragSource.getAttribute('trackid'), trackTitle : this.props.dragSource.getAttribute('tracktitle')} )

        // this.props.handleChange(modifiedTerritorialRightsSets);
        // this.props.handleChildDrop(i);
    }

    handleDeleteButton = (i) => {
        if(this.props.data.BlockingPolicySets.length > 1 ) {
            return (
                <button className="btn btn-secondary action align-middle" onClick={ () => this.props.handleSetDelete(i)}>
                    <i className="material-icons" data-toggle="tooltip" title="Save Rights Set">delete</i>
                </button>
            )
        } else {
            return('')
        }
    }

    getBlockingPolicySets = () => {

        const policySets = this.props.data.BlockingPolicySets.map ( (blockingSet, i)  => {
            return (
                <div className="set-card" key={i}>

                    <div className="row d-flex col-12 no-gutters">
                        <h3>{blockingSet.description}</h3>

                        <div className="delete-rights-set">
                            {this.handleDeleteButton(i)}
                        </div>
                    </div>

                    <div className="row no-gutters">
                        <div className="col-12">
                            <BlockingSites
                                blockingSet={blockingSet}
                                UnassignedBlockingPolicySetTracks = {this.props.data.UnassignedBlockingPolicySetTracks}
                                onChange={(e) => this.props.onChange(e)}
                                setIndex={i}
                                handleMonetizeBlock={ (e) => this.props.handleMonetizeBlock(e)}
                                dragSource={this.props.dragSource}
                                handleChildDrag={ (e) => this.props.handleChildDrag(e)}
                                handleChildDrop={(e,i) => this.props.handleDrop(e,i) }
                                handleTrackSelect={ (e) => this.props.handleTrackSelect(e)}
                            />
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