import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import ReplaceAudioModal from '../../modals/ReplaceAudioModal';
import { withRouter } from "react-router";
import './TrackInformation.css';
import Noty from 'noty'

class TrackInformationDataTable extends Component {

    constructor(props) {
        super(props);

        const dataRows = this.props.data

        this.state = {
            dataRows : dataRows,
            formInputs : {}
        }

        this.updateState = this.updateState.bind(this);

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
                    <th>Release Date</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
        )
    }

    updateState(e) {
        this.setState( {formInputs : { ...this.state.formInputs, [e.target.id] : e.target.value}} )
        this.props.handleChange(e)
    }

    render() {
        let dataRows = this.state.dataRows.map( (track, i) =>
          <tr key={i} draggable>
                <td className="text-center">
                    <Form.Control 
                        type="hidden" 
                        id={'trackSequence_' + i} 
                        defaultValue={track.trackSequence} 
                        onChange={this.updateState}
                    ></Form.Control>
                    <Form.Control 
                        type="hidden" 
                        id={'trackID_' + i} 
                        value={this.state.formInputs['trackID_'+ i]} 
                        onChange={this.props.handleChange}
                    ></Form.Control>
                    {track.trackSequence}
                </td>
                <td className="text-center"><i className="material-icons">format_line_spacing</i></td>
                <td className="text-center"><i className="material-icons purple-icon">audiotrack</i></td>
                <td>
                    <Form.Control 
                        type="text" 
                        id={'trackIsrc_' + i} 
                        value={this.state.formInputs['trackIsrc_'+ i]} 
                        onChange={this.updateState}
                    ></Form.Control>
                </td>
                <td>
                    <Form.Control 
                        type="text" 
                        id={'trackTitle_' + i} 
                        value={this.state.formInputs['trackTitle_' + i]} 
                        onChange={this.updateState}
                    ></Form.Control>
                </td>
                <td className="text-center">
                    <label className="custom-checkbox">
                        <input 
                            type="checkbox" 
                            id={'trackSingle_' + i} 
                            defaultChecked={track.trackSingle} 
                            defaultValue={track.trackSingle} 
                            onChange={this.updateState}/>
                        <span className="checkmark"></span>
                    </label>
                </td>
                <td>
                    <Form.Control 
                        type="date" 
                        id={'trackReleaseDate_' + i}
                        defaultValue={track.trackReleaseDate.date}
                        disabled={track.trackReleaseDate.disabled}
                        onChange={this.updateState}
                    >
                    </Form.Control>
                </td>
                <td className="text-center">
                    <button 
                        className="btn btn-secondary action" 
                        rowindex={i} 
                        onClick={this.props.showClick}
                    ><i className="material-icons">publish</i></button>
                    <button 
                        className="btn btn-secondary action" 
                        rowIndex={i} 
                        onClick={this.props.removeRow.bind(null, i)}
                    ><i className="material-icons">delete</i></button>
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
            formInputs : {},
            tableRows : [],
            showReplaceModal : false,
            tracksData : []
        }
        this.addBlankRow = this.addBlankRow.bind(this);
        this.showTrackModal = this.showTrackModal.bind(this);
        this.hideTrackModal = this.hideTrackModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.showNotification = this.showNotification.bind(this);

        console.log(this.state.formInputs)
    }

    reSequenceTracks = () => {
        var rowCount = this.state.tableRows.length
        let newTableRows = this.state.tableRows;
        
        let newRow = this.state.tableRows.map( function (row, i) {
            row.trackSequence = i + 1;
        })
    }

    removeRow(rowIndex) {
        let newTableRows = this.state.tableRows;
        if(rowIndex > 0) {
            newTableRows.splice(rowIndex, 1)
            this.setState({tableRows : newTableRows})
        }

        this.reSequenceTracks()
        
    }

    getBlankRow = (rowCount) => {
        
        this.setState( {formInputs : { ...this.state.formInputs, ['trackSequence_' + rowCount] : ''}} )
        this.setState( {formInputs : { ...this.state.formInputs, ['trackISRC_' + rowCount] : ''}} )
        this.setState( {formInputs : { ...this.state.formInputs, ['trackTitle_' + rowCount] : ''}} )
        this.setState( {formInputs : { ...this.state.formInputs, ['trackSingle_' + rowCount] : false}} )
        this.setState( {formInputs : { ...this.state.formInputs, ['trackReleaseDate_' + rowCount] : ''}} )

        return(
            {
                trackSequence : rowCount + 1,
                trackISRC: '',
                trackTitle : '',
                trackSingle : false,
                trackReleaseDate : {
                    date : '',
                    disabled : false
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

    
    showNotification(){

        new Noty ({
            type: 'success',
            id:'tracksSaved',
            text: 'Your track information has been successfully saved and submitted for intial protection.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show() 
    };

    showNotSavedNotification(e){
        new Noty ({
            type: 'error',
            id:'projectSaved',
            text: 'Your tracks were NOT successfully saved. Please try again.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()
    };

    showTrackModal() {
        this.setState({showReplaceModal : true})
    }

    hideTrackModal() {
        this.setState({showReplaceModal : false})
    }

    handleChange(event) {
        let inputValue = '';
        if(event.target.type === 'checkbox') {
            inputValue = (event.target.checked) ? true : false;
        } else {
            inputValue = event.target.value
        }

        //this gets the inputs into the state.formInputs obj on change
        this.setState( {formInputs : { ...this.state.formInputs, [event.target.id] : inputValue}} )
        console.log(this.state.formInputs)
    };

    componentDidMount() {
        if(this.props.match && this.props.match.params && this.state.projectID !== this.props.match.params.projectID) {
          this.setState({projectID : this.props.match.params.projectID})
        }
      }

    handleSubmit(event) {
        const user = JSON.parse(sessionStorage.getItem('user'))
        let tracksData = this.state.tableRows.map( function (track, i) {
            return(
                {
                    trackID : '',
                    discNumber : '1',
                    trackNumber : i + 1,
                    hasUpload : true,
                    trackTitle : this.state.formInputs['trackTitle_' + i],
                    isrc : this.state.formInputs['trackIsrc_' + i],
                    isSingle : this.state.formInputs['trackSingle_' + i],
                    trackReleaseDate : this.state.formInputs['trackReleaseDate_' + i]
                }
            )  
        }.bind(this));

        const fetchHeaders = new Headers(
            {
                "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : user.email
            },
            "projectID": this.props.match.params.projectID,
            "Discs" : [
                {
                    "discNumber" : 1, 
                    "Tracks" : tracksData
                }
            ]
        })

        fetch ('https://api-dev.umusic.net/guardian/project/track', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        )
        .then (responseJSON => 
            {
                console.log(responseJSON)
            }
        )
        .catch(
            error => 
                console.error('fail: ' + error)
        );
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
                    <TrackInformationDataTable 
                        data={this.state.tableRows} 
                        showClick={this.showTrackModal} 
                        handleChange={this.handleChange}
                        removeRow={this.removeRow}
                    />
                </div>
                <section className="row save-buttons">
                    <div className="col-9">
                        <button 
                            type="button" 
                            className="btn btn-primary float-left" 
                            onClick={this.addBlankRow}
                        >Add Track</button>
                    </div>
                    <div className="col-3">
                        <button 
                            type="button" 
                            className="btn btn-secondary"
                        >Save</button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={this.showNotification}
                        >Save &amp; Continue</button>
                    </div>
                </section>
            </section>
        )
    }
};

export default withRouter(TrackInformationPage);