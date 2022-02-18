import React, { Component } from 'react';
import { Table, Grid, Button, Form, Tabs, Tab } from 'react-bootstrap';
import AudioVideoDataTable from '../pageComponents/audioVideoDataTable';

class AudioFilesTabbedTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDiscTabs = () => {
    const { t } = this.props;
    if (this.props.data) {
      let discs = this.props.data.map((disc, i) => {
        const count = i + 1;
        return (
          <Tab
            key={i}
            eventKey={i}
            title={
              <span>
                {t('audio:Disc') + ' ' + count + ' '}
                <button
                  type="button"
                  className="btn btn-secondary btn-sm "
                  onClick={() => this.props.diskDeleteConfirmation(disc.discNumber)}
                >
                  <i className="material-icons close">close</i>
                </button>
              </span>
            }
          >
            <AudioVideoDataTable
              uploads={this.props.uploads}
              data={disc}
              deleteRow={this.props.deleteRow}
              handleChange={this.props.handleChange}
              resequencePageTableData={this.props.resequencePageTableData}
              showReplaceModal={(track, i, upload) => this.props.showReplaceModal(track, i, upload)}
              hideReplaceAudioModal={(track, i) => this.props.hideReplaceAudioModal(track, i)}
              checkIsrc={this.props.checkIsrc}
              upc={this.props.upc}
              cisLoading={this.props.cisLoading}
              t={this.props.t}
            />
          </Tab>
        );
      });

      return (
        <Tab.Container defaultActiveKey="1">
          <Tabs onSelect={this.props.handleTabClick}>{discs}</Tabs>
        </Tab.Container>
      );
    }
  };

  render() {
    return <div>{this.getDiscTabs()}</div>;
  }
}

export default AudioFilesTabbedTracks;
