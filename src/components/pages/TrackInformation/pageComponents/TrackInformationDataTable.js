import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';
import ToolTip from 'component_library/Tooltip';
import AudioLoader from 'component_library/AudioLoader';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { CustomInput, isPreReleaseDate } from '../../../Utils.js';
import VideoPlayer from 'components/template/VideoPlayer';
import 'react-datepicker/dist/react-datepicker.css';

class TrackInformationDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      DataRows: [],
      tableRows: [],
      data: {
        Discs: {
          Tracks: [],
        },
      },
    };
    this.setDatePicker = this.setDatePicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  trackInformationDataHeader = () => {
    const { t, isVideo } = this.props;
    return (
      <tr>
        <th className="text-center">#</th>
        {!isVideo && <th className="text-center"></th>}
        <th className="text-center">{isVideo ? 'Video File' : ''}</th>
        <th>
          {isVideo ? 'Video Title' : t('track:TrackTitle')}{' '}
          <span className="required-ind">
            <i>({t('track:Required')})</i>
          </span>
        </th>
        <th className="tbl-isrc-width">
          <div>
            {t('track:ISRC ')}&nbsp;
            <ToolTip tabIndex="-1" message={t('track:CheckISRCsMsg')} />
          </div>
          <div style={{ float: 'right' }}>
            <VideoPlayer
              title="Tracks - Check ISRC"
              link="https://usaws03-guardian-media.s3.amazonaws.com/videos/The+Guardian+2021+pt.+9+Track+Information.mp4"
            />
          </div>
        </th>
        <th>{t('track:Artist')} </th>
        {!isVideo && <th className="text-center">{t('track:Single')}</th>}
        <th className="release-date-col">
          {t('track:ReleaseDate')} &nbsp;
          <ToolTip tabIndex="-1" message={t('track:ReleaseDateDescription')} />
        </th>
        <th>{t('track:TBD')}</th>
        {!isVideo && <th className="text-center"> {t('track:Actions')}</th>}
      </tr>
    );
  };

  handleChange(event, track, i) {
    const { DataRows } = this.state;
    const modifiedDataRows = DataRows;
    if (event.target.type === 'checkbox') {
      event.target.value = event.target.checked ? true : false;
    }
    track[event.target.id] = event.target.value;

    this.setState({ DataRows: modifiedDataRows });
    this.props.updateDiscData(this.props.discID, modifiedDataRows);
  }

  handleDateChange(date, track) {
    let formattedDate = null;
    const { DataRows } = this.state;
    const modifiedDataRows = DataRows;
    if (date !== null) {
      formattedDate = moment(date).format('MM/DD/YYYY HH:mm');
    }
    track['trackReleaseDate'] = formattedDate;
    this.setState({ DataRows: modifiedDataRows });
    this.props.updateDiscData(this.props.discID, modifiedDataRows);
  }

  componentDidMount() {
    if (this.state.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  setDatePicker = (checked, rowIndex) => {
    let datePickers = document.getElementsByClassName('trackReleaseDateInput');
    let sortedInputs = [];
    for (var i = 0; i < datePickers.length; i++) {
      if (parseInt(datePickers[i].getAttribute('tabIndex')) === parseInt(this.props.discID)) {
        sortedInputs.push(datePickers[i]);
      }
    }
    if (checked) {
      sortedInputs[rowIndex].value = '';
      sortedInputs[rowIndex].disabled = true;
    } else {
      sortedInputs[rowIndex].value = '';
      sortedInputs[rowIndex].disabled = false;
    }
  };

  handleTBDClick(e, track, i) {
    const { Discs } = this.props.data;
    let modifiedDiscs = Discs[this.props.discID];
    if (e.target.checked) {
      modifiedDiscs.Tracks[i].isReleaseDateDisabled = true;
      modifiedDiscs.Tracks[i].trackReleaseDate = '';
      // modifiedDiscs.Tracks[i].isSingle = false;
      modifiedDiscs.Tracks[i].isTbdDisabled = false;
      modifiedDiscs.Tracks[i].isTbdChecked = true;
      this.setDatePicker(e.target.checked, i);
    } else {
      modifiedDiscs.Tracks[i].isReleaseDateDisabled = false;
      modifiedDiscs.Tracks[i].isTbdDisabled = false;
      modifiedDiscs.Tracks[i].isTbdChecked = false;
      modifiedDiscs.Tracks[i].trackReleaseDate = new Date();
      this.setDatePicker(e.target.checked, i);
    }
    this.props.updateDiscData(this.props.discID, modifiedDiscs);
  }

  handleTBDCheckedLoad = track => {
    return !track.trackReleaseDate && track.isSingle ? true : false;
  };

  setSingle(e, track, i) {
    const { Discs } = this.props.data;
    let modifiedDiscs = Discs[this.props.discID];

    if (e.target.checked) {
      modifiedDiscs.Tracks[i].isSingle = true;
      modifiedDiscs.Tracks[i].trackReleaseDate = this.props.data.Project.projectReleaseDate
        ? this.props.data.Project.projectReleaseDate
        : '';
      modifiedDiscs.Tracks[i].isReleaseDateDisabled = false;
      // modifiedDiscs.Tracks[i].isTbdChecked = false;
      // modifiedDiscs.Tracks[i].isTbdDisabled = false;
    } else {
      modifiedDiscs.Tracks[i].trackReleaseDate = this.props.data.Project.projectReleaseDate
        ? this.props.data.Project.projectReleaseDate
        : '';
      modifiedDiscs.Tracks[i].isSingle = false;
      modifiedDiscs.Tracks[i].isReleaseDateDisabled = true;
      this.setDatePicker(e.target.checked, i);
    }
    this.props.updateDiscData(this.props.discID, modifiedDiscs);
  }

  handleAllowDrop(e) {
    e.preventDefault();
  }

  handleDrop = (e, i) => {
    this.props.handleChildDrop(e, i);
  };

  handleDrag(e, i, track) {
    this.props.handleChildDrag(e, i);
    e.dataTransfer.setData('text/html', e.target);
  }

  isValidIsrc(isrc) {
    return isrc.length === 0 || isrc.match(/^[a-z0-9]{12}$/i) ? true : false;
  }

  setFieldValidation(input, status) {
    if (status === 'is-invalid') {
      input.className = input.className.replace('is-invalid', '') + ' is-invalid';
    } else {
      input.className = input.className.replace('is-invalid', '');
    }
  }

  handleOnBlur(e) {
    const { checkIsrcOnBlur } = this.props;
    if (e.target.className.match('trackIsrcField')) {
      if (this.isValidIsrc(e.target.value)) {
        this.setFieldValidation(e.target, 'is-Valid');
        checkIsrcOnBlur(e.target.value);
      } else {
        this.setFieldValidation(e.target, 'is-invalid');
      }
    }
  }

  getTrackRows() {
    if (this.props.data.Discs.length > 0 && this.props.data.Discs[this.props.discID].Tracks) {
      let tableRows = this.props.data.Discs[this.props.discID].Tracks.map((track, i) => {
        const pre = isPreReleaseDate(this.props.data);
        const { t, isVideo } = this.props;
        return (
          <tr
            className={'draggable-track'}
            draggable="true"
            key={i}
            onDrop={e => this.handleDrop(e, i)}
            onDragOver={this.handleAllowDrop}
            onDragStart={e => this.handleDrag(e, i, track)}
          >
            <td className="text-center">
              <Form.Control
                type="hidden"
                id={'trackID'}
                value={track.trackID}
                onChange={evt => this.handleChange(evt, track, i)}
                onDragStart={e => this.handleDrag(e, i, track)}
              ></Form.Control>
              {i + 1}
            </td>
            {!isVideo && (
              <td className="text-center">
                <i className="material-icons">format_line_spacing</i>
              </td>
            )}
            {!isVideo && (
              <td className="text-center">
                {track.hasUpload ? <i className="material-icons purple-icon">audiotrack</i> : ''}
                <span className="loading-sm" id={`${track.fileName}_${i}_ico`}>
                  <AudioLoader show={track.fileUpload} />
                </span>
              </td>
            )}
            {isVideo && (
              <td>
                <Form.Control
                  type="text"
                  id={`${track.fileName}_${i}_ico`}
                  disabled={true}
                  value={track.fileName}
                  className={'trackTitleField requiredInput'}
                ></Form.Control>
                <div className="invalid-tooltip">{t('track:InvalidTrackTitle')}</div>
              </td>
            )}
            <td>
              <Form.Control
                type="text"
                id={'trackTitle'}
                value={track.trackTitle}
                onChange={evt => this.handleChange(evt, track, i)}
                className={'trackTitleField requiredInput'}
              ></Form.Control>
              <div className="invalid-tooltip">{t('track:InvalidTrackTitle')}</div>
            </td>
            <td className="tbl-isrc-width-td">
              <Form.Control
                type="text"
                id={'isrc'}
                value={track.isrc}
                className={'trackIsrcField'}
                onChange={evt => this.handleChange(evt, track, i)}
                onBlur={e => this.handleOnBlur(e)}
                maxLength={12}
              ></Form.Control>
              <div className="invalid-tooltip">{t('track:InvalidISRC')}</div>
            </td>
            <td>
              <Form.Control
                type="text"
                id={'artist'}
                value={track.artist}
                onChange={evt => this.handleChange(evt, track, i)}
              ></Form.Control>
            </td>
            {!isVideo && (
              <td className="text-center">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    id={'isSingle'}
                    checked={track.isSingle}
                    value={track.isSingle}
                    onChange={evt => this.setSingle(evt, track, i)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
            )}
            <td className="release-date-col">
              <DatePicker
                id={'trackReleaseDate'}
                showTimeSelect
                tabIndex={this.props.discID} // unable to add custom attribute in react-datepicker
                selected={
                  track.trackReleaseDate && track.trackReleaseDate != ''
                    ? new Date(track.trackReleaseDate)
                    : null
                }
                dateFormat="Pp"
                placeholderText="Select release date"
                onChange={date => this.handleDateChange(date, track)}
                customInput={
                  <CustomInput
                    isreadOnly={track.isSingle ? false : true}
                    tabIndex={this.props.discID}
                    adClass="trackReleaseDateInput"
                  />
                }
                isClearable={track.isSingle ? true : false}
              />
            </td>
            <td>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  id={'tbdReleaseDate'}
                  checked={this.handleTBDCheckedLoad(track)}
                  value={this.handleTBDCheckedLoad(track)}
                  disabled={track.isTbdDisabled || !pre}
                  onChange={evt => track.isSingle && this.handleTBDClick(evt, track, i)}
                />
                <span
                  className={`checkmark ${track.isTbdDisabled || !pre ? 'disabled' : ''}`}
                ></span>
              </label>
            </td>
            {!isVideo && (
              <td className="text-center">
                <button
                  className="btn btn-secondary action"
                  disabled={!pre || track.isCisAudio === true}
                  title={!pre ? `Audio is not required for post release projects` : ''}
                  onClick={() => this.props.showReplaceModal(track, i)}
                >
                  <i className="material-icons">publish</i>
                </button>
                <button
                  className="btn btn-secondary action"
                  onClick={this.props.removeTrack.bind(null, i)}
                >
                  <i className="material-icons">delete</i>
                </button>
              </td>
            )}
          </tr>
        );
      });
      return tableRows;
    }
  }

  render() {
    const { isVideo } = this.props;

    return (
      <div className="table-responsive">
        <Table droppable="true" className="tracks-table">
          <thead style={{ position: 'sticky', top: isVideo ? '0px' : '240px', background: '#fff' }}>
            {this.trackInformationDataHeader()}
          </thead>
          <tbody>{this.getTrackRows()}</tbody>
        </Table>
      </div>
    );
  }
}
export default TrackInformationDataTable;
