import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './multiSelectHierarchy.css';

const list = [
  {
    CompanyId: 19245,
    CompanyName: 'Atomic Music',
    DivisionList: [
      {
        DivisionId: 3152,
        DivisionName: 'Atomic Music/Federal Distribution',
        LabelList: [
          {
            LabelId: 3047,
            LabelName: 'Atomic Music/Federal Distribution',
          },
        ],
      },
    ],
  },
  {
    CompanyId: 24131,
    CompanyName: 'ATO Records (AT0)',
    DivisionList: [],
  },
  {
    CompanyId: 26451,
    CompanyName: 'ATO Records LLC',
    DivisionList: [
      {
        DivisionId: 8004,
        DivisionName: 'ATO Records LLC',
        LabelList: [
          {
            LabelId: 6871,
            LabelName: 'ATO Records LLC',
          },
        ],
      },
    ],
  },
  {
    CompanyId: 26452,
    CompanyName: 'ATO Records - My Morning Jacket',
    DivisionList: [
      {
        DivisionId: 8005,
        DivisionName: 'ATO Records - My Morning Jacket',
        LabelList: [
          {
            LabelId: 6872,
            LabelName: 'ATO Records - My Morning Jacket',
          },
        ],
      },
    ],
  },
  {
    CompanyId: 26621,
    CompanyName: 'Atom Factory - Six 60',
    DivisionList: [
      {
        DivisionId: 8072,
        DivisionName: 'Atom Factory - Six 60',
        LabelList: [
          {
            LabelId: 6938,
            LabelName: 'Atom Factory - Six 60',
          },
        ],
      },
    ],
  },
  {
    CompanyId: 27584,
    CompanyName: 'ATO Records- Jim James',
    DivisionList: [
      {
        DivisionId: 8621,
        DivisionName: 'ATO Records- Jim James',
        LabelList: [
          {
            LabelId: 7300,
            LabelName: 'ATO Records- Jim James',
          },
        ],
      },
    ],
  },
  {
    CompanyId: '',
    CompanyName: '',
    DivisionList: [
      {
        DivisionId: 9726,
        DivisionName: 'ATO Records/Fontana North',
        LabelList: [],
      },
    ],
  },
  {
    CompanyId: '',
    CompanyName: '',
    DivisionList: [
      {
        DivisionId: '',
        DivisionName: '',
        LabelList: [
          {
            LabelId: 48502,
            LabelName: 'Atomic',
          },
        ],
      },
    ],
  },
  {
    CompanyId: '',
    CompanyName: '',
    DivisionList: [
      {
        DivisionId: '',
        DivisionName: '',
        LabelList: [
          {
            LabelId: 6134,
            LabelName: 'Atom Factory Music, LLC',
          },
        ],
      },
    ],
  },
  {
    CompanyId: '',
    CompanyName: '',
    DivisionList: [
      {
        DivisionId: '',
        DivisionName: '',
        LabelList: [
          {
            LabelId: 5772,
            LabelName: 'ATO Records (AT0)',
          },
        ],
      },
    ],
  },
  {
    CompanyId: '',
    CompanyName: '',
    DivisionList: [
      {
        DivisionId: '',
        DivisionName: '',
        LabelList: [
          {
            LabelId: 5774,
            LabelName: 'ATO Records',
          },
        ],
      },
    ],
  },
];

export default function multiSelectHierarchy() {
  const [companyList, setcompanyList] = useState([]);
  const [selectedlabel, setselectedlabel] = useState([]);

  useEffect(() => {
    // API call
    setcompanyList(list);
  }, []);

  const handleChangeCheckbox = (e, data) => {
    console.log(e.target.checked, 'e.target.checkede.target.checked', e, data);
    if (e.target.checked) {
      // psuh the data
      setselectedlabel([...selectedlabel, data]);
    } else {
      // pull the data if exist
    }
  };

  const renderCompanies = companyList => {
    return (
      <div>
        <span className="sub-title">Select Options from Search Results</span>
        {companyList.map((company, i) => {
          const hasComapny = company.CompanyId ? true : false;
          return (
            <div className="company-wrapper">
              {company.CompanyId && (
                <div className="inside-wrapper">
                  <label className="custom-checkbox msh-checkbox">
                    <input
                      id="company"
                      className="form-control"
                      type="checkbox"
                      name={company.CompanyId}
                      onChange={e => handleChangeCheckbox(e, company)}
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{company.CompanyName} (Company)</span>
                  {company.DivisionList.length > 0 && (
                    <div>
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
          const hasDivision = division.DivisionId ? true : false;
          return (
            <div>
              {division.DivisionId && (
                <div className="inside-wrapper">
                  <label className="custom-checkbox msh-checkbox">
                    <input
                      id="division"
                      className="form-control"
                      type="checkbox"
                      name={division.DivisionId}
                    />
                    <span className="checkmark "></span>
                  </label>
                  <span>{division.DivisionName} (Division)</span>
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
          return (
            <div>
              <label className="custom-checkbox msh-checkbox">
                <input id="label" className="form-control" type="checkbox" name={label.LabelId} />
                <span className="checkmark "></span>
              </label>
              <span>{label.LabelName} (Label)</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="msh-wrapper">
      <div className="main-title">Companies, Divisions & Labels</div>
      <div className="search-input">
        <Form.Control
          type="text"
          name="firstName"
          className="form-control requiredInput"
          // value={this.state.formInputs.firstName}
          // onChange={this.handleChange}
        />
        <i className="material-icons search-icon">search</i>
      </div>
      {companyList.length > 0 && renderCompanies(companyList)}
      <div className="invalid-tooltip">Label is required.</div>
    </div>
  );
}
