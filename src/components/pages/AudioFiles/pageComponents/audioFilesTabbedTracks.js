import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import AudioVideoDataTable from '../pageComponents/audioVideoDataTable';

export default props => (
  <Tab.Container defaultActiveKey="1">
    <Tabs onSelect={props.handleTabClick} activeKey={props.activeTab}>
      {props.data.map((disc, i) => (
        <Tab
          key={i}
          eventKey={i}
          title={
            <span>
              {props.t('audio:Disc') + ' ' + (i + 1) + ' '}
              {props.data.length > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm close"
                  onClick={e => props.diskDeleteConfirmation(e, i)}
                >
                  <i className="material-icons">close</i>
                </button>
              )}
            </span>
          }
        >
          <AudioVideoDataTable
            uploads={props.uploads}
            data={disc}
            deleteRow={props.deleteRow}
            handleChange={props.handleChange}
            resequencePageTableData={props.resequencePageTableData}
            showReplaceModal={(track, i, upload) => props.showReplaceModal(track, i, upload)}
            hideReplaceAudioModal={(track, i) => props.hideReplaceAudioModal(track, i)}
            checkIsrc={props.checkIsrc}
            upc={props.upc}
            cisLoading={props.cisLoading}
            t={props.t}
            getCisDataForIsrc={props.getCisDataForIsrc}
          />
        </Tab>
      ))}
    </Tabs>
  </Tab.Container>
);
