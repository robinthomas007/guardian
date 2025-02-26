import React, { Component } from 'react';
import AudioFilesDataTable from '../pageComponents/AudioFilesDataTable';
import { Table, Grid, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

class AudioFilesTabsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getDiscs() {
    if (this.props.discs) {
      const discs = this.props.discs.map((disc, i) => {
        return (
          <Tab key={i} eventKey={i + 1} title={this.props.t('review:Disc') + ' ' + (i + 1)}>
            <AudioFilesDataTable data={disc.Tracks} mediaType={this.props.mediaType} />
          </Tab>
        );
      });
      return discs;
    }
  }

  render() {
    return (
      <Tab.Container defaultActiveKey="1">
        <Tabs onSelect={this.handleTabClick}>{this.getDiscs()}</Tabs>
      </Tab.Container>
    );
  }
}

export default withTranslation()(AudioFilesTabsContainer);
