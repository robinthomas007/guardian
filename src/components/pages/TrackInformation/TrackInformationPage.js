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
            showloader : false,
            showReplaceAudioModal : false
        }
        this.addBlankRow = this.addBlankRow.bind(this);
        this.showTrackModal = this.showTrackModal.bind(this);
        this.hideTrackModal = this.hideTrackModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageDataLoad = this.handlePageDataLoad.bind(this);
        this.setActiveDiscTab = this.setActiveDiscTab.bind(this);
        this.handleDiscUpdate = this.handleDiscUpdate.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.addDisc = this.addDisc.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.hideReplaceAudioModal = this.hideReplaceAudioModal.bind(this);
        this.showReplaceModal = this.showReplaceModal.bind(this);

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
                    showloader : false
                })
            }
        ).catch(
            error => {
                console.error(error);
                this.setState({ showloader : false})
            }
        );
    }

    showNotification(forward){
        new Noty ({
            type: 'success',
            id:'tracksSaved',
            text: 'Your track information has been successfully saved and submitted for intial protection.',
            theme: 'bootstrap-v4',
            layout: 'top',
            timeout: '3000'
        }).on('afterClose', ()  => {
            return( (forward) ? this.props.history.push({pathname : '/territorialRights/' + this.props.match.params.projectID}) : null)
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

    handleDiscUpdate(i, updatedDisc) {
        const {discs} = this.state;
        let modifiedDiscs = discs;
            modifiedDiscs[i] = updatedDisc

        this.setState({discs : modifiedDiscs})
    };

    getTrack = (track, discNumber, trackNumber) => {
        return {
            trackID : (track.trackID) ? track.trackID : '',
            trackNumber : (track.trackNumber) ? track.trackNumber : '',
            hasUpload : (track.hasUpload) ? track.hasUpload : false,
            trackTitle : (track.trackTitle) ? track.trackTitle : '',
            isrc :  (track.isrc) ? track.isrc : '',
            isSingle : (track.isSingle) ? track.isSingle : false,
            tbdReleaseDate : (track.tbdReleaseDate) ? track.tbdReleaseDate : '',
            trackReleaseDate : (track.trackReleaseDate) ? track.trackReleaseDate : (this.state.project.Project.projectReleaseDate) ? this.state.project.Project.projectReleaseDate : '',
            fileName : (track.fileName) ? track.fileName : '',
            artist : (track.artist) ? track.artist : this.state.project.Project.projectArtistName,

            isSingleDisabled : false,
            isReleaseDateDisabled : (track.isSingle) ? false : true,
            isTbdDisabled : (track.trackReleaseDate !== '' || track.isSingle) ? false : true,
            isTbdChecked : (track.trackReleaseDate !== '' || track.isSingle) ? false : true
        }
    };

    handleSubmit(e) {

        this.setState({ showloader : true})

        const user = JSON.parse(sessionStorage.getItem('user'))
        const forward = (e.target.classList.contains('saveContinueButton')) ? true : false;

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
            "projectID": this.props.match.params.projectID,
            "isAudioPage" : false,
            "Discs" : this.state.project.Discs
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
                this.setState({ showloader : false});
                this.showNotification(forward);
            }
        )
        .catch(
            error => {
                this.setState({ showloader : false})
                console.error('fail: ' + error)
            }
        );
    };

    componentDidMount() {
        if(this.props.match.params && this.props.match.params.projectID) {
            this.handlePageDataLoad()
        }
    };

    componentDidUpdate() {
        if(this.props.match && this.props.match.params && this.props.match.params.projectID) {
            this.props.setProjectID(this.props.match.params.projectID)
        }
    };

    addTrack() {
        const { project } = this.state;
        let modifiedProject = project;
            modifiedProject.Discs[this.state.activeDiscTab - 1].Tracks.push(this.getTrack({trackNumber : modifiedProject.Discs[this.state.activeDiscTab - 1].Tracks.length + 1}))

        this.setState( {project : modifiedProject} )
    };

    addDisc = () => {
        const { Discs } = this.state.project;
        let modifiedDiscs = Discs;
            modifiedDiscs.push( {discNumber : (Discs.length + 1).toString(), Tracks : [this.getTrack({trackNumber : "0"})]});

        this.setState( {
            Discs : modifiedDiscs
        } )
    };

    removeTrack = (rowIndex) => {
        const { Discs } = this.state.project;
        const ModifiedDiscs = Discs;
              ModifiedDiscs[this.state.activeDiscTab - 1].Tracks.splice(rowIndex, 1);
        this.setState({Discs : this.handleTrackResequence(ModifiedDiscs)})
    }

    hideReplaceAudioModal() {
        this.setState({showReplaceAudioModal : false})
    }

    showReplaceModal() {
        this.setState({showReplaceAudioModal : true})
    }

    updateFile = (e) => {
        this.hideReplaceAudioModal();
    }

    handleTrackResequence = (discs) => {
        let modifiedDiscs = discs;
            modifiedDiscs.map((disc, i) => {
                return(
                    disc.Tracks.map( (track, i) => {
                        return(
                            track.trackNumber = i + 1
                        )
                    })
                )
            })
        return(modifiedDiscs)
    };

    render() {
        return (
            <div className="col-10">

                <LoadingImg show={this.state.showloader} />

                <ReplaceAudioModal
                    showModal={this.state.showReplaceAudioModal}
                    handleClose={this.hideReplaceAudioModal}
                    onChange={(e) => this.updateFile(e)}
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

                <TabbedTracks
                    data={this.state.project}
                    showClick={this.showTrackModal}
                    activeDiscTab={this.state.activeDiscTab}
                    handleActiveDiscUpdate={this.setActiveDiscTab}
                    handleDiscUpdate={this.handleDiscUpdate}
                    addTrack={this.addTrack}
                    addDisc={this.addDisc}
                    removeTrack={this.removeTrack}
                    setTBD={this.setTBD}
                    setSingle={this.setSingle}
                    showReplaceModal={ (track, i) => this.showReplaceModal(track, i)}
                    hideReplaceAudioModal={ (track, i) => this.hideReplaceAudioModal(track, i)}
                />

                <section className="row save-buttons">
                    <div className="col-9"></div>
                    <div className="col-3">
                        <button
                            type="button"
                            className="btn btn-secondary saveButton"
                            onClick={this.handleSubmit}
                        >Save</button>
                        <button
                            type="button"
                            className="btn btn-primary saveContinueButton"
                            onClick={this.handleSubmit}
                        >Save &amp; Continue</button>
                    </div>
                </section>
            </div>
        )
    }
};

export default withRouter(TrackInformationPage);
