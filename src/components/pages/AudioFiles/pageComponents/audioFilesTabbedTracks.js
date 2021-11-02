import React, { Component } from 'react';
import { Table, Grid, Button, Form, Tabs, Tab } from 'react-bootstrap';
import AudioVideoDataTable from '../pageComponents/audioVideoDataTable';

class AudioFilesTabbedTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDiscTabs = () => {
    if (this.props.data) {
      let discs = this.props.data.map((disc, i) => {
        const count = i + 1;
        return (
          <Tab key={i} eventKey={i} title={'Disc ' + count}>
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
