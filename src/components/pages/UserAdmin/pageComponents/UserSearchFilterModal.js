import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LabelsMultiSelect from '../pageComponents/LabelsMultiSelect';
import MultiSelectHierarchy from '../../../common/multiSelectHierarchy';

// import NameIdDropdown from '../pageComponents/NameIdDropdown';

class UserSearchFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLabelOptions: [],
    };
  }

  render() {
    const t = this.props.t;
    const test = { ReleasingLabels: [] };
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

          <div className="row no-gutters">
            <div className="col-2">
              <label>{t('admin:modalByLabel')}</label>
            </div>

            <div className="col-10">
              {/* <LabelsMultiSelect
                options={this.props.releasingLabels}
                onChange={(e, label) => this.props.handleSearchFilterLabelChange(e, label)}
                defaultText={t('admin:modalSelectOption')}
                selectedOptions={this.props.selectedFilterLabelOptions}
                id={'filterReleasingLabels'}
              /> */}
              <MultiSelectHierarchy
                handleChangeCheckbox={this.props.handleSearchFilterLabelChange}
                isAdmin={true}
                isMultiSelect={true}
                type={'releaseInfo'}
                user={test}
                isChecked={this.state.isChecked}
                selectedOptions={this.props.selectedOptions}
              />
            </div>

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
