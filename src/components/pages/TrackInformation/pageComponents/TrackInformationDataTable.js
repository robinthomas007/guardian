import React, { Component } from 'react';
import {Table, Grid, Button, Form, Tabs, Tab  } from 'react-bootstrap'; 

class TrackInformationDataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            DataRows : [],
            tableRows : [],
            projectReleaseDate : '',
            discID : this.props.discID
        }

        this.handleChange = this.handleChange.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.addBlankRow = this.addBlankRow.bind(this);
        this.formatDateToYYYYMMDD = this.formatDateToYYYYMMDD.bind(this);
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
        const modifiedRows = DataRows;

        let inputValue = '';

        if(event.target.type === 'checkbox') {
             event.target.value = (event.target.checked) ? true : false;
        }

        console.log(track)

        track[event.target.id] = event.target.value;
        
        this.setState({DataRows : modifiedRows})

        console.log(DataRows)
    };

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

    removeRow(rowIndex) {
        const {DataRows} = this.state;
        const ModifiedRows = DataRows;

        ModifiedRows.splice(rowIndex, 1);
        this.setState({DataRows : ModifiedRows})
    }

    componentDidMount() {
        {this.handleDataLoad(this.props.discID)}
    }

    getBlankRow = () => {
        const {Project} = this.props.data;
        let blankRow = 
            {
                trackID : '',
                discNumber : parseInt(this.props.discID) + 1,
                trackNumber : '',
                hasUpload : '',
                trackTitle : '',
                trackIsrc :  '',
                isSingle : false,
                trackReleaseDate : this.formatDateToYYYYMMDD(Project.projectReleaseDate)
            }
        return(blankRow)
    }

    addBlankRow() {
        const {DataRows} = this.state;
        var newRow = DataRows
            newRow.push(this.getBlankRow())
        this.setState({DataRows : newRow})
    }

    handleDataLoad(discID) {
        const {Discs} = this.props.data;
        const {Tracks}= Discs[this.props.discID];
        let dataRows = [];

        if(Tracks) {
            dataRows = Tracks.map( function (track, i) {
                return(
                    {
                        trackID : track.trackID,
                        discNumber : parseInt(discID) + 1,
                        trackNumber : '',
                        hasUpload : true,
                        trackTitle : track.trackTitle,
                        trackIsrc :  track.isrc,
                        isSingle : track.isSingle,
                        trackReleaseDate : track.trackReleaseDate
                    }
                )

            })
        } else {
            dataRows = [this.getBlankRow()];
        }

        const {DataRows} = this.state;
        const modifiedDataRows = dataRows;

        this.setState({DataRows : modifiedDataRows})
    }

    getTrackRows() {

        const {DataRows} = this.state;
        let tableRows = []
            tableRows.push(this.getBlankRow())

        if(DataRows) {
            tableRows = DataRows.map( (track, i) => {
                return(
                    <tr draggable>
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
                                id={'trackIsrc'} 
                                value={track.trackIsrc}
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
                                    id={'trackSingle'} 
                                    defaultChecked={track.isSingle} 
                                    value={track.isSingle} 
                                    onChange={(evt) => this.handleChange(evt, track, i)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </td>
                        <td className="release-date-col">
                            <Form.Control 
                                type="date" 
                                id={'trackReleaseDate'}
                                value={this.formatDateToYYYYMMDD(track.trackReleaseDate)}
                                disabled={null}
                                onChange={(evt) => this.handleChange(evt, track, i)}
                            />
                            <label className="custom-checkbox"> 
                                <input type="checkbox" />
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
                    {this.getTrackRows()}
                </Table>

                <div onClick={this.addBlankRow}>add track</div>
            </div>
        )
    }
}
export default TrackInformationDataTable;