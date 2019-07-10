import React, { Component } from 'react';
import PageHeader from '../PageHeader/PageHeader';
import {Table, Tabs, Tab } from 'react-bootstrap'; 
import HaveAudioModal from '../../modals/HaveAudioModal';
import './AudioFiles.css';
import Noty from 'noty';
import { push_uniq } from 'terser';

const mockData = require('../../../mockData.json');

class AudioVideoDataTable extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            files : this.props.data
        }
    }

    AudioVideoDataHeader() {
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

    AudioVideoDataBody(){

        let dataRows = [];

        if(this.props.data) {

            let count = 0;
            dataRows = this.props.data.map( (file, i) => {
                return(
                    <tr key={i}>
                        <td className="centered">{i+1}</td>
                        <td><div className="sortable-audio-file"><i className="material-icons">format_line_spacing</i><span>{file.name}</span></div></td>
                        <td></td>
                        <td></td>
                        <td className="centered">
                            <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                            <button className="btn btn-secondary action" onClick={(evt) => this.props.deleteRow(i)}><i className="material-icons">delete</i></button>
                        </td>
                    </tr>
                )
            })
        }

        return(dataRows)
    }

    render() {
        return (
            <Table hover>
                {this.AudioVideoDataHeader()}
                {this.AudioVideoDataBody()}
            </Table>
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
            this.setState({projectID : this.props.match.params.projectID})
        }
    }

    updateFiles(e) {
        const {files} = this.state;
        let newFiles = files.concat(Array.from(e.target.files))
        this.setState({files : newFiles})
    }

    deleteRow(rowIndex) {
        const {files} = this.state;
        let newFiles = files;
            newFiles.splice(rowIndex, 1)
        this.setState({files : newFiles})
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
                                    <input type="file" multiple="true" onChange={this.updateFiles}/>
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
                    <button type="button" className="btn btn-primary" onClick={this.showNotification}>Save &amp; Continue</button>
                </div>
            </section>
        </section>
    
        )
    } 
}

export default AudioFilesPage;