import React from 'react';
import Api from 'lib/api';
import { CSVLink } from 'react-csv';
import _ from 'lodash';
import { showNotyAutoError } from 'components/Utils';

export default class ExportCSV extends React.Component {
  csvLink = React.createRef();
  state = {
    headers: [
      { label: 'Project ID', key: 'projectID' },
      { label: 'Last Update', key: 'projectLastModified' },
      { label: 'Project Title', key: 'projectTitle' },
      { label: 'Artist', key: 'projectArtistName' },
      { label: 'Label', key: 'projectReleasingLabel' },
      { label: 'Status', key: 'status' },
      { label: 'Has Audio', key: 'isAudioFilesComplete' },
      { label: 'Has Tracks', key: 'isTrackInfoComplete' },
      { label: 'Has Rights', key: 'isTerritorialRightsComplete' },
      { label: 'Has Blocking', key: 'isBlockingPoliciesComplete' },
    ],
    data: [],
    loading: false,
  };

  exportToCSV = () => {
    const { formValues, getSearchCriteria } = this.props;
    const searchData = {
      itemsPerPage: 10000,
      pageNumber: 1,
      searchTerm: _.get(formValues, 'values.searchTerm', ''),
      filter: getSearchCriteria(_.cloneDeep(formValues.values)),
    };

    this.setState({ loading: true });
    return Api.post('/project/search', { searchCriteria: searchData })
      .then(response => response.json())
      .then(response => {
        this.setState({ data: response.Projects }, () => {
          setTimeout(() => this.csvLink.current.link.click(), 500);
        });
      })
      .catch(() => {
        showNotyAutoError('Could not export to CSV. Please try again.');
      })
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { loading, data, headers } = this.state;
    return (
      <div style={{ textAlign: 'right', width: '100%' }}>
        <button
          onClick={this.exportToCSV}
          className="btn btn-secondary"
          type="button"
          disabled={loading}
        >
          {loading ? (
            <span>
              <i className="material-icons">description</i> Exporting...
            </span>
          ) : (
            <span>
              <i className="material-icons">description</i> Export
            </span>
          )}
        </button>
        <CSVLink
          data={data}
          headers={headers}
          filename="projects.csv"
          className="hidden"
          ref={this.csvLink}
          target="_blank"
        />
      </div>
    );
  }
}
