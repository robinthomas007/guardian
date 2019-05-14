import React, { Component } from 'react';
import {Table, Grid, Button, Form } from 'react-bootstrap'; 
import PageHeader from '../PageHeader/PageHeader';
import './TrackInformation.css';

const mockData = require('../../../mockData.json');

const TrackInformationPage = (props) => {

    class TrackInformationDataTable extends Component {

        render() {

            const TrackInformationDataHeader = () => {

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

            const dataRows = mockData.pages.TrackInformation.tracks.map( (track, i) =>
              <tr key={i}>
                    <td className="text-center">{track.trackSequence}</td>
                    <td className="text-center"><i className="material-icons">format_line_spacing</i></td>
                    <td className="text-center"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td><Form.Control type="text" value={track.trackISRC}></Form.Control></td>
                    <td><Form.Control type="text" value={track.trackTitle}></Form.Control></td>
                    <td className="text-center">
                        <label className="custom-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </td>
                    <td><Form.Control type="date" value={track.trackReleaseDate}></Form.Control></td>
                    <td className="text-center">
                        <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                        <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                </tr>
               
           )

            return (
          
            <div className="table-responsive">
                <Table>
                    <TrackInformationDataHeader />
                    <tbody>
                        {dataRows}
                    </tbody>
                </Table>
           </div>
            )
        }
    }

    return(
        <section className="page-container h-100">
            
            <PageHeader />

            <div className="row no-gutters step-description">
                <div className="col-12">
                    <h2>Step <span className="count-circle">4</span> Track Information</h2>
                    <p>In this step, you can upload audio files for filtering by either dragging &amp; dropping or clicking to browse files, e.g. mp3, WAV, etc. Tracks can also be reordered with drag and drop. This section must be completed by clicking on the 'Save &amp; Continue' button below.</p>
                </div>
            </div>

            <TrackInformationDataTable />
        </section>
    )
};

export default TrackInformationPage;