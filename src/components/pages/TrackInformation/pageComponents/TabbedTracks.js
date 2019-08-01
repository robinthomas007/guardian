import React, { Component } from 'react';
import {Table, Grid, Button, Form, Tabs, Tab  } from 'react-bootstrap'; 
import TrackInformationDataTable from '../pageComponents/TrackInformationDataTable';
import TrackInformationDataTable_OLD from '../pageComponents/TrackInformationDataTable_OLD';

class TabbedTracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discs : []
        }

        this.handleTabClick = this.handleTabClick.bind(this);
        this.addDisc = this.addDisc.bind(this);
        this.updateDiscData = this.updateDiscData.bind(this);
    }

    addDisc = () => {
        const {discs} = this.state;
        let updatedDiscs = [];

        if(discs) {
            updatedDiscs = discs;
            updatedDiscs.push("");
        } 
        this.setState({discs : updatedDiscs})
    }

    updateDiscData(discID, discData) {
        const  {discs} = this.state;
        discID = parseInt(discID) + 1;
        //const disc

        //this.setState({discs : discData})


        //console.log(thisDisc)
        //console.log('------')
        //console.log(discData)
        
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
                {this.getDiscTabs()}
                <div onClick={this.addDisc}>addDisc</div>
            </div>

        )
    }
}

export default TabbedTracks;