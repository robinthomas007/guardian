import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './multiSelectHierarchy.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Api from '../../lib/api';

export default function MultiSelectHierarchy({ isAdmin, handleChangeCheckbox }) {
  const [companyList, setcompanyList] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [hasSearchCriteria, setHasSearchCreteria] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log('selectedLabels-Sofar', selectedLabel);
  //   console.log('selectedOptions-Sofar', selectedOptions);
  // }, [selectedLabel, setSelectedOptions]);
  useEffect(() => {
    if (searchInput.length >= 3) {
      setLoading(true);
      const payload = {
        User: {
          email: 'selvam.murugan@umusic.com',
        },
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
          const demo = JSON.parse(res.Result);
          console.log(demo);
          setcompanyList(demo);
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
                        })
                      }
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{CompanyName} (Company)</span>
                  {company.DivisionList.length > 0 && (
                    <div style={{ marginTop: '-10px' }}>
                      <div className="vl"></div>
                      <div className="hl"></div>
                    </div>
                  )}
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
                <div className="inside-wrapper">
                  <label className="custom-checkbox msh-checkbox">
                    <input
                      id="division"
                      className="form-control"
                      type="checkbox"
                      name={DivisionId}
                      onChange={e => handleChangeCheckbox(e, { DivisionId, DivisionName })}
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{DivisionName} (Division)</span>
                  {division.LabelList.length > 0 && (
                    <div>
                      <div className="vl"></div>
                      <div className="hl"></div>
                    </div>
                  )}
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
              <label className="custom-checkbox msh-checkbox">
                <input
                  id="label"
                  className="form-control"
                  type="checkbox"
                  name={LabelId}
                  onChange={e => handleChangeCheckbox(e, { LabelId, LabelName })}
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
    setSearchInput(e.target.value);
  };
  if (isAdmin) {
    return (
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
    );
  } else {
    return (
      <>
        <Dropdown className="d-inline mx-2" autoClose="inside">
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
  }
}
