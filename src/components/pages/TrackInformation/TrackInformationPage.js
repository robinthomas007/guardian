import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import TabbedTracks from '../TrackInformation/pageComponents/TabbedTracks';
import ReplaceAudioModal from '../../modals/ReplaceAudioModal';
import LoadingImg from '../../ui/LoadingImg';
import './TrackInformation.css';
import Noty from 'noty'
import { withRouter } from "react-router";

class TrackInformationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formInputs : {},
            tableRows : [],
            showReplaceModal : false,
            tracksData : [],
            projectReleaseDate : '',
            projectData : {},
            activeDiscTab : 1,
            discs : [],

            project : {
                Project : {
                    projectID : '',
                    projectTitle : '',
                    projectTypeID : '',
                    projectType : '',
                    projectArtistName : '',
                    projectReleasingLabelID : '',
                    projectReleasingLabel : '',
                    projectReleaseDate : '',
                    projectReleaseDateTBD : false,
                    projectPrimaryContact : '',
                    projectPrimaryContactEmail : '',
                    projectAdditionalContacts : '',
                    projectNotes : '',
                    projectSecurityID : '',
                    projectSecurity : '',
                    projectStatusID : '',
                    projectStatus : '',
                    projectCoverArtFileName : '',
                    projectCoverArtBase64Data : ''
                }
            },
            showloader : false
        }
        this.addBlankRow = this.addBlankRow.bind(this);
        this.showTrackModal = this.showTrackModal.bind(this);
        this.hideTrackModal = this.hideTrackModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handlePageDataLoad = this.handlePageDataLoad.bind(this);
        this.formatDateToYYYYMMDD = this.formatDateToYYYYMMDD.bind(this);
        this.setActiveDiscTab = this.setActiveDiscTab.bind(this);
        this.handleDiscUpdate = this.handleDiscUpdate.bind(this);
        this.addTrack = this.addTrack.bind(this);
    }

    removeRow(rowIndex) {
        let newTableRows = this.state.tableRows;
            newTableRows.splice(rowIndex, 1)

        if(rowIndex <= 0 && newTableRows.length === 0) {
            this.addBlankRow();
        }
        this.setState({tableRows : newTableRows});
    }

    getBlankRow = () => {
        const projectReleaseDate = this.state.projectData.projectReleaseDate
        let formattedDate = this.formatDateToYYYYMMDD(projectReleaseDate);

        return(
            {
                artist: "",
                fileName: "",
                hasUpload: true,
                isSingle: false,
                isrc: "",
                trackID: "",
                trackNumber: "",
                trackReleaseDate: formattedDate,
                trackTitle: ""
            }
        )
    }

    setActiveDiscTab(tabID) {
        this.setState({activeDiscTab : tabID})        
    }

    addBlankRow() {
        var newRow = this.state.tableRows   
            newRow.push(this.getBlankRow())
        this.setState({tableRows : newRow})
    }

    showTrackModal() {
        this.setState({showReplaceModal : true})
    }

    hideTrackModal() {
        this.setState({showReplaceModal : false})
    }

    formatDateToYYYYMMDD(unFormattedDate) {
        let formattedDate = '';

        if(unFormattedDate) {
            var d = new Date(unFormattedDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
    
            formattedDate = [year, month, day].join('-');
        }

        return(formattedDate)
    }

    handlePageDataLoad() {

        this.setState({ showloader : true})

        const user = JSON.parse(sessionStorage.getItem('user'))
        const projectID = this.props.match.params.projectID
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
            "ProjectID" : projectID
        })


        fetch ('https://api-dev.umusic.net/guardian/project/review', {
            method : 'POST',
            headers : fetchHeaders,
            body : fetchBody
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 

            {
                this.setState({ 
                    project : responseJSON,
                    discs : responseJSON.Discs,
                    projectReleaseDate : responseJSON.Project.projectReleaseDate, 
                    projectData : responseJSON
                })

                this.setState({ showloader : false})
            }
        )
        .catch(
            error => {
                console.error(error);
                this.setState({ showloader : false})
            }
        );
    }

    showNotification(e, projectID){

        new Noty ({
            type: 'success',
            id:'tracksSaved',
            text: 'Your track information has been successfully saved and submitted for intial protection.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).on('afterClose', ()  =>
            this.props.history.push({
                pathname : '/territorialRights/' + this.props.match.params.projectID
            })
        ).show()
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

    handleDiscUpdate(i, updatedDisc) {
        const {discs} = this.state;
        let modifiedDiscs = discs;
            modifiedDiscs[i] = updatedDisc

        this.setState({discs : modifiedDiscs})
    }

    getTrack = (track, discNumber, trackNumber) => {
        return {
            trackID : (track.trackID) ? track.trackID : '',
            discNumber : (track.discNumber) ? track.discNumber : '',
            trackNumber : (track.trackNumber) ? track.trackNumber : '',
            hasUpload : (track.hasUpload) ? track.hasUpload : false,
            trackTitle : (track.trackTitle) ? track.trackTitle : '',
            isrc :  (track.isrc) ? track.isrc : '',
            isSingle : (track.isSingle) ? track.isSingle : false,
            trackReleaseDate : (track.trackReleaseDate) ? track.trackReleaseDate : '',
            fileName : (track.fileName) ? track.fileName : '',
            artist : (track.artist) ? track.artist : ''
        }
    }

    handleSubmit(event) {

        this.setState({ showloader : true})

        const user = JSON.parse(sessionStorage.getItem('user'))

        let discs = this.state.discs.map( function (disc, i) {
            let tracks = disc.Tracks.map( function (track, j) {
                return(
                    {
                        trackID : (track.trackID) ? track.trackID : '',
                        discNumber : i,
                        trackNumber : j+1,
                        hasUpload : (track.hasUpload) ? track.hasUpload : false,
                        trackTitle : (track.trackTitle) ? track.trackTitle : '',
                        isrc :  (track.isrc) ? track.isrc : '',
                        isSingle : (track.isSingle) ? track.isSingle : false,
                        trackReleaseDate : (track.trackReleaseDate) ? track.trackReleaseDate : '',
                        fileName : (track.fileName) ? track.fileName : '',
                        artist : (track.artist) ? track.artist : ''
                    }
                )           
            })
        });

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
            "isAudioPage" : false,
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
                this.setState({ showloader : false})
                this.showNotification()
            }
        )
        .catch(
            error => {
                this.setState({ showloader : false})
                console.error('fail: ' + error)
            }                
        );
    }

    componentDidMount() {

        if(this.props.match.params && this.props.match.params.projectID) {
            this.handlePageDataLoad()
        }
    }

    componentDidUpdate() {
        if(this.props.match && this.props.match.params && this.props.match.params.projectID) {
            this.props.setProjectID(this.props.match.params.projectID)
        }
    }
    
    addTrack() {
        const { projectData } = this.state;
        const { discs } = this.state;
         let modifiedProjectData = projectData;
             modifiedProjectData.Discs[this.state.activeDiscTab - 1].Tracks.push()
        
        let modifiedDiscs = discs;
            modifiedDiscs[this.state.activeDiscTab - 1].Tracks.push(this.getTrack({}))

        this.setState( {
            projectData : modifiedProjectData,
            // discs : modifiedDiscs
        } )

        // this.setState( {projectData : modifiedProjectData} )
        // this.setState( {discs : modifiedProjectData.Discs[this.state.activeDiscTab - 1]} )

    }

    render() {
        return (
            <div className="col-10">
            
                <LoadingImg show={this.state.showloader} />

                <ReplaceAudioModal 
                    showModal={this.state.showReplaceModal} 
                    handleClose={this.hideTrackModal}
                />

                <PageHeader 
                    data={this.state.project}
                />

                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">4</span> Track Information</h2>
                        <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>
             <div className="row no-gutters d-flex">
                <div className="col-9"></div>
                <div className="col-3 d-flex justify-content-end">
                    <ul className="disc-track-buttons">
                        <li>
                            <button 
                                type="button" 
                                className="btn btn-secondary btn-sm" 
                                onClick=""
                            ><i className="material-icons">adjust</i> 111Add Disc</button>
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
                <TabbedTracks 
                    data={this.state.projectData} 
                    showClick={this.showTrackModal} 
                    activeDiscTab={this.state.activeDiscTab}
                    handleActiveDiscUpdate={this.setActiveDiscTab}
                    handleDiscUpdate={this.handleDiscUpdate}
                    
                />

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
                            onClick={this.handleSubmit}
                        >Save &amp; Continue</button>
                    </div>
                </section>
            </div>
        )
    }
};

export default withRouter(TrackInformationPage);
