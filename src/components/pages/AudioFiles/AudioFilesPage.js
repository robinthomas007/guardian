import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import {Table, Grid, Button, Form, Modal } from 'react-bootstrap'; 
import HaveAudioModal from '../../modals/HaveAudioModal';

import './AudioFiles.css';

const mockData = require('../../../mockData.json');

class AudioFilesPage extends Component {
    
    render() {

        const AudioVideoDataHeader = () => {
            return(
                
                <thead>
                    <tr>
                        <th className="centered">#</th>
                        <th>Audio File</th>
                        <th>ISRC <i><span className="required-ind">(Required)</span></i></th>
                        <th>Track Title</th>
                        <th className="centered">Actions</th>
                    </tr>
                </thead>
            )
        }

        const dataRows = mockData.pages.AudioFiles.disc1.tracks.map( (track, i) => 
            <tr key={i}>
                <td className="centered">{track.trackSequence}</td>
                <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>{track.trackAudioFile}</span></div></td>
                <td>{track.trackISRC}</td>
                <td>{track.trackTitle}</td>
                <td className="centered">
                   <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                    <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                </td>
            </tr>
       )

        const AudioVideoDataTable = () => {
            return (
                <Table hover>
                    <AudioVideoDataHeader />
                    <tbody>
                        {dataRows}
                    </tbody>
                </Table>
            )
        }

        return(
            <section className="page-container h-100">
                <HaveAudioModal />
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
    
                            <div className="form-control audio-drop-area col-12"></div>
                        </div>
                    </section>
                </form>
    
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Disc 1</a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"> + Add A Disc</a>
                    </div>
                </nav>
                
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
    
                    <AudioVideoDataTable />
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
            </div>
            
            <section className="row no-gutters save-buttons">
                <div className="col-9"></div>
                <div className="col-3">
                    <button type="button" className="btn btn-secondary">Save</button>
                    <button type="button" className="btn btn-primary">Save &amp; Continue</button>
                </div>
            </section>
        </section>
    
        )
    } 
}

export default AudioFilesPage;