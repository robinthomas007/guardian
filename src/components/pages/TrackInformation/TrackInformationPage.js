import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
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
          <tr key={i}>
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
                <td><Form.Control type="date" defaultValue={track.trackReleaseDate}></Form.Control></td>
                <td className="text-center">
                    <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                    <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                </td>
            </tr>
       )

        return (
            <div className="table-responsive">
                <Table>
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
                {
                    trackSequence : 1,
                    trackISRC: '1234567890',
                    trackTitle : 'Test 1',
                    trackSingle : true,
                    trackReleaseDate : ''
                },
                {
                    trackSequence : 2,
                    trackISRC: '2345678901',
                    trackTitle : 'Test 2',
                    trackSingle : false,
                    trackReleaseDate : ''
                }
            ]
        }
        this.addBlankRow = this.addBlankRow.bind(this);
    }
  
    getBlankRow = (rowCount) => {
        return(
            {
                trackSequence : rowCount + 1,
                trackISRC: '',
                trackTitle : '',
                trackSingle : false,
                trackReleaseDate : ''
            }
        )
    }

    addBlankRow() {
        var rowCount = this.state.tableRows.length
        var newRow = this.state.tableRows   
            newRow.push(this.getBlankRow(rowCount))
        this.setState({tableRows : newRow})
    }

    render() {

        if(this.state.tableRows.length <= 0) {
            this.addBlankRow()
        } 

        return (
            <section className="page-container h-100">
                <PageHeader />
                <div className="row no-gutters step-description">
                    <div className="col-12">
                        <h2>Step <span className="count-circle">4</span> Track Information</h2>
                        <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
                    </div>
                </div>
                <div>
                    <TrackInformationDataTable data={this.state.tableRows} />
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