import React, { Component } from 'react';
import { Form, Table, Tabs, Tab, Alert } from 'react-bootstrap';
import AudioLoader from 'component_library/AudioLoader';

class AudioVideoDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      tableData: [],
      discs: [],
      formInputs: {},
      activeTab: 0,
      activeDragSource: null,
      activeDragTarget: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  AudioVideoDataHeader() {
    return (
      <thead>
        <tr>
          <th className="text-center">#</th>
          <th>Audio File</th>
          <th>
            Track Title
            <i>
              <span className="required-ind">(Required)</span>
            </i>
          </th>
          <th>
            ISRC
            <button
              style={{ float: 'right' }}
              className="btn btn-sm btn-primary"
              onClick={this.props.checkIsrc}
              title="Comment"
            >
              <i className={'material-icons'}>search</i>
              Check ISRCs
            </button>
          </th>
          <th>Artist</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
    );
  }

  isValidIsrc(isrc) {
    return isrc.replace(/\W/g, '').length === 12 || isrc.replace(/\W/g, '').length === 0
      ? true
      : false;
  }

  isValidTitle(title) {
    return title.length > 0 ? true : false;
  }

  setFieldValidation(input, status) {
    if (status === 'is-invalid') {
      input.className = input.className.replace('is-invalid', '') + ' is-invalid';
    } else {
      input.className = input.className.replace('is-invalid', '');
    }
  }

  handleOnBlur(e) {
    if (e.target.className.match('trackIsrcField')) {
      this.isValidIsrc(e.target.value)
        ? this.setFieldValidation(e.target, 'is-Valid')
        : this.setFieldValidation(e.target, 'is-invalid');
    } else if (e.target.className.match('trackTitleField')) {
      this.isValidTitle(e.target.value)
        ? this.setFieldValidation(e.target, 'is-Valid')
        : this.setFieldValidation(e.target, 'is-invalid');
    }
  }

  handleChange(e, track, rowID) {
    const { discs } = this.state;
    const { tableData } = this.state;

    track[e.target.id] = e.target.value;

    let newTableData = tableData;
    newTableData[rowID][e.target.id] = e.target.value;

    this.setState({ tableData: newTableData });
    this.props.handleChange(track, tableData, rowID);
  }

  drag(e, i, track) {
    this.setState({ activeDragSource: i });
    e.dataTransfer.setData('text/html', e.target);
  }

  drop(e, i, track) {
    e.preventDefault();
    this.setState({ activeDragTarget: i }, () =>
      this.props.resequencePageTableData(this.state.activeDragSource, this.state.activeDragTarget),
    );
    var data = e.dataTransfer.getData('text/html');
  }

  allowDrop(e) {
    e.preventDefault();
    //e.target.className = 'audio-drop-area'
    //audio-drop-area
  }

  AudioVideoDataBody() {
    let tableDataRows = [];
    const { tableData } = this.state;
    let modifiedTableData = tableData;
    const { uploads } = this.props;
    const trackArr = {};
    Object.entries(uploads).forEach(([key, value]) => {
      const trackIds = key.split('/');
      trackArr[trackIds[0].slice(0, -14)] = value;
      trackArr['trackId'] = trackIds.length > 0 ? trackIds[1] : null;
    });

    if (this.props.data.Tracks) {
      tableDataRows = this.props.data.Tracks.map((track, i) => {
        modifiedTableData[i] = {
          fileName: track.fileName,
          discNumber: this.props.data.activeTab + 1,
          isrc: track.isrc,
          trackTitle: track.trackTitle,
          artist: track.artist,
        };
        return (
          <tr key={i}>
            <td className="text-center">{i + 1}</td>
            {(!this.props.upc || track.fileUpload || track.hasUpload) && (
              <td
                className="audio-file"
                onDrop={e => this.drop(e, i, track)}
                onDragOver={this.allowDrop}
              >
                <div
                  draggable="true"
                  onDragStart={e => this.drag(e, i, track)}
                  className="sortable-audio-file upc-uploader-audio"
                >
                  {track.fileName ? (
                    <ul className="audio-file-info">
                      <li>
                        <i className="material-icons">format_line_spacing</i>
                      </li>
                      <li>{track.fileName}</li>
                      <li>
                        {trackArr[track.fileName] && track.trackID === trackArr['trackId'] ? (
                          <span className="loading-sm" id={`${track.fileName}_ico`}>
                            <AudioLoader show={true} />
                          </span>
                        ) : (
                          ''
                        )}
                      </li>
                    </ul>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => this.props.showReplaceModal(track, i, 'Upload')}
                    >
                      <i className="material-icons">publish</i>
                      <span>Upload Audio File</span>
                    </button>
                  )}
                  <Form.Control
                    type="hidden"
                    id="fileName"
                    onChange={e => this.handleChange(e, track, i)}
                    value={this.state.tableData[i].fileName}
                  />
                </div>
              </td>
            )}
            {this.props.upc && !track.fileUpload && !track.hasUpload && (
              <td
                className="audio-file"
                onDrop={e => this.drop(e, i, track)}
                onDragOver={this.allowDrop}
              >
                <div
                  className="upc-uploader-audio sortable-audio-file"
                  draggable="true"
                  onDragStart={e => this.drag(e, i, track)}
                >
                  {track.fileName ? (
                    <ul className="audio-file-info">
                      <li>
                        <i className="material-icons">format_line_spacing</i>
                      </li>
                      <li>{track.fileName}</li>
                      <li>
                        {trackArr[track.fileName] && track.trackID === trackArr['trackId'] ? (
                          <span className="loading-sm" id={`${track.fileName}_ico`}>
                            <AudioLoader show={true} />
                          </span>
                        ) : (
                          ''
                        )}
                      </li>
                    </ul>
                  ) : (
                    <button
                      className="btn"
                      disabled={track.isCisAudio === true}
                      onClick={() => this.props.showReplaceModal(track, i, 'Upload')}
                    >
                      <i className="material-icons">publish</i>
                      <span>Upload Audio File</span>
                    </button>
                  )}
                  <Form.Control
                    type="hidden"
                    id="fileName"
                    onChange={e => this.handleChange(e, track, i)}
                    value={this.state.tableData[i].fileName}
                  />
                </div>
              </td>
            )}
            <td>
              <Form.Control
                type="text"
                id="trackTitle"
                onChange={e => this.handleChange(e, track, i)}
                value={this.state.tableData[i].trackTitle}
                className={'trackTitleField'}
                onBlur={e => this.handleOnBlur(e)}
              />
              <div className="invalid-tooltip">Invalid Track Title</div>
            </td>
            <td>
              <Form.Control
                type="text"
                id="isrc"
                onChange={e => this.handleChange(e, track, i)}
                value={this.state.tableData[i].isrc}
                className={'trackIsrcField'}
                onBlur={e => this.handleOnBlur(e)}
                maxlength={12}
              />
              <div className="invalid-tooltip">Invalid ISRC</div>
            </td>
            <td>
              <Form.Control
                type="text"
                id="artist"
                onChange={e => this.handleChange(e, track, i)}
                value={this.state.tableData[i].artist}
                className={'trackArtist'}
              />
            </td>
            <td className="text-center">
              <button
                className="btn btn-secondary action"
                disabled={track.isCisAudio === true}
                onClick={() => this.props.showReplaceModal(track, i)}
              >
                <i className="material-icons">publish</i>
              </button>
              <button className="btn btn-secondary action" onClick={evt => this.props.deleteRow(i)}>
                <i className="material-icons">delete</i>
              </button>
            </td>
          </tr>
        );
      });
    }

    if (tableData !== modifiedTableData) {
      this.setState({ tableData: modifiedTableData });
    }

    return <tbody>{tableDataRows}</tbody>;
  }

  render() {
    return (
      <div className="table-responsive">
        <Table className="audio-files-table">
          {this.AudioVideoDataHeader()}
          {this.AudioVideoDataBody()}
        </Table>
      </div>
    );
  }
}

export default AudioVideoDataTable;
