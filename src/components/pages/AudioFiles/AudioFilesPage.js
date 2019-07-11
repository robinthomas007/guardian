import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import {Form, Table, Tabs, Tab, Alert } from 'react-bootstrap'; 
import HaveAudioModal from '../../modals/HaveAudioModal';
import { withRouter } from "react-router";
import './AudioFiles.css';
import Noty from 'noty';
import { push_uniq } from 'terser';

const mockData = require('../../../mockData.json');

class AudioVideoDataTable extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            files : []
        }
    }

    AudioVideoDataHeader() {
        return(
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th>Audio File</th>
                    <th>ISRC <i><span className="required-ind">(Required)</span></i></th>
                    <th>Track Title</th>
                    <th>Artist</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
        )
    }

    AudioVideoDataBody(){

        let dataRows = [];

        if(this.props.data) {
            dataRows = this.props.data.map( (file, i) => {
                return(
                    <tr key={i}>
                        <td className="text-center">{i+1}</td>
                        <td className="audio-file"><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>{file.name}</span></div></td>
                        <td>
                        <Form.Control 
                                type="text" 
                                id=''
                                value=''
                                onChange=''
                            ></Form.Control>
                        </td>
                        <td>
                        <Form.Control 
                                type="text" 
                                id=''
                                value=''
                                onChange=''
                            ></Form.Control>
                        </td>
                        <td>
                        <Form.Control 
                                type="text" 
                                id=''
                                value=''
                                onChange=''
                            ></Form.Control>
                        </td>
                        <td className="text-center">
                            <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                            <button className="btn btn-secondary action" onClick={(evt) => this.props.deleteRow(i)}><i className="material-icons">delete</i></button>
                        </td>
                    </tr>
                )
            })
        }

        return(
            <tbody>
                {dataRows}
            </tbody>
        )
    }

    render() {
        return (
            <div className="table-responsive">
            <Table>
                {this.AudioVideoDataHeader()}
                {this.AudioVideoDataBody()}
            </Table>
            </div>
        )
    }

}

class AudioFilesPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            projectID : '',
            files:[]
        }

        this.showNotification = this.showNotification.bind(this);
        this.updateFiles = this.updateFiles.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
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

    updateFiles(e) {
        const {files} = this.state;
        let newFiles = files.concat(Array.from(e.target.files));
        this.setState({files : newFiles});

        console.log(newFiles)
    }

    deleteRow(rowIndex) {
        const {files} = this.state;
        let newFiles = files;
            newFiles.splice(rowIndex, 1);
        this.setState({files : newFiles});
    }

    handleSubmit() {

        const user = JSON.parse(sessionStorage.getItem('user'));
        const projectID = (this.state.projectID) ? (this.state.projectID) : '';

        const fetchHeaders = new Headers(
            {
                // "Content-Type": "application/json",
                "Authorization" : sessionStorage.getItem('accessToken'),
                "User-Email" : user.email,
                "Project-Id" : projectID
            }
        )

        fetch ('https://api-dev.umusic.net/guardian-media/api/Upload', {
            method : 'POST',
            headers : fetchHeaders,
            body : this.state.files
        }).then (response => 
            {
                return(response.json());
            }
        ).then (responseJSON => 
            {
                this.showNotification()
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
                                <input type="file" multiple={true} onChange={this.updateFiles}/>
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
                                data={this.state.files}
                                deleteRow={this.deleteRow}
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