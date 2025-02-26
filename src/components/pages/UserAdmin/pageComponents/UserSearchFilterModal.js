import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import MultiSelectHierarchy from '../../../common/multiSelectTag';

class UserSearchFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLabelOptions: [],
    };
  }

  render() {
    const t = this.props.t;
    return (
      <div
        className={
          this.props.showFilterModal ? 'search-filters collapse show' : 'search-filters collapse'
        }
        id="collapsePanel"
      >
        <div className="card card-body">
          <h5>{t('admin:modalFilters')}</h5>
          <br />
          <div className="row mb-10">
            <div className="col-2">
              <label>{t('admin:modalByLabel')}</label>
            </div>

            <div className="col-10">
              {this.props.activeTab === 'requestAccess' && (
                <MultiSelectHierarchy
                  handleChangeCheckbox={this.props.handleSearchFilterLabelChange}
                  user={this.props.userData}
                  isMultiSelect={true}
                  tagList={this.props.tagList}
                  type={'userAdminModal'}
                  releasingLabels={this.props.LabelFacets}
                  selectedLabelIds={this.props.selectedList}
                  invokeAdminSearchApi={this.props.invokeAdminSearchApi}
                />
              )}
              {this.props.activeTab !== 'requestAccess' && (
                <MultiSelectHierarchy
                  handleChangeCheckbox={this.props.handleSearchFilterLabelChange}
                  user={this.props.userData}
                  isMultiSelect={true}
                  type={'userAdminModal'}
                  tagList={this.props.tagList}
                  releasingLabels={this.props.LabelFacets}
                  selectedLabelIds={this.props.selectedList}
                  invokeAdminSearchApi={this.props.invokeAdminSearchApi}
                  // tagList={[]}
                />
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <label>{t('admin:modalLastUpdated')}</label>
            </div>

            <div className="col-10">
              <Form.Control
                id="filterStartDate"
                type="date"
                onChange={this.props.handleDateFilter}
              />
              &nbsp;
              <label>{t('admin:modalTo')}</label>
              &nbsp; &nbsp;
              <Form.Control id="filterEndDate" type="date" onChange={this.props.handleDateFilter} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSearchFilterModal;
