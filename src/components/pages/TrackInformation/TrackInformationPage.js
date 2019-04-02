import React, { Component } from 'react';
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
                            <th className="td-2 centered">#</th>
                            <th className="td-2"></th>
                            <th className="td-5"></th>
                            <th className="td-30">ISRC <i>(Optional)</i></th>
                            <th className="td-30">Track Title</th>
                            <th className="td-10 centered">Single</th>
                            <th className="td-10 centered">Release Date</th>
                            <th className="td-10 centered">Actions</th>
                        </tr>
                    </thead>
                )
            }

            const dataRows = mockData.pages.TrackInformation.tracks.map( (track, i) => 
                <tr key={i}>
                    <td className="centered">{track.trackSequence}</td>
                    <td><i className="material-icons">format_line_spacing</i></td>
                    <td className="centered"><i className="material-icons purple-icon">audiotrack</i></td>
                    <td>{track.trackISRC}</td>
                    <td>{track.trackTitle}</td>
                    <td className="centered">
                        <label className="custom-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                        </label>
                    </td>
                    <td className="centered">{track.trackReleaseDate}</td>
                    <td className="centered">
                        <button className="btn btn-secondary action"><i className="material-icons">publish</i></button>
                        <button className="btn btn-secondary action"><i className="material-icons">delete</i></button>
                    </td>
                </tr>
           )

            return (
                <table className="table">
                    <TrackInformationDataHeader />
                    <tbody>
                        {dataRows}
                    </tbody>
                </table>
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