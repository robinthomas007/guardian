import React, { Component } from 'react';
import {Table, Form } from 'react-bootstrap';
import { formatDateToYYYYMMDD } from '../../../Utils';
import LoadingImgSm from '../../../ui/LoadingImgSm';

class TrackInformationDataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DataRows : [],
            tableRows : [],
            data : {
                Discs : {
                    Tracks : []
                }
            }
        }
        this.setDatePicker = this.setDatePicker.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
 
    trackInformationDataHeader = () => {
        return(
            <tr>
                <th className="text-center">#</th>
                <th className="text-center"></th>
                <th className="text-center"></th>
                <th>Track Title</th>
                <th>ISRC <i>(Optional)</i></th>
                <th className="text-center">Single</th>
                <th className="release-date-col">Release Date <span>TBD</span></th>
                <th className="text-center">Actions</th>
            </tr> 
        )
    }

    handleChange(event, track, i) {
        const { DataRows } = this.state;
        const modifiedDataRows = DataRows;
        if(event.target.type === 'checkbox') {
             event.target.value = (event.target.checked) ? true : false;
        }
        track[event.target.id] = event.target.value;
       
        this.setState({DataRows : modifiedDataRows})
        this.props.updateDiscData(this.props.discID, modifiedDataRows)
    };
   
    componentDidMount() {
        if(this.state.data !== this.props.data) {
            this.setState( {data : this.props.data} )
        }
    }

    setDatePicker = (checked, rowIndex) => {
        let datePickers = document.getElementsByClassName('trackReleaseDateInput');
        let sortedInputs = [];
        for(var i=0; i<datePickers.length; i++) {

            if(parseInt(datePickers[i].getAttribute('discnumber')) === parseInt(this.props.discID)) {
                sortedInputs.push(datePickers[i])
            }
        }

        if(checked) {
            sortedInputs[rowIndex].disabled = false;
            sortedInputs[rowIndex].value = '';
            sortedInputs[rowIndex].disabled = true;
        } else {
            sortedInputs[rowIndex].value = '';
        }
    }

    handleTBDClick(e, track, i) {
        const { Discs } = this.props.data;
        let modifiedDiscs = Discs[this.props.discID];

        if(e.target.checked) {
            modifiedDiscs.Tracks[i].isReleaseDateDisabled = true;
            modifiedDiscs.Tracks[i].trackReleaseDate = '';
            modifiedDiscs.Tracks[i].isSingle = false;
            modifiedDiscs.Tracks[i].isTbdDisabled = false;
            modifiedDiscs.Tracks[i].isTbdChecked = true;
            this.setDatePicker(e.target.checked,i);
        } else {
            modifiedDiscs.Tracks[i].isTbdDisabled = false;
        }
        this.props.updateDiscData(this.props.discID, modifiedDiscs)
    }

    handleTBDCheckedLoad = (track) => {
        return( (!track.trackReleaseDate && !track.isSingle) ? true : false)
    }

    setSingle(e, track, i) {
        const { Discs } = this.props.data;
        let modifiedDiscs = Discs[this.props.discID];

        if(e.target.checked) {
            modifiedDiscs.Tracks[i].isSingle = true;
            modifiedDiscs.Tracks[i].trackReleaseDate = (this.props.data.Project.projectReleaseDate) ? this.props.data.Project.projectReleaseDate : '';
            modifiedDiscs.Tracks[i].isReleaseDateDisabled = false;
            modifiedDiscs.Tracks[i].isTbdChecked = false;
            modifiedDiscs.Tracks[i].isTbdDisabled = false;
        } else {
            modifiedDiscs.Tracks[i].trackReleaseDate = (this.props.data.Project.projectReleaseDate) ? this.props.data.Project.projectReleaseDate : '';;
            modifiedDiscs.Tracks[i].isSingle = false;
            modifiedDiscs.Tracks[i].isReleaseDateDisabled = true;
            this.setDatePicker(e.target.checked, i)
        }
        this.props.updateDiscData(this.props.discID, modifiedDiscs)
    }


    getTrackRows() {
        if(this.props.data.Discs.length > 0 && this.props.data.Discs[this.props.discID].Tracks) {
            let tableRows = this.props.data.Discs[this.props.discID].Tracks.map( (track, i) => {

                return(
                    <tr draggable key={i}>
                        <td className="text-center">
                            <Form.Control 
                                type="hidden" 
                                id={'trackID'} 
                                value={track.trackID} 
                                onChange={(evt) => this.handleChange(evt, track, i)}
                            ></Form.Control>
                            {i+1}
                        </td>
                        <td className="text-center"><i className="material-icons">format_line_spacing</i></td>
                        <td className="text-center">
                            { (track.hasUpload) ? <i className="material-icons purple-icon">audiotrack</i> : ''}
                            <span className="loading-sm" id={track.fileName + "_ico"}>
                                <LoadingImgSm show={track.fileUpload}/>
                            </span>
                        </td>
                        <td>
                            <Form.Control 
                                type="text" 
                                id={'trackTitle'} 
                                value={track.trackTitle} 
                                onChange={(evt) => this.handleChange(evt, track, i)}
                            ></Form.Control>
                        </td>
                        <td>
                            <Form.Control 
                                type="text" 
                                id={'isrc'} 
                                value={track.isrc}
                                onChange={(evt) => this.handleChange(evt, track, i)}
                            ></Form.Control>
                        </td>
                        <td className="text-center">
                            <label className="custom-checkbox">
                              <input 
                                    type="checkbox" 
                                    id={'isSingle'} 
                                    checked={track.isSingle}
                                    value={track.isSingle}
                                    onChange={(evt) => this.setSingle(evt, track, i)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </td>
                        <td className="release-date-col">

                            <Form.Control 
                                discnumber={this.props.discID}
                                className={'trackReleaseDateInput'}
                                type="date" 
                                id={'trackReleaseDate'}
                                value={formatDateToYYYYMMDD(track.trackReleaseDate)}
                                disabled={track.isReleaseDateDisabled}
                                onChange={(evt) => this.handleChange(evt, track, i)}
                            />
                            <label className="custom-checkbox"> 
                                <input 
                                    type="checkbox" 
                                    id={'tbdReleaseDate'}
                                    checked={this.handleTBDCheckedLoad(track)} 
                                    value={this.handleTBDCheckedLoad(track)}
                                    disabled={track.isTbdDisabled}
                                    onChange={(evt) => this.handleTBDClick(evt, track, i)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </td> 
                        <td className="text-center">
                            <button 
                                className="btn btn-secondary action" 
                                onClick={() => this.props.showReplaceModal(track, i)}
                            ><i className="material-icons">publish</i></button>
                            <button 
                                className="btn btn-secondary action" 
                                onClick={this.props.removeTrack.bind(null, i)}
                            ><i className="material-icons">delete</i></button>
                        </td>
                    </tr>
                )}
            )
            return(tableRows)
        } 
    }

    render() {
        return (
            <div className="table-responsive">
                <Table droppable="true">
                    <thead>
                        {this.trackInformationDataHeader()}
                    </thead>
                    <tbody>
                        {this.getTrackRows()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default TrackInformationDataTable;