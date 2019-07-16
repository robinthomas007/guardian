import React, { Component } from 'react';
import {Form, Table, Tabs, Tab, Alert } from 'react-bootstrap';


class AudioVideoDataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files : [],
            tableData : [],
            discs : [],
            formInputs : {},
            activeTab : 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
    }

    AudioVideoDataHeader() {
        return(
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th>Audio File</th>
                    <th>ISRC <i><span className="required-ind">(Required)</span></i></th>
                    <th>Track Title</th>
                    <th>Artist</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
        )
    }

    deleteRow(rowIndex) {
        const {tableData} = this.state;
        let modifiedTableData = tableData;
            modifiedTableData.splice(rowIndex, 1);

        this.setState({tableData : modifiedTableData})

        this.props.deleteRow(rowIndex)
    }

    handleChange(e, track, rowID) {
        const {discs} = this.state;
        const modifiedDisc = discs;
        const {tableData} = this.state;

        track[e.target.id] = e.target.value;

        let newTableData = tableData;
            newTableData[rowID][e.target.id] = e.target.value;
        
        this.setState({tableData : newTableData})
        this.props.handleChange(track, tableData, rowID)
    }

    AudioVideoDataBody(){

        let tableDataRows = [];
        const {tableData} = this.state;
        let modifiedTableData = tableData;

        if(this.props.data) {
            tableDataRows = this.props.data.pageTableData.map( (track, i) => {

                modifiedTableData[i] = {
                    fileName : track.fileName,
                    discNumber : (this.props.data.activeTab + 1),
                    isrc : track.isrc,
                    trackTitle : track.trackTitle,
                    artist : track.artist
                }

                return(
                    <tr key={i}>
                        <td className="text-center">{i+1}</td>
                        <td className="audio-file">
                            <div className="sortable-audio-file">
                                <i className="material-icons">format_line_spacing</i>
                                <span>{track.fileName}</span>
                                <Form.Control
                                    type="hidden"
                                    id="fileName"
                                    onChange={ (e) => this.handleChange(e, track, i) }
                                    value={this.state.tableData[i].fileName}
                                />
                            </div>
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                id="isrc"
                                onChange={ (e) => this.handleChange(e, track, i) }
                                value={this.state.tableData[i].isrc}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                id='trackTitle'
                                onChange={ (e) => this.handleChange(e, track, i) }
                                value={this.state.tableData[i].trackTitle}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="text"
                                id='artist'
                                onChange={ (e) => this.handleChange(e, track, i) }
                                value={this.state.tableData[i].artist}
                            />
                        </td>
                        <td className="text-center">
                            <button className="btn btn-secondary action"><i className="material-icons">refresh</i></button>
                            <button className="btn btn-secondary action" onClick={(evt) => this.deleteRow(i)}><i className="material-icons">delete</i></button>
                        </td>
                    </tr>
                )
            })
        }

        if(tableData !== modifiedTableData) {
            this.setState({tableData : modifiedTableData})
        }

        return(
            <tbody>
                {tableDataRows}
            </tbody>
        )
    }

    render() {
        return (
            <div className="table-responsive">
                <Table>
                    {this.AudioVideoDataHeader()}
                    {this.AudioVideoDataBody()}
                </Table>
            </div>
        )
    }
}

export default AudioVideoDataTable;