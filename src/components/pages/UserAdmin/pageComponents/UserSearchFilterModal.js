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
      labelList: [],
    };
  }

  render() {
    const t = this.props.t;
    const test = { ReleasingLabels: [] };

    // rename function
    const somefunction = (e, data) => {
      /// e.target.checked then add the item to array
      const obj = {};
      obj.label = data.CompanyName || data.DivisionName || data.LabelName;
      obj.value = data.CompanyId || data.DivisionId || data.LabelId;
      // this.setState() //
      // setlabelList([...labelList, obj])
      const event = e;
      this.setState({ labelList: [...this.state.labelList, obj] }, () => {
        console.log(event, 'indeis callback');
        console.log(event.target.checked, 'eventevent');
        this.props.handleSearchFilterLabelChange(event, this.state.labelList);
      });

      // write logic here if it is unchecked pop item from list
    };
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
                handleChangeCheckbox={somefunction}
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
