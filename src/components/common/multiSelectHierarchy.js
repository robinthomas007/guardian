import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './multiSelectHierarchy.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Api from '../../lib/api';
import _ from 'lodash';

export default function MultiSelectHierarchy({
  handleChangeCheckbox,
  type,
  isMultiSelect,
  isAdmin,
  releasingLabels,
  selectedLabelIds,
}) {
  const [companyList, setcompanyList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const didMountRef = useRef(false);

  const addSelectedList = (e, data) => {
    if (e.target.checked) {
      if (isMultiSelect) setSelectedList([...selectedList, data]);
      else setSelectedList([data]);
    } else {
      const modificedList = selectedList.filter(item => item.value !== data.value);
      setSelectedList(modificedList);
    }
  };

  useEffect(() => {
    if (didMountRef.current) {
      handleChangeCheckbox(selectedList);
    } else {
      didMountRef.current = true;
    }
  }, [selectedList]);

  useEffect(() => {
    if (releasingLabels && releasingLabels.length > 0) {
      setcompanyList(releasingLabels);
    }
  }, [releasingLabels]);
  useEffect(() => {
    if (selectedList.length !== selectedLabelIds.length) {
      setSelectedList(selectedLabelIds);
    }
  }, [selectedLabelIds]);

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
          return res.json();
        })
        .then(res => {
          const result = res.Result;
          setcompanyList(result);
          setLoading(false);
        });
    } else {
      if (searchInput.length === 0) {
        if (releasingLabels && releasingLabels.length > 0) setcompanyList(releasingLabels);
      }
    }
  }, [searchInput]);

  const checkIfIdPresent = id => {
    let lablelIds = _.map(selectedList, 'value');
    if (lablelIds.includes(id)) return true;
    else return false;
  };

  function checkEmpty(obj) {
    for (let key in obj) {
      if (obj[key] instanceof Object === true) {
        if (checkEmpty(obj[key]) === false) return false;
      } else {
        if (obj[key].length !== 0) return false;
      }
    }
    return true;
  }

  const renderCompanies = companyList => {
    return (
      <div>
        {isAdmin && companyList.length > 0 && (
          <span className="sub-title">Select Options from Search Results</span>
        )}
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
                      checked={checkIfIdPresent(String(CompanyId))}
                      onChange={e =>
                        addSelectedList(e, { value: String(CompanyId), label: CompanyName })
                      }
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{CompanyName} (Company)</span>
                </div>
              )}
              {company.DivisionList &&
                company.DivisionList.length > 0 &&
                renderDivisions(company.DivisionList, hasComapny)}
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
                      checked={checkIfIdPresent(String(DivisionId))}
                      onChange={e =>
                        addSelectedList(e, { value: String(DivisionId), label: DivisionName })
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
      <div className={`${!hasDivision ? 'rmvPadLabel' : ''} label-wrapper`}>
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
                  checked={checkIfIdPresent(String(LabelId))}
                  onChange={e => addSelectedList(e, { value: String(LabelId), label: LabelName })}
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

  return (
    <div className="ms-dropdown-wrapper">
      <Dropdown className={`d-inline ${type}`} autoclose="inside">
        <Dropdown.Toggle id="dropdown-autoclose-inside" className="ms-dropdown-toggle">
          {selectedList.length > 1
            ? selectedList.length + ' Selected'
            : selectedList.length === 1
            ? selectedList[0].label
            : 'Select Options'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div className="msh-wrapper">
            <div className="main-title">Companies, Divisions & Labels</div>
            {isAdmin && (
              <div className="search-input">
                <Form.Control
                  type="text"
                  name="searchInput"
                  className="form-control requiredInput"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                />
                <i className="material-icons search-icon">search</i>
              </div>
            )}
            <div className="msh-content">
              {loading && <h3>Loading...</h3>}
              {companyList.length === 1 && checkEmpty(companyList) ? (
                <span className="sub-title">No Results Found! Please try again.</span>
              ) : (
                renderCompanies(companyList)
              )}

              {/* {companyList.length > 0 && renderCompanies(companyList)} */}
            </div>

            <div className="invalid-tooltip">Label is required.</div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
