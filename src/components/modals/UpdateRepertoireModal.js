import React from 'react';
import { Table, Modal } from 'react-bootstrap';
import './updateModal.css';

export default function UpdateRepertoireModal(props) {
  const trackDataTable = trackData => {
    return (
      <Table className="responsive">
        <thead>
          <tr>
            <th className="custom-width-data">Track Data</th>
            <th className="custom-width-id">Track #</th>
            <th>Track Name</th>
            <th>Artist</th>
            <th>ISRC</th>
          </tr>
        </thead>
        {trackData.map((item, i) => {
          return (
            <tbody>
              <tr>
                <td>WAS</td>
                <td>{item.TrackId}</td>
                <td>{item.was.trackTitle}</td>
                <td>{item.was.artist}</td>
                <td>{item.was.isrc}</td>
              </tr>
              <tr>
                <td>UPDATED TO</td>
                <td>{item.TrackId}</td>
                <td className="updated-text-clr">{item.updatedTo.trackTitle}</td>
                <td className="updated-text-clr">{item.updatedTo.artist}</td>
                <td className="updated-text-clr">{item.updatedTo.isrc}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    );
  };
  const rightDataTable = rightData => {
    return (
      <Table className="responsive">
        <thead>
          <tr>
            <th className="custom-width-data">Right Data</th>
            <th className="custom-width-id">Track #</th>
            <th>Has Rights</th>
          </tr>
        </thead>
        {rightData.map((item, i) => {
          return (
            <tbody>
              <tr>
                <td>WAS</td>
                <td>{item.TrackId}</td>
                <td>{item.was}</td>
              </tr>
              <tr>
                <td>UPDATED TO</td>
                <td>{item.TrackId}</td>
                <td className="updated-text-clr">{item.updatedTo}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    );
  };
  return (
    <Modal
      scrollable={true}
      dialogClassName="update-modal-70w"
      close
      id="updateModal"
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Project Updates</Modal.Title>
        <p className="sub-title">
          We’ve found updates to the following project data within UMG’s systems.{' '}
        </p>
      </Modal.Header>
      <Modal.Body>
        <p className="note">We’ve updated the following values for this project:</p>
        {props.data.Tracks && props.data.Tracks.length > 0 && trackDataTable(props.data.Tracks)}
        <br></br>
        {props.data.Rights && props.data.Rights.length > 0 && rightDataTable(props.data.Rights)}
      </Modal.Body>
    </Modal>
  );
}
