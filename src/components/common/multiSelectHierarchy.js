import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './multiSelectHierarchy.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Api from '../../lib/api';
import LabelSelectHierarchy from './LabelSelectHierarchy';

export default function MultiSelectHierarchy({
  isAdmin,
  handleChangeCheckbox,
  isMultiSelect,
  isChecked,
  selectedOptions,
  type,
  user,
  isOpen,
  handleIsOpen,
}) {
  const [companyList, setcompanyList] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [hasSearchCriteria, setHasSearchCreteria] = useState(false);
  const [loading, setLoading] = useState(false);
  const [releasingLabels, setReleasingLabels] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  const pushToSelectedList = obj => {
    setSelectedList(obj); // call back
  };

  useEffect(() => {
    if (selectedList.length > 0)
      // call fn
      console.log('test');
  }, [selectedList]);

  // useEffect(() => {
  //   console.log('selectedLabels-Sofar', selectedLabel);
  //   console.log('selectedOptions-Sofar', selectedOptions);
  // }, [selectedLabel, setSelectedOptions]);
  useEffect(() => {
    const releasingCDLLabels = [];
    console.log(releasingCDLLabels);
    setReleasingLabels(releasingCDLLabels);
  }, []);
  useEffect(() => {
    if (searchInput.length >= 3) {
      setLoading(true);
      const payload = {
        SearchCriteria: {
          SearchTerm: searchInput,
        },
        languageCode: localStorage.getItem('languageCode') || 'en',
      };

      Api.post('/labels/search', payload)
        .then(res => {
          setHasSearchCreteria(true);
          return res.json();
        })
        .then(res => {
          const result = res.Result;
          console.log(result);
          console.log('result', result);
          setcompanyList(result);
          setLoading(false);
        });
    } else {
      setHasSearchCreteria(false);
      setcompanyList([]);
    }
  }, [searchInput]);

  const renderCompanies = companyList => {
    return (
      <div>
        <span className="sub-title">Select Options from Search Results</span>
        {companyList.map((company, i) => {
          const { CompanyId, CompanyName } = company;
          const hasComapny = CompanyId ? true : false;
          return (
            <div className="company-wrapper" key={i}>
              {CompanyId && (
                <div className="inside-wrapper">
                  <label className="custom-checkbox msh-checkbox">
                    <input
                      id="company"
                      className="form-control"
                      type="checkbox"
                      name={CompanyId}
                      onChange={e =>
                        handleChangeCheckbox(e, {
                          CompanyId,
                          CompanyName,
                          isMultiSelect,
                        })
                      }
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{CompanyName} (Company)</span>
                </div>
              )}
              {company.DivisionList.length > 0 && renderDivisions(company.DivisionList, hasComapny)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDivisions = (divisionList, hasComapny) => {
    return (
      <div className={`${!hasComapny ? 'rmvPadDivisonLabel' : ''} divison-wrapper`}>
        {divisionList.map((division, i) => {
          const { DivisionId, DivisionName } = division;
          const hasDivision = DivisionId ? true : false;
          return (
            <div key={i}>
              {DivisionId && (
                <div className="inside-wrapper ">
                  {hasComapny && (
                    <div className="tree">
                      <div className={`${i === 0 ? 'vl' : 'vl ex-ht'}`}></div>
                      <div className="hl"></div>
                    </div>
                  )}
                  <label className="custom-checkbox msh-checkbox">
                    <input
                      id="division"
                      className="form-control"
                      type="checkbox"
                      name={DivisionId}
                      onChange={e =>
                        handleChangeCheckbox(e, { DivisionId, DivisionName, isMultiSelect })
                      }
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{DivisionName} (Division)</span>
                </div>
              )}
              {division.LabelList.length > 0 && renderLabels(division.LabelList, hasDivision)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLabels = (LabelList, hasDivision) => {
    return (
      <div className={`${!hasDivision ? 'rmvPadDivisonLabel' : ''} label-wrapper`}>
        {LabelList.map((label, i) => {
          const { LabelId, LabelName } = label;
          return (
            <div key={i}>
              {hasDivision && (
                <div className="tree">
                  <div className={`${i === 0 ? 'vl' : 'vl ex-ht'}`}></div>
                  <div className="hl"></div>
                </div>
              )}
              <label className="custom-checkbox msh-checkbox">
                <input
                  id="label"
                  className="form-control"
                  type="checkbox"
                  name={LabelId}
                  onChange={e => handleChangeCheckbox(e, { LabelId, LabelName, isMultiSelect })}
                />
                <span className="checkmark "></span>
              </label>
              <span>{LabelName} (Label)</span>
            </div>
          );
        })}
      </div>
    );
  };

  const getLabelFilters = () => {
    const labels = this.props.filters.labelIds.map((labelID, i) => {
      let labelName = this.isSelectedLabel(labelID);
      return labelName ? (
        <button
          key={i}
          className="btn btn-sm btn-secondary"
          onClick={() => this.props.removeLabelsFilter(labelID)}
        >
          {labelName}
          <i className="material-icons">close</i>
        </button>
      ) : null;
    });
    return labels.length > 0 ? this.getFilterBubbles(this.props.t('admin:labels'), labels) : null;
  };

  const getFilterBubbles = (headerText, bubbles) => {
    return (
      <span>
        <label>{headerText}:</label>
        {bubbles}
      </span>
    );
  };

  // const handleSearchInput = e => {
  //   console.log('searchInput', searchInput);
  //   if (searchInput.length >= 3) {
  //     console.log('search query is more than 3 characters');
  //     setHasSearchCreteria(true);
  //   } else {
  //     setHasSearchCreteria(false);
  //   }
  // };

  const handleChange = e => {
    console.log('search keyword', e.target.value);
    // const randomNumbers = Math.floor(Math.random(100));
    // if (e.target.value.length >= 3) {
    //   console.log('search query is more than 3 characters');
    //   const newCompanyList = [...companyList];
    //   newCompanyList.unshift({
    //     CompanyId: 19245,
    //     CompanyName: `Atomic Music ${randomNumbers}`,
    //     DivisionList: [
    //       {
    //         DivisionId: 3152,
    //         DivisionName: 'Atomic Music/Federal Distribution',
    //         LabelList: [
    //           {
    //             LabelId: 3047,
    //             LabelName: 'Atomic Music/Federal Distribution',
    //           },
    //         ],
    //       },
    //     ],
    //   });
    //   setcompanyList(newCompanyList);
    // } else {
    //   setHasSearchCreteria(false);
    // }
    // requestFormInput
    // releaseInfoInput
    setSearchInput(e.target.value);
  };
  if (isAdmin) {
    return (
      <>
        <Dropdown
          className={`d-inline mx-2 ${
            type === 'requestAccess' ? 'requestFormInput' : 'releaseInfoInput'
          }`}
          autoClose="inside"
        >
          <Dropdown.Toggle id="dropdown-autoclose-inside">Select Options</Dropdown.Toggle>

          <Dropdown.Menu>
            <div className="msh-wrapper">
              <div className="main-title">Companies, Divisions & Labels</div>
              <div className="search-input">
                <Form.Control
                  type="text"
                  name="searchInput"
                  className="form-control requiredInput"
                  value={searchInput}
                  onChange={handleChange}
                />
                <i className="material-icons search-icon">search</i>
              </div>
              <div className="msh-content">
                {loading && <h3>Loading...</h3>}

                {companyList.length > 0 && hasSearchCriteria && renderCompanies(companyList)}
              </div>

              <div className="invalid-tooltip">Label is required.</div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  } else {
    return (
      <Dropdown
        className={`d-inline mx-2 ${
          type === 'requestAccess' ? 'requestFormInput' : 'releaseInfoInput'
        }`}
        autoclose="inside"
        onClick={e => {
          handleIsOpen(e);
        }}
      >
        <Dropdown.Toggle id="dropdown-autoclose-inside">
          {selectedOptions.length > 0 ? selectedOptions[1] : 'Select Options'}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ display: isOpen ? 'block' : 'none' }}>
          <div className="msh-wrapper">
            {/* <div className="main-title">Companies, Divisions & Labels</div> */}

            <div className="msh-content" style={{ marginTop: '-25px' }}>
              {loading && <h3>Loading...</h3>}
              <span className="sub-title">Select an option</span>

              <LabelSelectHierarchy
                releasingLabels={releasingLabels}
                isMultiSelect={false}
                handleChangeCheckbox={handleChangeCheckbox}
                selectedLabel={selectedOptions}
                isAdmin={isAdmin}
                user={user}
              />
            </div>

            <div className="invalid-tooltip">Label is required.</div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      // <div className="msh-wrapper">
      //   <div className="main-title">Companies, Divisions & Labels</div>
      //   <div className="search-input">
      //     <Form.Control
      //       type="text"
      //       name="searchInput"
      //       className="form-control requiredInput"
      //       value={searchInput}
      //       onChange={handleChange}
      //     />
      //     <i className="material-icons search-icon">search</i>
      //   </div>
      //   <div className="msh-content">
      //     {loading && <h3>Loading...</h3>}

      //     {companyList.length > 0 && hasSearchCriteria && renderCompanies(companyList)}
      //   </div>

      //   <div className="invalid-tooltip">Label is required.</div>
      // </div>
    );
  }
}
