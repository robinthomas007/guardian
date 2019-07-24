import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import {Form, Table, Tabs, Tab, Alert } from 'react-bootstrap';
import HaveAudioModal from '../../modals/HaveAudioModal';
import { withRouter } from "react-router";
import './AudioFiles.css';
import Noty from 'noty';
import { push_uniq } from 'terser';

import AudioVideoDataTable from '../AudioFiles/pageComponents/audioVideoDataTable'

class AudioFilesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectID : '',
            files:[],
            discs : [],
            activeTab : 0,
            pageTableData : []
        }

        this.showNotification = this.showNotification.bind(this);
        this.updateFiles = this.updateFiles.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resequencePageTableData = this.resequencePageTableData.bind(this);
    }

    getTrack(track, trackIndex) {
        return (
            {
                artist : (track.artist) ? (track.artist) : '',
                discNumber : (track.discNumber) ? (track.discNumber) : '',
                fileName : (track.fileName) ? (track.fileName) : '',
                hasUpload : (track.hasUpload) ? track.hasUpload : false,
                isrc : (track.isrc) ? track.isrc : '',
                isSingle : (track.isSingle) ? track.isSingle : false,
                trackID : (track.trackID) ? track.trackID : '',
                trackNumber : (track.trackID) ? (track.trackID) : trackIndex,
                trackReleaseDate : (track.trackReleaseDate) ? track.trackReleaseDate : '',
                trackTitle : (track.trackTitle) ? track.trackTitle : '',
            }
        ) 
    }

    handleChange(track, updatedData, rowID) {
        const {discs} = this.state;
        let modifiedDiscs = discs;

        const tracksList = updatedData.map( (track, i) => (
            this.getTrack(track, (i + 1))
        ))

        modifiedDiscs[track.discNumber] = {
            "discNumber" : (track.discNumber + 1),
            "Tracks" : tracksList
        }

        this.setState({discs : modifiedDiscs})
    }

    showNotification(){
        new Noty ({
            type: 'success',
            id:'tracksSaved',
            text: 'Your track information has been successfully saved.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).show()
    };

    componentDidUpdate() {
        if(this.props.match && this.props.match.params && this.state.projectID !== this.props.match.params.projectID) {
            this.setState({projectID : this.props.match.params.projectID});
        }
    }

    isValidAudioType(fileName) {
        const validFiles = {
            "wav" : 1,
            "mp3" : 1,
            "mp4" : 1,
            "wma" : 1, 
            "aif" : 1, 
            "aiff" : 1, 
            "aac" : 1, 
            "flac" : 1, 
            "m4a" : 1
        }

        const fileNameParts = fileName.toLowerCase().split('.')
        if(validFiles[fileNameParts[(fileNameParts.length -1)]]) {
            return(true)
        } else {
            return(false)
        }        
    }

    updateFiles(e) {
        const {files} = this.state;
        const {discs} = this.state;
        const {pageTableData} = this.state;
        const activeTab = this.state.activeTab;

        let newFiles = (files.length > 0) ? [...Array.from(files), ...Array.from(e.target.files)] : Array.from(e.target.files);

        let modifiedPageTableData = [];
        
        for(var i=0; i<newFiles.length; i++) {
            if(this.isValidAudioType(newFiles[i].name)) {
                
                let track = {};

                if(pageTableData[i]) {
                    track = pageTableData[i]
                } else {
                    track = {
                        fileName : newFiles[i].name,
                    }
                }
                
                if(!discs[activeTab]) {
                    let modifiedDiscs = discs;
                        modifiedDiscs[activeTab] = {
                            "discNumber" : (activeTab + 1),
                            "Tracks" : modifiedPageTableData
                        }
                    this.setState({discs : modifiedDiscs});
                }
                modifiedPageTableData.push(this.getTrack(track, i + 1))
            } else {
                alert(newFiles[i].name + ' is an invalid audio file')

                //remove this from the file stack
                newFiles.splice(i,1);
            }
        }

        this.setState({files : newFiles});
        this.setState({pageTableData : modifiedPageTableData});
    }

    deleteRow(rowIndex) {
        const {files} = this.state;
        const {discs} = this.state;
        const {pageTableData} = this.state;

        //remove the data row
        let modifiedPageTableData = pageTableData;
            modifiedPageTableData.splice(rowIndex, 1);

        this.setState({pageTableData : modifiedPageTableData});

        //remove the files
        let newFiles = files;
            newFiles.splice(rowIndex, 1);
        this.setState({files : newFiles});
    }

    handleSubmit() {
        var audioFiles = document.getElementById('audioFiles');
        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = (this.state.projectID) ? (this.state.projectID) : '';
        const {pageTableData} = this.state;
        const modifiedPageTableData = pageTableData;

        var formData = new FormData();
        for (var i = 0; i < audioFiles.files.length; i++) {
            formData.append('file', audioFiles.files[i]);
        }

        const fetchHeaders = new Headers(
            {
                "Authorization" : sessionStorage.getItem('accessToken'),
                "User-Email" : user.email,
                "Project-Id" : projectID,
            }
        )

        fetch('https://api-dev.umusic.net/guardian-media/api/Upload', {
          method: 'POST',
          headers : fetchHeaders,
          body: formData
        })
        .then (response =>
            {
                return(response.json());
            }
        )
        .then (responseJSON =>
            {
                console.log('save response: ', responseJSON);
                this.handleDataSubmit()
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    resequencePageTableData(updatedFiles) {
        const {files} = this.state;
        const {pageTableData} = this.state;
        let modifiedPageTableData = pageTableData;

        for(var i=0; i<updatedFiles.length; i++) {
            modifiedPageTableData[i].fileName = updatedFiles[i].name
        }

        this.setState({files : updatedFiles})
    }

    setTrackSequence() {
        const {discs} = this.state;
        const sortedDiscs = discs;

        sortedDiscs.map( (disc) => {
            var tracks = disc.Tracks;

            tracks.map( (track, i) => {
                track.trackNumber = (i + 1)
            })
        })

        this.setState({discs : sortedDiscs})
    }

    handleDataSubmit() {
        const releaseInformationInputs = JSON.parse(localStorage.getItem('projectData'));
        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = (this.state.projectID) ? (this.state.projectID) : '';

        const projectFields = (projectID) ? this.state.formInputs : {...releaseInformationInputs, ...this.state.formInputs}

        this.setTrackSequence();

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
            "projectID" : projectID,
            "Discs" : this.state.discs
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
                console.log('save data response: ', responseJSON);
                this.showNotification();
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    

    render() {

           return(

            <section className="page-container h-100">

                <HaveAudioModal projectID={this.props.projectID}/>

                <PageHeader />

                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">3</span> Audio Files</h2>
                        <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>

                <form>
                    <section className="row">
                        <div className="form-group col-12">
                            <label>Drag &amp; Drop Audio Files Below</label>
                            <div droppable="true" className="form-control audio-drop-area col-12">
                                <span>
                                    Click to Browse<br />
                                    or Drag &amp; Drop
                                </span>
                                <input type="file" id="audioFiles" multiple={true} onChange={this.updateFiles} accept=".wav, .mp3, .mp4, .wma, .aif, .aiff, .aac, .flac, .m4a" />
                            </div>
                        </div>
                    </section>
                </form>

                <Tab.Container defaultActiveKey="Disc1">
                    <Tabs>
                        <Tab eventKey="Disc1" title="Disc 1"></Tab>
                        <Tab eventKey="AddDisc" title="+ Add A Disc"></Tab>
                    </Tabs>

                    <Tab.Content>
                        <Tab.Pane eventKey="Disc1">
                            <AudioVideoDataTable
                                data={this.state}
                                deleteRow={this.deleteRow}
                                handleChange={this.handleChange}
                                resequencePageTableData={this.resequencePageTableData}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

            <section className="row no-gutters save-buttons">
                <div className="col-9"></div>
                <div className="col-3">
                    <button type="button" className="btn btn-secondary" onClick={this.showNotification}>Save</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save &amp; Continue</button>
                </div>
            </section>
        </section>

        )
    }
}

export default AudioFilesPage;