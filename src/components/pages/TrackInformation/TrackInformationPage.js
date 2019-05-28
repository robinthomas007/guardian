import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import ReplaceAudioModal from '../../modals/ReplaceAudioModal';
import './TrackInformation.css';

class TrackInformationDataTable extends Component {

    constructor(props) {
        super(props);

        const dataRows = this.props.data

        this.state = {
            dataRows : dataRows
        }
    }
 
    trackInformationDataHeader = () => {
        return(
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th className="text-center"></th>
                    <th className="text-center"></th>
                    <th>ISRC <i>(Optional)</i></th>
                    <th>Track Title</th>
                    <th className="text-center">Single</th>
                    <th>Release Date111</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
        )
    }



    render() {
        let dataRows = this.state.dataRows.map( (track, i) =>
          <tr key={i} draggable>
                <td className="text-center">{track.trackSequence}</td>
                <td className="text-center"><i className="material-icons">format_line_spacing</i></td>
                <td className="text-center"><i className="material-icons purple-icon">audiotrack</i></td>
                <td><Form.Control type="text" defaultValue={track.trackISRC}></Form.Control></td>
                <td><Form.Control type="text" defaultValue={track.trackTitle}></Form.Control></td>
                <td className="text-center">
                    <label className="custom-checkbox">
                        <input type="checkbox" defaultChecked={track.trackSingle}/>
                        <span className="checkmark"></span>
                    </label>
                </td>
                <td>
                    <Form.Control 
                        type="date" 
                        defaultValue={track.trackReleaseDate.date}
                        disabled={track.trackReleaseDate.disabled}
                    >
                    </Form.Control>
                </td>
                <td className="text-center">
                    <button className="btn btn-secondary action" onClick={this.props.showClick}><i className="material-icons">publish</i></button>
                    <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                </td>
            </tr>
       )

        return (
            <div className="table-responsive">
                <Table droppable className="track-information">
                    {this.trackInformationDataHeader()}
                    <tbody>
                        {dataRows}
                    </tbody>
                </Table>
            </div>
        )
    }
}


class TrackInformationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableRows : [

            ],
            showReplaceModal : false
        }
        this.addBlankRow = this.addBlankRow.bind(this);
        this.showTrackModal = this.showTrackModal.bind(this);
        this.hideTrackModal = this.hideTrackModal.bind(this);
    }
  
    getBlankRow = (rowCount) => {
        return(
            {
                trackSequence : rowCount + 1,
                trackISRC: '',
                trackTitle : '',
                trackSingle : false,
                trackReleaseDate : {
                    date : '01/11/1111',
                    disabled : true
                }
            }
        )
    }

    addBlankRow() {
        var rowCount = this.state.tableRows.length
        var newRow = this.state.tableRows   
            newRow.push(this.getBlankRow(rowCount))
        this.setState({tableRows : newRow})
    }

    showTrackModal() {
        this.setState({showReplaceModal : true})
    }

    hideTrackModal() {
        this.setState({showReplaceModal : false})
    }

    render() {

        if(this.state.tableRows.length <= 0) {
            this.addBlankRow()
        } 

        return (
            <section className="page-container h-100">
            
                <ReplaceAudioModal showModal={this.state.showReplaceModal} handleClose={this.hideTrackModal}/>

                <PageHeader />
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">4</span> Track Information</h2>
                        <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>
                <div>
                    <TrackInformationDataTable data={this.state.tableRows} showClick={this.showTrackModal}/>
                </div>
                <section className="row save-buttons">
                    <div className="col-9">
                        <button type="button" className="btn btn-primary float-left" onClick={this.addBlankRow}>Add Track</button>
                    </div>
                    <div className="col-3">
                        <button type="button" className="btn btn-secondary">Save</button>
                        <button type="button" className="btn btn-primary">Save &amp; Continue</button>
                    </div>
                </section>
            </section>
        )
    }
};

export default TrackInformationPage;