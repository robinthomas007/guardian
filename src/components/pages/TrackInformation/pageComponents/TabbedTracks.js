import React, { Component } from 'react';
import {Table, Grid, Button, Form, Tabs, Tab  } from 'react-bootstrap'; 
import TrackInformationDataTable from '../pageComponents/TrackInformationDataTable';
import TrackInformationDataTable_OLD from '../pageComponents/TrackInformationDataTable_OLD';

class TabbedTracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discs : [],
            activeTab : 0
        }

        this.handleTabClick = this.handleTabClick.bind(this);
        this.addDisc = this.addDisc.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.updateDiscData = this.updateDiscData.bind(this);
    }

    addTrack = () => {
        const {discs} = this.state;
        let modifiedDiscs = discs;
            modifiedDiscs[this.props.activeDiscTab - 1].Tracks.push('')

        this.setState({discs : modifiedDiscs})

        // if(discs) {
        //     updatedDiscs = discs;
        //     updatedDiscs.push("");
        // } 
        // this.setState({discs : updatedDiscs})
    };

    addDisc = () => {
        const {discs} = this.state;
        let updatedDiscs = [];

        if(discs) {
            updatedDiscs = discs;
            updatedDiscs.push("");
        } 
        this.setState({discs : updatedDiscs})
    }

    addTrack = () => {
        this.props.addTrack()
    }

    updateDiscData(discID, discData) {
        let updatedDiscData = {
            "discNumber" : JSON.stringify((discID + 1)),
            "Tracks" : discData
        }
        this.props.handleDiscUpdate(discID, updatedDiscData)
    }

    componentWillReceiveProps(props) {
        this.setState({discs: props.data.Discs});
    }

    handleTabClick(key) {
        this.props.handleActiveDiscUpdate(key)
    }

    getDiscTabs = () => {
        if(this.state.discs) {
            let discs = this.state.discs.map((disc, i) => { 
                const count = (i + 1);

                return(
                    <Tab key={i} eventKey={count} title={"Disc " + count}>
                        <TrackInformationDataTable 
                            data={this.props.data} 
                            discID={i}
                            updateDiscData={this.updateDiscData}
                        />
                    </Tab>
                )
            })
    
            return(
                <Tab.Container defaultActiveKey="1">
                    <Tabs 
                        onSelect={this.handleTabClick}
                    >
                        {discs}
                    </Tabs>
                </Tab.Container>
            )
        } else {
            this.addDisc();
        } 
    }

    render() {
        return(
            <div>
                <div className="row no-gutters d-flex">
                    <div className="col-9"></div>
                    <div className="col-3 d-flex justify-content-end">
                        <ul className="disc-track-buttons">
                            <li>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary btn-sm" 
                                    onClick={this.addDisc}
                                ><i className="material-icons">adjust</i>Add Disc</button>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary btn-sm" 
                                    onClick={this.addTrack}
                                ><i className="material-icons">add</i> Add Track</button>
                            </li>
                        </ul>
                    </div>
                </div>
                {this.getDiscTabs()}
            </div>
        )
    }
}

export default TabbedTracks;