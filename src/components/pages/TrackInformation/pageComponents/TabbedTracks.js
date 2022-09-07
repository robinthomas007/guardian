import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TrackInformationDataTable from '../pageComponents/TrackInformationDataTable';

class TabbedTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        Discs: [],
      },
    };

    this.handleTabClick = this.handleTabClick.bind(this);
    this.updateDiscData = this.updateDiscData.bind(this);
  }

  updateDiscData(discID, discData) {
    let updatedDiscData = {
      discNumber: JSON.stringify(discID + 1),
      Tracks: discData,
    };
    this.props.handleDiscUpdate(discID, updatedDiscData);
  }

  handleTabClick(key) {
    this.props.handleActiveDiscUpdate(key);
  }

  getDiscTabs = () => {
    const { t, diskDeleteConfirmation, data } = this.props;
    if (data.Discs) {
      let discs = data.Discs.map((disc, i) => {
        const count = i + 1;

        return (
          <Tab
            key={count}
            eventKey={count}
            title={
              <span>
                {t('track:Disc') + ' ' + count + ' '}
                {data.Discs.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm close"
                    onClick={e => diskDeleteConfirmation(e, i)}
                  >
                    <i className="material-icons">close</i>
                  </button>
                )}
              </span>
            }
          >
            <TrackInformationDataTable
              data={data}
              discID={i}
              updateDiscData={this.updateDiscData}
              removeTrack={(e, i) => this.props.removeTrack(e, i)}
              setSingle={(e, track, i) => this.props.setSingle.bind(e, track, i)}
              showReplaceModal={(track, i) => this.props.showReplaceModal(track, i)}
              hideReplaceAudioModal={(track, i) => this.props.hideReplaceAudioModal(track, i)}
              addDisc={this.props.addDisc}
              handleChildDrag={(e, i) => this.props.handleChildDrag(e, i)}
              handleChildDrop={(e, i) => this.props.handleChildDrop(e, i)}
              checkIsrc={this.props.checkIsrc}
              checkIsrcOnBlur={this.props.checkIsrcOnBlur}
              t={t}
            />
          </Tab>
        );
      });

      return (
        <Tab.Container defaultActiveKey="1">
          <Tabs onSelect={this.handleTabClick} activeKey={this.props.activeDiscTab}>
            {discs}
          </Tabs>
        </Tab.Container>
      );
    }
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="row no-gutters d-flex">
          <div className="col-9"></div>
          <div className="col-3 d-flex justify-content-end">
            <ul className="disc-track-buttons">
              <li>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={this.props.addDisc}
                >
                  <i className="material-icons">adjust</i>
                  {t('track:AddDisc')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={this.props.addTrack}
                >
                  <i className="material-icons">add</i> {t('track:AddTrack')}
                </button>
              </li>
            </ul>
          </div>
        </div>
        {this.props.data.Discs && this.props.data.Discs.length > 0
          ? this.getDiscTabs()
          : this.props.addDisc()}
      </div>
    );
  }
}

export default TabbedTracks;
