import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import {Form, Table, Tabs, Tab, Alert } from 'react-bootstrap';
import HaveAudioModal from '../../modals/HaveAudioModal';
import { withRouter } from "react-router";
import './AudioFiles.css';
import Noty from 'noty';
import { push_uniq } from 'terser';

import AudioFilesTabbedTracks from '../AudioFiles/pageComponents/audioFilesTabbedTracks';

class AudioFilesPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            projectID : '',
            projectData : {},
            files:[],
            discs : [],
            activeTab : 0,
            pageTableData : []
        }

        this.showNotification = this.showNotification.bind(this);
        this.updateFiles = this.updateFiles.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDataSubmit = this.handleDataSubmit.bind(this);
        this.resequencePageTableData = this.resequencePageTableData.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);

        this.addTrack = this.addTrack.bind(this);
        this.addDisc = this.addDisc.bind(this);

    }

    getTrack(track, trackIndex) {
        const {projectData} = this.state;
        return (
            {
                artist : (track.artist) ? (track.artist) : (projectData.projectArtistName) ? projectData.projectArtistName : '',
                discNumber : (track.discNumber) ? (track.discNumber) : '',
                fileName : (track.fileName) ? (track.fileName) : '',
                hasUpload : (track.hasUpload) ? track.hasUpload : false,
                isrc : (track.isrc) ? track.isrc : '',
                isSingle : (track.isSingle) ? track.isSingle : false,
                trackID : (track.trackID) ? track.trackID : '',
                trackNumber : (track.trackID) ? (track.trackID) : trackIndex,
                trackReleaseDate : (track.trackReleaseDate) ? track.trackReleaseDate : '',
                trackTitle : (track.trackTitle) ? track.trackTitle : '',
                fileUpload :  (track.fileUpload) ? track.fileUpload : false,
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

        const projectID = (this.state.projectID) ? (this.state.projectID) : '';

        new Noty ({
            type: 'success',
            id:'tracksSaved',
            text: 'Your track information has been successfully saved.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).on('afterClose', ()  =>
            this.props.history.push({
                pathname : '/trackInformation/' + projectID
            })
        ).show()
    };

    componentDidUpdate() {
        if(this.props.match && this.props.match.params && this.state.projectID !== this.props.match.params.projectID) {
            this.setState({projectID : this.props.match.params.projectID});
        }
    }

    isValidAudioType(fileName) {
        const validFiles = {
            "wav" : 1,
            "mp3" : 1
        }

        const fileNameParts = fileName.toLowerCase().split('.')
        if(validFiles[fileNameParts[(fileNameParts.length -1)]]) {
            return(true)
        } else {
            return(false)
        }        
    }

    updateFiles(e) {
        const { discs, pageTableData, activeTab } = this.state;

        let newFiles = Array.from(e.target.files);
        let modifiedPageTableData = pageTableData;
        let modifiedDiscs = discs;

        for(var i=0; i<newFiles.length; i++) {
            if(this.isValidAudioType(newFiles[i].name)) {
                
                let newTrack = {
                    fileName : newFiles[i].name,
                    fileUpload : true
                }

                modifiedDiscs[activeTab].Tracks.push(this.getTrack(newTrack, modifiedDiscs[activeTab].Tracks.length))
                this.setState({discs : modifiedDiscs});
            } else {
                //remove this from the file stack
                newFiles.splice(i,1);
            }
        }

        this.handleFileUpload(newFiles)
        //this.setState({pageTableData : modifiedPageTableData});
    }

    deleteRow(rowIndex) {
        const {discs} = this.state;
        const modifiedDiscs = discs;
        
        //remove the data row
        modifiedDiscs[this.state.activeTab].Tracks.splice(rowIndex, 1);
        this.setState({discs : modifiedDiscs});
    }

    hideFileUploadingIndicator(fileName) {
        let uploadingIndicator = document.getElementById(fileName + '_ico');

        if(uploadingIndicator) {
            uploadingIndicator.style.display='none';
        }
    }

    handleFileUpload(files) {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = (this.state.projectID) ? (this.state.projectID) : '';
        const fetchHeaders = new Headers(
            {
                "Authorization" : sessionStorage.getItem('accessToken'),
                "User-Email" : user.email,
                "Project-Id" : projectID,
            }
        )

        for (var i = 0; i < files.length; i++) {
            var formData = new FormData();
                formData.append('file', files[i]);

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
                    this.hideFileUploadingIndicator(responseJSON[0].fileName);
                  }
              )
              .catch(
                  error => console.error(error)
              );
        }
    }

    resequencePageTableData(dragSource, dragTarget) {
        const {pageTableData} = this.state;
        let modifiedPageTableData = pageTableData;

        let sourceData = modifiedPageTableData[dragSource].fileName;
        let targetData = modifiedPageTableData[dragTarget].fileName;
        
        modifiedPageTableData[dragTarget].fileName = sourceData;
        modifiedPageTableData[dragSource].fileName = targetData;

        this.setState({pageTableData : modifiedPageTableData})
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


    handleDataLoad() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = (this.state.projectID) ? (this.state.projectID) : '';
        const {pageTableData} = this.state;
        const modifiedPageTableData = pageTableData;

        const fetchHeaders = new Headers(
            {
                "Authorization" : sessionStorage.getItem('accessToken')
            }
        )

        const fetchBody = JSON.stringify( {
            "User" : {
                "email" : user.email
            },
            "ProjectID" : (this.props.match.params.projectID) ? this.props.match.params.projectID : ''
        })

        fetch ('https://api-dev.umusic.net/guardian/project/review', {
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
                if(responseJSON.Discs) {
                    this.setState({projectData : responseJSON.Project})
                    this.setState({discs : responseJSON.Discs})
                    this.setState({pageTableData : responseJSON.Discs[this.state.activeTab].Tracks})
                } else {
                    this.addDisc();
                }
            }
        )
        .catch(
            error => console.error(error)
        );
    }

    isValidIsrc(isrc) {
        return((isrc.replace(/\W/g, '').length == 12) ? true : false);
    }

    isValidTitle(title) {
        return((title.length > 0) ? true : false);
    }

    setFieldValidation(input, status) {
        if(status === 'is-invalid') {
            input.className = input.className.replace('is-invalid', '') + ' is-invalid';
        } else {
            input.className = input.className.replace('is-invalid', '');
        }
    }

    isValidForm() {
        let isrcs = document.getElementsByClassName('trackIsrcField');
        let trackTitles = document.getElementsByClassName('trackTitleField');
        let isValidForm = true;

        for(var i=0; i<isrcs.length; i++) {
            if(!this.isValidIsrc(isrcs[i].value)) {
                this.setFieldValidation(isrcs[i], 'is-invalid');
                isValidForm = false;
            } else {
                this.setFieldValidation(isrcs[i], 'is-valid');
            }

            if(!this.isValidTitle(trackTitles[i].value)) {
                this.setFieldValidation(trackTitles[i], 'is-invalid');
                isValidForm = false;
            } else {
                this.setFieldValidation(trackTitles[i], 'is-valid');
            }
        }
        return(isValidForm)
    }

    handleDataSubmit() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = (this.state.projectID) ? (this.state.projectID) : '';

        this.setTrackSequence();

        let formIsValid = this.isValidForm();

        if (formIsValid ) {
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
                    this.showNotification();
                }
            )
            .catch(
                error => console.error(error)
            );
        } else {

        }
    }

    componentDidMount() {
        if(this.props.match) {
            this.handleDataLoad();
        }
    }

    handleTabClick(key) {
        this.setState({activeTab : key})
    }

    addTrack() {
        const { discs } = this.state;
        const { Tracks } = discs[this.state.activeTab];
        let modifiedTracks = (Tracks) ? Tracks : [];

        let newTrack = {
            fileName : '',
            fileUpload : false
        }
        modifiedTracks.push(this.getTrack(newTrack, Tracks.length));
        this.setState( {Tracks : modifiedTracks} )
    }

    addDisc() {
        const { discs } = this.state;
        let modifiedDiscs = discs;

        let newTrack = {
            fileName : '',
            fileUpload : false
        }

        let newDisc = {
            "discNumber" : (discs.length + 1),
            "Tracks" : []
        }

        modifiedDiscs.push(newDisc);
        this.setState( {discs : modifiedDiscs})
    }

    render() {

           return(

            <section className="page-container h-100">

                <HaveAudioModal projectID={this.props.projectID}/>

                <PageHeader />

                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">3</span> Audio Files</h2>
                        <p>In this step, you can upload MP3s/WAVs for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>

                <form>
                    <section className="row">
                        <div className="form-group col-12">
                            <label>Drag &amp; Drop MP3s/WAVs Below</label>
                            <div droppable="true" className="form-control audio-drop-area col-12">
                                <span>
                                    Click to Browse<br />
                                    or Drag &amp; Drop MP3s or WAVs
                                </span>
                                <input 
                                    type="file" 
                                    id="audioFiles" 
                                    multiple={true} 
                                    onChange={this.updateFiles} accept=".wav, .mp3"
                                />
                            </div>
                        </div>
                    </section>
                </form>

                <AudioFilesTabbedTracks 
                    data={this.state.discs}
                    handleTabClick={this.handleTabClick}
                    deleteRow={this.deleteRow}
                    handleChange={this.handleChange}
                    resequencePageTableData={this.resequencePageTableData}
                    isValidIsrc={this.isValidIsrc}
                    isValidTitle={this.isValidTitle}
                    addDisc={this.addDisc}
                />

                <div onClick={this.addDisc}>Add Disc</div>

            <section className="row no-gutters save-buttons">
                <div className="col-9"></div>
                <div className="col-3">
                    <button type="button" className="btn btn-secondary" onClick={this.showNotification}>Save</button>
                    <button type="button" className="btn btn-primary" onClick={this.handleDataSubmit}>Save &amp; Continue</button>
                </div>
            </section>
        </section>

        )
    }
}

export default AudioFilesPage;