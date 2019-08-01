import React, { Component } from 'react';
import {Table, Grid, Button, Form, Tabs, Tab  } from 'react-bootstrap'; 

class TrackInformationDataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
        this.updateState = this.updateState.bind(this);
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
                    <th>Release Date</th>
                    <th className="text-center">Actions</th>
                </tr>
            </thead>
        )
    }   

    updateState(evt, track, i) {
        // this.setState( {formInputs : { ...this.state.formInputs, [e.target.id] : e.target.value}} )
        this.props.handleChange(evt, track, i)
    }

    render() {

        let dataRows = this.props.data.map( (track, i) =>
          <tr key={i} draggable>
                <td className="text-center">
                    <Form.Control 
                        type="hidden" 
                        id={'trackID'} 
                        value={track.trackID} 
                        onChange={(evt) => this.updateState(evt, track, i)}
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
                        onChange={(evt) => this.updateState(evt, track, i)}
                    ></Form.Control>
                </td>
                <td>
                    <Form.Control 
                        type="text" 
                        id={'trackTitle'} 
                        value={track.trackTitle} 
                        onChange={(evt) => this.updateState(evt, track, i)}
                    ></Form.Control>
                </td>
                <td className="text-center">
                    <label className="custom-checkbox">
                        <input 
                            type="checkbox" 
                            id={'trackSingle'} 
                            defaultChecked={track.trackSingle} 
                            value={track.trackSingle} 
                            onChange={(evt) => this.updateState(evt, track, i)}/>
                        <span className="checkmark"></span>
                    </label>
                </td>
                <td>
                    <Form.Control 
                        type="date" 
                        id={'trackReleaseDate'}
                        value={track.trackReleaseDate}
                        disabled={track.trackReleaseDate.disabled}
                        onChange={(evt) => this.updateState(evt, track, i)}
                    >
                    </Form.Control>
                </td>
                <td className="text-center">
                    <button 
                        className="btn btn-secondary action" 
                        onClick={this.props.showClick}
                    ><i className="material-icons">publish</i></button>
                    <button 
                        className="btn btn-secondary action" 
                        onClick={this.props.removeRow.bind(null, i)}
                    ><i className="material-icons">delete</i></button>
                </td>
            </tr>
       )

        return (
            <div className="table-responsive">
                <Table droppable="true">
                    {this.trackInformationDataHeader()}
                    <tbody>
                        {dataRows}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default TrackInformationDataTable;