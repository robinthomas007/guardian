import React, { Component } from 'react';
import {Table, Form } from 'react-bootstrap';
import { formatDateToYYYYMMDD } from '../../../Utils';

class TrackInformationDataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DataRows : [],
            tableRows : [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addBlankRow = this.addBlankRow.bind(this);
        this.handleDataLoad = this.handleDataLoad.bind(this);
    }
 
    trackInformationDataHeader = () => {
        return(
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th className="text-center"></th>
                    <th className="text-center"></th>
                    <th>ISRC <i>(Optional)</i></th>
                    <th>Track Title</th>
                    <th className="text-center">Single</th>
                    <th className="release-date-col">Release Date <span>TBD</span></th>
                    <th className="text-center">Actions</th>
                </tr> 
            </thead>
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

   
    removeRow(rowIndex) {
        const {DataRows} = this.state;
        const ModifiedRows = DataRows;
              ModifiedRows.splice(rowIndex, 1);
        this.setState({DataRows : ModifiedRows})
        this.props.updateDiscData(this.props.discID, ModifiedRows)
    }

    componentDidMount() {
        this.handleDataLoad(this.props.discID)
    }

    getBlankRow = (trackNumber) => {
        const {Project} = this.props.data;

        let blankRow = 
            {
                trackID : '',
                discNumber : (this.props.discID + 1).toString(),
                trackNumber : trackNumber + 1,
                hasUpload : false,
                trackTitle : '',
                isrc :  '',
                isSingle : false,
                tbdReleaseDate : false,
                trackReleaseDate : formatDateToYYYYMMDD(Project.projectReleaseDate), 
                artist : Project.projectArtistName,

                isSingleDisabled : false, 
                isReleaseDateDisabled : (Project.projectReleaseDate === '') ? true : false, 
                isTbdDisabled : false,
                isTbdChecked : (Project.projectReleaseDate === '') ? true : false
            }
        return(blankRow)
    }

    addBlankRow() {
        const {DataRows} = this.state;
        var newRow = DataRows
            newRow.push(this.getBlankRow(DataRows.length + 1))
        this.setState({DataRows : newRow})
    }

    resetDatePicker(trackIndex) {
        let datePickers = document.getElementsByClassName('trackReleaseDateInput');
        let sortedInputs = [];

        for(var i=0; i<datePickers.length; i++) {
            let discNumber = parseInt(datePickers[i].getAttribute('discNumber')) - 1;
            if(!sortedInputs[discNumber]) {
                sortedInputs[discNumber] = []
            }
            sortedInputs[discNumber].push(datePickers[i])
        }

        if(sortedInputs[this.props.discID][trackIndex].disabled) {
            sortedInputs[this.props.discID][trackIndex].disabled = false;
            sortedInputs[this.props.discID][trackIndex].value = '';
            sortedInputs[this.props.discID][trackIndex].disabled = true;
        } else {
            sortedInputs[this.props.discID][trackIndex].value = '';
        }
        
    }

    setTBD(evt, track, i) {
        const { DataRows } = this.state;
        let modifiedDataRows = DataRows;

        if(evt.target.checked) {
            modifiedDataRows[i].isReleaseDateDisabled = true;
            modifiedDataRows[i].trackReleaseDate = '';
            modifiedDataRows[i].isSingle = false;
            modifiedDataRows[i].isTbdDisabled = false;
            modifiedDataRows[i].isTbdChecked = true;
            this.resetDatePicker(i);
        } else {
            modifiedDataRows[i].isTbdDisabled = false;
        }

        this.setState({DataRows : modifiedDataRows})
        this.props.updateDiscData(this.props.discID, modifiedDataRows)
    }

    setSingle(evt, track, i) {
        const { Project } = this.props.data;
        const { DataRows } = this.state;
        let modifiedDataRows = DataRows;

        if(evt.target.checked) {
            modifiedDataRows[i].isSingle = true;
            modifiedDataRows[i].isReleaseDateDisabled = false;
            modifiedDataRows[i].isTbdChecked = false;
            modifiedDataRows[i].isTbdDisabled = false;
        } else {
            modifiedDataRows[i].trackReleaseDate = (Project.projectReleaseDate) ? Project.projectReleaseDate : this.resetDatePicker(i);
            modifiedDataRows[i].isSingle = false;
            modifiedDataRows[i].isReleaseDateDisabled = true;
        }

        this.setState({DataRows : modifiedDataRows})
        this.props.updateDiscData(this.props.discID, modifiedDataRows)
    }

    handleDataLoad(discID) {
        const {Discs} = this.props.data;
        const {Tracks}= Discs[this.props.discID];
        let dataRows = [];

        if(Tracks) {
            dataRows = Tracks.map( function (track, i) {
                return(
                    {
                        trackID : (track.trackID) ? track.trackID : '',
                        discNumber : parseInt(discID) + 1,
                        trackNumber : i + 1,
                        hasUpload : true,
                        trackTitle : (track.trackTitle) ? track.trackTitle : '',
                        isrc :  (track.isrc) ? track.isrc : '',
                        isSingle : (track.isSingle) ? track.isSingle : false,
                        tbdReleaseDate : (track.tbdReleaseDate) ? track.tbdReleaseDate : '',
                        trackReleaseDate : (track.trackReleaseDate) ? track.trackReleaseDate : '',
                        fileName : (track.fileName) ? track.fileName : '',
                        artist : (track.artist) ? track.artist : '',
                        
                        isSingleDisabled : false, 
                        isReleaseDateDisabled : (track.isSingle) ? false : true,
                        isTbdDisabled : (track.trackReleaseDate !== '' || track.isSingle) ? false : true,
                        isTbdChecked : (track.trackReleaseDate !== '' || track.isSingle) ? false : true
                    }
                )

            })
        } else {
            dataRows = [this.getBlankRow(0)];
        }

        // eslint-disable-next-line no-unused-vars
        const {DataRows} = this.state;
        const modifiedDataRows = dataRows;

        this.setState({DataRows : modifiedDataRows})
    }

    getTrackRows() {

        const {DataRows} = this.state;
        let tableRows = []
            tableRows.push(this.getBlankRow(0))

        if(DataRows) {
            tableRows = DataRows.map( (track, i) => {

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
                        <td className="text-center"><i className="material-icons purple-icon">audiotrack</i></td>
                        <td>
                            <Form.Control 
                                type="text" 
                                id={'isrc'} 
                                value={track.isrc}
                                onChange={(evt) => this.handleChange(evt, track, i)}
                            ></Form.Control>
                        </td>
                        <td>
                            <Form.Control 
                                type="text" 
                                id={'trackTitle'} 
                                value={track.trackTitle} 
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
                                discNumber={track.discNumber}
                                className={'trackReleaseDateInput discNumber_' + track.discNumber}
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
                                    checked={track.isTbdChecked} 
                                    value={track.isTbdChecked} 
                                    disabled={track.isTbdDisabled}
                                    onChange={(evt) => this.setTBD(evt, track, i)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </td> 
                        <td className="text-center">
                            <button 
                                className="btn btn-secondary action" 
                                onClick={this.props.showClick}
                            ><i className="material-icons">publish</i></button>
                            <button 
                                className="btn btn-secondary action" 
                                onClick={this.removeRow.bind(null, i)}
                            ><i className="material-icons">delete</i></button>
                        </td>
                    </tr>
                )}
            )
        }
        return(tableRows)
    }

    render() {
        return (
            <div className="table-responsive">
                <Table droppable="true">
                    {this.trackInformationDataHeader()}
                    <tbody>
                        {this.getTrackRows()}
                    </tbody>
                </Table>

                <div onClick={this.addBlankRow}>add track</div>
            </div>
        )
    }
}
export default TrackInformationDataTable;